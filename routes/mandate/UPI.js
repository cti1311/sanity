// var logger = require('../../logger'),
    axios = require('axios')
    crypto = require('crypto')
//     redis = require('../../util/redis'),
    upiConstant = require('./constant')
    const upiResponse = require('./upiResponse.js')
    util = require('./util');
const moment = require('moment');
const NodeRSA = require('node-rsa');

var upi = {

  //Exporting Non API Members
  key: key,
  verifyMandatoryParams: verifyMandatoryParams,
  arrayValuesNotEmpty: arrayValuesNotEmpty,
  setKeysInRedis: setKeysInRedis,
  setKeysExpiryInRedis: setKeysExpiryInRedis,
  deleteKeyInRedis: deleteKeyInRedis,
  aesEncrypt: aesEncrypt,
  aesDecrypt: aesDecrypt,
  setValueInRedis : setValueInRedis,
  getValuesFromRedis : getValuesFromRedis,
  validateUpiRequest : validateUpiRequest,
  dateTime : dateTime,
  monthName : monthName,
  getMerchantVPAForMerchId : getMerchantVPAForMerchId,
  isValidMerchant : isValidMerchant,
  encryptResponse : encryptResponse,
  decryptRequest : decryptRequest,
  encryptResponseforAirtel : encryptResponseforAirtel,

  //API Endpoints

  /**
   * Method to send callback for transaction to specified URL
   * Accepts post data/transaction ID for generating post data from Redis
   */
  returnCallback:function (req, res, next)
  {
    if (req.method === 'POST') {
      var requestBody = req.body;
      if(!requestBody)
      {
        requestBody=req;
      }
      var postUrl = requestBody.url;
      var payuId = requestBody.payuId;

      var response;
      if (postUrl) {
        var postDataParam = requestBody.data;
        var postData;
        if (postDataParam) {
          postData = JSON.parse(postDataParam);
        }
        else if (payuId) {

          redis.mget(key(payuId, 'customerVPA', 'upiTxnId', 'time', 'amount', 'rrn', 'refNum','remarks', 'merchantVPA', 'txnStatusCode', 'action_type','customerName','merchant_id','amt_rule','frequency','revokable','debitAmount','ruleType','ruleValue','endDate','TerminalId')).then(async function (result) {
            logger.info('[UPICallback] Response from MGET (callback) for transaction ' + payuId + ' : ' + result);
            var responseParams, statusCode;
            //Expire transaction if statusCode key has expired
            statusCode = result[8] ? result[8] : "U69";
            logger.info("*********result[9]********"  + result[7]);
            var date_time=dateTime();
            //Check mandatory values present for transaction
            if (getBankNameForVpa(result[7]) == upiConstant.Bank.HDFC ) {
              statusCode = result[8] ? result[8] : "MD203";
              //HDFC Bank Callback
              var ivKey='835466BAF3BB4EDF82A9CE5ADBF25C04';
              if (result[9] === 'CREATE')
              {
                responseParams = await upiResponse.returnResponse("hdfcSiCreateCallback",requestBody,result,statusCode,"NA","NA","NA","NA",date_time);
                postData = await encryptResponse(JSON.stringify(responseParams),result[11],upiConstant.Algo.AES_128_CBC,'binary',ivKey,'binary',true,'binary','hex',upiConstant.hdfcmerchantVPAs,upiConstant.Bank.HDFC,upiConstant.hdfcaggregatorMerchant,true);
              }
              else if (result[9] === 'RECUR_PAY')
              {
                responseParams = await upiResponse.returnResponse("hdfcSiRecurPayCallback",requestBody,result,statusCode,"NA","NA","NA","NA",date_time);
                postData = await encryptResponse(JSON.stringify(responseParams),result[11],upiConstant.Algo.AES_128_CBC,'binary',ivKey,'binary',true,'binary','hex',upiConstant.hdfcmerchantVPAs,upiConstant.Bank.HDFC,upiConstant.hdfcaggregatorMerchant,true);
              }
              else if (result[9]== 'REVOKE')
              {
                responseParams = await upiResponse.returnResponse("hdfcSiRevokeCallback",requestBody,result,statusCode,"NA","NA","NA","NA",date_time);
                postData = await encryptResponse(JSON.stringify(responseParams),result[11],upiConstant.Algo.AES_128_CBC,'binary',ivKey,'binary',true,'binary','hex',upiConstant.hdfcmerchantVPAs,upiConstant.Bank.HDFC,upiConstant.hdfcaggregatorMerchant,true);
              }
              else if (result[9]== 'UNPAUSE')
              {
                responseParams = await upiResponse.returnResponse("hdfcSiUnpauseCallback",requestBody,result,statusCode,"NA","NA","NA","NA",date_time);
                postData =await encryptResponse(JSON.stringify(responseParams),result[11],upiConstant.Algo.AES_128_CBC,'binary',ivKey,'binary',true,'binary','hex',upiConstant.hdfcmerchantVPAs,upiConstant.Bank.HDFC,upiConstant.hdfcaggregatorMerchant,true);
              }

              else if (result[9]== 'PAUSE')
              { responseParams = await upiResponse.returnResponse("hdfcSiPauseCallback",requestBody,result,statusCode,"NA","NA","NA","NA",date_time);
                postData = await encryptResponse(JSON.stringify(responseParams),result[11],upiConstant.Algo.AES_128_CBC,'binary',ivKey,'binary',true,'binary','hex',upiConstant.hdfcmerchantVPAs,upiConstant.Bank.HDFC,upiConstant.hdfcaggregatorMerchant,true);
              }
              else if (result[9]== 'UPDATE')
              {
                responseParams = await upiResponse.returnResponse("hdfcSiUpdateCallback",requestBody,result,statusCode,"NA","NA","NA","NA",date_time);
                postData = await encryptResponse(JSON.stringify(responseParams),result[11],upiConstant.Algo.AES_128_CBC,'binary',ivKey,'binary',true,'binary','hex',upiConstant.hdfcmerchantVPAs,upiConstant.Bank.HDFC,upiConstant.hdfcaggregatorMerchant,true);
              }
              else {
                responseParams = await upiResponse.returnResponse("hdfcCallbackResponse",requestBody,result,statusCode,"NA","NA","NA","NA","NA");
                postData = await hdfcUpi.getCallbackResponse(responseParams);
              }
            }

            else if(getBankNameForVpa(result[7]) == upiConstant.Bank.ICICI && arrayValuesNotEmpty(result.slice(0, 5)))
            {
              if (result[9] === 'CREATE')
              {
                responseParams = await upiResponse.returnResponse("IciciSiCreationCallback",requestBody,result,statusCode,"NA","NA","NA","NA",date_time);
                postData = await icici_Si.encryptForICICISI(responseParams);
              }
             else if (result[9] === 'RECUR_PAY')
              {
                responseParams = await upiResponse.returnResponse("IciciSiExecutionCallback",requestBody,result,statusCode,"NA","NA","NA","NA",date_time);
                postData = await icici_Si.encryptForICICISI(responseParams);
              }
              else if (result[9]== 'REVOKE')
              {
                responseParams = await upiResponse.returnResponse("IciciRevokeCallbackResponse",requestBody,result,statusCode,"NA","NA","NA","NA",date_time);
                postData = await icici_Si.encryptForICICISI(responseParams);
              }
              else if (result[9]== 'UNPAUSE')
              {
                responseParams = await upiResponse.returnResponse("IciciUnpauseCallbackResponse",requestBody,result,statusCode,"NA","NA","NA","NA",date_time);
                postData = await icici_Si.encryptForICICISI(responseParams);
              }

              else if (result[9]== 'PAUSE')
              { responseParams = await upiResponse.returnResponse("IciciPauseCallbackResponse",requestBody,result,statusCode,"NA","NA","NA","NA",date_time);
                postData = await icici_Si.encryptForICICISI(responseParams);
              }
              else {
                logger.info("Sending Callback for ICICI non SI txns");
                responseParams = await upiResponse.returnResponse("iciciCallbackResponse", requestBody, result, statusCode, "NA", "NA", "NA", "NA", "NA");
                postData = upiConstant.icicikey_public.encrypt(JSON.stringify(responseParams), 'base64');
              }
            }
            else if (getBankNameForVpa(result[7]) == upiConstant.Bank.AXIS )
            {
              //AXIS Bank Callback
              responseParams = await upiResponse.returnResponse("axisCallbackResponse",req,result,statusCode,"NA","NA","NA","NA","NA");              postData = axisUpi.getCallbackResponse(responseParams);
            }
            else if (getBankNameForVpa(result[7]) == upiConstant.Bank.INDUS && arrayValuesNotEmpty(result.slice(0, 9)))
            {//INDUS Bank Callback
              responseParams = await upiResponse.returnResponse("indusCallbackResponse",requestBody,result,statusCode,"NA","NA","NA","NA","NA");
              postData = await indusUpi.getCallbackResponse(responseParams);
            }
            else if (getBankNameForVpa(result[7]) == upiConstant.Bank.AIRTEL )
            {
              //Airtel Bank Callback
              responseParams = await upiResponse.returnResponse("airtelCallbackResponse",req,result,statusCode,"NA","NA","NA","NA","NA");
               var hash= await airtelUpi.getCallbackResponse(responseParams);
              postData = responseParams = await upiResponse.returnResponse("airtelCallbackResponse",req,result,statusCode,"NA","NA","NA","NA","NA",hash);
            }
            else {
              response = '{"code" : "001", "result" : "FAILURE", "data":"No data found for transaction ' + payuId + '"}';
              res.send(JSON.parse(response));
              return;
            }
            //POST to server
            var responseMessage, httpStatusCode;
            axios.post(postUrl, postData)
                .then(function (response) {
                  httpStatusCode = 200;
                  if (response)
                   responseMessage = "Request successful:\nData: " + response.data + "\nStatus: " + response.status;
                  else
                    responseMessage = "No response from server";
                  if (req.responseParams) {
                    //For INTENT transactions
                    req.responseParams.message = responseMessage;
                    res.status(httpStatusCode).send(req.responseParams);
                  } else {
                    res.status(httpStatusCode).send(responseMessage);
                  }
                })
                .catch(function (error) {
                  httpStatusCode = 500;
                  if (error.response) {
                    responseMessage = "Error in response received :\nData : " + response.data + "\nStatus: " + response.status;
                  } else if (error.request) {
                    responseMessage = "Error in request sent :\nRequest : " + error.request;
                  } else {
                    responseMessage = "Error in setting up request: " + error.message;
                  }
                  responseMessage += "\nConfig: " + error.config;
                  logger.info("[UPICallback] " + responseMessage);
                  if (req.responseParams) {
                    //For INTENT transactions
                    req.responseParams.message = responseMessage;
                    res.status(httpStatusCode).send(req.responseParams);
                  } else {
                    res.status(httpStatusCode).send(responseMessage);
                  }
                });

          })
              .catch(function (error) {
                logger.info("[UPICallback] Error in fetching value from redis: " + error);
                response = '{"code" : "002", "result" : "UNKNOWN", "data":"Internal server error. Problem occurred while fetching values for ' + payuId + '"}';
                res.status(500).send(JSON.parse(response));
                return;
              });
        }
        else {
          res.status(422).send("POST Data or Bank name not received");
          return;
        }

      }
      else {
        logger.info("[UPICallback] POST URL not received");
        res.status(422).send("POST URL missing");
      }

    }
    else {
      res.sendStatus(405);
    }
  },

  /**
   * Method to set transaction status for a transaction
   */
  setTransactionStatus: function (req, res, next) {
    if (req.method === 'POST') {
      if(!req.body)
      {
        req.body=req;
      }
      var payuId = req.body.payuId;
      var statusCode = req.body.txnStatus;
      if (payuId && statusCode && !isNaN(payuId)) {
        payuId = payuId.toString();
        statusCode = statusCode.toString();
        logger.info("status code is "+statusCode);
        redis.get(key(payuId, 'upiTxnId'))
            .then(function (result) {
              logger.info("[UPISetStatus] Response from GET(status) for transaction " + payuId + ": " + result);
              //Bankname present in transaction data for Collect request or passed in param for Intent transaction
              logger.info("Response for valid status code check" +isValidStatusCode(statusCode));
              if (result && isValidStatusCode(statusCode)) {
                var data = [{key: "txnStatusCode", value: statusCode, expiry: upiConstant.txnExpiry}];
                setKeysInRedis(payuId, data);
                logger.info("[UPISetStatus] Transaction status code updated as " + statusCode + " for " + payuId);
                res.send("Transaction status updated successfully");
              }
              if (result && isValidStatusCode_axis(statusCode)) {
                var data = [{key: "txnStatusCode", value: statusCode, expiry: upiConstant.txnExpiry}];
                setKeysInRedis(payuId, data);
                logger.info("[UPISetStatus] Transaction status code updated as " + statusCode + " for " + payuId);
                res.send("Transaction status updated successfully");
              }
              else if (result && isValidStatusCode_ICICI(statusCode) || result && isValidStatusCode_Airtel(statusCode)) {
                var data = [{key: "txnStatusCode", value: statusCode, expiry: upiConstant.txnExpiry}];
                setKeysInRedis(payuId, data);
                logger.info("[UPISetStatus] Transaction status code updated as " + statusCode + " for " + payuId);
                res.send("Transaction status updated successfully");
              }
              else if (result && isValidStatusCode_HdfcOTM(statusCode)) {
                var data = [{key: "txnStatusCode", value: statusCode, expiry: upiConstant.txnExpiry}];
                setKeysInRedis(payuId, data);
                logger.info("[UPISetStatus] Transaction status code updated as " + statusCode + " for " + payuId);
                res.send("Transaction status updated successfully");
              }
              else {
                logger.info("[UPISetStatus] Mandatory params missing or invalid: UPITxnId - " + result + " , statusCode - " + statusCode);
                res.status(422).send("Mandatory params not passed or invalid");
              }

            })
            .catch(function (error) {
              logger.info("[UPISetStatus] Error in fetching value from redis: " + error);
              res.status(500).send("Error occured while setting the transaction status for transaction " + payuId);
            });
      }
      else {
        logger.info("[UPISetStatus] Mandatory params missing or invalid: payuId - " + payuId + " , statusCode - " + statusCode);
        res.status(422).send("Mandatory params not passed or invalid");
      }
    }
    else {
      res.sendStatus(405);
    }
  },
  setAction_Type: function (req, res, next) {
    if (req.method === 'POST') {
      var payuId = req.body.payuId;
      var action_type = req.body.action_type;
      if (payuId && action_type && !isNaN(payuId)) {
        payuId = payuId.toString();
        action_type = action_type.toString();
        logger.info("Action Type is "+action_type);
        redis.get(key(payuId, 'upiTxnId'))
            .then(function (result) {

              logger.info("[UPISetStatus] Response from GET(status) for transaction " + payuId + ": " + result);
              //Bankname present in transaction data for Collect request or passed in param for Intent transaction
              logger.info("Response for valid status code check" +isValidActionType(action_type));

              var data = [{key: "action_type", value: action_type , expiry: upiConstant.txnExpiry}];
              setKeysInRedis(payuId, data);
              logger.info("[UPISetStatus] Transaction action type updated as " + action_type + " for " + payuId);
              res.send("Transaction action type updated successfully");
              logger.info("[UPISetStatus] Mandatory params missing or invalid: UPITxnId - " + result + " , statusCode - " + action_type);
              res.status(422).send("Mandatory params not passed or invalid");


            })
            .catch(function (error) {
              logger.info("[UPISetStatus] Error in fetching value from redis: " + error);
              res.status(500).send("Error occured while setting the transaction status for transaction " + payuId);
            });
      }
      else {
        logger.info("[UPISetStatus] Mandatory params missing or invalid: payuId - " + payuId + " , statusCode - " + statusCode);
        res.status(422).send("Mandatory params not passed or invalid");
      }
    }
    else {
      res.sendStatus(405);
    }
  },

  /**
   * Method to get list of all valid VPAs
   */
  fetchValidVPAList: function (req, res, next) {
    if (req.method == 'GET') {
      res.status(200).send(Object.keys(upiConstant.validVPAs));
    }
    else {
      res.sendStatus(405);
    }
  },

  /**
   * Method to process Intent transaction and return response
   */
  processIntentTransaction: function (req, res, next) {
    if (req.method == 'POST') {
      var requestBody = req.body;

      if (verifyMandatoryParams(requestBody, "intentTransaction")) {
        var payuId = requestBody.refId;
        var bankName = getBankNameForVpa(requestBody.merchantVpa);
        if (bankName === upiConstant.Bank.AXIS)
          PgVpa = upiConstant.axismerchantVPAs;
        else if(bankName === upiConstant.Bank.ICICI)
          PgVpa = upiConstant.icicimerchantVPAs;
        else {
          PgVpa = upiConstant.hdfcmerchantVPAs;
        }

        if(isNaN(payuId) || (bankName != upiConstant.Bank.AXIS && bankName != upiConstant.Bank.HDFC && bankName != upiConstant.Bank.INDUS && bankName != upiConstant.Bank.ICICI)) {
          res.status(422).send("Incorrect parameters received");
          return;
        }
        if (!isValidMerchant(requestBody.pgMerchantId,PgVpa,bankName)) {
          res.status(422).send("Incorrect merchant VPA received");
          return;
        }

        redis.get(key(payuId, 'upiTxnId'))
            .then(function (result) {
                if (result && requestBody.HDFCSI != "1") {
                logger.info("[UPIProcessIntent] Entry already present for " + payuId + ": " + result);
                res.status(409).send(JSON.parse('{"statusCode":"01","status":"FAILURE","message":"Transaction already present for ' + payuId + '"}'));
              }
              else {
                var response = { "status": null, "statusCode": null, "message":null};
                var callbackExpected = false;

                if (requestBody.sendCallback && requestBody.sendCallback != "false" && requestBody.callbackUrl) {
                  callbackExpected = true;
                }

                if (upiConstant.validVPAs.hasOwnProperty(requestBody.customerVpa.toLowerCase())) {

                  if (isValidStatusCode(requestBody.expStatusCode) || isValidStatusCode_ICICI || isValidStatusCode_HdfcOTM) {
                    response.statusCode = requestBody.expStatusCode;
                    if (bankName === upiConstant.Bank.AXIS) {
                      response.status = callbackExpected? upiConstant.statusCodeDesc_axis[requestBody.expStatusCode][1]: upiConstant.statusCodeDesc_axis[requestBody.expStatusCode][0];
                    }
                   else if (bankName === upiConstant.Bank.ICICI) {
                      response.status = callbackExpected? upiConstant.statusCodeDesc_ICICI[requestBody.expStatusCode][1]: upiConstant.statusCodeDesc_ICICI[requestBody.expStatusCode][0];
                    }
                    else if ((bankName === upiConstant.Bank.HDFC && requestBody.HDFCSI != "1") || bankName === upiConstant.Bank.INDUS) {
                      response.status = callbackExpected ? upiConstant.statusCodeDesc[requestBody.expStatusCode][1] : upiConstant.statusCodeDesc[requestBody.expStatusCode][0];
                    }
                    else if ((bankName === upiConstant.Bank.HDFC && requestBody.HDFCSI === "1")) {
                      response.status = callbackExpected ? upiConstant.statusCodeDesc_HDFCOTM[requestBody.expStatusCode][1] : upiConstant.statusCodeDesc_HDFCOTM[requestBody.expStatusCode][0];
                    }
                    else {
                      response.status = upiConstant.statusCodeDesc[requestBody.expStatusCode][0];
                    }
                  }
                  else {
                    logger.info("[UPIProcessIntent] Incorrect status code " + requestBody.expStatusCode + " expected for " + bankName + " bank");
                    res.status(400).send(JSON.parse('{"statusCode":"02","status":"FAILURE","message":"Incorrect status code expected for ' + bankName + ' bank"}'));
                    return;
                  }
                }
                else {
                  logger.info("[UPIProcessIntent] Customer VPA '" + requestBody.customerVPA + "' not present in the list of VPAs");
                  res.status(422).send("Invalid params passed");
                  return;
                }

                //Setting transaction values in Redis
                var remarks = "PAY";
                if (requestBody.remarks) {
                  remarks += ": " + requestBody.remarks;
                }

                var data = [
                  {key: "customerVPA", value: requestBody.customerVpa, expiry: upiConstant.txnExpiry},
                  {key: "time", value: util.getDateTime(), expiry: upiConstant.txnExpiry},
                  {key: "txnStatusCode", value: response.statusCode, expiry: upiConstant.txnExpiry},
                  {key: "amount", value: requestBody.amount, expiry: upiConstant.txnExpiry},
                  {key: "remarks", value: remarks, expiry: upiConstant.txnExpiry},
                  {key: "merchantVPA", value: requestBody.merchantVpa, expiry: upiConstant.txnExpiry},
                  {key: "refNum", value: util.generateRandomNumber(7), expiry: upiConstant.txnExpiry},
                ];

                switch(bankName) {
                  case upiConstant.Bank.AXIS:
                    data.push({key: "upiTxnId", value: axisUpi.generateUpiTxnId(payuId), expiry: upiConstant.txnExpiry});
                    data.push({key: "rrn", value: axisUpi.generateUpiRrn(), expiry: upiConstant.txnExpiry});
                    break;
                  case upiConstant.Bank.HDFC:
                    if(!result) {
                      var upiTxnid = hdfcUpi.generateUpiTxnId();
                      var custRefNumber = Math.floor(upiTxnid / 2);
                      data.push({key: "upiTxnId", value: upiTxnid, expiry: upiConstant.txnExpiry});
                      data.push({key: "rrn", value: hdfcUpi.generateUpiRrn(), expiry: upiConstant.txnExpiry});
                      data.push({key: "refNum", value: custRefNumber, expiry: upiConstant.txnExpiry});
                    }
                    break;
                  case upiConstant.Bank.INDUS:
                    var collectTxnId = indusUpi.generateUpiTxnId();
                    var custRefNumber = Math.floor(collectTxnId / 2);
                    data.push({key: "upiTxnId", value: collectTxnId, expiry: upiConstant.txnExpiry});
                    data.push({key: "rrn", value: indusUpi.generateNPCITxnId(), expiry: upiConstant.txnExpiry});
                    data.push({key: "refNum", value: custRefNumber, expiry: upiConstant.txnExpiry});
                    break;
                  case upiConstant.Bank.ICICI:
                    var upiTxnid = icicites.generateUpiTxnId();
                    var custRefNumber = Math.floor(upiTxnid / 2);
                    data.push({key: "upiTxnId", value: upiTxnid, expiry: upiConstant.txnExpiry});
                    data.push({key: "rrn", value: icicites.generateUpiRrn(), expiry: upiConstant.txnExpiry});
                    data.push({key: "refNum", value: custRefNumber, expiry: upiConstant.txnExpiry});
                    break;
                  default:
                }

                setKeysInRedis(payuId, data);

                if (callbackExpected) {
                  var mimicApiReq = {
                    method: 'POST',
                    body: {
                      payuId: payuId,
                      url: requestBody.callbackUrl
                    },
                    responseParams: response
                  };
                  upi.returnCallback(mimicApiReq, res, next,true);
                  return;
                }
                else {
                  logger.info("[UPIProcessIntent] Transaction status updated and callback not sent for payuId " + payuId);
                  response.message = "Transaction data saved successfully";
                  res.send(response);
                }
              }
            })
            .catch(function (error) {
              logger.info("[UPIProcessIntent] Error in fetching value from redis: " + error);
              response = '{"code":"003","result":"UNKNOWN","data":"Internal server error. Problem occurred while fetching values for ' + payuId + '"}';
              res.status(500).send(JSON.parse(response));
            });
      }

      else {
        res.status(422).send("Mandatory params missing");
        logger.info("[UPIProcessIntent] Mandatory params missing or invalid: payuId - " + payuId + " , statusCode - " + statusCode);
        res.status(422).send("Mandatory params not passed or invalid");
      }

    }
    else {
      res.sendStatus(405);
    }
  },

  /**
   * Method to get list of all pending transactions for a VPA
   */
  fetchPendingTransactions: function (req, res, next) {
    if (req.method == 'POST') {
      var vpa = req.body.customerVpa;
      //Fetch list of transactions in redis for customerVPA
      redis.keys(key("*", 'customerVPA'))
          .then(function (vpaKeys) {

            if (vpaKeys != null && vpaKeys != '') {

              logger.info("[UPIGetTxns] Response from KEYS for customerVPAs: " + vpaKeys);

              //Fetch VPAs for the list of transactions in redis
              redis.mget(vpaKeys)
                  .then(function (result) {
                    var txnDetails = new Array(), payuIds = new Array();

                    //Match values against passed VPA, parse payuIds from the keys of these values and generate required Redis keys
                    result.forEach(function(item, index) {
                      if (item == vpa) {
                        payuIds.push(vpaKeys[index].substring(0, vpaKeys[index].indexOf("-")));
                        txnDetails.push(key(payuIds[payuIds.length - 1], 'txnStatusCode'));
                        txnDetails.push(key(payuIds[payuIds.length - 1], 'amount'));
                        txnDetails.push(key(payuIds[payuIds.length - 1], 'expiry'));
                        txnDetails.push(key(payuIds[payuIds.length - 1], 'merchantVPA'));
                      }
                    });
                    logger.info("[UPIGetTxns] PayuIds parsed from Redis keys for " + vpa + " are: " + payuIds);

                    if (payuIds.length > 0) {

                      //Fetch transactions for the VPA passed
                      redis.mget(txnDetails)
                          .then(function (result) {
                            var pendingTxns = new Array();
                            //Add pending transactions to a list to return
                            for (var index=0; index<result.length; index += 4) {
                              if (result[index]) {
                                var Txn = {};
                                if (result[index] === '22' || result[index] == '') {
                                  Txn.payuId = payuIds[index/4];
                                  Txn.txnAmount = result[index + 1];
                                  Txn.expiryTime = result[index + 2];
                                  Txn.merchantVpa = result[index + 3];
                                  pendingTxns.push(Txn);
                                }
                                else if (result[index] === 'PENDING' || result[index] == '') {
                                  Txn.payuId = payuIds[index/4];
                                  Txn.txnAmount = result[index + 1];
                                  Txn.expiryTime = result[index + 2];
                                  Txn.merchantVpa = result[index + 3];
                                  pendingTxns.push(Txn);
                                }
                              }
                            }

                            if (pendingTxns.length > 0) {
                              logger.info("[UPIGetTxns] Number of pending transactions returned for " + vpa + " is " + pendingTxns.length);
                              res.send(pendingTxns);
                            }
                            else {
                              logger.info("[UPIGetTxns] No pending transactions found for " + vpa);
                              res.send("No pending transactions for the passed VPA");
                            }

                          })
                          .catch(function (error) {
                            logger.info("[UPIGetTxns] Error occurred while fetching UPI collect transactions for " + vpa);
                            res.status(500).send("Internal server error");
                          });
                    }
                    else {
                      logger.info("[UPIGetTxns] No collect transactions found for the passed VPA: " + vpa);
                      res.send("No pending transactions for the passed VPA");
                    }

                  })
                  .catch(function(error) {
                    logger.info("[UPIGetTxns] Error occurred while fetching VPAs associated with transactions");
                    res.status(500).send("Internal server error");
                  });
            }
            else {
              logger.info("[UPIGetTxns] No UPI collect transactions found on server");
              res.send("No pending transactions for the passed VPA");
            }
          })
          .catch(function (error) {
            logger.info("[UPIGetTxns] Error occurred while fetching UPI transaction keys");
            res.status(500).send("Internal server error");
          });
    }
    else {
      res.sendStatus(405);
    }
  },

  /**
   * Method to get list of supported UPI status codes
   */
  fetchValidStatusCodes: function (req, res, next) {
    if (req.method == 'GET') {
      res.status(200).send(Object.keys(upiConstant.statusCodeDesc).sort());
    }
    else {
      res.sendStatus(405);
    }
  },

  /**
   * Method to get list of supported UPI status codes
   */
  fetchCallbackDetails: function (req, res, next) {
    if (req.method == 'GET') {
      var response = {
        envs: upiConstant.supportedCallbackEnvList,
        filePath: {
          axis: "UpiCallback.php",
          hdfc: "MindGateCallback.php",
          indus: "IndusindUpiCallback.php"
        }
      }
      res.status(200).send(response);
    }
    else {
      res.sendStatus(405);
    }
  }

};

