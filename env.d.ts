declare module '*.scss' {}

declare module '*.css' { }

declare global {
  const Cesium: typeof import('cesium');
  const ShadcnUI: typeof import('shadcn-ui');
  // 其他 CDN 引入的类型声明...
}
