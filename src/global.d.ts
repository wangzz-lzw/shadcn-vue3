declare namespace SyncRoute {
  export type RouteMeta = {
    title: string;
  };
  export type Routes = {
    path: string;
    component: React.LazyExoticComponent<any>;
    children?: Routes[];
    meta?: RouteMeta;
  };
}
