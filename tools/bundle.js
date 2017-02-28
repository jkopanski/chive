/**
* Based in part upon 'bundle.js'
* from React Starter Kit (https://www.reactstarterkit.com/), which is:
* Copyright © 2014-present Kriasoft, LLC. All rights reserved.
*/

import webpack from 'webpack'
import webpackConfig from './webpack.config'

/**
 * Creates application bundles from the source files.
 */
function bundle () {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        return reject(err)
      }

      console.log(stats.toString(webpackConfig[0].stats))
      return resolve()
    })
  })
}

export default bundle
