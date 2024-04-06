module.exports = {
  CASH: {
    nonseamless: [
      {
        testName: "AMON",
        payload: {},
        response: {
          status: "success",
          mode: "CASH",
          bankcode: "AMON",
        },
      },
    ],
    s2s: [],
  },
  CC: {
    nonseamless: [
      {
        testName: "CC",
        payload: {
          ccnum: "5123456789012346",
          ccname: "Kshitij Tomar",
          ccvv: "123",
          ccexpmon: "05",
          ccexpyr: "2025",
        },
        response: {
          status: "success",
          mode: "CC",
          bankcode: "CC",
        },
      },
    ],

    s2s: [],
  },
  DC: {
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
          ccexpyr: "2025",
        },
        response: {
          status: "success",
          mode: "DC",
          bankcode: "DC",
        },
      },
    ],
    s2s: [],
  },
  NB: {
    nonseamless: [
      {
        testName: "AXIB",
        payload: {},
        response: {
          status: "success",
          mode: "NB",
          bankcode: "AXIB",
        },
      },
    ],
    seamless: [
      {
        testName: "AXIB",
        payload: {},
        response: {
          status: "success",
          mode: "NB",
          bankcode: "AXIB",
        },
      },
    ],

    s2s: [],
  },
  UPI: {
    nonseamless: [
      {
        testName: "UPI",
        payload: {
          payload: "999999999@upi",
        },
        response: {
          status: "success",
          mode: "UPI",
          bankcode: "UPI",
        },
      },
    ],
    seamless: [
      {
        testName: "UPI",
        payload: {
          pg: "UPI",
          bankcode: "UPI",
          vpa: "9999999999@upi",
        },
        response: {
          status: "success",
          mode: "UPI",
          bankcode: "UPI",
        },
      },
    ],
    s2s: [],
  },
};
