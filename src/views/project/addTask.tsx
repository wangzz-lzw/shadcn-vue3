import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addtask } from '@/service/task';

// 定义表单数据类型
const formSchema = z.object({
    taskName: z.string().min(1, "任务名称不能为空"),
    taskContent: z.string().min(1, "任务内容不能为空"),
    taskSubTitle: z.string().optional(),
    status: z.string().min(1, "任务状态不能为空"),
});

export type TaskFormValues = z.infer<typeof formSchema>;
export type TaskFormProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};
const TaskFormDialog = (props:TaskFormProps) => {
    const { open, onOpenChange } = props;
    // 初始化表单
    const form = useForm<TaskFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            taskName: "",
            taskContent: "",
            taskSubTitle: "",
            status: "",
        },
    });

    // 提交处理函数
    const onSubmit = async (data: TaskFormValues) => {
        const result = await addtask(data);
        console.log(result, 'result');
        // 这里可以添加API调用逻辑
        form.reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>创建新任务</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* 任务名称 */}
                        <FormField
                            control={form.control}
                            name="taskName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>任务名称 *</FormLabel>
                                    <FormControl>
                                        <Input placeholder="请输入任务名称" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 任务副标题 */}
                        <FormField
                            control={form.control}
                            name="taskSubTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>任务副标题</FormLabel>
                                    <FormControl>
                                        <Input placeholder="请输入任务副标题（可选）" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 任务内容 */}
                        <FormField
                            control={form.control}
                            name="taskContent"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>任务内容 *</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="请输入任务详细内容"
                                            className="min-h-[120px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>任务状态 *</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="请选择任务状态"
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">未开始</SelectItem>
                                                <SelectItem value="in_progress">进行中</SelectItem>
                                                <SelectItem value="completed">已结束</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end gap-4">
                            <DialogTrigger asChild>
                                <Button variant="outline" onClick={() => onOpenChange(false)}>取消</Button>
                            </DialogTrigger>
                            <Button type="submit">创建任务</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default TaskFormDialog;