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

## What Could Be Improved

- **Add unit tests** - Right now there are no tests. Would be nice to add some basic tests for the components and the search/filter logic using Vitest or React Testing Library.
- **Better error handling & offline support** - The error state is pretty basic. Could show more helpful messages, maybe add a toast notification system, or even cache posts locally so the app works offline.
- **Pagination instead of "Load More"** - The current load more approach works fine, but proper pagination with page numbers might be better UX for larger datasets. Could also add infinite scroll as an alternative.
