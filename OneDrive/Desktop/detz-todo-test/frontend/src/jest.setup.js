// src/jest.setup.js

// Mock Vite's import.meta.env for Jest
Object.defineProperty(global, 'importMeta', {
  value: {
    env: {
      VITE_API_URL: 'http://localhost:4000'
    }
  }
});

// Provide a global mock for import.meta
global.import = {
  meta: {
    env: {
      VITE_API_URL: 'http://localhost:4000'
    }
  }
};
