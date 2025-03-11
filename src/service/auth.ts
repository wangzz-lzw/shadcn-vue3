import request from '@/lib/request';

interface LogoProps {
   access_token: string;
}

interface RegistryProps extends LogoProps {
    username: string;
    password: string;
}
interface QrcodeData {
    qrcodeId: string;
    qrcodeUrl:string
}
export const login = (params:any) => {
    return request.post<LogoProps>('/login', params);
};

export const registry = (params:any) => {
    return request.post<RegistryProps>('/registry', params);
};
export const getQrcode = () => {
    return request.get<QrcodeData>('/qrcode/create');
};

export const getQrcodeStatus = (qrcodeId:string)=>{
    return request.get<QrcodeData>(`/qrcode/getQrcodeStatus/${qrcodeId}`);
};