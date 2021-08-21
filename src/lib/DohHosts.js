const doh = require('dohjs')
const ping = require('ping')

class DohHosts {

  hosts = []
  urls = []
  dohs = []
  type = 'A'

  /**
   * 获取 hosts
   * @param {string[]} urls 
   * @param {string[]} dohs 
   */
  constructor(urls, dohs) {
    this.urls = urls
    this.dohs = dohs.map(url => new doh.DohResolver(url))
  }

  /**
   * 执行
   */
  async run() {
    for (let i = 0; i < this.urls.length; i++) {
      const ips = await this.dohQuery(this.urls[i])
      const ip = await this.pingIps(ips)
      if (ip) {
        this.hosts.push(ip + ' ' + this.urls[i])
      } else {
        console.error(`${this.urls[i]} 获取 ip 失败`)
      }
    }

    return this.hosts
  }

  /**
   * 发送请求 dns-query
   * @param {string} url 
   * @return {string[]}
   */
  async dohQuery(url) {
    let ips = []

    for (let i = 0; i < this.dohs.length; i++) {
      const {
        answers
      } = await this.dohs[i].query(url, this.type)

      if (answers.length > 0) {
        // 添加最后一组的data ip 到 ips 数组中，等待ping
        ips.push(answers[answers.length - 1].data)
      }
    }
    return ips
  }

  /**
   * 测速
   * @param {stirng[]} ips
   * @return {string|boolean}
   */
  async pingIps(ips) {
    // 排序的IP
    let ipsTime = []

    for (let i = 0; i < ips.length; i++) {
      const {
        alive,
        time
      } = await ping.promise.probe(ips[i], {
        timeout: 2
      })

      if (alive) {
        ipsTime.push({
          ip: ips[i],
          time
        })
      }
    }

    const sortIpsTime = ipsTime.sort((a, b) => a.time - b.time)

    if (sortIpsTime.length > 0) {
      // log
      console.info(`${sortIpsTime[0].ip} ${sortIpsTime[0].time}ms`)
      return sortIpsTime[0].ip
    } else {
      return false
    }
  }
}

module.exports = DohHosts