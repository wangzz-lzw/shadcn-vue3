import {  SidebarTrigger } from "@/components/ui/sidebar"

const Header = () => {
    return (
        <div className={`h-7 background relative w-full`}>
            <SidebarTrigger className="absolute left-7" />
        </div>
    )
}


export default Header