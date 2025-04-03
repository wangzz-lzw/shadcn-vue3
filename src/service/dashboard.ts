import request from '@/lib/request';

export const getBlogStats = () => {
    return request.get('/bolg/stats');
};