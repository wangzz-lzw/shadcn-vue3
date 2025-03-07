
declare namespace SyncRoute {
  export type RouteMeta = {
    title: string;
    isMenu?:boolean
  };
  export type Routes = {
    path: string;
    component: React.LazyExoticComponent<any>;
    children?: Routes[];
    meta?: RouteMeta;
  };
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // 其他环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
