# Testing Documentation

## Overview

This project uses **Vitest** for unit testing. Vitest is a fast, modern test runner built for JavaScript/TypeScript projects.

## Installation

Install the dependencies:

```bash
npm install
```

## Running Tests

### Run all tests once

```bash
npm test
```

### Run tests in watch mode

Watch mode automatically re-runs tests when files change (useful during development):

```bash
npm run test:watch
```

### Run tests with coverage report

```bash
npm run test:coverage
```

## Test Structure

### Current Test Coverage

The project includes comprehensive unit tests for the glossary filtering functionality:

**File:** `glossary.test.js`

**Tests included:**

1. ✅ **Empty query handling** - Returns all entries when query is empty
2. ✅ **Whitespace handling** - Returns all entries when query is only whitespace
3. ✅ **Case-insensitive term matching** - Finds entries regardless of case
4. ✅ **Description filtering** - Searches within entry descriptions
5. ✅ **Tag-based filtering** - Finds entries by their tags
6. ✅ **Partial matching** - Matches partial words in terms
7. ✅ **No matches** - Returns empty array when nothing matches
8. ✅ **Cross-field matching** - Searches across term, description, and tags

### Test Data

Tests use a mock dataset with 4 glossary entries (API, CI/CD, Machine Learning, Docker) to verify filtering logic.

## Writing New Tests

To add new tests, follow this pattern in `glossary.test.js`:

```javascript
it('should describe what the test does', () => {
    const result = filterGlossary('search query');
    expect(result).toHaveLength(expectedNumber);
    expect(result[0].term).toBe('Expected Term');
});
```

## Configuration

### vitest.config.js

Minimal configuration:
- **globals**: Enables global test functions (describe, it, expect)
- **environment**: 'jsdom' for DOM testing support

### package.json scripts

- `test` - Single test run (CI/production)
- `test:watch` - Interactive watch mode (development)
- `test:coverage` - Coverage reports

## Troubleshooting

### Tests won't run

Make sure you've installed dependencies:
```bash
npm install
```

### Module errors

Ensure `package.json` has `"type": "module"` for ES6 support.

## Future Test Ideas

- Test `getSuggestions()` function
- Test results count logic
- Test clear button functionality
- Integration tests with DOM manipulation
- Edge cases (special characters, very long queries)

