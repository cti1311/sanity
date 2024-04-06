module.exports = {
  seamless: [
    {
      testName: "DC",
      payload: {
        bankcode: "VISA",
        pg: "DC",
        ccnum: "4111111111111112",
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
