const DohHosts = require('./lib/DohHosts')
const dohs = require('./config/dohs')
const urls = require('./config/urls')
const remark = require('./config/remark')
const writeHosts = require('./lib/writeHosts')

const dohHosts = new DohHosts(urls, dohs)

dohHosts.run().then(res => {
  // 添加更新记录
  res.unshift(...remark.title)
  res.push(...remark.footer)

  writeHosts(res.join('\r\n'))
})