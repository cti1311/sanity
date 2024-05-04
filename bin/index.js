#! /usr/bin/env node

let runner = require("../testFlow");

const cashData = require("../testData/cashData");
const nbData = require("../testData/nbData");
const upiData = require("../testData/upiData");
const ccData = require("../testData/ccData");
const dcData = require("../testData/dcData");

let chalk = require("chalk");
const cliProgress = require("cli-progress");
const colors = require("ansi-colors");
// create a new progress bar instance and use shades_classic theme
var Table = require("cli-table");

require("dotenv").config();

(async () => {
  
  let args = process.argv.slice(2);
  if (args.length == 0) throw new Error("No argument found");

  let concurrency = 1;

  let time = Date.now();

  let tests = [];
  let results = [];
  const bar1 = new cliProgress.SingleBar({
    format: "Tests completed | " + colors.cyan("{bar}") + " | {percentage}%",
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
  });

  // start the progress bar with a total value of 200 and start value of 0
  bar1.start(args.length, 0);

  for (let mode of args) {
    switch (mode) {
      case "cc":
        tests.push(
          runner(ccData, "CC").then((res) => {
            results.push(res);
            bar1.increment(1);
          })
        );
        break;
      case "dc":
        tests.push(
          runner(dcData, "DC").then((res) => {
            results.push(res);
            bar1.increment(1);
          })
        );
        break;
      case "cash":
        tests.push(
          runner(cashData, "CASH").then((res) => {
            results.push(res);
            bar1.increment(1);
          })
        );
        break;
      case "nb":
        tests.push(
          runner(nbData, "NB").then((res) => {
            results.push(res);
            bar1.increment(1);
          })
        );
        break;
      case "upi":
        tests.push(
          runner(upiData, "UPI").then((res) => {
            results.push(res);
            bar1.increment(1);
          })
        );
        break;
      default:
        throw new Error(`Test Data for mode "${mode}" not present`);
    }
    if (tests.length == concurrency - 1 ) {
      await Promise.all(tests);
      tests = [];
    }
  }
  await Promise.all(tests);

  bar1.stop();
 
  console.log("Total time taken: " + String(Date.now() - time) + "ms");
  let tables = [];
  for (test of results) {
    let status;
    if (test.testPassed == 0) status = chalk.redBright("FAILED");
    else if (test.testPassed < test.totalTests)
      status = chalk.yellowBright("PARTIALLY PASSED");
    else status = chalk.greenBright("PASSED");
    tables.push([
      test.paymentMode,
      status,
      `${test.testPassed}/${test.totalTests}`,
      `${test.timeTaken}`,
    ]);
  }

  // instantiate
  var table = new Table({
    head: ["Mode", "Status", "Test passed", "Duration (ms)"],
    chars: {
      top: "═",
      "top-mid": "╤",
      "top-left": "╔",
      "top-right": "╗",
      bottom: "═",
      "bottom-mid": "╧",
      "bottom-left": "╚",
      "bottom-right": "╝",
      left: "║",
      "left-mid": "╟",
      mid: "─",
      "mid-mid": "┼",
      right: "║",
      "right-mid": "╢",
      middle: "│",
    },
  });

  table.push(...tables);

  console.log(table.toString());
  console.log(JSON.stringify(results));
})();
