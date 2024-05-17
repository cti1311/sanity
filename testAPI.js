const { chromium } = require("playwright");
require("dotenv").config();
const config = require("./config.js");
let testResult = require("./utils/testResult");
let apiClient = require("./utils/apiClient.js");
const crypto = require("crypto");
const urlencode = require("form-urlencoded");
const { start } = require("repl");
let user_credentials = `${config.payu.creds.key}:${Math.floor(
  Math.random() * 10000000
)}`;

const validated = require("validate.js");

function getHash(creds, data) {
  const hash = crypto.createHash("sha512");
  return hash
    .update(`${creds.key}|${data.command}|${data.var1}|${creds.salt}`)
    .digest("hex");
}

async function startTest({ mode, flow, bankcode, payload, response }) {
  let result = testResult();
  result.startTimer();
  let hash = getHash(config.payu.creds, payload);
  payload.key = config.payu.creds.key;
  payload.hash = hash;
  let { data } = await apiClient.post(
    "https://test.payu.in/merchant/postservice?form=2",
    payload,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  if (typeof data == "object")
    result.addStep("Response resceived", true, String(JSON.stringify(data)));
  else {
    result.addStep("Response validated", false, String(data));
    return result.getResult();
  }
  let validation = validated(data, response);
  console.log(response)
  if (validation == undefined) {
    result.addStep("Response validated", true, String(""));
  } else {
    result.addStep("Response validated", false, String(JSON.stringify(validation)));
  }
//   console.log(result.getResult());
  return result.getResult();
}

// console.log(
//   startTest({
//     payload: {
//       command: "save_payment_instrument",
//       var1: user_credentials,
//       var2: "test",
//       var3: "CC",
//       var4: "CC",
//       var5: "test",
//       var6: "5123456789012346",
//       var7: "05",
//       var8: "2025",
//     },
//     response: {
//       status: { numericality: { equalTo: 1 } },
//       cardToken: { presence: { allowEmpty: false } },
//       network_token: { presence: { allowEmpty: false } },
//     },
//   })
// );

module.exports = async (testData, mode) =>
  new Promise(async (res) => {
    let report = {
      paymentMode: mode,
      timeTaken: 0,
      testPassed: 0,
      totalTests: 0,
      averageTimePerTest: 0,
      tests: {},
    };

    async function initTest({ payload, response, mode, flow, bankcode }) {
      const result = await startTest({
        mode,
        flow,
        bankcode,
        payload,
        response,
      });
      initializeNestedStructure(flow, mode, bankcode);
      result.testName = bankcode;
      report.tests[flow].push(result);
      updateMetrics(result);
    }

    function initializeNestedStructure(flow, mode, bankcode) {
      report.tests[flow] = report.tests[flow] || [];
      report.tests[flow][bankcode] = report.tests[flow][bankcode] || [];
    }

    function updateMetrics(result) {
      report.timeTaken += result.timeTaken;
      if (result.status) report.testPassed++;
      report.totalTests++;
    }

    let concurrency = 1;
    let tests = [];
    for (let flow in testData) {
      for (let data of testData[flow]) {
        // // console.log([data.payload,data.response, mode, flow, data.bankcode])
        tests.push(
          initTest({
            payload: data.payload,
            response: data.response,
            mode: mode,
            flow: flow,
            bankcode: data.testName,
          })
        );
        if (tests.length == concurrency) {
          await Promise.all(tests);
          tests = [];
        }
      }
    }
    await Promise.all(tests);
    // Add average time taken by the all the tests to the final report
    if (report.totalTests > 0) {
      report.averageTimePerTest = report.timeTaken / report.totalTests;
    }
    res(report);
  });
