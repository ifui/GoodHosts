const utc = require('dayjs/plugin/utc')
const dayjs = require('dayjs');
const timezone = require('dayjs/plugin/timezone')

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault("Asia/Shanghai")

module.exports = {
  title: ['# Added by Good Host'],
  footer: [
    '# Github: https://github.com/ifui/GoodHosts',
    '# Update At: ' + dayjs().format('YYYY-MM-DD HH:mm:ss'),
    '# Good Hosts End'
  ]
}