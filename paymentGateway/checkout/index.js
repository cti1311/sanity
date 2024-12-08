const nbGen = require("./nb");
const upiGen = require("./upi");
const cashGen = require("./cash");
const cardsGen = require("./cards");
const emiGen = require("./emi")

module.exports = (mode) => {
  switch (mode) {
    case "CC":
      return cardsGen;
    case "DC":
        return cardsGen;
    case "UPI":
      return upiGen;
    case "CASH":
      return cashGen;
    case "NB":
        return nbGen;
    case "EMI":
      return emiGen;
  }
};