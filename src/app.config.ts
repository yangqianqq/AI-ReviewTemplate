export default {
  pages: [
    // 首页
    'pages/index/index', //首页
    'pages/shopping/index', //商城
    'pages/personInfo/index', //个人中心
  ],

  subpackages: [
    {
      root: 'pages/info', //个人中心
      pages: [
        'aboutUs/index', //关于我们
      ],
    },
    {
      root: 'pages/search', //商城
      pages: [
        'index', //搜索
      ],
    },
  ],

  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    onReachBottomDistance: 50,
  },

  tabBar: {
    color: '#7D8086',
    selectedColor: '#E02021',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './common/imgs/tabBar/icon/home.png',
        selectedIconPath: './common/imgs/tabBar/selectedIcon/home.png',
      },

      {
        pagePath: 'pages/shopping/index',
        text: '模版商店',
        iconPath: './common/imgs/tabBar/icon/shop.png',
        selectedIconPath: './common/imgs/tabBar/selectedIcon/shop.png',
      },

      {
        pagePath: 'pages/personInfo/index',
        text: '我的',
        iconPath: './common/imgs/tabBar/icon/mine.png',
        selectedIconPath: './common/imgs/tabBar/selectedIcon/mine.png',
      },
    ],
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示', // 高速公路行驶持续后台定位
    },
  },
};
