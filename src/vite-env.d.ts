/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_KEY: string;
}

interface ImportEnv {
  readonly env: ImportMetaEnv;
}
