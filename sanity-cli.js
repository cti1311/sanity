let runner = require('./testFlow');

const cashData = require("./testData/cashData");
const nbData = require("./testData/nbData");
const upiData = require("./testData/upiData");
const ccData = require("./testData/ccData");

(async () => {
  let args = process.argv.slice(2);

  if (args.length == 0) throw new Error("No argument found");

  let concurrency = args[0];

  let time = Date.now();

  let tests = [];
  let results = []
  for (let mode of args.slice(1)) {
    switch (mode) {
      case "cc":
        tests.push(runner(ccData, "CC").then((res) => console.log(JSON.stringify(res))));
        break;
      case "cash":
        tests.push(runner(cashData, "CASH").then((res) => console.log(JSON.stringify(res))));
        break;
      case "nb":
        tests.push(runner(nbData, "NB").then((res) => console.log(JSON.stringify(res))))
        break;
      case "upi":
        tests.push(runner(upiData, "UPI").then((res) => console.log(JSON.stringify(res))))
        break;
      default:
        throw new Error(`Test Data for mode "${mode}" not present`);
    }
    if (tests.length == concurrency || tests.length >= args.slice(1).length) {
      results = await Promise.all(tests);
      // tests = [];
    }
  }

  console.log(Date.now() - time);
  // console.log(JSON.stringify(results))
})();
