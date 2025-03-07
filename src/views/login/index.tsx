import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// 导入登录和注册接口
import { login, registry } from '@/service/auth';

// 定义表单验证规则
const loginSchema = z.object({
    username: z.string().email("请输入有效的电子邮件地址"),
    password: z.string().min(8, "密码必须至少8个字符"),
});

const registerSchema = z.object({
    username: z.string().email("请输入有效的电子邮件地址"),
    password: z.string().min(8, "密码必须至少8个字符"),
    confirmPassword: z.string().min(8, "密码必须至少8个字符"),
    remember: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "密码和确认密码不一致",
    path: [ "confirmPassword" ],
});

export default function LoginPage() {
    const [ isRegisterForm, setIsRegisterForm ] = useState(false);
    
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof loginSchema | typeof registerSchema>>({
        resolver: zodResolver(isRegisterForm ? registerSchema : loginSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
            remember: false,
        },
    });

    const handleSubmit = form.handleSubmit(async (data) => {
        try {
            let response;
            if (isRegisterForm) {
                response = await registry(data);
                setIsRegisterForm(false);
            } else {
                response = await login(data);
            }

            if (response.data!.token) {
                localStorage.setItem('token', response.data!.token);
                navigate('/');
            }
        } catch (error) {
            console.error('登录或注册失败', error);
        }
    });

    const handleToggleForm = () => {
        setIsRegisterForm(!isRegisterForm);
        form.reset();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    background: `linear-gradient(45deg, #ff6b6b, #4ecdc4)`,
                    animation: `background 10s linear infinite forwards`
                }}
            />
            <div className="relative z-10 w-full max-w-md bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl p-8 space-y-6 border border-white/20">
                {/* 保持原有表单内容不变 */}
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">{isRegisterForm ? "注册新账户" : "欢迎回来"}</h1>
                    <p className="text-gray-500 mt-2">{isRegisterForm ? "请输入您的注册信息" : "请输入您的登录信息"}</p>
                </div>

                <Form {...form}>
                    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>电子邮箱</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="username"
                                            type="username"
                                            placeholder="m@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>密码</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="password"
                                            type="password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {isRegisterForm && (
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>确认密码</FormLabel>
                                        <FormControl>
                                            <Input
                                                id="confirmPassword"
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {!isRegisterForm && (
                            <div className="flex items-center justify-between">
                                <FormField
                                    control={form.control}
                                    name="remember"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center space-x-2">
                                            <FormControl>
                                                <Checkbox
                                                    id="remember"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormLabel htmlFor="remember">记住我</FormLabel>
                                        </FormItem>
                                    )}
                                />
                                <Button variant="link" className="px-0 text-sm text-gray-600">
                                  忘记密码?
                                </Button>
                            </div>
                        )}

                        <Button className="w-full bg-blue-600 hover:bg-blue-700">{isRegisterForm ? "注册" : "登录"}</Button>
                    </form>
                </Form>

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
                    {isRegisterForm ? "已有账户？" : "没有账户？"}{" "}
                    <Button variant="link" className="text-blue-600 hover:text-blue-700 px-0" onClick={handleToggleForm}>
                        {isRegisterForm ? "立即登录" : "立即注册"}
                    </Button>
                </p>
                {/* 新增装饰元素 */}
                <div className="absolute -top-8 -left-8 w-24 h-24 bg-blue-400/30 rounded-full blur-xl" />
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-purple-400/30 rounded-full blur-xl" />
            </div>
        </div>
    );
}

// 添加CSS动画
const style = document.createElement('style');
style.innerHTML = `
@keyframes fade-in {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
    animation: fade-in 0.5s ease-in-out;
}
`;
document.head.appendChild(style);