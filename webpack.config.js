const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackTemplate = require('html-webpack-template')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (webpackConfig, env) => {
  // FilenameHash
  webpackConfig.output.chunkFilename = '[name].[hash].js'

  if (env === 'production' && webpackConfig.module) {
    // ClassnameHash
    webpackConfig.module.rules.map((item) => {
      if (item.use && item.use[0] === 'style') {
        return item.use.map((iitem) => {
          if (iitem && iitem.loader === 'css') {
            iitem.options.localIdentName = '[hash:base64:5]'
          }
          return iitem
        })
      }
      return item
    })
  }

  // PreLoaders
  // webpackConfig.module.preLoaders = [{
  //   test: /\.js$/,
  //   enforce: 'pre',
  //   loader: 'eslint',
  // }]

  webpackConfig.plugins = webpackConfig.plugins.concat([
    new CopyWebpackPlugin([
      {
        from: 'src/assets/public',
        to: env === 'production' ? '../' : webpackConfig.output.outputPath,
      },
    ]),
    new HtmlWebpackPlugin({
      hash: true,
      mobile: true,
      title: 'antd-admin',
      inject: false,
      appMountId: 'root',
      template: `!!ejs-loader!${HtmlWebpackTemplate}`,
      filename: env === 'production' ? '../index.html' : 'index.html',
      minify: {
        collapseWhitespace: true,
      },
      scripts: env === 'production' ? null : ['/roadhog.dll.js'],
      meta: [
        {
          name: 'description',
          content: 'A admin dashboard application demo built upon Ant Design and Dva.js',
        }, {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
      ],
    }),
  ])

  // Alias
  webpackConfig.resolve.alias = {
    config: `${__dirname}/src/config/index`,
    enums: `${__dirname}/src/config/enums`,
    components: `${__dirname}/src/core/components`,
    services: `${__dirname}/src/core/services`,
    models: `${__dirname}/src/core/models`,
    routes: `${__dirname}/src/core/routes`,
    utils: `${__dirname}/src/core/utils`,
    themes: `${__dirname}/src/core/themes`,
  }

  return webpackConfig
}
