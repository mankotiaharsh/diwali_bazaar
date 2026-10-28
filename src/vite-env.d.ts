/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the FastAPI backend, e.g. http://localhost:8000 */
  readonly VITE_API_BASE_URL?: string;
  /** Public address of this site, used in every share link, e.g. https://diwali-bazaar.vercel.app */
  readonly VITE_PUBLIC_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
