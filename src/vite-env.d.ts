/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_CLIENT_ID: string;
  readonly VITE_APP_URL: string;
  readonly VITE_WORKER_URL: string;
}

interface ImportEnv {
  readonly env: ImportMetaEnv;
}
