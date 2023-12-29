let cashPG = require("./cash/index");
let nbPG = require("./upi/index");
let upiPG = require("./upi/index");
let checkout = require("./checkout/index")
let testResult = require("../utils/testResult")

module.exports = async (page, mode, context, flow, bankcode) => {
  let result = testResult();

  result.startTimer();

  if (flow=="nonseamless") {
    let gen = checkout(page, mode, bankcode)
    let nee = gen(page)

    for await (let itr of nee) {
      result.addStep(...itr);
    }
  }
  let pgGen;
  switch (mode) {
    case "CASH":
      pgGen = checkout();
      break;
    case "NB":
      pgGen = nbPG();
      break;
    case "UPI":
      pgGen = upiPG()
      break;
  }
  pgGen = pgGen(page, context)
  for await (let itr of pgGen) {
    result.addStep(...itr);
  }

  result.stopTimer();
  
  return result;
};
