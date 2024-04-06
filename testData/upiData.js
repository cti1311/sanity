module.exports = {
  nonseamless: [
    {
      testName: "UPI",
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
      testName: "UPI",
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
