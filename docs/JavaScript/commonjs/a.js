exports.done = "aaa-1"
let b = require('./b.js')
console.log('a.js-1', b.done)
exports.done = "aaa-2"
console.log('a.js-2', '执行完毕')