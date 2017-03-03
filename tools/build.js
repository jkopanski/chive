/**
* Based in part upon 'bundle.js'
* from React Starter Kit (https://www.reactstarterkit.com/), which is:
* Copyright © 2014-present Kriasoft, LLC. All rights reserved.
*/

import bundle from './bundle'
import clean from './clean'
import copy from './copy'
import run from './run'

/**
 * Compiles the project from source files into a distributable
 * format and copies it to the output (build) folder.
 */
async function build () {
  await run(clean)
  await run(copy)
  await run(bundle)
}

export default build
