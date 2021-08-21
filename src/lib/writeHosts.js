const fs = require('fs')

function writeHosts(value) {
  fs.writeFile('./hosts', value, (err) => {
    if (err) {
      console.error(err)
      return false
    }

    console.log('hosts 文件更新成功')
    return true
  })
}

module.exports = writeHosts