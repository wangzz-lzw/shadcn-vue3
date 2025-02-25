import { Settings, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
    Sidebar,
    SidebarContent,
    SidebarGroupLabel,
    SidebarGroup,
} from '@/components/ui/sidebar';
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from '@/components/ui/collapsible';
import { routes } from '@/router';

export function AppSidebar() {
    // 递归渲染路由菜单
    const renderRoutes = (routes: SyncRoute.Routes[]) => {
        return routes.map((route, index) => (
            <div key={route.meta?.title || index}>
                {/* Collapsible for parent menus */}
                {route.children ? (
                    <Collapsible defaultOpen className="group/collapsible">
                        <SidebarGroup>
                            <SidebarGroupLabel asChild>
                                <CollapsibleTrigger>
                                    <div className="flex items-center relative w-full text-lg">
                                        <Settings className="mr-2" size={16} />
                                        {route.meta?.title}
                                        <ChevronDown
                                            className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180 absolute right-0"
                                            size={16}
                                        />
                                    </div>
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                        </SidebarGroup>
                        <CollapsibleContent>
                            {/* Render child routes recursively */}
                            {renderRoutes(route.children)}
                        </CollapsibleContent>
                    </Collapsible>
                ) : (
                // Leaf menu items
                    <div
                        className="flex items-center py-2 px-6 hover:bg-slate-100 rounded cursor-pointer text-base"
                        onClick={() => handleLink(route.path)}
                    >
                        <Settings className="mr-2" size={16} />
                        <span>{route.meta?.title}</span>
                    </div>
                )}
            </div>
        ));
    };
    const navigete = useNavigate();
    const handleLink = (url: string) => {
        navigete(url);
    };
    return (
        <Sidebar>
            <SidebarContent>{renderRoutes(routes)}</SidebarContent>
        </Sidebar>
    );
}
