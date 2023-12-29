const upiGen = require("./upi");
const cashGen = require("./cash");

module.exports = (mode) => {
  switch (mode) {
    case "UPI":
      return upiGen;
    case "CASH":
      return cashGen;
  }
};