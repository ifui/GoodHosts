const doh = require('dohjs')
const dnsQueryUrl = require('./config/dns-query')
const githubUrls = require('./config/github')
const fs = require('fs')

const resolver = new doh.DohResolver(dnsQueryUrl)

const getHosts = () => {
  const promiseArr = githubUrls.map(async url => {
    const {
      answers
    } = await resolver.query(url, 'A')
    if (answers.length > 0) {
      return answers[answers.length - 1].data + ' ' + url
    }
  })

  Promise.all(promiseArr).then(res => {
    const hosts = res.join('\r\n')
    fs.writeFile('./hosts', hosts, (err) => {
      if (err) {
        console.error(err)
        return
      }

      console.log('hosts 文件更新成功')
    })
  })
}

getHosts()