/**
 * Method to generate Redis key name(s) based on the identifier(s) passed
 *
 * @param {string} payuId
 * @param {string} identifier
 * @param {string[]} keyIdentifiers - optional parameter
 *
 * @returns {string | string[]} keyName/array of keyNames
 */
function key(payuId, identifier, ...keyIdentifiers) {
  var keys = [payuId + "-" + upiConstant.redisKeyNames[identifier]];
  for (var id in keyIdentifiers)
  {
    keys.push(payuId + "-" + upiConstant.redisKeyNames[keyIdentifiers[id]]);
  }
  return keys;
}


/**
 * Method to verify all the mandatory params are present in the request body for the specified API call
 *
 * @param {JSON} requestBody
 * @param {string} typeOfCall
 *
 * @returns {boolean} mandatoryParamsPresent
 */
function verifyMandatoryParams(requestBody, typeOfCall) {
  var allMandatoryParamsPresent = true;
  var keysArray;
  switch(typeOfCall) {
    case "axisValidate":
      keysArray = upiConstant.axisvalidateVPAKeys;
      break;
    case "axiscollect":
      keysArray = upiConstant.axiscollect;
      break;
    case "axisToken":
      keysArray = upiConstant.axistokenGenerationKeys;
      break;
    case "axisVerify":
      keysArray = upiConstant.axisverifyStatusKeys;
      break;
    case "mandateStatus":
    case "recurrPay":
    case "hdfcSiRevoke":
    case "hdfcsiNotify":
    case "createMandate":
      keysArray = upiConstant.hdfcSIrequestKeys;
      break;
    case "hdfcValidate":
    case "hdfcCollect":
    case "hdfcVerify":
      keysArray = upiConstant.hdfcrequestKeys;
      break;
    case "indusCollect":
    case "indusVerify":
      keysArray = upiConstant.indusrequestKeys;
      break;
    case "intentTransaction":
      keysArray = upiConstant.intentRequestKeys.slice(0,-2);
      break;
    case "iciciCollect":
      keysArray = upiConstant.iciciCollectrequestKeys;
      break;
    case "iciciVerify":
      keysArray = upiConstant.iciciVerifyRequestKeys;
      break;
    case "iciciSiCollect":
    case "iciciSiRevoke":
      keysArray = upiConstant.iciciSiCollectRequestKeys;
      break;
    case"iciciSiVerify":
      keysArray = upiConstant.iciciSiVerifyRequestKeys;
      break;
    case "iciciSiRecurrPay" :
      keysArray = upiConstant.iciciSiRecurrPay;
      break;
    case "iciciSiNotify":
      keysArray = upiConstant.iciciSiNotifyKeys;
      break;
    case "iciciSiModify":
      keysArray =  upiConstant.iciciSiUpdateKeys;
      break;
    case "airtelcollect":
      keysArray = upiConstant.airtelCollectKeys;
      break;
    case "airtelVerify":
      keysArray = upiConstant.airtelVerifyKeys;
      break;
    default:
      return false;

  }
  for (var index = 0; index < keysArray.length; index++) {
//     logger.log("LOG:" +keysArray[index]);
    if (!Object.hasOwnProperty.call(requestBody, keysArray[index])) {
        allMandatoryParamsPresent = false;
      break;
    }
  }
  return allMandatoryParamsPresent;
}

