import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/getRecommendation': {
        target: 'https://multidomainproduct-1e0279665a75.herokuapp.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
