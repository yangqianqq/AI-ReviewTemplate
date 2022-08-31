/** @format */
import BaseRequest from './index';
import { OptionWithoutUrl } from './typing';

class BaseSubJsonRequest {
    private options: OptionWithoutUrl;

    constructor(props?: OptionWithoutUrl) {
        this.options = {
            header: {
                'content-type': 'application/json'
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
     * @memberof BaseSubJsonRequest
     */
    static get<T>(url: string, data?: any) {
        return new BaseRequest(new BaseSubJsonRequest().options).get<T>(
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
     * @memberof BaseSubJsonRequest
     */
    static post<T>(url: string, data?: any) {
        return new BaseRequest(new BaseSubJsonRequest().options).post<T>(
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
     * @memberof BaseSubJsonRequest
     */
    static put<T>(url: string, data?: any) {
        return new BaseRequest(new BaseSubJsonRequest().options).put<T>(
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
     * @memberof BaseSubJsonRequest
     */
    static del<T>(url: string, data?: any) {
        return new BaseRequest(new BaseSubJsonRequest().options).del<T>(
            url,
            data
        );
    }

    /**
     *
     * downlod
     * @param {string} url
     * @return {*}
     * @memberof BaseSubJsonRequest
     */
    static downLoad(url: string) {
        return new BaseRequest(new BaseSubJsonRequest().options).download(url);
    }

    /**
     *
     * upload
     * @param {string} url
     * @param {string} filePath
     * @param {string} name
     * @param {*} [data]
     * @return {*}
     * @memberof BaseSubJsonRequest
     */
    static upload(url: string, filePath: string, name: string, data?: any) {
        return new BaseRequest(new BaseSubJsonRequest().options).upload(
            url,
            filePath,
            name,
            data
        );
    }

    static htmlUpload(url: string, data?: any) {
        return new BaseRequest(new BaseSubJsonRequest().options).htmlUpload(
            url,
            data
        );
    }
}

export default BaseSubJsonRequest;
