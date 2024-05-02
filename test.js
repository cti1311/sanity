
let chalk = require('chalk');

// console.log(chalk.blue('Hello world!'));
let data =[{"paymentMode":"DC","timeTaken":14650,"testPassed":0,"totalTests":2,"averageTimePerTest":7325,"seamless":{"VISA":[{"status":true,"timeTaken":6473,"steps":[{"step":"PG page loaded","status":true,"logs":""},{"step":"OTP submitted","status":true,"logs":""},{"step":"Response validated","status":true,"logs":""}]}]},"nonseamless":{"VISA":[{"status":true,"timeTaken":8177,"steps":[{"step":"UPI loader page loaded","status":true,"logs":""},{"step":"Credentials submitted","status":true,"logs":""},{"step":"Credentials submitted","status":true,"logs":""},{"step":"Credentials submitted","status":true,"logs":""},{"step":"Credentials submitted","status":true,"logs":""},{"step":"PG page loaded","status":true,"logs":""},{"step":"OTP submitted","status":true,"logs":""},{"step":"Response validated","status":true,"logs":""}]}]}},{"paymentMode":"CC","timeTaken":16236,"testPassed":2,"totalTests":2,"averageTimePerTest":8118,"seamless":{"Mastercard":[{"status":true,"timeTaken":7664,"steps":[{"step":"PG page loaded","status":true,"logs":""},{"step":"OTP submitted","status":true,"logs":""},{"step":"Response validated","status":true,"logs":""}]}]},"nonseamless":{"Mastercard":[{"status":true,"timeTaken":8572,"steps":[{"step":"UPI loader page loaded","status":true,"logs":""},{"step":"Credentials submitted","status":true,"logs":""},{"step":"Credentials submitted","status":true,"logs":""},{"step":"Credentials submitted","status":true,"logs":""},{"step":"Credentials submitted","status":true,"logs":""},{"step":"PG page loaded","status":true,"logs":""},{"step":"OTP submitted","status":true,"logs":""},{"step":"Response validated","status":true,"logs":""}]}]}}]

let tables = []
for (test of data){
    let status;
    if(test.testPassed == 0) status = chalk.redBright("FAILED");
    else if(test.testPassed < test.totalTests) status = chalk.yellowBright("PARTIALLY PASSED");
    else status = chalk.greenBright("PASSED");
    tables.push([test.paymentMode,status,`${test.testPassed}/${test.totalTests}`,`${test.timeTaken}`])
}


var Table = require('cli-table');

// instantiate
var table = new Table({
    head: ['Mode', 'Status', 'Test passed', 'Duration (ms)'],
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
           , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
           , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
           , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
  });
  
  table.push(...tables);
  
  console.log(table.toString());