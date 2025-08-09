# Word Cloud Challenge

## Description

A frontend application to display a Word Cloud based on data from `topics.json`.

## Getting Started

1.  Clone the repository
2.  Run `npm install`
3.  Run the development server with `npm run dev`
4.  Open [http://localhost:5173](http://localhost:5173) in your browser

## Data

The source data is located in the `public/topics.json` file.

## Tools & Versions

- React 19.1.1
- React DOM 19.1.1
- Vite 7.1.0
- Tailwind CSS 3.4.17
- TypeScript ~5.8.3
- ESLint 9.32.0
- Zustand 5.0.7 (State Management)

## Build and Deploy

To create a production build, run:

```
npm run build
```

This will generate optimized static files in the dist folder.

To preview the production build locally, run:

```
npm run preview
```

## Status

- Project setup with React + Vite + TypeScript
- Tailwind CSS installed and configured with custom colors and font sizes
- `topics.json` placed in the public folder and integrated
- Zustand store implemented with topics, loading, error states
- Custom hook with error handling and AbortController
- Word cloud core features (6 font sizes, sentiment colors, click interaction)
- Topic details with metadata display
- Centralized error handling with user-friendly messages

_(README will be updated throughout the development process.)_
