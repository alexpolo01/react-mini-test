export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export function filterPostsByTitle(posts: Post[], query: string): Post[] {
  if (!query.trim()) {
    return posts;
  }
  const lowerQuery = query.toLowerCase();
  return posts.filter((post) => post.title.toLowerCase().includes(lowerQuery));
}

export function paginatePosts(posts: Post[], limit: number): Post[] {
  return posts.slice(0, limit);
}
