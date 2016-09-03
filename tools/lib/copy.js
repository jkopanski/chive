import ncp from 'ncp'

export default (src, dest) => new Promise((resolve, reject) => {
  ncp(src, dest, err => err ? reject(err) : resolve())
})
