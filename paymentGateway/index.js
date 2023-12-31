let cashPG = require("./cash/index");
let nbPG = require("./upi/index");
let upiPG = require("./upi/index");
let checkout = require("./checkout/index");
let cardPg = require("./cards/index");
let testResult = require("../utils/testResult");

module.exports = async (page, mode, context, flow, bankcode) => {
  let result = testResult();

  result.startTimer();
  console.log(mode);
  if (flow == "nonseamless") {
    let gen = checkout(mode);
    let nee = gen(page, bankcode);

    for await (let itr of nee) {
      result.addStep(...itr);
    }
  }
  if (!result.getResult().status) return result;

  let pgGen;
  switch (mode) {
    case "CC":
      pgGen = cardPg();
      break;
    case "DC":
      pgGen = cardPg();
      break;
    case "CASH":
      pgGen = cashPG();
      break;
    case "NB":
      pgGen = nbPG();
      break;
    case "UPI":
      pgGen = upiPG();
      break;
  }
  pgGen = pgGen(page, context);
  for await (let itr of pgGen) {
    result.addStep(...itr);
  }

  result.stopTimer();

  return result;
};
