const payu = require('payu-websdk')

const payuClient = new payu({
  key: "evEiGQ",
  salt: "pHEp8ohtYEZK6DUdkxQ4dP8tKCbVw28I",
},"TEST"); 

module.exports = payuClient