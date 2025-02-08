/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly RICK_AUTHOR: string;
  readonly RICK_GITHUB: string;
  readonly RICK_JUEJIN: string;
  readonly RICK_ISSUE: string;
  readonly RICK_AVATAR: string;

  readonly RICK_REDUX_LOGGER: 'true' | 'false';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
