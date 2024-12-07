module.exports = {
  nonseamless: [
    {
      testName: "VISA",
      payload: {
        ccnum: "4594538050639999",
        ccname: "Kshitij Tomar",
        ccvv: "123",
        ccexpmon: "05",
        ccexpyr: "2025"
      },
      response: {
        status: "success",
        mode: "DC",
      },
    },
    {
      testName: "Mastercard",
      payload: {
        ccnum: "5118700000000003",
        ccname: "Kshitij Tomar",
        ccvv: "123",
        ccexpmon: "05",
        ccexpyr: "2025"
      },
      response: {
        status: "success",
        mode: "DC",
      },
    }
  ],
  seamless: [
    {
      testName: "VISA",
      payload: {
        bankcode: "VISA",
        pg: "DC",
        ccnum: "4594538050639999",
        ccname: "Kshitij Tomar",
        ccvv: "123",
        ccexpmon: "05",
        ccexpyr: "2025"
      },
      response: {
        status: "success",
        mode: "DC",
      },
    },
    {
      testName: "Mastercard",
      payload: {
        bankcode: "MAST",
        pg: "DC",
        ccnum: "5118700000000003",
        ccname: "Kshitij Tomar",
        ccvv: "123",
        ccexpmon: "05",
        ccexpyr: "2025"
      },
      response: {
        status: "success",
        mode: "DC",
      },
    }
  ],
  s2s: [],
};
