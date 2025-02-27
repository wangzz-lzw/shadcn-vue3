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
