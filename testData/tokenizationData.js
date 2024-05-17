let config = require('../config');

let user_credentials= `${config.payu.creds.key}:${Math.floor(Math.random()*10000000)}`

module.exports = {
  visa: [
    {
      testName: "save_payment_instrument",
      payload: {
        command: "save_payment_instrument",
        var1: user_credentials,
        var2: "test",
        var3: "CC",
        var4: "CC",
        var5: "test",
        var6: "4895370077346937",
        var7: "05",
        var8: "2025"
      },
      response: {
        status: {numericality: {equalTo: 1}},
        cardToken: {presence: {allowEmpty: false}},
        network_token: {presence: {allowEmpty: false}}
      },
    }
  ],
  mastercard: [
    {
      testName: "AMON",
      payload: {
        command: "save_payment_instrument",
        var1: user_credentials,
        var2: "test",
        var3: "CC",
        var4: "CC",
        var5: "test",
        var6: "5506900480000008",
        var7: "05",
        var8: "2025"
      },
      response: {
        status: {numericality: {equalTo: 1}},
        cardToken: {presence: {allowEmpty: false}},
        network_token: {presence: {allowEmpty: false}}
      },
    }
  ]
};