/**
 * Returns whether array has all valid values
 *
 * @param {string[]} array
 *
 * @returns {boolean} areAllArrayValuesValid (not null and defined)
 */
function arrayValuesNotEmpty(array) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (!array[i]) {
      return false;
    }
  }
  return true;
}

function setValueInRedis(payuid,customerVPA,amount,remarks,upiTxnId,time,txnStatusCode,rrn,custRefNumber,merchantVpa,merchantId,startDate,endDate,pattern,action_type,customerName,frequency,revokable,ruleValue,ruleType,amt_rule,accountNo,terminalId)
{
  var data = [
    {key: "customerVPA", value: customerVPA, expiry: upiConstant.txnExpiry},
    {key: "amount", value: amount, expiry: upiConstant.txnExpiry},
    {key: "remarks", value: remarks, expiry: upiConstant.txnExpiry},
    {key: "upiTxnId", value: upiTxnId, expiry: upiConstant.txnExpiry},
    {key: "time", value: time, expiry: upiConstant.txnExpiry},
    {key: "expiry", value: upiConstant.expiryTime, expiry: upiConstant.txnExpiry},
    //Status to be assumed as expired after key is deleted
    {key: "txnStatusCode", value: txnStatusCode, expiry: upiConstant.txnExpiry},
    {key: "rrn", value: rrn, expiry: upiConstant.txnExpiry},
    {key: "refNum", value: custRefNumber, expiry: upiConstant.txnExpiry},
    {key: "merchantVPA", value: merchantVpa, expiry: upiConstant.txnExpiry},
    {key: "merchant_id",value: merchantId , expiry: upiConstant.txnExpiry},
    {key: "startDate",value: startDate , expiry: upiConstant.txnExpiry},
    {key: "endDate",value: endDate , expiry: upiConstant.txnExpiry},
    {key: "pattern",value: pattern , expiry: upiConstant.txnExpiry},
    {key: "action_type",value: action_type , expiry: upiConstant.txnExpiry},
    {key : "customerName", value: customerName,expiry: upiConstant.txnExpiry },
    {key : "frequency", value: frequency ,expiry: upiConstant.txnExpiry },
    {key : "revokable", value: revokable ,expiry: upiConstant.txnExpiry },
    {key : "ruleValue", value: ruleValue,expiry: upiConstant.txnExpiry },
    {key : "ruleType", value: ruleType,expiry: upiConstant.txnExpiry },
    {key : "amt_rule", value: amt_rule,expiry: upiConstant.txnExpiry },
    {key: "AccountNo", value: accountNo, expiry: upiConstant.txnExpiry},
    {key: "TerminalId", value: terminalId, expiry: upiConstant.txnExpiry},
  ];
  upi.setKeysInRedis(payuid, data);
}

