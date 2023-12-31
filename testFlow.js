const { chromium, expect, errors } = require("playwright");
require("dotenv").config();
const testData = require("./testData");

const cashData = require("./testData/cashData");
const nbData = require("./testData/nbData");
const upiData = require("./testData/upiData");

const ccData = require("./testData/ccData");

const pg = require("./paymentGateway/index");

const testResult = require('./utils/testResult')


function getPaymentUrl(payload) {
  let baseUrl = `http://localhost:${process.env.PORT}/payment/initiate?`;
  for (let key in payload) {
    baseUrl += `${key}=${payload[key]}&`;
  }
  console.log(baseUrl)
  return baseUrl;
}

async function a(testData, mode) {

  let report = {
    paymentMode: mode,
    timeTaken: 0,
    testPassed: 0,
    totalTests: 0,
    averageTimePerTest: 0,
  };

  async function initTest(payload, response, {mode, flow, bankcode}) {

    const result = await startTest(getPaymentUrl(payload), {mode, flow, bankcode});

    initializeNestedStructure(flow, mode, bankcode);

    report[flow][bankcode].push(result);

    updateMetrics(result);
  }

  function initializeNestedStructure(flow, mode, bankcode) {
    report[flow] = report[flow] || {};
    report[flow][bankcode] = report[flow][bankcode] || [];
  }

  function updateMetrics(result) {
    report.timeTaken += result.timeTaken;
    if (result.status) report.testPassed++;
    report.totalTests++;
  }

  function calculateAverageTimePerTest() {
    if (report.totalTests > 0) {
      report.averageTimePerTest = report.timeTaken / report.totalTests;
    }
  }

  let concurrency = 10;
  let tests = [];
  for (let flow in testData) {
    for (let data of testData[flow]) {
      // console.log([data.payload,data.response, mode, flow, data.bankcode])
      tests.push(
        initTest(data.payload, data.response, {mode: mode, flow:flow, bankcode: data.bankcode})
      );
    }
    if (tests.length == concurrency || tests.length >= testData[flow].length) {
      await Promise.all(tests);
      tests = [];
    }
  }

  calculateAverageTimePerTest();

  return report;
}

async function startTest(url, {mode, flow, bankcode} ) {
  
  const browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(url);
  await page.route("**/*", (route) => {
    return route.request().resourceType() === "image" ||
      route.request().resourceType() === "stylesheet"
      ? route.abort()
      : route.continue();
  });

  let res = await pg(page, mode, context, flow, bankcode);

  await browser.close();
  return res.getResult();
}

(async () => {
  let args = process.argv.slice(2);

  if (args.length == 0) throw new Error("No argument found");

  let concurrency = args[0];

  let time = Date.now();

  let tests = [];
  for (let mode of args.slice(1)) {
    switch (mode) {
      case "cc":
        tests.push(a(ccData, "CC").then((res) => console.log(res)));
        break;
      case "cash":
        tests.push(a(cashData, "CASH").then((res) => console.log(res)));
        break;
      case "nb":
        tests.push(a(nbData, "NB").then((res) => console.log(res)))
        break;
      case "upi":
        tests.push(a(upiData, "UPI").then((res) => console.log(JSON.stringify(res))))
        break;
      default:
        throw new Error(`Test Data for mode "${mode}" not present`);
    }
    if (tests.length == concurrency || tests.length >= args.slice(1).length) {
      await Promise.all(tests);
      tests = [];
    }
  }

  console.log(Date.now() - time);
})();
