const path = require('path')
const { version } = require('./package.json')

const svgSpriteDirs = [
  path.resolve(__dirname, 'src/assets/svg/'),
  require.resolve('antd').replace(/index\.js$/, '')
]

export default {
  entry : 'src/index.js',
  svgSpriteLoaderDirs : svgSpriteDirs,
  theme : "./theme.config.js",
  publicPath : `/${version}/`,
  outputPath : `./dist/${version}`,
  // 接口代理示例
  // "proxy": {
  //   "/api/v1": {
  //     "target": "http://api.zuiidea.com",
  //     "changeOrigin": true,
  //     "pathRewrite": { "^/api/v1" : "/v1" }
  //   },
  //   "/api/v2": {
  //     "target": "http://192.168.0.110",
  //     "changeOrigin": true,
  //     "pathRewrite": { "^/api/v2" : "/api/v2" }
  //   }
  // },
  env : {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
        "transform-runtime",
        [
          "import", {
            "libraryName": "antd",
            "style": true
          }
        ]
      ]
    },
    production: {
      extraBabelPlugins: [
        "transform-runtime",
        [
          "import", {
            "libraryName": "antd",
            "style": true
          }
        ]
      ]
    }
  },
  dllPlugin : {
    exclude: ["babel-runtime"],
    include: ["dva/router", "dva/saga", "dva/fetch"]
  }
}