async function getValuesFromRedis(typeOfCall,payuId)
{
  var keysArray;
  var result =[];
  switch(typeOfCall) {
    case "axisValidate":
      keysArray = upiConstant.axisTransactionStatusKeys;
      break;
    case "hdfcSIVerify":
      keysArray = upiConstant.hdfcSIVerifyRedisKeys;
      break;
    case "hdfcSITransactionStatus":
      keysArray = upiConstant.hdfcSITransactionStatus;
      break;
    case "hdfcVerify":
      keysArray = upiConstant.hdfcVerifyRedisKeys;
      break;
    case "hdfcSIrecur":
    case "hdfcSIrevoke":
      keysArray = upiConstant.hdfcSIrecurRedisKeys;
      break;
    case "hdfcSirevokeAdhocFreq":
    case "hdfcSIrecurAdhocFreq":
      keysArray = upiConstant.hdfcSIrecurKeysFreqisAdhoc;
      break;
    case "hdfcSINotify":
      keysArray = upiConstant.hdfcSINotifyRedisKeys;
      break;
    case "hdfcSIModify":
      keysArray = upiConstant.hdfcSIModifyRedisKeys;
      break;
    case "hdfcSIModifyAdhocFreq":
      keysArray = upiConstant.hdfcSIModifyRedisKeysAdhocFreq;
      break;
    case "iciciIntentTransactionStatus":
      keysArray = upiConstant.iciciIntentTransactionStatusKeys;
      break;
    case "iciciCollectTransactionStatus":
      keysArray = upiConstant.iciciCollectTransactionStatusKeys;
      break;
    case "indusTransactionStatus":
      keysArray = upiConstant.indusTransactionStatusKeys;
      break;
    case "SiFrequency":
      keysArray = upiConstant.hdfcSIFrequency;
      break;
    case "hdfcAccountNo":
      keysArray =  upiConstant.hdfcAccountNo;
      break;
    case "iciciSIVerify":
      keysArray =  upiConstant.iciciVerifySiRedisKeys;
      break;
    case "iciciSiRecur" :
    case "iciciSiNotify":
    case "iciciSiRevoke":
      keysArray =upiConstant.icicirecurSIRedisKeys;
      break;
    case "iciciSiModify":
      keysArray =upiConstant.iciciSiUpdateRedisKeys;
      break;
    case "airtelVerify":
      keysArray =upiConstant.airtelRedisKeys;
      break;
    default:
      return false;
  }
  console.log(key)
  for (var index = 0; index < keysArray.length; index++)
  {
     result[index]= await redis.mget(key(payuId,keysArray[index])).catch(function (error) {
      logger.info("[HDFCVerifyStatus] Error in fetching value from redis: " + error);
     });
  }
  return await result;
}

