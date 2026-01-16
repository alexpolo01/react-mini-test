# Posts Search App

A simple React + TypeScript app that fetches posts from JSONPlaceholder API and lets you search through them.

## Getting Started

1. Clone the repo
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the dev server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:5173 in your browser

## Running Tests

There's a simple test suite for the search filtering logic (no external test libraries needed):

```bash
npm run test
```

This runs tests for `filterPostsByTitle` and `paginatePosts` functions, checking things like case-insensitive matching, empty queries, and pagination limits.

## What Could Be Improved

- **Skeleton loaders** - The current loading spinner is fine, but skeleton placeholders would feel smoother and give users a better sense of what's coming.
- **Keyboard navigation** - Would be nice to navigate through post items with arrow keys and open the modal with Enter. Small thing but makes the app feel more polished.
- **Dark mode support** - Everything's hardcoded to light colors right now. Adding a theme toggle with CSS variables or a context provider would make it more user-friendly.
