// components/empty-state.tsx
import { PackageX } from "lucide-react";

export function EmptyState() {
    return (
        <div className="flex h-[calc(100vh-14rem)] flex-col items-center justify-center space-y-4">
            <PackageX className="h-12 w-12 text-muted-foreground" />
            <div className="space-y-2 text-center">
                <h2 className="text-xl tracking-tight">暂无数据</h2>
            </div>
        </div>
    );
}