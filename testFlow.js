const { chromium } = require("playwright");
require("dotenv").config();
const config = require("./config.js");

const pg = require("./paymentGateway/index");

function getPaymentUrl(payload) {
  let baseUrl = `http://localhost:${config.server.port}/payment/initiate?`;
  for (let key in payload) {
    baseUrl += `${key}=${payload[key]}&`;
  }
  console.log(baseUrl);
  return baseUrl;
}

async function startTest({ url, mode, flow, bankcode, payload, response }) {
  const browser = await chromium.launch({
    headless: config.runner.chromium.headless || false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(url);
  // console.log(browser.cpuUsage())
  await page.route("**/*", (route) => {
    return route.request().resourceType() === "image" ||
      route.request().resourceType() === "stylesheet"
      ? route.abort()
      : route.continue();
  });

  let res = await pg({
    page,
    mode,
    context,
    flow,
    bankcode,
    payload,
    response,
  });
  await context.close();
  await browser.close();
  return res.getResult();
}

module.exports = async (testData, mode) =>
  new Promise(async (res) => {
    let report = {
      paymentMode: mode,
      timeTaken: 0,
      testPassed: 0,
      totalTests: 0,
      averageTimePerTest: 0,
      tests:{}
    };

    async function initTest({ payload, response, mode, flow, bankcode }) {
      const url = getPaymentUrl(payload);
      const result = await startTest({
        url,
        mode,
        flow,
        bankcode,
        payload,
        response,
      });
      initializeNestedStructure(flow, mode, bankcode);
      result.testName = bankcode
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