/**
 * Method to set multiple keys in Redis
 *
 * @param {string} payuId
 * @param {[{key: string, value: string, expiry: number}]} keyValueArray
 *
 * @returns {string} payuMerchantVpa
 */
function setKeysInRedis(payuId, keyValueArray) {
  keyValueArray.forEach( function (element) {
    util.setKeyInRedis(key(payuId, element.key), element.value, element.expiry);
  });
}

/**
 * Method to set expiry for multiple keys in Redis
 *
 * @param {string} payuId
 * @param {[{key: string, expiry: number}]} keyExpiryArray
 *
 * @returns {string} payuMerchantVpa
 */
function setKeysExpiryInRedis(payuId, keyExpiryArray) {
  keyExpiryArray.forEach( function (element) {
    util.setKeyExpiryInRedis(key(payuId, element.key), element.expiry);
  });
}

/**
 * Method to delet key from Redis
 *
 * @param {number} payuId
 * @param {string} keyName
 */
function deleteKeyInRedis(payuId, keyName) {
  util.deleteKeyInRedis(key(payuId, keyName))
}

/**
 * Method to validate statusCode passed based on Bank and Callback requirement
 *
 * @param {string} statusCode
 *
 * @returns {boolean} statusCodeValidity
 */
function isValidStatusCode(statusCode) {
  return upiConstant.statusCodeDesc.hasOwnProperty(statusCode);
}
function isValidActionType(statusCode) {
  return upiConstant.actionType.hasOwnProperty(statusCode);
}
function isValidStatusCode_axis(statusCode) {
  return upiConstant.statusCodeDesc_axis.hasOwnProperty(statusCode);
}

