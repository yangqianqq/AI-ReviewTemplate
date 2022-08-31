export interface Method {
    /** HTTP 请求 OPTIONS */
    OPTIONS;
    /** HTTP 请求 GET */
    GET;
    /** HTTP 请求 HEAD */
    HEAD;
    /** HTTP 请求 POST */
    POST;
    /** HTTP 请求 PUT */
    PUT;
    /** HTTP 请求 DELETE */
    DELETE;
    /** HTTP 请求 TRACE */
    TRACE;
    /** HTTP 请求 CONNECT */
    CONNECT;
}

export type OptionWithoutUrl = Pick<
    Taro.request.Option,
    Exclude<keyof Taro.request.Option, 'url'>
>;
