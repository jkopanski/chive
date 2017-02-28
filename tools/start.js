/**
* Based in part upon 'start.js'
* from React Starter Kit (https://www.reactstarterkit.com/), which is:
* Copyright © 2014-present Kriasoft, LLC. All rights reserved.
*/

import Browsersync from 'browser-sync'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
// import WriteFilePlugin from 'write-file-webpack-plugin'
import run from './run'
import runServer from './runServer'
import webpackConfig from './webpack.config'
import clean from './clean'
import copy from './copy'

const isDebug = !process.argv.includes('--release')
const webConfig = webpackConfig[0]

/**
 * Launches a development web server with "live reload" functionality -
 * synchronizing URLs, interactions and code changes across multiple devices.
 */
async function start () {
  await run(clean)
  await run(copy)
  await new Promise(resolve => {
    // Save the server-side bundle files to the file system after compilation
    // https://github.com/webpack/webpack-dev-server/issues/62
    // serverConfig.plugins.push(new WriteFilePlugin({ log: false }))

    if (isDebug) {
      webConfig.entry.client = [...new Set([
        'babel-polyfill',
        'react-hot-loader/patch',
        'webpack-hot-middleware/client'
      ].concat(webConfig.entry.client))]
      webConfig.output.filename =
        webConfig.output.filename.replace('[chunkhash', '[hash')
      webConfig.output.chunkFilename =
        webConfig.output.chunkFilename.replace('[chunkhash', '[hash')
      const { query } = webConfig.module.rules.find(x => x.loader === 'babel-loader')
      query.plugins = ['react-hot-loader/babel'].concat(query.plugins || [])
      webConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
      webConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin())
    }

    const bundler = webpack(webpackConfig)
    const wpMiddleware = webpackMiddleware(bundler, {
      // IMPORTANT: webpack middleware can't access config,
      // so we should provide publicPath by ourselves
      publicPath: webConfig.output.publicPath,

      // Pretty colored output
      stats: webConfig.stats

      // For other settings see
      // https://webpack.github.io/docs/webpack-dev-middleware
    })
    const hotMiddleware = webpackHotMiddleware(bundler.compilers[0])

    let handleBundleComplete = async () => {
      handleBundleComplete =
        stats => !stats.stats[1].compilation.errors.length && runServer()

      const server = await runServer()
      const bs = Browsersync.create()
      bs.init({
        ...isDebug ? {} : { notify: false, ui: false },

        proxy: {
          target: server.host,
          middleware: [wpMiddleware, hotMiddleware],
          proxyOptions: {
            xfwd: true
          }
        }
      }, resolve)
    }

    bundler.plugin('done', stats => handleBundleComplete(stats))
  })
}

export default start