function isValidStatusCode_HdfcOTM(statusCode) {
  return upiConstant.statusCodeDesc_HDFCOTM.hasOwnProperty(statusCode);
}


function isValidStatusCode_Airtel(statusCode) {
  return upiConstant.statusCodeDesc_airtel.hasOwnProperty(statusCode);
}

function isValidStatusCode_ICICI(statusCode) {
  return upiConstant.statusCodeDesc_ICICI.hasOwnProperty(statusCode);
}

async function isValidMerchant(merchantId, PGVpa, Pg) {
  var flag;
  var result =  getMerchantVPAForMerchId(merchantId, PGVpa, Pg);
  if (result != null) {
    flag = true;
  }
  else
    {
      flag = false;
      res = await upiResponse.returnResponse("InvalidMerchantResponse");
      return res;
    }
  return await flag;
}

/**
 * Method to get bank name for VPA passed
 *
 * @param {string} vpa
 *
 * @returns {string} bankName
 */
function getBankNameForVpa(vpa) {
  if(vpa.endsWith("@axis") || vpa.endsWith("@axisbank")) {
    return upiConstant.Bank.AXIS;
  }
  else if(vpa.endsWith("@hdfc") || vpa.endsWith("@hdfcbank")) {
    return upiConstant.Bank.HDFC;
  }
  else if(vpa.endsWith("@indus") || vpa.endsWith("@indusbank")) {
    return upiConstant.Bank.INDUS;
  }
  else if(vpa.endsWith("@appl")) {
    return upiConstant.Bank.AIRTEL;
  }
  else if(vpa.endsWith("@icici") || vpa.endsWith("@icicibank")) {
    return upiConstant.Bank.ICICI;
  }
  return null;
}

