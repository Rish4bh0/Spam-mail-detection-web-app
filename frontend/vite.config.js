import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json']
  },
  server:{
    port:3000,
    // Get rid of the CORS error
    proxy:{
    "/api": {
      target: "http://localhost:3001",
      changeOrigin: true,
      secure: false,
    }
  }
  }
})
