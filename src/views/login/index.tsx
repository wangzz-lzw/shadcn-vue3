
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";

export default function LoginPage() {
    const [ formData, setFormData ] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 处理登录逻辑
        console.log(formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">欢迎回来</h1>
                    <p className="text-gray-500 mt-2">请输入您的登录信息</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">电子邮箱</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">密码</Label>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={formData.remember}
                                onCheckedChange={(checked) => setFormData({ ...formData, remember: !!checked })}
                            />
                            <Label htmlFor="remember">记住我</Label>
                        </div>
                        <Button variant="link" className="px-0 text-sm text-gray-600">
              忘记密码?
                        </Button>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700">登录</Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">其他登录方式</span>
                    </div>
                </div>

                <div className="flex gap-4 justify-center">
                    <Button variant="outline" className="w-full">
                        <GitHubLogoIcon className="mr-2 h-4 w-4" />
            GitHub
                    </Button>
                    <Button variant="outline" className="w-full">
                        <LinkedInLogoIcon className="mr-2 h-4 w-4" />
            LinkedIn
                    </Button>
                </div>

                <p className="text-center text-sm text-gray-500">
          没有账户？{" "}
                    <Button variant="link" className="text-blue-600 hover:text-blue-700 px-0">
            立即注册
                    </Button>
                </p>
            </div>
        </div>
    );
}