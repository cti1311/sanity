const payu = require('payu-websdk')

const payuClient = new payu({
  key: "QyT13U",
  salt: "UnJ0FGO0kt3dUgnHo9Xgwi0lpipBV0hB",
},"TEST"); 

module.exports = payuClient