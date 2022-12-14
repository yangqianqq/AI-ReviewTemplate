module.exports = {
    env: {
        NODE_ENV: '"production"'
    },
    defineConstants: {},
    mini: {},
    h5: {
        uglify: {
            enable: false,
            config: {
                // 配置项同 https://github.com/mishoo/UglifyJS2#minify-options
            }
        }
        /**
         * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
         * 参考代码如下：
         * webpackChain (chain) {
         *   chain.plugin('analyzer')
         *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
         * }
         */
    }
};
