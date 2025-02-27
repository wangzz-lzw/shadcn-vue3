import request from '@/lib/request';

export const getTaskList = (params:any) => {
    return request.post('/task', params);
};