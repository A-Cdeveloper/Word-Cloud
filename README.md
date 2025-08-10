# Word Cloud Challenge

## Description

A frontend application to display a Word Cloud based on data from `topics.json`.

## Getting Started

1.  Clone the repository
2.  Run `npm install`

## Development

To run the application in development mode:

```
npm run dev
```

This will start the Vite development server on `http://localhost:5173` with hot reload enabled.

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
- Vitest 3.2.4 (Testing Framework)
- Cypress 14.5.4 (E2E Testing Framework)

## Testing

### Unit Tests (Vitest)

```
# Run tests in watch mode
npm run test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage report
npm run test:coverage
```

### E2E Tests (Cypress)

```
# Open Cypress Test Runner
npm run cy:open

# Run Cypress tests in headless mode
npx cypress run
```

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
