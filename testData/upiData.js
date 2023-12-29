module.exports = {
  nonseamless: [
    {
      bankcode: "UPI",
      payload: {
        payload: "999999999@upi"
      },
      response: {
        status: "success",
        mode: "UPI",
        bankcode: "UPI"
      }
    }
  ],
  seamless: [
    {
      bankcode: "UPI",
      payload: {
        pg: "UPI",
        bankcode: "UPI",
        vpa: "9999999999@upi"
      },
      response: {
        status: "success",
        mode: "UPI",
        bankcode: "UPI"
      }
    }
  ],
  s2s: []
};
