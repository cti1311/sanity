module.exports = {
  nonseamless: [
    {
      testName: "AXIB",
      payload: {
      },
      response: {
        status: "success",
        mode: "NB",
        bankcode: "AXIB"
      }
    }
  ],
  seamless: [
    {
      testName: "AXIB",
      payload: {
        pg: "NB",
        bankcode: "AXIB"
      },
      response: {
        status: "success",
        mode: "NB",
        bankcode: "AXIB"
      }
    }
  ],
  
  s2s: []
};
