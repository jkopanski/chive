import path from 'path'
import webpack from 'webpack'
import AssetsPlugin from 'assets-webpack-plugin'

const DEBUG = !process.argv.includes('--release')
const VERBOSE = process.argv.includes('--verbose')

const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  '__DEV__': DEBUG
}

/**
 * Common config for both client and server-side bundles
 */
const config = {
  context: path.resolve(__dirname, '../src'),
  resolve: {
    root: path.resolve(__dirname, '../src'),
    moduleDirectories: [
      'node_modules',
      path.resolve(__dirname, '../node_modules')
    ],
    extensions: [
      '', '.css', '.webpack.js', '.web.js', '.js', '.jsx', '.json'
    ]
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: '/node_modules/'
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, '../src')
        ],
        loader: 'babel',
        query: {
          babelrc: false,
          presets: ['es2015', 'stage-0', 'react'],
          plugins: ['transform-decorators-legacy']
        }
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
    cache: DEBUG,
    debug: DEBUG,
    stats: {
      colors: true,
      reasons: DEBUG,
      hash: VERBOSE,
      version: VERBOSE,
      timings: true,
      chunks: VERBOSE,
      chunkModules: VERBOSE,
      cached: VERBOSE,
      cachedAssets: VERBOSE
    }
  }
}

const webClient = Object.assign({}, config, {
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  entry: DEBUG
    ? [
      'webpack-hot-middleware/client?path=/__webpack_hmr',
      './client.js'
    ]
    : './client.js',
  output: {
    path: path.resolve(path.join(__dirname, '../dist/public/static')),
    filename: DEBUG
      ? '[name].js?[hash]'
      : '[name].[hash].js',
    chunkFilename: DEBUG
      ? '[name].[id].js?[hash]'
      : '[name].[id].[hash].js',
    publicPath: '/static/'
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin(
      Object.assign({}, GLOBALS, {
        'process.env.BROWSER': true
      })),
    ...DEBUG ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ] : [],

    new AssetsPlugin({
      path: path.resolve(__dirname, '../dist'),
      filename: 'bundle.js',
      processOutput: x => `module.exports = ${JSON.stringify(x)}`
    }),

    new webpack.optimize.OccurenceOrderPlugin(true),

    ...DEBUG ? [] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: VERBOSE
        }
      }),
      new webpack.optimize.AggressiveMergingPlugin()
    ]
  ]
})

const server = Object.assign({}, config, {
  devtool: 'source-map',
  entry: './server.js',
  output: {
    filename: 'server.js',
    path: path.resolve(path.join(__dirname, '../dist/')),
    libraryTarget: 'commonjs2'
  },
  externals: [
    /^\.\/bundle$/
  ],
  plugins: [
    new webpack.DefinePlugin({ ...GLOBALS, 'process.env.BROWSER': false }),
    new webpack.BannerPlugin('require("source-map-support").install();',
      {raw: true, entryOnly: false})
  ],
  target: 'node',
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  }
})

export default [webClient, server]
