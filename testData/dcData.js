module.exports = {
  nonseamless: [
    {
      testName: "VISA",
      payload: {
        ccnum: "4111111111111111",
        ccname: "Kshitij Tomar",
        ccvv: "123",
        ccexpmon: "05",
        ccexpyr: "2025"
      },
      response: {
        status: "success",
        mode: "DC",
        bankcode: "DC",
      },
    }
  ],
  seamless: [
    {
      testName: "VISA",
      payload: {
        bankcode: "VISA",
        pg: "DC",
        ccnum: "4111111111111111",
        ccname: "Kshitij Tomar",
        ccvv: "123",
        ccexpmon: "05",
        ccexpyr: "2025"
      },
      response: {
        status: "success",
        mode: "DC",
        bankcode: "DC",
      },
    }
  ],
  s2s: [],
};
