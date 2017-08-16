const enums = require('./enums')
const theme = require('./theme')
const menus = require('./menus')
const localStorageKeys = require('./ls-keys')

const APIV1 = '/api/v1'
const APIV2 = '/api/v2'

const apiBase = {
  main: 'http://test-paradise.jiyutech.net'
}

module.exports = {
  name: 'AntD Admin',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2017 zuiidea',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  YQL: ['http://www.zuimeitianqi.com'],
  CORS: [
    `${apiBase.main}`,
  ],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
  apiBase,
  enums,
  menus,
  localStorageKeys,
  color: theme.color,
}
