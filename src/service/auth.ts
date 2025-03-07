import request from '@/lib/request';

interface LogoProps {
   token: string;
}

interface RegistryProps extends LogoProps {
    username: string;
    password: string;
}
export const login = (params:any) => {
    return request.post<LogoProps>('/login', params);
};

export const registry = (params:any) => {
    return request.post<RegistryProps>('/registry', params);
};

