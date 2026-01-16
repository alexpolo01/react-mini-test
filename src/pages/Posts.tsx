import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button, PostItem, SearchInput, Text } from '../components';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const ITEMS_PER_PAGE = 30;
const DEBOUNCE_DELAY = 300;

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Fetch posts from API with abort support
  const fetchPosts = useCallback(async () => {
    // Abort any previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL, { signal: abortController.signal });
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      const data: Post[] = await response.json();
      setPosts(data);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return; // Ignore abort errors
      }
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial fetch with abort on unmount
  useEffect(() => {
    fetchPosts();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchPosts]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setVisibleCount(ITEMS_PER_PAGE); // Reset visible count when search changes
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter posts based on debounced search query (client-side search by title only)
  const filteredPosts = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return posts;
    }
    const query = debouncedQuery.toLowerCase();
    return posts.filter((post) => post.title.toLowerCase().includes(query));
  }, [posts, debouncedQuery]);

  // Get visible posts
  const visiblePosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  const hasMore = visibleCount < filteredPosts.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleSearch = () => {
    // Trigger immediate search by updating debounced query
    setDebouncedQuery(searchQuery);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '1280px',
        width: '100%',
        top: '0',
        // margin: '0',
        boxSizing: 'border-box',
      }}
    >
      {/* Title */}
      <Text label='Search Posts' type='title' />

      {/* Search Input */}
      <SearchInput
        value={searchQuery}
        onChange={setSearchQuery}
        onSearch={handleSearch}
        placeholder='Search posts by title...'
      />

      {/* Results Area */}
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid #eee',
          minHeight: '400px',
          maxWidth: '960px',
          //   width: '480px',
          boxSizing: 'border-box',
        }}
      >
        {/* Loading State */}
        {isLoading && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #646cff',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }}
            />
            <Text label='Loading posts...' type='default' />
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
              gap: '16px',
            }}
          >
            <Text label={`Error: ${error}`} type='default' />
            <Button label='Retry' onClick={fetchPosts} />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredPosts.length === 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px',
            }}
          >
            <Text
              label={
                debouncedQuery
                  ? `No posts found matching "${debouncedQuery}"`
                  : 'No posts available'
              }
              type='default'
            />
          </div>
        )}

        {/* Posts List */}
        {!isLoading && !error && filteredPosts.length > 0 && (
          <>
            {visiblePosts.map((post) => (
              <PostItem key={post.id} title={post.title} body={post.body} />
            ))}

            {/* Load More Button */}
            {hasMore && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '20px',
                }}
              >
                <Button label='Load More' onClick={handleLoadMore} />
              </div>
            )}

            {/* Results count */}
            <div
              style={{
                textAlign: 'center',
                padding: '12px',
                color: '#666',
                fontSize: '12px',
                borderTop: '1px solid #eee',
              }}
            >
              Showing {visiblePosts.length} of {filteredPosts.length} posts
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Posts;
