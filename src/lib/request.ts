import axios from 'axios';
import type { AxiosResponse, AxiosInstance, CreateAxiosDefaults } from 'axios';
/**
 * @Description: 请求响应接口
 */
export interface ApiResponse<D = any> {
    code?: number
    message?: string
    time?: string | number
    data?: D
}

/**
 * 接口返回 Promise 类型
 */
export type ApiPromise<T = any> = Promise<ApiResponse<T>>

const config: CreateAxiosDefaults = {
    // 默认地址请求地址，可在 .env 开头文件中修改
    baseURL: `/${import.meta.env.VITE_API_URL}`,
    // 设置超时时间（10s）
    timeout: 10000,
    // 跨域时候允许携带凭证
    withCredentials: true
};

class Request {
    // axios实例
    instance: AxiosInstance;
    // 构造函数
    constructor(config?: CreateAxiosDefaults) {
        // 创建axios实例
        console.log(config, 'config');
        this.instance = axios.create(config);
        // 设置拦截器
        this.setInterceptors(this.instance);
    }

    /**
     * 处理响应
     * @param res
     */
    handleResponse(res: AxiosResponse & any) {
        // 请求完成后，将控制器实例从Map中移除
        if (axios.isCancel(res)) {
            return Promise.reject(res);
        }
        if (res.data.code === 200) {
            const { showError = true } = res.config;
            const { code } = res.data;
            if (code === 200) {
                return Promise.resolve(res.data);
            } else {
                if (showError) {
                    console.log('error');
                }
                return Promise.reject(res.data);
            }
        } else {
            const { showError = true } = res.config;
            if (showError) {
                console.log('error');
            }
        }
        return Promise.reject(res);
    }
    // 拦截器
    setInterceptors(request: AxiosInstance) {
        // 请求拦截器
        request.interceptors.request.use(config => {
            // 实例化控制器
            const controller = new AbortController();
            // 将控制器实例与请求绑定
            config.signal = controller.signal;
            // 设置请求头
            return config;
        });
        // 响应拦截器
        request.interceptors.response.use(
            res => {
                return this.handleResponse(res);
            },
            res => {
                return this.handleResponse(res);
            }
        );
    }

    get<T>(url: string, params?: object, _object = {}): ApiPromise<T> {
        return this.instance.get(url, { params, ..._object });
    }
    post<T>(url: string, params?: object, _object = {}): ApiPromise<T> {
        return this.instance.post(url, params, _object);
    }
    put<T>(url: string, params?: object, _object = {}): ApiPromise<T> {
        return this.instance.put(url, params, _object);
    }
    delete<T>(url: string, params?: any, _object = {}): ApiPromise<T> {
        return this.instance.delete(url, { params, ..._object });
    }
}

export default new Request(config);
