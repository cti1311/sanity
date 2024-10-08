var logger = require('../../logger'),
    qs = require('querystring'),
    crypto = require('crypto'),
    redis = require('../../util/redis'),
    upi = require('./UPI'),
    util = require('../../util/util'),
    upiConstant = require('./UpiConstants'),
    upiResponse = require('./upiResponse'),
    icicites = require('../UPI/Icicites');

var icici_Si= {

    encryptForICICISI : encryptForICICISI,

    createMandateIcici : async function(req, res ,next)
    {
        var response,requestBody;
        requestBody=req.body;
        var receivedParams =JSON.parse( await decryptForICICISI(requestBody));
        var payuId = receivedParams.merchantTranId;

        if(payuId.length > 20)
        {
            response = await upiResponse.returnResponse("InvalidPayuIdLength");
        }
        var isValidMerchant = await upi.isValidMerchant(receivedParams.merchantId, upiConstant.icicimerchantVPAs, upiConstant.Bank.ICICI);
        if(isValidMerchant != true)
        {
            res.status(200).send(isValidMerchant);
        }
        responseParams = await upi.validateUpiRequest(receivedParams,"iciciSiCollect",receivedParams.payerVa,requestBody.merchantId,upiConstant.icicimerchantVPAs,upiConstant.Bank.ICICI,payuId,res,"Collect","NA",req);
        if(responseParams.message != "New transaction")
        {
            res.status(422).send(responseParams);
        }
        else if(receivedParams.amount.toString() === "127.00")
        {
            response = await upiResponse.returnResponse("IncorrectEncryptedResponse");
        }
        else if(receivedParams.amount.toString() === "131.00") {
            response = await upiResponse.returnResponse("IncorrectFormatResponse");
        }
        else {
            var collectTxnId = icicites.generateUpiTxnId();
            var custRefNumber = Math.floor(collectTxnId / 2);
            var rrnId = icicites.generateUpiRrn();
            upi.setValueInRedis(payuId, receivedParams.payerVa, receivedParams.amount, receivedParams.note, collectTxnId, upiConstant.startTime, "92", rrnId, custRefNumber, "uber@icici", receivedParams.merchantId,receivedParams.validityStartDate,receivedParams.validityEndDate,'','CREATE','','','','','','','',receivedParams.terminalId);
            responseParams = await upiResponse.returnResponse("IciciSiSuccessCollectResponse", receivedParams, "NA", "NA", "NA", "NA", rrnId, "NA");
            logger.info("Response final:" + JSON.stringify(responseParams));
            response = await encryptForICICISI(responseParams);
        }
        res.status(200).send(response);
        if (upiConstant.sendCallbackFlag === 'true') {
            request = {
                "url": upiConstant.ICICISItestEnvUrl,
                "payuId": payuId,
                "method": "POST"
            }
            var txnStatus;
            if(receivedParams.amount > 50)
            {
                txnStatus = "00";
            }
            else
            {
                txnStatus = "5004";
            }
            var data = [
                {key: "txnStatusCode", value: txnStatus, expiry: upiConstant.txnExpiry}];
            upi.setKeysInRedis(payuId, data);
            upi.returnCallback(request, res, next);
        }
    },

    intentMandateIcici : async function(req, res ,next)
    {
        var response,requestBody;
        requestBody=req.body;
        var receivedParams =JSON.parse( await decryptForICICISI(requestBody));
        var payuId = receivedParams.merchantTranId;
        if(payuId.length > 20)
        {
            response = await upiResponse.returnResponse("InvalidPayuIdLength");
        }
        var isValidMerchant = await upi.isValidMerchant(receivedParams.merchantId, upiConstant.icicimerchantVPAs, upiConstant.Bank.ICICI);
        if(isValidMerchant != true)
        {
            res.status(200).send(isValidMerchant);
        }
        responseParams = await upi.validateUpiRequest(receivedParams,"iciciSiCollect",receivedParams.payerVa,requestBody.merchantId,upiConstant.icicimerchantVPAs,upiConstant.Bank.ICICI,payuId,res,"Intent","NA",req);
        if(responseParams.message != "New transaction")
        {
            res.status(422).send(responseParams);
        }
        else if(receivedParams.amount.toString() === "127.00")
        {
            response = await upiResponse.returnResponse("IncorrectEncryptedResponse");
        }
        else if(receivedParams.amount.toString() === "131.00") {
            response = await upiResponse.returnResponse("IncorrectFormatResponse");
        }
        else {
            var collectTxnId = icicites.generateUpiTxnId();
            var custRefNumber = Math.floor(collectTxnId / 2);
            var rrnId = icicites.generateUpiRrn();
            upi.setValueInRedis(payuId,"ps@paytm", receivedParams.amount, receivedParams.note, collectTxnId, upiConstant.startTime, "92", rrnId, custRefNumber, "uber@icici", receivedParams.merchantId,receivedParams.validityStartDate,receivedParams.validityEndDate,'','CREATE','','','','','','','',receivedParams.terminalId);
            responseParams = await upiResponse.returnResponse("IciciSiIntentResponse", receivedParams, "NA", "NA", "NA", "NA", rrnId, "NA");
            logger.info("Response final:" + JSON.stringify(responseParams));
            response = await encryptForICICISI(responseParams);
        }
        res.status(200).send(response);

        if (upiConstant.sendCallbackFlag === 'true') {
            request = {
                "url": upiConstant.ICICISItestEnvUrl,
                "payuId": payuId,
                "method": "POST"
            }
            var txnStatus;
            if(receivedParams.amount > 50)
            {
                txnStatus = "00";
            }
            else
            {
                txnStatus = "5004";
            }
            var data = [
                {key: "txnStatusCode", value: txnStatus, expiry: upiConstant.txnExpiry}];
            upi.setKeysInRedis(payuId, data);
            upi.returnCallback(request, res, next);
        }
    },

    MandateStatusIcici :  async function(req, res ,next)
    {
        var response,requestBody,result,responseParams;
        requestBody=req.body;
        var receivedParams =JSON.parse( await decryptForICICISI(requestBody));
        var payuId = receivedParams.merchantTranId;
        if(receivedParams.merchantTranId.toString().includes("exec"))
            payuId = receivedParams.merchantTranId.toString().replace('exec','');
        if(payuId.length > 20)
            response = await upiResponse.returnResponse("InvalidPayuIdLength");
        var isValidMerchant = await upi.isValidMerchant(receivedParams.merchantId, upiConstant.icicimerchantVPAs, upiConstant.Bank.ICICI);
        if(isValidMerchant != true)
            res.status(200).send(isValidMerchant);
        result = await upi.validateUpiRequest(receivedParams,"iciciSiVerify","NA",receivedParams.merchantId,upiConstant.icicimerchantVPAs,upiConstant.Bank.ICICI,payuId,res,"Verify","iciciSIVerify",req);
            if (upi.arrayValuesNotEmpty(result))
        {
            var txnStatusCode = result[2][0];
            if(result[5].toString() === "127.00")
            {
                response = await upiResponse.returnResponse("IncorrectEncryptedResponse");
            }
           else if(result[5].toString()=== "131.00")
            {
                response = await upiResponse.returnResponse("IncorrectFormatResponse");
            }
           else if(!receivedParams.merchantTranId.toString().includes("exec")) {
                responseParams = await upiResponse.returnResponse("IciciSiCreateVerifySuccessResponse", receivedParams, result, txnStatusCode, "NA", "NA", "NA", "NA");
                response = await encryptForICICISI(responseParams);
            }
           else {
                responseParams = await upiResponse.returnResponse("IciciSiExecuteVerifySuccessResponse", receivedParams, result, txnStatusCode, "NA", "NA", "NA", "NA");
                response = await encryptForICICISI(responseParams);
            }

            res.status(200).send(response);
        }
        else {
            responseParams = await upiResponse.returnResponse("IciciSiEmptyRedis",receivedParams,result,txnStatusCode,"NA","NA","NA","NA");
            res.status(422).send(responseParams);
        }
    },
    executeMandateIcici : async function(req, res ,next)
    {
    var response,requestBody,debitAmount,responseParams,txnStatusCode;
        requestBody=req.body;
        var receivedParams =JSON.parse( await decryptForICICISI(requestBody));
        var payuId = receivedParams.UMN;
        var newId = receivedParams.billNumber;
        if(payuId.length > 20)
        {
            response = await upiResponse.returnResponse("InvalidPayuIdLength");
        }
        var isValidMerchant = await upi.isValidMerchant(receivedParams.merchantId, upiConstant.icicimerchantVPAs, upiConstant.Bank.ICICI);
        if(isValidMerchant != true)
        {
            res.status(200).send(isValidMerchant);
        }
        debitAmount = receivedParams.amount;
    logger.info("Debit Amount is ---- "+debitAmount);
        if (upiConstant.sendCallbackFlag == "true")
            {
                if (debitAmount >= 100)
                {
                    logger.info("debitAmount >= 100");
                    txnStatusCode = "00";
                }
                else
                    {
                        logger.info("debitAmount < 100");
                    txnStatusCode = "5004";
                    }
            }
            else
         txnStatusCode ="92";
        var data = [
            {key: "debitAmount", value: debitAmount, expiry: upi.txnExpiry},
            {key: "txnStatusCode", value: txnStatusCode, expiry: upiConstant.txnExpiry},
            {key: "action_type", value: "RECUR_PAY", expiry: upiConstant.txnExpiry},
            {key: "remarks", value: newId, expiry: upiConstant.txnExpiry},

        ];
        upi.setKeysInRedis(payuId, data);
        result = await upi.validateUpiRequest(receivedParams,"iciciSiRecurrPay","NA",requestBody.pgMerchantId,upiConstant.icicimerchantVPAs,upiConstant.Bank.ICICI,payuId,res,"Execute","iciciSiRecur",req);
            if (upi.arrayValuesNotEmpty(result))
            {
                var txnStatusCode = result[2] ? result[2] : 'U69';
                responseParams = await upiResponse.returnResponse("IciciSiExecuteSuccessResponse",receivedParams,result,txnStatusCode,"NA","NA","NA","NA");
            }

        response = await encryptForICICISI(responseParams);
        res.status(200).send(response);
        if (upiConstant.sendCallbackFlag === 'true')
            {
                request = {
                    "url": upiConstant.ICICISItestEnvUrl,
                    "payuId": payuId,
                    "method": "POST"
                }

                upi.setKeysInRedis(payuId, data);
                upi.returnCallback(request, res, next);
            }
    },

    NotifyMandate :  async function(req, res ,next)
    {
        var response,requestBody,result,responseParams;
        requestBody=req.body;
        var receivedParams =JSON.parse( await decryptForICICISI(requestBody));
        var payuId = receivedParams.value;
        if(payuId.length > 20)
            response = await upiResponse.returnResponse("InvalidPayuIdLength");
        var isValidMerchant = await upi.isValidMerchant(receivedParams.merchantId, upiConstant.icicimerchantVPAs, upiConstant.Bank.ICICI);
        if(isValidMerchant != true)
            res.status(200).send(isValidMerchant);
        result = await upi.validateUpiRequest(receivedParams,"iciciSiNotify","NA",receivedParams.merchantId,upiConstant.icicimerchantVPAs,upiConstant.Bank.ICICI,payuId,res,"Notify","iciciSiNotify",req);
        if (upi.arrayValuesNotEmpty(result)) {
            var txnStatusCode = result[2][0];
            if(receivedParams.amount.toString() === "127.00")
            {
                response = await upiResponse.returnResponse("IncorrectEncryptedResponse");
            }
            else if(receivedParams.amount.toString()=== "131.00")
            {
                response = await upiResponse.returnResponse("IncorrectFormatResponse");
            }
            else
            {
                responseParams = await upiResponse.returnResponse("IciciSiNotifyResponse", receivedParams, result, txnStatusCode, "NA", "NA", "NA", "NA");
                response = await encryptForICICISI(responseParams);
            }
            res.status(200).send(response);
        }
        else {
            responseParams = await upiResponse.returnResponse("IciciSiEmptyRedis",receivedParams,result,txnStatusCode,"NA","NA","NA","NA");
            res.status(422).send(responseParams);
        }
    },

    RevokeMandate : async function(req, res ,next)
    {
        var response,requestBody,result,responseParams;
        requestBody=req.body;
        var receivedParams =JSON.parse( await decryptForICICISI(requestBody));
        var payuId = receivedParams.billNumber;
        if(payuId.length > 20)
            response = await upiResponse.returnResponse("InvalidPayuIdLength");
        var revokeAmt=receivedParams.amount;
        var isValidMerchant = await upi.isValidMerchant(receivedParams.merchantId, upiConstant.icicimerchantVPAs, upiConstant.Bank.ICICI);
        if(isValidMerchant != true)
            res.status(200).send(isValidMerchant);
        result = await upi.validateUpiRequest(receivedParams,"iciciSiRevoke","NA",receivedParams.merchantId,upiConstant.icicimerchantVPAs,upiConstant.Bank.ICICI,payuId,res,"Notify","iciciSiRevoke",req);
        if (upi.arrayValuesNotEmpty(result))
        {
            var txnStatusCode = result[2][0];
            if(receivedParams.amount.toString() === "127.00")
            {
                response = await upiResponse.returnResponse("IncorrectEncryptedResponse");
            }
            else if(receivedParams.amount.toString()=== "131.00")
            {
                response = await upiResponse.returnResponse("IncorrectFormatResponse");
            }
            else
            {
                if (revokeAmt > 150)
                {
                    responseParams = await upiResponse.returnResponse("IciciSiRevokeResponse", receivedParams, result, txnStatusCode, "NA", "NA", "NA", "NA");
                }
                else
                {
                    responseParams = await upiResponse.returnResponse("IciciSiRevokeResponseFail",receivedParams,result,txnStatusCode,"NA","NA","NA","NA");
                }
                response = await encryptForICICISI(responseParams);
            }
            res.status(200).send(response);
        }
        else {
            responseParams = await upiResponse.returnResponse("IciciSiEmptyRedis",receivedParams,result,txnStatusCode,"NA","NA","NA","NA");
            res.status(422).send(responseParams);
        }
        if (upiConstant.sendCallbackFlag === 'true') {
            request = {
                "url": upiConstant.ICICISItestEnvUrl,
                "payuId": payuId,
                "method": "POST"
            }
            upi.returnCallback(request, res, next);
        }

    },
    ModifyApi : async function (req, res, next) {
        var response, requestBody,result, txnStatusCode,endDate;
        requestBody = req.body;
        var receivedParams =JSON.parse( await decryptForICICISI(requestBody));
        var payuId = receivedParams.billNumber;
        if(payuId.length > 20)
            response = await upiResponse.returnResponse("InvalidPayuIdLength");
        var modifiedAmt=receivedParams.amount;
        var isValidMerchant = await upi.isValidMerchant(receivedParams.merchantId, upiConstant.icicimerchantVPAs, upiConstant.Bank.ICICI);
        if(isValidMerchant != true)
        {
            res.status(200).send(isValidMerchant);
        }
        result = await upi.validateUpiRequest(receivedParams,"iciciSiModify","NA",receivedParams.merchantId,upiConstant.icicimerchantVPAs,upiConstant.Bank.ICICI,payuId,res,"Modify","iciciSiModify",req);
        if (upi.arrayValuesNotEmpty(result))
        {
            var txnStatusCode = result[1][0];
            if(receivedParams.amount.toString() === "127.00")
            {
                response = await upiResponse.returnResponse("IncorrectEncryptedResponse");
            }
            else if(receivedParams.amount.toString()=== "131.00")
            {
                response = await upiResponse.returnResponse("IncorrectFormatResponse");
            }
            else
            {
                if (modifiedAmt > 150)
                {
                    responseParams = await upiResponse.returnResponse("IciciSiModifyResponse", receivedParams, result, txnStatusCode, "NA", "NA", "NA", "NA");
                }
                else
                {
                    responseParams = await upiResponse.returnResponse("IciciSiModifyResponseFail",receivedParams,result,txnStatusCode,"NA","NA","NA","NA");
                }
                response = await encryptForICICISI(responseParams);
            }
            res.status(200).send(response);
        }
        else {
            responseParams = await upiResponse.returnResponse("IciciSiEmptyRedis",receivedParams,result,txnStatusCode,"NA","NA","NA","NA");
            res.status(200).send(responseParams);
        }
        if (upiConstant.sendCallbackFlag === 'true') {
            request = {
                "url": upiConstant.ICICISItestEnvUrl,
                "payuId": payuId,
                "method": "POST"
            }
            upi.returnCallback(request, res, next);
        }
    }

}


async function decryptForICICISI(request) {
    var respEncKey= upiConstant.icicikey_private.decrypt(request.encryptedKey, 'utf8');
    var decryptedText = await upi.aesDecrypt(upiConstant.Algo.AES_128_CBC,respEncKey,'binary',request.iv,'base64',true,request.encryptedData,'base64','utf8');
    return decryptedText;
}

async function encryptForICICISI(response)
{
    const encKey = util.generateRandom(16,'#');
    const encryptedKey = upiConstant.icicisi_public.encrypt(encKey,'base64');
    const iv = crypto.randomBytes(16).toString('binary');
    const encryptedText = upi.aesEncrypt(upiConstant.Algo.AES_128_CBC, encKey, 'utf8', iv, 'binary', true, JSON.stringify(response), 'utf8', 'binary');
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

module.exports = icici_Si;