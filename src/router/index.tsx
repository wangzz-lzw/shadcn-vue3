import { useRoutes } from "react-router-dom";
import type { RouteObject } from 'react-router-dom';
import { lazy, Suspense } from "react";
import LoadingPage from "@/hooks/useloading";

export const routes: SyncRoute.Routes[] = [
    {
        path: "/",
        component: lazy(() => import('@/layout')),
        meta: {
            title: '面板',
            isMenu:true
        },
        children: [
            {
                path: "/",
                component: lazy(() => import("@/views/home")),
                meta: {
                    title: "首页",
                    isMenu:true
                },
            },
            {
                path: "/project",
                component: lazy(() => import("@/views/project")),
                meta: {
                    title: "关于",
                    isMenu:true
                },
            },
        ],
    },
    {
        path: '/login',
        component: lazy(() => import("@/views/login")),
    },
];
const syncRouter = (table: SyncRoute.Routes[]): RouteObject[] => {
    const mRouteTable: RouteObject[] = [];
    table.forEach(route => {
        mRouteTable.push({
            path: route.path,
            element: (
                <Suspense fallback={ <LoadingPage /> }>
                    <route.component />
                </Suspense>
            ),
            children: route.children && syncRouter(route.children)
        });
    });
    return mRouteTable;
};

export default ()=> useRoutes(syncRouter(routes));
