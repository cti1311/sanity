module.exports = {
  nonseamless: [
    {
      testName: "AMON",
      payload: {
      },
      response: {
        status: "success",
        mode: "CASH",
        bankcode: "AMON",
      },
    }
  ],
  seamless: [
    {
      testName: "AMON",
      payload: {
        pg: "CASH",
        bankcode: "AMON"
      },
      response: {
        status: "success",
        mode: "CASH",
        bankcode: "AMON",
      },
    }
  ],
  s2s: [],
};
