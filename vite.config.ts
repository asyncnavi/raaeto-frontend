import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/*": "./src/*",
      // /esm/icons/index.mjs only exports the icons statically, so no separate chunks are created
      "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
      //
      "@/components": "/src/components",
      "@/api": "/src/api",
      "@/hooks": "/src/hooks",
      "@/pages": "/src/pages",
      "@/store": "/src/store",
      "@/styles": "/src/styles",
      "@/utils": "/src/utils",
      "@/types": "/src/types",
    },
  },
});
