const upiConstant = require('./constant')
const crypto = require('crypto');
const util = require('./util.js')
const express = require('express')
const route = express.Router();
const NodeRSA = require('node-rsa');
const upi = require('./UPI.js')
const upiResponse = require('./upiResponse')

function aesEncrypt(algo, encKey, keyEncoding, iv,ivEncoding, padding, data, dataEncoding, outputEncoding) {
    var cipher = crypto.createCipheriv(algo, new Buffer(encKey, keyEncoding), new Buffer(iv,ivEncoding)).setAutoPadding(padding);
    var response = cipher.update(data.toString(), dataEncoding, outputEncoding);
    response += cipher.final(outputEncoding);
    return response
}

function aesDecrypt(algo, encKey, keyEncoding, iv, ivEncoding, padding, data, dataEncoding, outputEncoding) {
    var decipher = crypto.createDecipheriv(algo, new Buffer(encKey, keyEncoding), new Buffer(iv, ivEncoding)).setAutoPadding(padding);
    var response = decipher.update(data.toString(), dataEncoding, outputEncoding);
    response += decipher.final(outputEncoding);
    return response;
  }

  async function encryptForICICISI(response)
  {
      const encKey = util.generateRandom(16,'#');
      const encryptedKey = upiConstant.icicisi_public.encrypt(encKey,'base64');
      const iv = crypto.randomBytes(16).toString('binary');
      const encryptedText = aesEncrypt(upiConstant.Algo.AES_128_CBC, encKey, 'utf8', iv, 'binary', true, JSON.stringify(response), 'utf8', 'binary');
      console.log(encryptedText)
      const encryptedData = Buffer.concat([Buffer.from(iv, 'binary'), Buffer.from(encryptedText, 'binary')]).toString('base64');
      var response={
          "requestId": "",
          "service": "UPI",
          "encryptedKey": encryptedKey,
          "oaepHashingAlgorithm": "NONE",
          "iv": "",
          "encryptedData": encryptedData,
          "clientInfo": "",
          "optionalParam": ""
      };
      return response;
  }

async function decryptForICICISI(request) {
    var respEncKey= upiConstant.icicikey_private.decrypt(request.encryptedKey, 'utf8');
    console.log(respEncKey)
    var decryptedText = aesDecrypt(upiConstant.Algo.AES_128_CBC,respEncKey,'binary',request.iv,'base64',true,request.encryptedData,'base64','utf8');
    return decryptedText;
}

route.post("/mandateNotify", async (req, res, next) => {
    let response, requestBody;
    requestBody = req.body;
    console.log(requestBody)
    let receivedParams = JSON.parse(await decryptForICICISI(requestBody));
    let responseParams = { response: "0", merchantId: receivedParams.merchantId, subMerchantId: receivedParams.subMerchantId, terminalId: receivedParams.terminalId, success: "true", message: "Transaction Successful", merchantTranId: "21293899416pre" + Math.floor(Math.random()*10000000), BankRRN: Math.floor(Math.random()*1000000000) }
    response = await encryptForICICISI(responseParams);
    console.log(response)
    res.status(200).send(response);
})

route.post("/", async (req, res, next) => {
    var response, requestBody, result, responseParams;
    requestBody = req.body;
    console.log(requestBody)
    var receivedParams = JSON.parse(await decryptForICICISI(requestBody));
    var payuId = receivedParams.billNumber;
    if (payuId.length > 20)
        response = await upiResponse.returnResponse("InvalidPayuIdLength");
    var revokeAmt = receivedParams.amount;
    console.log(receivedParams)
    // var isValidMerchant = await upi.isValidMerchant(receivedParams.merchantId, upiConstant.icicimerchantVPAs, upiConstant.Bank.ICICI);
    // if (isValidMerchant != true)
        // res.status(200).send(isValidMerchant);
    // result = await upi.validateUpiRequest(receivedParams, "iciciSiRevoke", "NA", receivedParams.merchantId, upiConstant.icicimerchantVPAs, upiConstant.Bank.ICICI, payuId, res, "Notify", "iciciSiRevoke", req);
    // if (upi.arrayValuesNotEmpty(result)) {
        var txnStatusCode = 0;
        // if (receivedParams.amount.toString() === "127.00") {
        //     response = await upiResponse.returnResponse("IncorrectEncryptedResponse");
        // }
        // else if (receivedParams.amount.toString() === "131.00") {
        //     response = await upiResponse.returnResponse("IncorrectFormatResponse");
        // }
        // else {
            // if (revokeAmt > 150) {
                responseParams = await upiResponse.returnResponse("IciciSiRevokeResponse", receivedParams, result, txnStatusCode, "NA", "NA", "NA", "NA");
            // }
            // else {
            //     responseParams = await upiResponse.returnResponse("IciciSiRevokeResponseFail", receivedParams, result, txnStatusCode, "NA", "NA", "NA", "NA");
            // }
            response = await encryptForICICISI(responseParams);
            console.log(response)
        // }
        res.status(200).send(response);
    // }
    // else {
    //     responseParams = await upiResponse.returnResponse("IciciSiEmptyRedis", receivedParams, result, txnStatusCode, "NA", "NA", "NA", "NA");
    //     res.status(422).send(responseParams);
    // }
    // if (upiConstant.sendCallbackFlag === 'true') {
    //     request = {
    //         "url": upiConstant.ICICISItestEnvUrl,
    //         "payuId": payuId,
    //         "method": "POST"
    //     }
    //     upi.returnCallback(request, res, next);
    // }

})

module.exports = route;

// revokeMandate({"merchantId":"401195","subMerchantId":"401195","terminalId":null,"merchantName":"payu","subMerchantName":"payu","payerVa":"kk@okaxis","amount":"200.00","collectByDate":"15\/xx/xxxx 10:16 PM","merchantTranId":"403993715532214479R66e70cf0e469b","billNumber":403993715532214479,"note":"UPI AutoPay Mandate","requestType":"R","validityStartDate":"04\/xx/xxxx","validityEndDate":"02\/xx/xxxx","amountLimit":"M","frequency":"AS","remark":"Upi Mandate","autoExecute":"N","debitDay":"NA","debitRule":"NA","revokable":"Y","blockfund":"N","purpose":"RECURRING","UMN":"403993715532214479"})