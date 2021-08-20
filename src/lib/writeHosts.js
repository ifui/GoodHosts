const fs = require('fs')

const writeFile = res => {
  const hosts = res.join('\r\n')
  fs.writeFile('./hosts', hosts, (err) => {
    if (err) {
      console.error(err)
      return
    }

    console.log('hosts 文件更新成功')
  })
}

module.exports = writeFile