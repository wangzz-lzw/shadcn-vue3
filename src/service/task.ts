import request from '@/lib/request';
import type { Column } from '@/views/project/interface';
export const addtask = (params:any) => {
    return request.post('/task', params);
};

export const getTaskList = () => {
    return request.get<Column[]>('/task');
};

export const updateTaskStatus = (params:any) => {
    return request.put('/task', params);
};