const testResult = require("../../utils/testResult");
const { chromium, expect, errors } = require("playwright");

const upiGen = require("./upi")

module.exports = (page, mode, bankcode) => {
  return upiGen
};