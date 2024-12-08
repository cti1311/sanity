#! /usr/bin/env node

let runner = require("../testFlow");

const cashData = require("../testData/cashData");
const nbData = require("../testData/nbData");
const upiData = require("../testData/upiData");
const ccData = require("../testData/ccData");
const dcData = require("../testData/dcData");
const emiData = require("../testData/emiData");
const fs = require('fs');
const path = require('path');
let chalk = require("chalk");
const cliProgress = require("cli-progress");
const colors = require("ansi-colors");
// create a new progress bar instance and use shades_classic theme
var Table = require("cli-table");
const pLimit = require('p-limit');
const config = require("../config");
require("dotenv").config();

const limit = pLimit(config.runner.concurrency ?? 1);

(async () => {
  
  let args = process.argv.slice(2);
  if (args.length == 0) throw new Error("No argument found");

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
  // function addAsync(arr){
  //   console.log(arr)
  //   for(const element of arr)
  //     tests.push(limit(()=>new Promise((res)=>res(element)).then((res)=>results.push(res))))
  // }
  for (let mode of args) {
    switch (mode) {
      case "cc":
        tests.push(
          limit(()=>runner(ccData, "CC").then((res) => {
            results.push(res);
            bar1.increment(1);
          }))
        );
        break;
      case "dc":
        tests.push(
          limit(()=>runner(dcData, "DC").then((res) => {
            results.push(res);
            bar1.increment(1);
          }))
        );
        break;
      case "cash":
        tests.push(
          limit(()=>runner(cashData, "CASH").then((res) => {
            results.push(res);
            bar1.increment(1);
          }))
        );
        break;
      case "nb":
        tests.push(
          limit(()=>runner(nbData, "NB").then((res) => {
            results.push(res);
            bar1.increment(1);
          }))
        );
        break;
      case "upi":
        tests.push(
          limit(()=>runner(upiData, "UPI").then((res) => {
            results.push(res);
            bar1.increment(1);
          }))
        );
        break;
      case "emi":
          tests.push(
            limit(()=>runner(emiData, "EMI").then((res) => {
              results.push(res);
              bar1.increment(1);
            }))
          );
          break;
      default:
        throw new Error(`Test Data for mode "${mode}" not present`);
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
  
  fs.writeFileSync(path.join(__dirname,'../result/cli.json'),JSON.stringify(results))
  console.log(table.toString());
  console.log(JSON.stringify(results));
})();
