import { filterPostsByTitle, paginatePosts, type Post } from './filterPosts';

// Simple test runner
let passed = 0;
let failed = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`✓ ${name}`);
    passed++;
  } catch (error) {
    console.log(`✗ ${name}`);
    console.log(`  ${error}`);
    failed++;
  }
}

function assertEqual<T>(actual: T, expected: T, message?: string) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    throw new Error(
      message ||
        `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
    );
  }
}

// Test data
const mockPosts: Post[] = [
  { userId: 1, id: 1, title: 'Hello World', body: 'First post' },
  { userId: 1, id: 2, title: 'React Tutorial', body: 'Learn React' },
  { userId: 2, id: 3, title: 'TypeScript Guide', body: 'TS basics' },
  { userId: 2, id: 4, title: 'Hello Again', body: 'Another hello' },
  { userId: 3, id: 5, title: 'Vite Setup', body: 'Fast dev server' },
];

// Tests for filterPostsByTitle
console.log('\n--- filterPostsByTitle tests ---\n');

test('returns all posts when query is empty', () => {
  const result = filterPostsByTitle(mockPosts, '');
  assertEqual(result.length, 5);
});

test('returns all posts when query is whitespace only', () => {
  const result = filterPostsByTitle(mockPosts, '   ');
  assertEqual(result.length, 5);
});

test('filters posts by title (case insensitive)', () => {
  const result = filterPostsByTitle(mockPosts, 'hello');
  assertEqual(result.length, 2);
  assertEqual(result[0].id, 1);
  assertEqual(result[1].id, 4);
});

test('filters posts by title with uppercase query', () => {
  const result = filterPostsByTitle(mockPosts, 'REACT');
  assertEqual(result.length, 1);
  assertEqual(result[0].id, 2);
});

test('returns empty array when no matches found', () => {
  const result = filterPostsByTitle(mockPosts, 'xyz123');
  assertEqual(result.length, 0);
});

test('handles partial word matches', () => {
  const result = filterPostsByTitle(mockPosts, 'script');
  assertEqual(result.length, 1);
  assertEqual(result[0].title, 'TypeScript Guide');
});

// Tests for paginatePosts
console.log('\n--- paginatePosts tests ---\n');

test('returns first n posts when limit is less than total', () => {
  const result = paginatePosts(mockPosts, 3);
  assertEqual(result.length, 3);
  assertEqual(result[0].id, 1);
  assertEqual(result[2].id, 3);
});

test('returns all posts when limit exceeds total', () => {
  const result = paginatePosts(mockPosts, 100);
  assertEqual(result.length, 5);
});

test('returns empty array when limit is 0', () => {
  const result = paginatePosts(mockPosts, 0);
  assertEqual(result.length, 0);
});

test('handles empty posts array', () => {
  const result = paginatePosts([], 10);
  assertEqual(result.length, 0);
});

// Summary
console.log('\n--- Results ---\n');
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);

if (failed > 0) {
  process.exit(1);
}
