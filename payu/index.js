const payu = require('payu-websdk')

const payuClient = new payu({
  key: "gtKFFx",
  salt: "4R38IvwiV57FwVpsgOvTXBdLE4tHUXFW",
},"TEST"); 

module.exports = payuClient