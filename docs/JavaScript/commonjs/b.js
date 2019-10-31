// b.js
exports.done = "bbb-1"
let a = require('./a.js')
console.log('b.js-1', a.done)
exports.done = "bbb-2"
console.log('b.js-2', '执行完毕')