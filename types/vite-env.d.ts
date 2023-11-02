/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_PROXY_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
