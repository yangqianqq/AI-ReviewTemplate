/** @format */

import BaseRequest from './index';
import { OptionWithoutUrl } from './typing';

class BaseSubFormRequest {
    private options: OptionWithoutUrl;

    constructor(props?: OptionWithoutUrl) {
        this.options = {
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            ...props
        };
    }

    /**
     *
     *
     * @static
     * @template T
     * @param {string} url
     * @param {*} [data]
     * @return {*}
     * @memberof BaseSubFormRequest
     */
    static get<T>(url: string, data?: any) {
        return new BaseRequest(new BaseSubFormRequest().options).get<T>(
            url,
            data
        );
    }

    /**
     *
     * post application/x-www-form-urlencoded
     * @template T
     * @param {string} url
     * @param {*} [data]
     * @return {*}
     * @memberof BaseSubFormRequest
     */
    static post<T>(url: string, data?: any) {
        return new BaseRequest(new BaseSubFormRequest().options).post<T>(
            url,
            data
        );
    }

    /**
     *
     * put application/x-www-form-urlencoded
     * @template T
     * @param {string} url
     * @param {*} [data]
     * @return {*}
     * @memberof BaseSubFormRequest
     */
    static put<T>(url: string, data?: any) {
        return new BaseRequest(new BaseSubFormRequest().options).put<T>(
            url,
            data
        );
    }

    /**
     *
     * del application/x-www-form-urlencoded
     * @template T
     * @param {string} url
     * @param {*} [data]
     * @return {*}
     * @memberof BaseSubFormRequest
     */
    static del<T>(url: string, data?: any) {
        return new BaseRequest(new BaseSubFormRequest().options).del<T>(
            url,
            data
        );
    }

    /**
     *
     * downlod
     * @param {string} url
     * @return {*}
     * @memberof BaseSubFormRequest
     */
    static downLoad(url: string) {
        return new BaseRequest(new BaseSubFormRequest().options).download(url);
    }

    /**
     *
     * upload
     * @param {string} url
     * @param {string} filePath
     * @param {string} name
     * @param {*} [data]
     * @return {*}
     * @memberof BaseSubFormRequest
     */
    static upload(url: string, filePath: string, name: string, data?: any) {
        return new BaseRequest(new BaseSubFormRequest().options).upload(
            url,
            filePath,
            name,
            data
        );
    }
}

export default BaseSubFormRequest;
