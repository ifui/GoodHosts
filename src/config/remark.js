const dayjs = require('dayjs');

dayjs.tz.setDefault("Asia/Shanghai")

module.exports = {
  title: ['# Added by Good Host'],
  footer: [
    '# Github: https://github.com/ifui/GoodHosts',
    '# Update At: ' + dayjs().format('YYYY-MM-DD HH:mm:ss'),
    '# Good Hosts End'
  ]
}