// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     optional nitro, VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const configuredBasePath = process.env["VITE_BASE_PATH"] ?? "/";
const basePathSegments = configuredBasePath.split("/").filter(Boolean);
const basePath = basePathSegments.length ? `/${basePathSegments.join("/")}/` : "/";

export default defineConfig({
  vite: {
    base: basePath,
  },
  nitro: false,
  tanstackStart: {
    // Use the SSR wrapper as the prerender server entry.
    server: { entry: "server" },
    prerender: {
      enabled: true,
    },
  },
});
