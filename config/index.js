// modify: 20211202
var path = require('path');

const config = {
  projectName: 'keChuangYun',
  date: '2021-4-12',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 1 / 2,
  },
  sourceRoot: 'src',
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [],
  defineConstants: {
    IMG_COMMON_URL: JSON.stringify('https://static-files.heimaqf.cn/'),
    REQUEST_URL: JSON.stringify('https://gateway.heimaqf.cn/pc'),
    WEB_URL: JSON.stringify('https://m.kechuangyun.com'),
    EncryptedStatus: true,
  },
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  alias: {
    '@/src': path.resolve(__dirname, '..', 'src'),
    '@/common': path.resolve(__dirname, '..', 'src/common'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/pages': path.resolve(__dirname, '..', 'src/pages'),
    '@/store': path.resolve(__dirname, '..', 'src/store'),

    '@/package': path.resolve(__dirname, '..', 'package.json'),
    '@/project': path.resolve(__dirname, '..', 'project.config.json'),
  },
  mini: {
    compile: {
      exclude: [
        (modulePath) => {
          return modulePath.indexOf('echarts') > -1;
        },
      ],
    },
    optimizeMainPackage: {
      enable: true,
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  weapp: {
    compile: {
      exclude: [
        (modulePath) => {
          return modulePath.indexOf('echarts') > -1;
        },
        'src/components/AvailableImg/tiff.min.js',
      ],
    },

    optimizeMainPackage: {
      enable: true,
    },
    module: {
      postcss: {
        // css modules 功能开关与相关配置
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module，下文详细说明
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    compile: {
      exclude: ['src/components/AvailableImg/tiff.min.js'],
    },

    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    esnextModules: ['taro-ui'],
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};
