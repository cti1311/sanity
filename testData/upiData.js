module.exports = {
  nonseamless: [
    {
      testName: "Collect - 999999999@upi",
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
      testName: "Collect - 999999999@upi",
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