/**
 * Method for AES encryption
 *
 * @param {string} algo
 * @param {string} encKey
 * @param {string} keyEncoding
 * @param {string} iv
 *  @param {string}ivEncoding
 * @param {boolean} padding
 * @param {string} data
 * @param {string} dataEncoding
 * @param {string} outputEncoding
 *
 * @returns {string} payuMerchantVpa
 */
function aesEncrypt(algo, encKey, keyEncoding, iv,ivEncoding, padding, data, dataEncoding, outputEncoding) {

  var cipher = crypto.createCipheriv(algo, new Buffer(encKey, keyEncoding), new Buffer(iv,ivEncoding)).setAutoPadding(padding);
  var response = cipher.update(data.toString(), dataEncoding, outputEncoding);
  response += cipher.final(outputEncoding);
  return response;
}

async function  validateUpiRequest   (req,MandatoryParamsType,VPA,merchantId,PGVpa,BankName,payuId,res,reqType,typeOfCall,reqMethod) {
  var result,response;
  if(reqMethod.method != 'POST')
  {
    response = "Unprocessable Entity";
    res.send(response);
  }
  if (!verifyMandatoryParams(req, MandatoryParamsType))
  {
    response = await upiResponse.returnResponse("MandatatoryParamsMissingResponse");
    res.send(response);
  }
  if(reqType.toString() === "ValidateVPA")
  {
    return (upiConstant.validVPAs.hasOwnProperty(VPA.toLowerCase()));
  }
  if (reqType != "Collect" && reqType != "Intent")
  {
     result =  await getValuesFromRedis(typeOfCall,payuId);
     return result;
 }
  if (reqType != "Intent" && !upiConstant.validVPAs.hasOwnProperty(VPA))
  {
    response =await upiResponse.returnResponse("InvalidVPAResponse");
    res.send(response);
  }
  result =  await redis.get(key(payuId, 'upiTxnId')).catch(function (error) {
    logger.info("[UPISetStatus] Error in fetching value from redis: " + error);
    res.status(500).send("Error occured while setting the transaction status for transaction " + payuId);
  });

  if (!result || result == null)
  {
    res = await upiResponse.returnResponse("NewTransaction");
    return res;
  }
  res = await upiResponse.returnResponse("DuplicateEntryinRedisResponse");
  return res;
}

