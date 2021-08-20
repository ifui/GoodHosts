const github = require('./github')
const dribbble = require('./dribbble')

module.exports = [...dribbble, ...github]