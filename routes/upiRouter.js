const router = require("express").Router();
const https = require("https");
const axios = require("axios");
const crypto = require("crypto");
const config = {
  key: "Z9fTTa",
  salt: "Dg1S0pmxiXeHhnskrZj2eVROIqXQOZw6",
  apiHost: "test.payu.in",
  apiPath: "/merchant/postservice.php?form=2",
};

const NodeCache = require("node-cache");
const { Axios } = require("axios");
const cache = new NodeCache();

router.post("/verify", async (req, res) => {
  let txnId = req.body.txnRefId;
  console.log(`Verify request::${JSON.stringify(req.body)}`);
  if (cache.has(txnId)) {
    console.log(`Redis cache get::${JSON.stringify(cache.get(txnId))}`);
    res.json(cache.get(txnId));
    return;
  }
  res.json({});
});

router.post("/initiateUpi", async (req, res) => {
  let reqData = req.body;
  console.log(`Request Data::${JSON.stringify(req.body)}`);
  req.body.status = "001";
  req.body.message = "Transaction Initiated Successfully";
  req.body.BID = req.body.txnid;
  res.json(req.body);
  let txnId = req.body.txnid;
  let hash = crypto
    .createHash("SHA512")
    .update(`${config.key}|get_ws_response|${txnId}|${config.salt}`)
    .digest("hex");
  let apiData = await axios
    .post(
      "https://test.payu.in/merchant/postservice.php?form=2",
      `key=${config.key}&command=get_ws_response&var1=${txnId}&hash=${hash}`
    )
    .then((req) => req.data);

  try {
    let vpa = apiData.response.field1;
    reqData.status = "000";
    reqDataBID = reqData.txnid;
    let data = reqData;
    if (vpa == "success@upi") cache.set(txnId, data, 30);
    else if (vpa == "failure@upi") {
      data.status = "002";
      cache.set(txnId, data);
    }
    console.log(`Response Data::${JSON.stringify(data)}`);
  } catch (e) {
    console.log(e);
  }
  let hash1 = crypto
    .createHash("SHA512")
    .update(`${config.key}|verify_payment|${txnId}|${config.salt}`)
    .digest("hex");
  let apiData2 = await axios
    .post(
      "https://test.payu.in/merchant/postservice.php?form=2",
      `key=${config.key}&command=verify_payment&var1=${txnId}&hash=${hash1}`
    )
    .then((req) => req.data);
});

router.post("/statusUpdate", async (req, res) => {
  let txnId = req.body.txnId;
  if (req.body.isPayuId == 1) {
    let hash = crypto
      .createHash("SHA512")
      .update(`${config.key}|verify_payment|${txnId}|${config.salt}`)
      .digest("hex");
    let data = await checkPayment(config, txnId, hash);
    try {
      txnId = data.transaction_details.txnid;
    } catch {}
  }
  let data = {
    merchantName: "PAYU",
    merchantCode: "S1EscuJA98",
    txnCurrency: "INR",
    txnDate: "new Date().toDateString()",
    custName: "Payu-Admin",
    custMobile: "1234567890",
    mode: "VVBJ",
    txnRefId: txnId,
    livemode: "false",
    txnDescription: "Test UPI Transaction",
    BID: req.body.txnId,
    status: "000",
  };
  cache.set(req.body.txnId, data);
  res.json({ status: 1 });
});

const checkPayment = (credes, txnid, hash) => {
  const command = "verify_payment";
  return httpClient(credes.apiHost, credes.apiPath, {
    key: credes.key,
    command: command,
    var1: txnid,
    hash: hash,
  });
};

function httpClient(host, path, postData, type = "POST") {
  if (!host || !path)
    return Promise.reject(
      new PayuErrors.PayuHttpMissingHostorPath(
        `Missing host or path\nHOST: ${host}\nPATH: "${path}"`
      )
    );
  let formBody = "";
  for (let key in postData) {
    formBody += `${encodeURI(key)}=${encodeURI(postData[key])}&`;
  }
  let options = {
    hostname: host,
    port: 443,
    path: path,
    method: type,
    headers: {
      "Content-Type": "routerlication/x-www-form-urlencoded",
      "Content-Length": formBody.length,
    },
  };
  return new Promise((resolve, reject) => {
    let response = "";
    const req = https.request(options, (res) => {
      res.on("data", (chunk) => {
        response += chunk;
      });
      res.on("end", () => {
        try {
          resolve(JSON.parse(response));
        } catch (e) {
          reject(response);
        }
      });
    });
    req.write(formBody);
    req.on("error", (error) => {
      reject(error);
    });
    req.end();
  });
}

module.exports = router;
