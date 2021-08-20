const dnsQueryUrl = require('../config/dns-query')
const doh = require('dohjs')

const getHosts = urls => {
  const resolver = new doh.DohResolver(dnsQueryUrl)

  return urls.map(async url => {
    const {
      answers
    } = await resolver.query(url, 'A')
    if (answers.length > 0) {
      return answers[answers.length - 1].data + ' ' + url
    }
  })
}

module.exports = getHosts