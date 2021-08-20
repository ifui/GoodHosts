const urls = require('./config/urls')
const writeFile = require('./lib/writeHosts')
const getHosts = require('./lib/getHosts')

Promise.all(getHosts(urls)).then(res => {
  writeFile(res)
})