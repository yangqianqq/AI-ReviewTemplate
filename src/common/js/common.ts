/**
 * @desc 重新加载七陌js
 */
export function reload7m() {
    if (process.env.TARO_ENV === 'h5') {
        let el = document.getElementById('reloadJs');
        let url = '';
        if (
            window.location.origin.indexOf('172') > -1 ||
            window.location.origin.indexOf('test.') > -1
        ) {
            url =
                'https://ykf-webchat.7moor.com/javascripts/7moorInit.js?accessId=db4356e0-b78c-11eb-aeb1-3b844660fa72&autoShow=true&language=ZHCN';
        } else {
            url =
                'https://ykf-webchat.7moor.com/javascripts/7moorInit.js?accessId=fa1fd3c0-bf54-11eb-8fa4-a3b0146ade8d&autoShow=true&language=ZHCN';
        }

        var qimoClientId = '';
        if (el) {
            // @ts-ignore
            document.querySelector('head').removeChild(el);
        }
        var script = document.createElement('script');
        script.setAttribute('id', 'reloadJs');

        script.setAttribute('type', 'text/javascript');
        script.setAttribute('src', url);
        // @ts-ignore
        document.querySelector('head').appendChild(script);
    }
}
