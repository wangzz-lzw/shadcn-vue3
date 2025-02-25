import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import Header from './header';
export default function Layout() {
    const [ open, setOpen ] = useState(true);
    return (
        <SidebarProvider open={open} onOpenChange={setOpen}>
            <AppSidebar />
            <div className="flex flex-col w-full h-full">
                <Header />
                <main
                    className={`h-[calc(100vh_-_28px)] relative ${
                        open ? 'w-[calc(100vw_-_256px)]' : 'w-screen'
                    } px-7 py-7 box-border`}
                >
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    );
}
