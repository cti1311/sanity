module.exports = {
  nonseamless: [
    {
      testName: "Mastercard",
      payload: {
        ccnum: "5123456789012346",
        ccname: "Kshitij Tomar",
        ccvv: "123",
        ccexpmon: "05",
        ccexpyr: "2025"
      },
      response: {
        status: "success",
        mode: "CC",
        bankcode: "CC",
      },
    },{
      testName: "VISA",
      payload: {
        ccnum: "4012001037141112",
        ccname: "Kshitij Tomar",
        ccvv: "123",
        ccexpmon: "05",
        ccexpyr: "2025"
      },
      response: {
        status: "success",
        mode: "CC",
        bankcode: "CC",
      },
    }
  ],
  seamless: [
    {
      testName: "Mastercard",
      payload: {
        pg: "CC",
        bankcode: "CC",
        ccnum: "5123456789012346",
        ccname: "Kshitij Tomar",
        ccvv: "123",
        ccexpmon: "05",
        ccexpyr: "2025"
      },
      response: {
        status: "success",
        mode: "CC",
        bankcode: "CC",
      },
    },
    {
      testName: "VISA",
      payload: {
        pg: "CC",
        bankcode: "CC",
        ccnum: "4012001037141112",
        ccname: "Kshitij Tomar",
        ccvv: "123",
        ccexpmon: "05",
        ccexpyr: "2025"
      },
      response: {
        status: "success",
        mode: "CC",
        bankcode: "CC",
      },
    }
  ],
  
  s2s: [],
};
