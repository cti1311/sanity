module.exports = {
  nonseamless: [
    {
      testName: "AXIS bank",
      payload: {
        bankcode: "EMIA6",
        amount: 10000,
        ccnum: "5123456789012346",
        ccname: "Kshitij Tomar",
        ccvv: "123",
        ccexpmon: "05",
        ccexpyr: "2025",
      },
      response: {
        status: "success",
        mode: "EMI",
        bankcode: "EMIA6",
      },
    }
  ],
  seamless: [
    {
      testName: "Mastercard",
      payload: {
        pg: "EMI",
        bankcode: "EMIA6",
        amount: 10000,
        ccnum: "5123456789012346",
        ccname: "Kshitij Tomar",
        ccvv: "123",
        ccexpmon: "05",
        ccexpyr: "2025",
      },
      response: {
        status: "success",
        mode: "EMI",
        bankcode: "EMIA6",
      },
    }],
  s2s: [],
};
