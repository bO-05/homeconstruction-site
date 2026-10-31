import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, type PluginOption } from "vite"

// https://vite.dev/config/
export default defineConfig(async ({ command, isPreview }) => {
  const plugins: PluginOption[] = [react()]
  if (command === 'serve' && !isPreview && process.env.ENABLE_VISUAL_EDITS === '1') {
    const { inspectAttr } = await import('kimi-plugin-inspect-react')
    plugins.unshift(inspectAttr())
  }
  return {
  base: '/',
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  }
});
