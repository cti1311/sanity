const upiConstant = require('./constant.js')
const crypto = require('crypto');
const util = require('./util.js')
const express = require('express')
const route = express.Router();
const NodeRSA = require('node-rsa');
const upi = require('./UPI.js')
const upiResponse = require('./upiResponse.js')
const axios = require('axios')

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
    var respEncKey= upiConstant.icici_private.decrypt(request.encryptedKey, 'utf8');
    console.log(respEncKey)
    var decryptedText = aesDecrypt(upiConstant.Algo.AES_128_CBC,respEncKey,'binary',request.iv,'base64',true,request.encryptedData,'base64','utf8');
    return decryptedText;
}

route.post("/", async (req, res, next) => {
    var response, requestBody, result, responseParams;
    requestBody = req.body;
    console.log(requestBody)
    var receivedParams = JSON.parse(await decryptForICICISI(requestBody));
    
            response = await encryptForICICISI(receivedParams);
            console.log(response)
        // res.status(200).send(response);
    // }
    // else {
    //     responseParams = await upiResponse.returnResponse("IciciSiEmptyRedis", receivedParams, result, txnStatusCode, "NA", "NA", "NA", "NA");
    //     res.status(422).send(responseParams);
    // }
   
    axios({
        method: 'post',
        url: 'https://simulator.payubiz.in/upi/iciciSi/RevokeMandateIcici',
        headers: {'Content-Type' : 'application/json'},
        body: response
    }).then((res)=>console.log(res))
})

module.exports = route;

// revokeMandate({"merchantId":"401195","subMerchantId":"401195","terminalId":null,"merchantName":"payu","subMerchantName":"payu","payerVa":"kk@okaxis","amount":"200.00","collectByDate":"15\/xx/xxxx 10:16 PM","merchantTranId":"403993715532214479R66e70cf0e469b","billNumber":403993715532214479,"note":"UPI AutoPay Mandate","requestType":"R","validityStartDate":"04\/xx/xxxx","validityEndDate":"02\/xx/xxxx","amountLimit":"M","frequency":"AS","remark":"Upi Mandate","autoExecute":"N","debitDay":"NA","debitRule":"NA","revokable":"Y","blockfund":"N","purpose":"RECURRING","UMN":"403993715532214479"})