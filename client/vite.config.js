import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: true,
    outDir: path.resolve(__dirname, '../dist/app') // ✅ Force build into dist/app in project root
  }
})