/**
 * Method for AES decryption
 *
 * @param {string} algo
 * @param {string} encKey
 * @param {string} keyEncoding
 * @param {string} iv
 * @param {string} ivEncoding
 * @param {boolean} padding
 * @param {string} data
 * @param {string} dataEncoding
 * @param {string} outputEncoding
 * @returns {string} payuMerchantVpa
 */
 function aesDecrypt(algo, encKey, keyEncoding, iv, ivEncoding, padding, data, dataEncoding, outputEncoding) {
  var decipher = crypto.createDecipheriv(algo, new Buffer(encKey, keyEncoding), new Buffer(iv, ivEncoding)).setAutoPadding(padding);
  var response = decipher.update(data.toString(), dataEncoding, outputEncoding);
  response += decipher.final(outputEncoding);
  return response;
}

function dateTime()
{
  var localTime = moment();
  var time = localTime.format("HH:mm A");
  let utcTime = moment().utc();
  var date = utcTime.format('ll');
  var date_time=date +" " +time;
  return date_time;
}

function monthName(monthNum)
{
  return moment().month(monthNum-1).format("MMM")
}

/**
 * Method to return merchantVPA corresponding to the merchId passed
 *
 * @param {string} merchaIdId
 * @param {string} PGVpa
 * @param {string} Pg
 * @returns {string} merchantVPA
 */
 function getMerchantVPAForMerchId(merchaId, PGVpa, Pg) {
  var listOfVpa = Object.keys(PGVpa);
  for (var vpa of listOfVpa) {
    if ((Pg === 'axis' && PGVpa[vpa].merchId === merchaId) || PGVpa[vpa].pgMerchantId === merchaId || (Pg === 'airtel' && PGVpa[vpa].merchantId ==merchaId))
    {
      return vpa;
    }
  }
  return null;

}
async function encryptResponseforAirtel(dataToBeEncrypted,key)
{
  hashHex = crypto.createHash('sha512').update(dataToBeEncrypted).digest('hex');
  return hashHex;
}

async function encryptResponse(dataToBeEncrypted, pgMerchantId, algo, keyEncoding, iv, ivEncoding, padding, dataEncoding, outputEncoding, PGVpa, Pg,AggregatorMerchant,isCallback) {
  var encKey,ivKey,result;
  if (pgMerchantId)
  {
    encKey = PGVpa[await upi.getMerchantVPAForMerchId(pgMerchantId, PGVpa, Pg)].encKey;
  }
  if(iv != "")
  {
    encKey = hexToAscii(encKey);
    iv = hexToAscii(iv);
  }
  var encdata = upi.aesEncrypt(algo, encKey, keyEncoding, iv, ivEncoding, padding, dataToBeEncrypted, dataEncoding, outputEncoding);
  result=encdata;
  if (isCallback)
  {
    var result= {
      "pgMerchantId":pgMerchantId ,
      "payload": encdata,
      "keyId": 1,
      "ivToken": "835466BAF3BB4EDF82A9CE5ADBF25C04"
    }
  }
  return result;
}


async function decryptRequest(dataToBeDecrypted, pgMerchantId,algo,keyEncoding,iv, ivEncoding,padding, dataEncoding, outputEncoding, PGVpa, Pg,AggregatorMerchant) {
  var encKey = AggregatorMerchant.encKey;
  if (pgMerchantId)
  {
    var encKey = PGVpa[await upi.getMerchantVPAForMerchId(pgMerchantId, PGVpa, Pg)].encKey;
  }
   if(iv != '')
   {
     encKey = hexToAscii(encKey);
     var iv= hexToAscii(iv);
     dataToBeDecrypted = hexToAscii(dataToBeDecrypted);
   }
   var response =  upi.aesDecrypt(algo, encKey, keyEncoding, iv, ivEncoding, padding, dataToBeDecrypted, dataEncoding, outputEncoding);  if(Pg === "hdfc" && iv == '' )
  {
    return response.split("|");
  }
  return response;
}

function hexToAscii(inputData)
{
  var dataToBeReturned = '';
  for (var i = 0; i < inputData.length - 1; i += 2) {
    dataToBeReturned  = dataToBeReturned + String.fromCharCode((hexToDec(inputData[i] + inputData[i + 1])));
  }
  return dataToBeReturned;
}

function hexToDec(hexString)
{
  return parseInt(hexString,16);
}

module.exports = upi;
