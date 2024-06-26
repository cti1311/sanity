let cashPG = require("./cash/index");
let nbPG = require("./nb/index");
let upiPG = require("./upi/index");
let checkout = require("./checkout/index");
let cardPg = require("./cards/index");
let testResult = require("../utils/testResult");

module.exports = async ({
  page,
  mode,
  context,
  flow,
  bankcode,
  payload,
  response,
}) => {
  let result = testResult();

  result.startTimer();
  // // console.log(mode);
  if (flow == "nonseamless") {
    let gen = checkout(mode);
    let nee = gen({ page, bankcode, payload });

    for await (let itr of nee) {
      result.addStep(...itr);
    }
  }

  if (result.getResult().status) {
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
  }

  // // console.log(result.getResult());
  // Check the existing step status and continue with resposne validation
  if (result.getResult().status) {
    try {
      await page.waitForURL("http://localhost:3000/payment/response", {
        timeout: 45000,
      });
      let pgResposne = await page.locator("body > pre").textContent();
      let rs = ["Response validated", true, ""];
      pgResposne = JSON.stringify(pgResposne);
      for (let property in response) {
        if (payload[property] != pgResposne[property]) {
          rs[1] = false;
          break;
        }
      }
      result.addStep(...rs);
    } catch(e){
      // console.log(e)
      result.addStep("Response validated", false, String(e));
    }
  }

  result.stopTimer();
  return result;
};
