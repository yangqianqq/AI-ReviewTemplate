import Taro from '@tarojs/taro';
import NoTokenNeedLogin from '@/utils/loginBack/index';
import axios from 'axios';
import { OptionWithoutUrl, Method } from './typing';

let Token: string;

NoTokenNeedLogin.HasToken({ tkCallback: tk => (Token = tk) });

class Request {
    public requestOptions: OptionWithoutUrl;

    private baseUrl: string;

    private defaultOptions: OptionWithoutUrl;

    static token = Token;

    constructor(options?: OptionWithoutUrl) {
        //@ts-ignore
        this.baseUrl = REQUEST_URL;
        this.defaultOptions = {
            header: {
                'content-type': 'application/json',
                'api-source': process.env.TARO_ENV === 'h5' ? 'h5' : 'wechat'
            }
        };

        this.requestOptions = {
            ...this.defaultOptions.header,
            ...options?.header
        } as Taro.request.Option;
    }

    htmlUpload(url: string, data: any) {
        const request = axios.create({});

        return request
            .post(this.baseUrl + url, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            .then(res => {
                const useData = res.data;
                return useData;
            });
    }

    baseRequest<T>(url: string, method: keyof Method, data?: any): Promise<T> {
        var tokenValue = Taro.getStorageSync('uniqueToken');

        return new Promise(resolve => {
            Taro.request<T>({
                url: this.baseUrl + url,
                method: method,
                data: data,
                header: {
                    ...this.requestOptions,
                    Authorization: tokenValue
                },
                success(res) {
                    let res1 = res;
                    const { code } = res1.data;
                    if (code === 444) {
                        Taro.removeStorageSync('uniqueToken');
                        NoTokenNeedLogin.ReadyForBack();
                    }
                    resolve(res1.data);
                },
                fail(err) {
                    resolve(Promise.reject(err));
                }
            });
        });
    }

    get<T>(url: string, data?: any): Promise<T> {
        return this.baseRequest<T>(url, 'GET', data);
    }

    post<T>(url: string, data?: any): Promise<T> {
        return this.baseRequest<T>(url, 'POST', data);
    }

    del<T>(url: string, data?: any): Promise<T> {
        return this.baseRequest<T>(url, 'DELETE', data);
    }

    put<T>(url: string, data?: any): Promise<T> {
        return this.baseRequest<T>(url, 'PUT', data);
    }

    upload(
        url: string,
        filePath: string,
        name: string,
        data?: any
    ): Promise<any> {
        var tokenValue = Taro.getStorageSync('uniqueToken');

        return new Promise((resolve, reject) => {
            Taro.uploadFile({
                url: `${this.baseUrl}${url}`,
                filePath: filePath,
                name: 'file',
                formData: data,
                fileName: name,
                header: {
                    Authorization: tokenValue
                },
                success(res: any) {
                    resolve(JSON.parse(res.data));
                },
                fail(err: Taro.General.CallbackResult) {
                    reject(err);
                }
            });
        });
    }

    download(url): Promise<any> {
        return new Promise((resolve, reject) => {
            Taro.downloadFile({
                url: `${this.baseUrl}${url}`,
                ...this.defaultOptions,
                success(res: any) {
                    resolve(res.filePath);
                },
                fail(err: Taro.General.CallbackResult) {
                    reject(err);
                }
            });
        });
    }
}

export default Request;
