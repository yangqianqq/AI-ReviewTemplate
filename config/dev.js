// modify: 2021-12-01
module.exports = {
    env: {
        NODE_ENV: '"development"'
    },
    defineConstants: {},
    mini: {},
    h5: {
        devServer: {
            proxy: {
                '/': {
                    target: 'https://gateway.heimaqf.cn',
                    changeOrigin: true
                }
            }
        }
    }
};
