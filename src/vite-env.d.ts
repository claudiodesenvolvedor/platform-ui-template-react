/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_API_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_DEV_ROLE: string
  readonly VITE_ENABLE_AUTH_FALLBACK: string
  readonly VITE_FEATURE_USERS: string
  readonly VITE_FEATURE_REPORTS: string
  readonly VITE_FEATURE_AUDIT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
