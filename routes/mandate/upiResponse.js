var upiConstant = require('./constant'),
    util = require('./util');

var upiResponse = {
    returnResponse : returnResponse,
}

async function returnResponse(Type,receivedParams,result,txnStatusCode,collectTxnId,merchantVpa,rrnId,accNo,reqdate,hash)
{  var responseParams;
switch (Type) {
    case "MandatatoryParamsMissingResponse":
        responseParams = {
        "response": "NA",
        "merchantId": "NA",
        "terminalId": "NA",
        "success": "NA",
        "message": "Mandatory Parameters missing",
        "merchantTranId": "NA",
        "BankRRN": "NA",
        "customerVpa" : "NA",
        "remarks" : "NA"
    };
        break;
    case "InvalidPayuIdLength":
        responseParams = {
            "response": "NA",
            "merchantId": "NA",
            "terminalId": "NA",
            "success": "NA",
            "message": "Ivalid PayuId's Lenghth",
            "merchantTranId": "NA",
            "BankRRN": "NA",
            "customerVpa" : "NA",
            "remarks" : "NA"
        };
        break;
    case "IncorrectEncryptedResponse":
        responseParams ="178f1d5c89e7bed8e0bd969a3cc5c069a7ab21130137c44e8a6b044f9eebeed33197c9c5a88000513a4f16cb801ae01fc3d327bf88249325a9a98485611e632de66ccd3fa157474e30793aca60638295958c9fda943e9d9cbdbe3d5bb9b8640b1b2ced4138b96f57342be7fd5a88463aa5dcaf665d1ea2d8896b792a9cd0d97e5bd98e169b82165066783f7f6e0e9906c9b23cab0d9a71329aab98e40a97e6722dfe1348db42ea123facdf39314c32fafhnmsns123";
        break;
    case "WrongEncryptionLogic":
        responseParams = {
            "response": "NA",
            "merchantId": "NA",
            "terminalId": "NA",
            "success": "NA",
            "message": "Incorrect Encryption Logic",
            "merchantTranId": "NA",
            "BankRRN": "NA",
            "customerVpa" : "NA",
            "remarks" : "NA"
        };
        break;
    case "IncorrectFormatResponse":
        responseParams = "{\"curl_status\":\"SUCCESS\",\"result\":\"<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"[http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd]http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"><html xmlns=\"[http://www.w3.org/1999/xhtml\"><head]http://www.w3.org/1999/xhtml\"><head><META HTTP-EQUIV=\"CONTENT-TYPE\" CONTENT=\"TEXT/HTML; CHARSET=utf-8\"/><title>Error</title></head><body><H2>Error</H2><table summary=\"Error\" border=\"0\" bgcolor=\"#FEEE7A\" cellpadding=\"0\" cellspacing=\"0\" width=\"400\"><tr><td><table summary=\"Error\" border=\"0\" cellpadding=\"3\" cellspacing=\"1\"><tr valign=\"top\" bgcolor=\"#FBFFDF\" align=\"left\"><td><STRONG>Error</STRONG></td></tr><tr valign=\"top\" bgcolor=\"#FFFFFF\"><td>This page can't be displayed. Contact support for additional information.<br/>The incident ID is: N/A<br/>The Event ID is: 6MAESTROMAESTRO8.</td></tr></table></td></tr></table></body></html>\",\"curl_time\":0.049306}";
        break;
    case "InvalidMerchantResponse":
        responseParams = {
            "response": "NA",
            "merchantId": "NA",
            "terminalId": "NA",
            "success": "false",
            "message": "Invalid Merchant",
            "merchantTranId": "NA",
            "BankRRN": "NA",
            "customerVpa" : "NA",
            "remarks" : "NA"
        };
        break;
    case "InvalidVPAResponse":
        responseParams = {
            "response": "NA",
            "merchantId": "NA",
            "terminalId": "NA",
            "success": "false",
            "message": "Invalid VPA",
            "merchantTranId": "NA",
            "BankRRN": "NA",
            "customerVpa" : "NA",
            "remarks" : "NA"
        };
        break;
    case "DuplicateEntryinRedisResponse":
        responseParams = {
            "response": "NA",
            "merchantId": "NA",
            "terminalId": "NA",
            "success": "NA",
            "message": "Invalid  Request.  request already processed for transaction",
            "merchantTranId": "NA",
            "BankRRN": "NA",
            "customerVpa" : "NA",
            "remarks" : "NA"
        };
        break;
    case "CatchRedisErrorResponse":
        responseParams = {
            "response": "NA",
            "merchantId": "NA",
            "terminalId": "NA",
            "success": "false",
            "message": "Internal server error. Problem occurred while fetching values from redis",
            "merchantTranId": "NA",
            "BankRRN": "NA",
            "customerVpa" : "NA",
            "remarks" : "NA"
        };
        break;
    case "NewTransaction":
        responseParams = {
            "response": "NA",
            "merchantId": "NA",
            "terminalId": "NA",
            "success": "false",
            "message": "New transaction",
            "merchantTranId": "NA",
            "BankRRN": "NA",
            "customerVpa" : "NA",
            "remarks" : "NA"
        };
        break;
    case "IciciSuccessCollectResponse":
        responseParams = {
            "response": "92",
            "merchantId": receivedParams.merchantId,
            "terminalId": receivedParams.terminalId,
            "success": "true",
            "message": "Transaction initiated",
            "merchantTranId": receivedParams.merchantTranId,
            "BankRRN": rrnId,
            "customerVpa" : receivedParams.payerVa,
            "remarks" : receivedParams.note,
            "respCodeDescription" : "Collect Successfully Completed"
        };
        break;
    case "IciciVerifySuccessResponse":
        responseParams = {
            "response" : "0",
            "merchantId" : receivedParams.merchantId,
            "subMerchantId" : receivedParams.merchantId,
            "terminalId" : "5411",
            "OriginalBankRRN" : result[5][0],
            "merchantTranId" : receivedParams.merchantTranId,
            "Amount" : result[4][0],
            "success" : "true",
            "message" : upiConstant.statusCodeDesc_ICICI[txnStatusCode][1] ,
            "status" : upiConstant.statusCodeDesc_ICICI[txnStatusCode][4],
            "respCodeDescription" : upiConstant.statusCodeDesc_ICICI[txnStatusCode][5]
        };
        break;
        case "IciciVerifyFailedResponse":
        responseParams = {
            "response" : txnStatusCode[0],
            "merchantId" : receivedParams.merchantId,
            "subMerchantId" : receivedParams.merchantId,
            "terminalId" : "5411",
            "OriginalBankRRN" : result[5][0],
            "merchantTranId" : receivedParams.merchantTranId,
            "Amount" : result[4][0],
            "success" : "true",
            "message" : upiConstant.statusCodeDesc_ICICI[txnStatusCode][1] ,
            "status" : upiConstant.statusCodeDesc_ICICI[txnStatusCode][4],
            "respCodeDescription" : upiConstant.statusCodeDesc_ICICI[txnStatusCode][5]
        };
        break;
    case "IciciRedisEmpty":
    case "IciciSiEmptyRedis":
        responseParams = {
            "response": "92",
            "merchantId": receivedParams.merchantTranId,
            "subMerchantId": receivedParams.merchantTranId,
            "terminalId": receivedParams.terminalId,
            "OriginalBankRRN": "NA",
            "merchantTranId": receivedParams.merchantTranId,
            "Amount": "NA",
            "success": "NA",
            "message": "NA",
            "status": "NA"
        };
        break;
    case "IciciIntentSuccess":
        responseParams={
            "response" : txnStatusCode,
            "merchantId" : receivedParams.merchantId,
            "subMerchantId" : receivedParams.merchantId,
            "terminalId" : "5411",
            "OriginalBankRRN" : result[1],
            "merchantTranId" : payuId,
            "Amount" : result[4],
            "payerVA" : result[3],
            "success" : "true",
            "message" : upiConstant.statusCodeDesc_ICICI[txnStatusCode][1],
            "status" : upiConstant.statusCodeDesc_ICICI[txnStatusCode][2],
            "TxnInitDate" : "20160715142352",
            "TxnCompletionDate" : "20160715142352"
        };
        break;
    case "AxisCollectSuccessResponse":
        responseParams = {
            "code": "00",
            "result": "Accepted Collect Request",
            "data": {
                "merchTranId": receivedParams.unqtxnid,
                "wCollectTxnId": collectTxnId
            }
        };
    break;
    case "AxisVerifySuccessResponse":
        responseParams= {
            "data":[{
                "code": txnStatusCode[0],
                "result": upiConstant.statusCodeDesc_axis[txnStatusCode][0],
                "tranid": receivedParams.tranid,
                "refid": result[8][0],
                "dateTime": result[7][0],
                "amount": result[2][0],
                "debitVpa": result[0][0],
                "creditVpa": result[4][0],
                "status": upiConstant.statusCodeDesc_axis[txnStatusCode][2],
                "remarks": result[6][0],
                "txnid": "AXI91860545641453828461531422612197"

            }]
        };
        break;
    case "AxisRedisEmpty":
        responseParams = {
            "data":[{
                "code": "404",
                "result": upiConstant.statusCodeDesc_axis['404'][0],
                "tranid": receivedParams.tranid,
                "refid": "NA",
                "dateTime": "NA",
                "amount": "NA",
                "debitVpa": "NA",
                "creditVpa": "NA",
                "status": "NA",
                "remarks": "NA",
                "txnid": "NA"
            }]
        };
        break;
    case "hdfcCollectSuccessResponse":
        responseParams = {
            payuId: receivedParams[1],
            collectTxnId: collectTxnId,
            txnAmount: receivedParams[3],
            txnStatus: "SUCCESS",
            txnStatusDesc: "Transaction Collect request initiated successfully",
            customerVpa: receivedParams[2],
            merchantVpa: "NA",
            rrn: rrnId
        };
        break;
    case "hdfcTPVCollectSuccessResponse":
        responseParams = {
            payuId: receivedParams[1],
            collectTxnId: collectTxnId,
            txnAmount: receivedParams[3],
            txnStatus: "SUCCESS",
            txnStatusDesc: "Transaction Collect request initiated successfully",
            customerVpa: receivedParams[2],
            merchantVpa: merchantVpa,
            rrn: rrnId,
            AccountNo: receivedParams[13]
        };
        break;
    case "hdfcVerifySuccessResponse":
        responseParams = {
            upiTxnId: result[0][0],
            payuId: receivedParams[1],
            txnAmount: result[1][0],
            txnTime: result[2][0],
            txnStatus: upiConstant.statusCodeDesc[txnStatusCode][2],
            txnStatusDesc: upiConstant.statusCodeDesc[txnStatusCode][0],
            responseCode: txnStatusCode,
            approvalNo: "NA",
            customerVpa: result[3][0],
            custRefNo: result[4][0],
            accountDetails: upiConstant.validVPAs[result[3].toString().toLowerCase()][2] + upiConstant.validVPAs[result[3].toString().toLowerCase()][1],
            remarks: result[5][0],
            rrn: result[6][0],
            merchantVpa: merchantVpa
        };
        break;
    case "hdfcEmptyRedis":
        responseParams = {
            upiTxnId: "NA",
            payuId: receivedParams[1],
            txnAmount: "NA",
            txnTime: "NA",
            txnStatus: "FAILURE",
            txnStatusDesc: upiConstant.statusCodeDesc["AA1"][0],
            responseCode: upiConstant.statusCodeDesc["AA1"][2],//HDFC returns response code RNF
            approvalNo: "NA",
            customerVpa: "NA",
            custRefNo: "NA",
            accountDetails: "NA",
            remarks: "NA",
            rrn: "NA",
            merchantVpa: "NA"
        };
        break;
    case "hdfcTPVVerifySuccessResponse":
        responseParams = {
            upiTxnId: result[0][0],
            payuId: receivedParams[1],
            txnAmount: result[1][0],
            txnTime: result[2][0],
            txnStatus: upiConstant.statusCodeDesc[txnStatusCode][2],
            txnStatusDesc: upiConstant.statusCodeDesc[txnStatusCode][0],
            responseCode: txnStatusCode,
            approvalNo: "NA",
            customerVpa: result[3][0],
            custRefNo: result[4][0],
            accountDetails: upiConstant.validVPAs[result[3][0].toString().toLowerCase()][2] + upiConstant.validVPAs[result[3][0].toString().toLowerCase()][1],
            remarks: result[5][0],
            rrn: result[6][0],
            merchantVpa: merchantVpa,
            AccountNo: accNo[0][0]
        };
        break;
    case "hdfcTPVVerifyFailureResponse":
        responseParams = {
            upiTxnId: result[0][0],
            payuId: receivedParams[1],
            txnAmount: result[1][0],
            txnTime: result[2][0],
            txnStatus: upiConstant.statusCodeDesc[txnStatusCode][2],
            txnStatusDesc: upiConstant.statusCodeDesc[txnStatusCode][1],
            responseCode: txnStatusCode,
            approvalNo: "NA",
            customerVpa: result[3][0],
            custRefNo: result[4][0],
            accountDetails: upiConstant.validVPAs[result[3].toString().toLowerCase()][2] + upiConstant.validVPAs[result[3].toString().toLowerCase()][1],
            remarks: result[5][0],
            rrn: result[6][0],
            merchantVpa: merchantVpa,
            AccountNo: accNo[0][0]
        };
        break;
    case "IndusCollectSuccessResponse":
        responseParams = {
            payuId: receivedParams.requestInfo.pspRefNo,
            upiTxnId: collectTxnId,
            npciTxnId: rrnId,
            custRefNumber: Math.floor(collectTxnId / 2),
            txnAmount: receivedParams.amount,
            txnTime: upiConstant.startTime,
            statusCode: "S",
            statusCodeDesc: "Collect request initiated successfully",
            addInfo: {
                addInfo9: "NA",
                addInfo10:"NA"
            },
            customerVpa: receivedParams.payerType.virtualAddress,
            merchantVpa: merchantVpa,
            pgMerchantId: receivedParams.requestInfo.pgMerchantId
        };
        break;
    case "IndusVerifySuccessResponse":
        responseParams = {
            payuId: receivedParams.requestInfo.pspRefNo,
            upiTxnId: result[0][0],
            npciTxnId: result[1][0],
            custRefNumber: result[2][0],
            txnAmount: result[3][0],
            txnTime: result[4][0],
            txnStatusCode: txnStatusCode[0],
            txnStatusDesc: upiConstant.statusCodeDesc[txnStatusCode][0],
            approvalNo: util.generateRandomNumber(7),
            addInfo: {
                addInfo1: upiConstant.validVPAs[result[5].toString().toLowerCase()][1],
                addInfo2: upiConstant.validVPAs[result[5].toString().toLowerCase()][0],
                addInfo3: upiConstant.validVPAs[result[5].toString().toLowerCase()][2]
            },
            customerVpa: result[5][0],
            merchantVpa: merchantVpa
        };
        break;
    case "IndusEmptyRedisResponse":
        responseParams = {
            payuId: receivedParams.requestInfo.pspRefNo,
            upiTxnId: result[0][0],
            npciTxnId: "NA",
            custRefNumber: receivedParams.custRefNo,
            txnAmount: "NA",
            txnTime: "NA",
            txnStatusCode: "22",
            txnStatusDesc: upiConstant.statusCodeDesc["22"][0],
            approvalNo: "",
            custRefNo: "NA",
            addInfo: {
                addInfo1: "NA",
                addInfo2: "NA",
                addInfo3: "NA"
            },
            customerVpa: "",
            merchantVpa: merchantVpa
        };
        break;
    case "hdsiCollectSuccessResponse":
        responseParams = {
            "requestInfo": {
                "pgMerchantId": "HDFC000000000105",
                "pspRefNo": receivedParams.requestInfo.pspRefNo
            },
            "status": "S",
            "statusDesc": "Mandate request initiated successfully",
            "errCode": "MD200",
            "mandateDtls": [
                {
                    "custRefNo": collectTxnId,
                    "requestDate": reqdate,
                    "referenceNumber": receivedParams.requestInfo.pspRefNo,
                    "txnId": rrnId,
                    "remarks": "UPI Mandate",
                    "name": "Upi Mandate",
                    "mandateType": "CREATE",
                    "frequency":receivedParams.mandate.recurrence.pattern ,
                    "amount": receivedParams.mandate.amount,
                    "startDate": receivedParams.mandate.recurrence.startDate,
                    "endDate": receivedParams.mandate.recurrence.endDate,
                    "isRevokeable": receivedParams.mandate.revokeable,
                    "payerVPA": receivedParams.payerType.virtualAddress,
                    "payerName": receivedParams.payerType.name,
                    "payeeVPA": "payutest@hdfcbank",
                    "payeeName": "PayU Payments Private Limited",
                    "status": "PENDING",
                    "creditIfsc": "HDFC0000012",
                    "crediAccount": "0050200012103079",
                    "noOfDebit": 5,
                    "onBehalf_Of": "PAYEE",
                    "amt_rule": receivedParams.mandate.amt_rule,
                    "ruleType": receivedParams.mandate.recurrence.ruleType,
                    "ruleValue": receivedParams.mandate.recurrence.ruleValue,
                    "create_date_time": reqdate ,
                    "ref_url": "https://www.hdfc.co.in",
                    "errCode": "MD200",
                    "payType": "P2M",
                    "show_QR": "N",
                    "purpose_code": "14",
                    "mcc": "6012",
                    "message": "Mandate Request Initiated to NPCI",
                    "is_verified": false,
                    "blockFund": "N",
                    "initiatedBy": "PAYEE",
                    "nextRecurDate": reqdate,
                    "remRecuCount": 5,
                    "pydMobile": "919999900099"
                }
            ]
        };
        break;
    case "hdfcsiRecurSuccessResponse":
        responseParams = {
            "requestInfo": {
                "pgMerchantId": result[5][0],
                "pspRefNo": receivedParams.mandate.UMN + "exec"
            },
            "status": "I",
            "statusDesc": "Mandate Execution initiated to NPCI",
            "errCode": txnStatusCode,
            "mandateDtls": [
                {
                    "custRefNo": result[0][0],
                    "requestDate": result[9][0],
                    "referenceNumber": receivedParams.mandate.UMN,
                    "txnId": result[1][0],
                    "remarks": "UPI Mandate",
                    "name": "Upi Mandate",
                    "mandateType": "CREATE",
                    "frequency": result[6][0],
                    "amount": receivedParams.mandate.amount,
                    "startDate": result[9][0],
                    "endDate": result[10][0],
                    "UMN": receivedParams.mandate.UMN,
                    "isRevokeable": result[7][0],
                    "payerVPA": result[3][0],
                    "payerName": result[8][0],
                    "payeeVPA": "payutest@hdfcbank",
                    "payeeName": "PayU Payments Private Limited",
                    "status": "ACTIVE",
                    "debitIfsc": "HDFC0002373",
                    "debitAccount": "50100101672620",
                    "creditIfsc": "HDFC0000012",
                    "crediAccount": "0050200012103079",
                    "noOfDebit": 5,
                    "onBehalf_Of": "PAYEE",
                    "amt_rule": result[13][0],
                    "ruleType": result[12][0],
                    "ruleValue": result[11][0],
                    "create_date_time": result[9][0],
                    "ref_url": "https://www.hdfc.co.in",
                    "errCode": txnStatusCode,
                    "payType": "P2M",
                    "show_QR": "N",
                    "respCode": "00",
                    "purpose_code": "14",
                    "expire_time": "30",
                    "mcc": "6012",
                    "expiry_date_time": result[9][0],
                    "message":  upiConstant.statusCodeDesc_HDFCOTM[txnStatusCode][0],
                    "is_verified": false,
                    "initiatedBy": "PAYEE",
                    "nextRecurDate": result[9][0],
                    "remRecuCount": 5,
                    "pydMobile": "919999900099"
                }
            ]
        };
        break;
    case "hdfcsiRecurAdhocFreqSuceesResponse":
        responseParams = {
            "requestInfo": {
                "pgMerchantId": result[5][0],
                "pspRefNo": receivedParams.mandate.UMN + "exec"
            },
            "status": "I",
            "statusDesc": "Mandate Execution initiated to NPCI",
            "errCode": txnStatusCode,
            "mandateDtls": [
                {
                    "custRefNo": result[0][0],
                    "requestDate": result[9][0],
                    "referenceNumber": receivedParams.mandate.UMN,
                    "txnId": result[1][0],
                    "remarks": "UPI Mandate",
                    "name": "Upi Mandate",
                    "mandateType": "CREATE",
                    "frequency": result[6][0],
                    "amount": receivedParams.mandate.amount,
                    "startDate": result[9][0],
                    "endDate": result[10][0],
                    "UMN": receivedParams.mandate.UMN,
                    "isRevokeable": result[7][0],
                    "payerVPA": result[3][0],
                    "payerName": result[8][0],
                    "payeeVPA": "payutest@hdfcbank",
                    "payeeName": "PayU Payments Private Limited",
                    "status": "ACTIVE",
                    "debitIfsc": "HDFC0002373",
                    "debitAccount": "50100101672620",
                    "creditIfsc": "HDFC0000012",
                    "crediAccount": "0050200012103079",
                    "noOfDebit": 5,
                    "onBehalf_Of": "PAYEE",
                    "amt_rule": result[11][0],
                    "create_date_time": result[9][0],
                    "ref_url": "https://www.hdfc.co.in",
                    "errCode": txnStatusCode,
                    "payType": "P2M",
                    "show_QR": "N",
                    "purpose_code": "14",
                    "expire_time": "30",
                    "mcc": "6012",
                    "expiry_date_time": result[9][0],
                    "message": upiConstant.statusCodeDesc_HDFCOTM[txnStatusCode][0],
                    "is_verified": false,
                    "initiatedBy": "PAYEE",
                    "nextRecurDate": result[9][0],
                    "remRecuCount": 5,
                    "pydMobile": "919999900099"
                }
            ]
        };
        break;
    case "hdfcsiVerifyMandateStatusSuccessResponse":
        responseParams = {
            "requestInfo": {
                "pgMerchantId": result[11][0],
                "pspRefNo": receivedParams.mandate.orgPspRefNo
            },
            "status": "S",
            "statusDesc": "Request Processed Successfully",
            "mandateDtls": [
                {
                    "custRefNo": result[0][0],
                    "requestDate": result[6][0],
                    "referenceNumber": receivedParams.mandate.orgPspRefNo,
                    "txnId": result[1][0],
                    "mandateType": "CREATE",
                    "frequency": result[7][0],
                    "amount": result[5][0],
                    "startDate": result[6][0],
                    "endDate": result[8][0],
                    "UMN": receivedParams.mandate.orgPspRefNo,
                    "isRevokeable": result[9][0],
                    "payerVPA": result[3][0],
                    "payerName": result[4][0],
                    "payeeVPA": "payutest@hdfcbank",
                    "payeeName": "PayU Payments Private Limited",
                    "status": upiConstant.statusCodeDesc_HDFCOTM[txnStatusCode][3],
                    "debitIfsc": "HDFC0002373",
                    "debitAccount": "50100101672620",
                    "creditIfsc": "HDFC0002373",
                    "crediAccount": "50100100670905",
                    "noOfDebit": 0,
                    "onBehalf_Of": "PAYEE",
                    "amt_rule": result[10][0],
                    "has_update_authority": "Y",
                    "create_date_time": result[6][0],
                    "ref_url": "https://www.hdfc.co.in",
                    "errCode": txnStatusCode,
                    "payType": "P2M",
                    "show_QR": "N",
                    "purpose_code": "14",
                    "mcc": "6012",
                    "merchantType": "SMALL",
                    "message": upiConstant.statusCodeDesc_HDFCOTM[txnStatusCode][0],
                    "is_verified": false,
                    "blockFund": "N",
                    "initiatedBy": "PAYEE",
                    "remRecuCount": 0,
                    "orgTxnId": result[1][0]
                }
            ]
        };
        break;
    case "hdfcsiVerifyTransactionStatusSuccessResponse":
        responseParams = {
            "requestInfo": {
                "pgMerchantId": result[12][0],
                "pspRefNo": receivedParams.mandate.UMN
            },
            "status": "S",
            "statusDesc": "Mandate Executed Successfully",
            "mandateDtls": [
                {
                    "custRefNo": result[0][0],
                    "requestDate": result[6][0],
                    "txnId": result[1][0],
                    "remarks": "Upi Mandate",
                    "name": "Upi Mandate",
                    "frequency": result[7][0],
                    "amount": result[11][0],
                    "startDate": result[6][0],
                    "endDate": result[8][0],
                    "UMN": receivedParams.mandate.UMN,
                    "isRevokeable": result[9][0],
                    "payerVPA": result[3][0],
                    "payerName": result[4][0],
                    "payeeVPA": "payutest@hdfcbank",
                    "payeeName": "PayU Payments Private Limited",
                    "status": upiConstant.statusCodeDesc_HDFCOTM[txnStatusCode][4],
                    "debitIfsc": "HDFC0002373",
                    "debitAccount": "50100101672620",
                    "creditIfsc": "HDFC0002373",
                    "crediAccount": "50100100670905",
                    "noOfDebit": 1,
                    "onBehalf_Of": "PAYEE",
                    "amt_rule": result[10][0],
                    "create_date_time": result[6][0],
                    "ref_url": "https://www.hdfc.co.in",
                    "payType": "P2M",
                    "show_QR": "N",
                    "callback_type": "MANDATE_EXCECUTION",
                    "purpose_code": "14",
                    "merchantType": "SMALL",
                    "message": upiConstant.statusCodeDesc_HDFCOTM[txnStatusCode][0],
                    "is_verified": false,
                    "blockFund": "N",
                    "initiatedBy": "PAYEE",
                    "nextRecurDate": result[8][0],
                    "remRecuCount": 0,
                    "pydMobile": "919999900099",
                    "errCode": txnStatusCode,
                    "orgTxnId": result[1][0]
                }
            ]
        };

        break;
    case "hdfcsiEmptyRedis":
        responseParams = {
            "upiTxnId": "NA",
            "payuId" : receivedParams.mandate.UMN,
            "txnAmount": "NA",
            "txnTime": "NA",
            "txnStatus": "NA",
            "txnStatusDesc": upiConstant.statusCodeDesc_HDFCOTM["MD904"][0],
            "responseCode":  upiConstant.statusCodeDesc_HDFCOTM["MD904"][2] ,
            "approvalNo": "NA",
            "customerVpa": "NA",
            "custRefNo": "NA",
            "accountDetails": "NA",
            "remarks": "NA",
            "rrn": "NA",
            "merchantVpa": "NA"
        };
        break;
    case "hdfcsiRevokeSuccessResponse":
        responseParams = {
            "requestInfo": {
                "pgMerchantId": result[5][0],
                "pspRefNo": receivedParams.requestInfo.pspRefNo
            },
            "status": "S",
            "statusDesc": "Mandate has been revoked successfully",
            "errCode": "00",
            "mandateDtls": [
                {
                    "custRefNo": result[0][0],
                    "requestDate": reqdate,
                    "referenceNumber": receivedParams.requestInfo.pspRefNo,
                    "txnId": receivedParams.mandate.UMN,
                    "remarks": "UPI Mandate",
                    "name": "CREATE Mandate test",
                    "mandateType": "REVOKE",
                    "frequency": result[6][0],
                    "amount": result[4][0],
                    "startDate": result[9][0],
                    "endDate": result[10][0],
                    "UMN": receivedParams.mandate.UMN,
                    "isRevokeable": result[7][0],
                    "payerVPA": result[3][0],
                    "payerName": result[8][0],
                    "payeeVPA": "merchanttest@mybank",
                    "payeeName": "Merchant Payments Private Limited",
                    "status": "REVOKED",
                    "debitIfsc": "MYBANK0002373",
                    "debitAccount": "50100101674132",
                    "creditIfsc": "MYBANK0000012",
                    "crediAccount": "0050200012103079",
                    "noOfDebit": 3,
                    "onBehalf_Of": "PAYEE",
                    "amt_rule": result[13][0],
                    "ruleType": result[12][0],
                    "ruleValue": result[11][0],
                    "create_date_time": reqdate,
                    "ref_url": "https://www.mybank.co.in",
                    "errCode": txnStatusCode,
                    "respCode": "00",
                    "payType": "P2M",
                    "show_QR": "N",
                    "purpose_code": "14",
                    "mcc": "6012",
                    "merchantType": "SMALL",
                    "message": "APPROVED OR COMPLETED SUCCESSFULLY",
                    "is_verified": false,
                    "blockFund": "N"
                }
            ]
        };
        break;
    case "hdfcsiRevokeFailureResponse":
        responseParams = {
            "requestInfo": {
                "pgMerchantId": result[5],
                "pspRefNo": receivedParams.requestInfo.pspRefNo
            },
            "status": "F",
            "statusDesc": "Mandate has not been revoked successfully",
            "errCode": "00",
            "mandateDtls": [
                {
                    "custRefNo": result[0][0],
                    "requestDate": result[7][0],
                    "referenceNumber": receivedParams.requestInfo.pspRefNo,
                    "txnId": receivedParams.mandate.UMN,
                    "remarks": "UPI Mandate",
                    "name": "CREATE Mandate test",
                    "mandateType": "REVOKE",
                    "frequency": result[6][0],
                    "amount": result[4][0],
                    "startDate": result[9][0],
                    "endDate": result[10][0],
                    "UMN": receivedParams.mandate.UMN,
                    "isRevokeable": result[7][0],
                    "payerVPA": result[3][0],
                    "payerName": result[8][0],
                    "payeeVPA": "merchanttest@mybank",
                    "payeeName": "Merchant Payments Private Limited",
                    "status": "NOT REVOKED",
                    "debitIfsc": "MYBANK0002373",
                    "debitAccount": "50100101674132",
                    "creditIfsc": "MYBANK0000012",
                    "crediAccount": "0050200012103079",
                    "noOfDebit": 3,
                    "onBehalf_Of": "PAYEE",
                    "amt_rule": result[13][0],
                    "ruleType": result[12][0],
                    "ruleValue": result[11][0],
                    "create_date_time": result[9][0],
                    "ref_url": "https://www.mybank.co.in",
                    "errCode": txnStatusCode,
                    "respCode": "00",
                    "payType": "P2M",
                    "show_QR": "N",
                    "purpose_code": "14",
                    "mcc": "6012",
                    "merchantType": "SMALL",
                    "message": "NOT APPROVED OR COMPLETED SUCCESSFULLY",
                    "is_verified": false,
                    "blockFund": "N"
                }
            ]
        };
        break;
    case "hdfcsiAdhocFreqRevokeSuccessResponse":
        responseParams = {
            "requestInfo": {
                "pgMerchantId": result[5][0],
                "pspRefNo": receivedParams.requestInfo.pspRefNo
            },
            "status": "S",
            "statusDesc": "Mandate has been revoked successfully",
            "errCode": "00",
            "mandateDtls": [
                {
                    "custRefNo": result[0][0],
                    "requestDate": reqdate,
                    "referenceNumber": receivedParams.requestInfo.pspRefNo,
                    "txnId": receivedParams.mandate.UMN,
                    "remarks": "UPI Mandate",
                    "name": "CREATE Mandate test",
                    "mandateType": "REVOKE",
                    "frequency": result[6][0],
                    "amount": result[4][0],
                    "startDate": result[9][0],
                    "endDate": result[10][0],
                    "UMN": receivedParams.mandate.UMN,
                    "isRevokeable": result[7][0],
                    "payerVPA": result[3][0],
                    "payerName": result[8][0],
                    "payeeVPA": "merchanttest@mybank",
                    "payeeName": "Merchant Payments Private Limited",
                    "status": "REVOKED",
                    "debitIfsc": "MYBANK0002373",
                    "debitAccount": "50100101674132",
                    "creditIfsc": "MYBANK0000012",
                    "crediAccount": "0050200012103079",
                    "noOfDebit": 3,
                    "onBehalf_Of": "PAYEE",
                    "amt_rule": result[11][0],
                    "create_date_time": reqdate,
                    "ref_url": "https://www.mybank.co.in",
                    "errCode": txnStatusCode,
                    "respCode": "00",
                    "payType": "P2M",
                    "show_QR": "N",
                    "purpose_code": "14",
                    "mcc": "6012",
                    "merchantType": "SMALL",
                    "message": "APPROVED OR COMPLETED SUCCESSFULLY",
                    "is_verified": false,
                    "blockFund": "N"
                }
            ]
        };
        break;
    case "hdfcsiAdhocFreqRevokeFailureResponse":
        responseParams = {
            "requestInfo": {
                "pgMerchantId": result[5][0],
                "pspRefNo": receivedParams.requestInfo.pspRefNo
            },
            "status": "F",
            "statusDesc": "Mandate has not been revoked successfully",
            "errCode": "00",
            "mandateDtls": [
                {
                    "custRefNo": result[0][0],
                    "requestDate": result[7][0],
                    "referenceNumber": receivedParams.requestInfo.pspRefNo,
                    "txnId": receivedParams.mandate.UMN,
                    "remarks": "UPI Mandate",
                    "name": "CREATE Mandate test",
                    "mandateType": "REVOKE",
                    "frequency": result[6][0],
                    "amount": result[4][0],
                    "startDate": result[9][0],
                    "endDate": result[10][0],
                    "UMN": receivedParams.mandate.UMN,
                    "isRevokeable": result[7][0],
                    "payerVPA": result[3][0],
                    "payerName": result[8][0],
                    "payeeVPA": "merchanttest@mybank",
                    "payeeName": "Merchant Payments Private Limited",
                    "status": "NOT REVOKED",
                    "debitIfsc": "MYBANK0002373",
                    "debitAccount": "50100101674132",
                    "creditIfsc": "MYBANK0000012",
                    "crediAccount": "0050200012103079",
                    "noOfDebit": 3,
                    "onBehalf_Of": "PAYEE",
                    "amt_rule": result[11][0],
                    "create_date_time": result[7][0],
                    "ref_url": "https://www.mybank.co.in",
                    "errCode": txnStatusCode,
                    "respCode": "00",
                    "payType": "P2M",
                    "show_QR": "N",
                    "purpose_code": "14",
                    "mcc": "6012",
                    "merchantType": "SMALL",
                    "message": "NOT APPROVED OR COMPLETED SUCCESSFULLY",
                    "is_verified": false,
                    "blockFund": "N"
                }
            ]
        };
        break;
    case "hdfcsiNotifySuccessResponse":
        responseParams = {
            "requestInfo": {
                "pgMerchantId": result[5][0],
                "pspRefNo": receivedParams.mandate.UMN
            },
            "status": "S",
            "statusDesc": "Request Processed Successfully",
            "mandateDtls": [
                {
                    "custRefNo": result[0][0],
                    "requestDate": result[6][0],
                    "txnId": result[1][0],
                    "remarks": "UPI Mandate",
                    "frequency": result[9][0],
                    "amount": result[4][0],
                    "startDate": result[6][0],
                    "endDate": result[7][0],
                    "UMN": receivedParams.mandate.UMN,
                    "payerVPA": result[3][0],
                    "payerName": result[8][0],
                    "payeeVPA": "india.uber@mybank",
                    "payeeName": "UBER INDIA SYSTEMS PRIVATE LIMITED",
                    "status": "ACTIVE",
                    "noOfDebit": 0,
                    "remainingDebit": 0,
                    "onBehalf_Of": "PAYEE",
                    "message": "Mandate notification sent successfully",
                    "payType": "P2M",
                    "errCode": "00",
                    "nextRecurDate": result[6][0],
                    "remRecuCount": 0
                }
            ]
        };
        break;
    case "hdfcsiNotifyFailureResponse":
        responseParams = {
            "requestInfo": {
                "pgMerchantId": result[5][0],
                "pspRefNo": receivedParams.mandate.UMN
            },
            "status": "F",
            "statusDesc": "Request not Processed Successfully",
            "mandateDtls": [
                {
                    "custRefNo": result[0][0],
                    "requestDate": result[6][0],
                    "txnId": result[1][0],
                    "remarks": "UPI Mandate",
                    "frequency": result[9][0],
                    "amount": result[4][0],
                    "startDate": result[6][0],
                    "endDate": result[7][0],
                    "UMN": receivedParams.mandate.UMN,
                    "payerVPA": result[3][0],
                    "payerName": result[8][0],
                    "payeeVPA": "india.uber@mybank",
                    "payeeName": "UBER INDIA SYSTEMS PRIVATE LIMITED",
                    "status": "ACTIVE",
                    "noOfDebit": 0,
                    "remainingDebit": 0,
                    "onBehalf_Of": "PAYEE",
                    "message": "Mandate notification not sent successfully",
                    "payType": "P2M",
                    "errCode": "00",
                    "nextRecurDate": result[6][0],
                    "remRecuCount": 0
                }
            ]
        };
        break;
    case "hdfcsiModifySuccessResponse":
        responseParams = {
            "requestInfo": {
                "pgMerchantId": result[5][0],
                "pspRefNo": receivedParams.mandate.UMN
            },
            "status": "S",
            "statusDesc": "Mandate update request initiated",
            "errCode": txnStatusCode,
            "mandateDtls": [
                {
                    "custRefNo": result[0][0],
                    "requestDate": reqdate.slice(0, 3) + " " + reqdate.slice(4, 6) + ", " + reqdate.slice(8, 12),
                    "referenceNumber": receivedParams.mandate.UMN,
                    "txnId": receivedParams.mandate.txn_id,
                    "remarks": "Upi Mandate",
                    "name": "Upi Mandate",
                    "mandateType": receivedParams.action_type,
                    "frequency": result[6][0],
                    "amount": receivedParams.mandate.amount,
                    "startDate": result[13][0],
                    "endDate": receivedParams.mandate.endDate,
                    "UMN": receivedParams.mandate.UMN,
                    "isRevokeable": result[7][0],
                    "payerVPA": result[3][0],
                    "payerName": result[8][0],
                    "payeeVPA": result[9][0],
                    "payeeName": "PayU Payments Private Limited",
                    "status": "PENDING",
                    "debitIfsc": "HDFC0002373",
                    "debitAccount": "50100101672620",
                    "creditIfsc": "HDFC0002373",
                    "crediAccount": "50100100670905",
                    "noOfDebit": 14,
                    "onBehalf_Of": "PAYEE",
                    "amt_rule": result[10][0],
                    "ruleType": result[11][0],
                    "ruleValue": result[12][0],
                    "create_date_time": reqdate.slice(4, 6) + " " + reqdate.slice(0, 3) + " " + reqdate.slice(8, 12),
                    "ref_url": "https://www.hdfc.co.in",
                    "errCode": "MD200",
                    "payType": "P2M",
                    "show_QR": "N",
                    "purpose_code": "14",
                    "mcc": "6012",
                    "merchantType": "SMALL",
                    "message": "Mandate Update Request Initiated",
                    "is_verified": false,
                    "blockFund": "N",
                    "initiatedBy": "PAYEE",
                    "nextRecurDate": reqdate.slice(4, 6) + " " + reqdate.slice(0, 3) + " " + reqdate.slice(8, 12),
                    "remRecuCount": 14,
                    "pydMobile": "919999900099",
                    "orgTxnId": result[1][0]
                }
            ]
        };
        break;
    case "hdfcsiModifyFailureResponse":
        responseParams = {
            "requestInfo": {
                "pgMerchantId": result[5][0],
                "pspRefNo": receivedParams.mandate.UMN
            },
            "status": "F",
            "statusDesc": "Mandate update request  not initiated",
            "errCode": txnStatusCode,
            "mandateDtls": [
                {
                    "custRefNo": result[0][0],
                    "requestDate": reqdate.slice(0, 3) + " " + reqdate.slice(4, 6) + ", " + reqdate.slice(8, 12),
                    "referenceNumber": receivedParams.mandate.UMN,
                    "txnId": receivedParams.mandate.txn_id,
                    "remarks": "Upi Mandate",
                    "name": "Upi Mandate",
                    "mandateType": receivedParams.action_type,
                    "frequency": result[6][0],
                    "amount": receivedParams.mandate.amount,
                    "startDate": result[13][0],
                    "endDate": receivedParams.mandate.endDate,
                    "UMN": receivedParams.mandate.UMN,
                    "isRevokeable": result[7][0],
                    "payerVPA": result[3][0],
                    "payerName": result[8][0],
                    "payeeVPA": result[9][0],
                    "payeeName": "PayU Payments Private Limited",
                    "status": "FAILED",
                    "debitIfsc": "HDFC0002373",
                    "debitAccount": "50100101672620",
                    "creditIfsc": "HDFC0002373",
                    "crediAccount": "50100100670905",
                    "noOfDebit": 14,
                    "onBehalf_Of": "PAYEE",
                    "amt_rule": result[10][0],
                    "ruleType": result[11][0],
                    "ruleValue": result[12][0],
                    "create_date_time": reqdate.slice(4, 6) + " " + reqdate.slice(0, 3) + " " + reqdate.slice(8, 12),
                    "ref_url": "https://www.hdfc.co.in",
                    "errCode": "MD200",
                    "payType": "P2M",
                    "show_QR": "N",
                    "purpose_code": "14",
                    "mcc": "6012",
                    "merchantType": "SMALL",
                    "message": "Mandate Update Request Not Initiated",
                    "is_verified": false,
                    "blockFund": "N",
                    "initiatedBy": "PAYEE",
                    "nextRecurDate": reqdate.slice(4, 6) + " " + reqdate.slice(0, 3) + " " + reqdate.slice(8, 12),
                    "remRecuCount": 14,
                    "pydMobile": "919999900099",
                    "orgTxnId": result[1][0]
                }
            ]
        };
        break;
    case "hdfcsiAdhocFreqModifySuccessResponse":
        responseParams = {
            "requestInfo": {
                "pgMerchantId": result[5][0],
                "pspRefNo": receivedParams.mandate.UMN
            },
            "status": "S",
            "statusDesc": "Mandate update request initiated",
            "errCode": txnStatusCode,
            "mandateDtls": [
                {
                    "custRefNo": result[0][0],
                    "requestDate": reqdate.slice(0, 3) + " " + reqdate.slice(4, 6) + ", " + reqdate.slice(8, 12),
                    "referenceNumber": receivedParams.mandate.UMN,
                    "txnId": receivedParams.mandate.txn_id,
                    "remarks": "Upi Mandate",
                    "name": "Upi Mandate",
                    "mandateType": receivedParams.action_type,
                    "frequency": result[6][0],
                    "amount": receivedParams.mandate.amount,
                    "startDate": result[11] [0],
                    "endDate": receivedParams.mandate.endDate,
                    "UMN": receivedParams.mandate.UMN,
                    "isRevokeable": result[7][0],
                    "payerVPA": result[3][0],
                    "payerName": result[8][0],
                    "payeeVPA": result[9][0],
                    "payeeName": "PayU Payments Private Limited",
                    "status": "PENDING",
                    "debitIfsc": "HDFC0002373",
                    "debitAccount": "50100101672620",
                    "creditIfsc": "HDFC0002373",
                    "crediAccount": "50100100670905",
                    "noOfDebit": 14,
                    "onBehalf_Of": "PAYEE",
                    "amt_rule": result[10][0],
                    "create_date_time": reqdate.slice(4, 6) + " " + reqdate.slice(0, 3) + " " + reqdate.slice(8, 12),
                    "ref_url": "https://www.hdfc.co.in",
                    "errCode": "MD200",
                    "payType": "P2M",
                    "show_QR": "N",
                    "purpose_code": "14",
                    "mcc": "6012",
                    "merchantType": "SMALL",
                    "message": "Mandate Update Request Initiated",
                    "is_verified": false,
                    "blockFund": "N",
                    "initiatedBy": "PAYEE",
                    "nextRecurDate": reqdate.slice(4, 6) + " " + reqdate.slice(0, 3) + " " + reqdate.slice(8, 12),
                    "remRecuCount": 14,
                    "pydMobile": "919999900099",
                    "orgTxnId": "HDFAEB5127520A73B2CE0535DB2E20AA066"
                }
            ]
        };
        break;
    case "hdfcsiAdhocFreqModifyFailureResponse":
        responseParams = {
            "requestInfo": {
                "pgMerchantId": result[5][0],
                "pspRefNo": receivedParams.mandate.UMN
            },
            "status": "F",
            "statusDesc": "Mandate update request  not initiated",
            "errCode": txnStatusCode,
            "mandateDtls": [
                {
                    "custRefNo": result[0][0],
                    "requestDate": reqdate.slice(0, 3) + " " + reqdate.slice(4, 6) + ", " + reqdate.slice(8, 12),
                    "referenceNumber": receivedParams.mandate.UMN,
                    "txnId": receivedParams.mandate.txn_id,
                    "remarks": "Upi Mandate",
                    "name": "Upi Mandate",
                    "mandateType": receivedParams.action_type,
                    "frequency": result[6][0],
                    "amount": receivedParams.mandate.amount,
                    "startDate": result[11][0],
                    "endDate": receivedParams.mandate.endDate,
                    "UMN": receivedParams.mandate.UMN,
                    "isRevokeable": result[7][0],
                    "payerVPA": result[3][0],
                    "payerName": result[8][0],
                    "payeeVPA": result[9][0],
                    "payeeName": "PayU Payments Private Limited",
                    "status": "FAILED",
                    "debitIfsc": "HDFC0002373",
                    "debitAccount": "50100101672620",
                    "creditIfsc": "HDFC0002373",
                    "crediAccount": "50100100670905",
                    "noOfDebit": 14,
                    "onBehalf_Of": "PAYEE",
                    "amt_rule": result[10][0],
                    "create_date_time": reqdate.slice(4, 6) + " " + reqdate.slice(0, 3) + " " + reqdate.slice(8, 12),
                    "ref_url": "https://www.hdfc.co.in",
                    "errCode": "MD200",
                    "payType": "P2M",
                    "show_QR": "N",
                    "purpose_code": "14",
                    "mcc": "6012",
                    "merchantType": "SMALL",
                    "message": "Mandate Update Request Not Initiated",
                    "is_verified": false,
                    "blockFund": "N",
                    "initiatedBy": "PAYEE",
                    "nextRecurDate": reqdate.slice(4, 6) + " " + reqdate.slice(0, 3) + " " + reqdate.slice(8, 12),
                    "remRecuCount": 14,
                    "pydMobile": "919999900099",
                    "orgTxnId": "HDFAEB5127520A73B2CE0535DB2E20AA066"
                }
            ]
        };
        break;
    case "hdfcCallbackResponse" :
        responseParams = {
            upiTxnId: result[1],
            payuId: receivedParams.payuId,
            txnAmount: result[3],
            txnTime: result[2],
            txnStatus: txnStatusCode == "AA1" ? "FAILURE" : upiConstant.statusCodeDesc[txnStatusCode][2],
            txnStatusDesc: upiConstant.statusCodeDesc[txnStatusCode][0],
            responseCode: txnStatusCode == "AA1" ? upiConstant.statusCodeDesc[txnStatusCode][2] : txnStatusCode,
            approvalNo: "NA",
            customerVpa: result[0],
            custRefNo: result[5],
            accountDetails: upiConstant.validVPAs[result[0].toLowerCase()][2] + upiConstant.validVPAs[result[0].toLowerCase()][1],
            remarks: result[6],
            rrn: result[4],
            merchantVpa: result[7]
        };
        break;
    case "iciciCallbackResponse":
        responseParams ={
            "merchantId": result[11],
            "subMerchantId" : result[11],
            "terminalId": "5411",
            "BankRRN": result[5],
            "merchantTranId": receivedParams.payuId,
            "PayerName" : "AAAAA",
            "PayerMobile": "8879770059",
            "PayerVA": result[0],
            "PayerAmount": result[3],
            "TxnStatus": upiConstant.statusCodeDesc_ICICI[result[8]][2],
            "TxnInitDate": "20160715142352",
            "TxnCompletionDate": "20160715142352",
            "ResponseCode" : result[8],
            "RespCodeDescription" : upiConstant.statusCodeDesc_ICICI[result[8]][5]
        };
        break;
    case "axisCallbackResponse":
            responseParams={
            customerVpa: result[0],
            merchId: upiConstant.axismerchantVPAs[result[7]].merchId,
            merchChanId: upiConstant.axismerchantVPAs[result[7]].merchChanId,
            payuId: receivedParams.body.payuId,
            rrn: result[5],
            txnAmount: result[3],
            txnTime: result[2],
            collectTxnId: "AXI91860545641453828461531422612197",
            gatewayResCode: txnStatusCode,
            gatewayResMsg: receivedParams.responseParams ? upiConstant.statusCodeDesc_axis[txnStatusCode][1] : upiConstant.statusCodeDesc_axis[txnStatusCode][0]
        };
        break;
    case "indusCallbackResponse":
        responseParams = {
            payuId: receivedParams.payuId,
            upiTxnId: result[1],
            npciTxnId: result[4],
            custRefNumber: result[5],
            txnAmount: result[3],
            txnTime: result[2],
            txnStatusCode: txnStatusCode,
            txnStatusDesc: upiConstant.statusCodeDesc[txnStatusCode][0],
            approvalNo: util.generateRandomNumber(7),
            addInfo: {
                addInfo1: upiConstant.validVPAs[result[0].toLowerCase()][1],
                addInfo2: upiConstant.validVPAs[result[0].toLowerCase()][0],
                addInfo3: upiConstant.validVPAs[result[0].toLowerCase()][2]
            },
            remarks: result[6],
            customerVpa: result[0],
            merchantVpa: result[7]
        };
        break;
    case "hdfcSiCreateCallback":
        responseParams={
            "requestInfo": {
                "pgMerchantId": result[11],
                "pspRefNo": receivedParams.payuId,
            },
            "mandateDtls": [
                {
                    "custRefNo": result[1],
                    "requestDate": reqdate.slice(4,6) +" "+reqdate.slice(0,3) + " " +reqdate.slice(8,12) +" "+reqdate.slice(13,21),
                    "RefId": receivedParams.payuId,
                    "txnId": result[4],
                    "remarks": "UPI Mandate",
                    "name": "Upi Mandate",
                    "mandateType": "CREATE",
                    "frequency": result[13],
                    "amount": result[3],
                    "startDate": reqdate.slice(4,6)+" "+reqdate.slice(0,3)+" "+reqdate.slice(8,12),
                    "endDate": "20 Dec 2020",
                    "UMN": receivedParams.payuId,
                    "payerVPA":  result[0],
                    "payerName": result[10],
                    "payeeVPA": "payutest@hdfcbank",
                    "payeeName": "PayU Payments Private Limited",
                    "status": upiConstant.statusCodeDesc_HDFCOTM[txnStatusCode][3],
                    "statusDesc": upiConstant.statusCodeDesc_HDFCOTM[txnStatusCode][0],
                    "debitIfsc": "HDFC0002373",
                    "debitAccount": "50100101672620",
                    "creditIfsc": "HDFC0000012",
                    "crediAccount": "0050200012103079",
                    "noOfDebit": 5,
                    "onBehalf_Of": "PAYEE",
                    "amt_rule": result[12],
                    "has_update_authority": "Y",
                    "create_date_time": reqdate.slice(4,6) +" "+reqdate.slice(0,3) + " " +reqdate.slice(8,12) +" "+reqdate.slice(13,21),
                    "ref_url": "https://www.hdfc.co.in",
                    "errCode": txnStatusCode,
                    "respCode": "00",
                    "payType": "P2M",
                    "show_QR": "N",
                    "callback_type": "MANDATE_STATUS",
                    "purpose_code": "14",
                    "merchantType": "SMALL",
                    "message": upiConstant.statusCodeDesc_HDFCOTM[txnStatusCode][0],
                    "is_verified": false,
                    "blockFund": "N",
                    "initiatedBy": "PAYEE",
                    "nextRecurDate": reqdate.slice(4,6) +" "+reqdate.slice(0,3) + " " +reqdate.slice(8,12) +" "+reqdate.slice(13,21),
                    "remRecuCount": 5,
                    "pydMobile": "919999900099",
                    "orgTxnId": result[4]
                }
            ]
        };
        break;
    case "hdfcSiRecurPayCallback":
        responseParams={
            "requestInfo": {
                "pgMerchantId": result[11],
                "pspRefNo": receivedParams.pspRefNo
            },
            "mandateDtls": [
                {
                    "custRefNo": result[1],
                    "requestDate": reqdate.slice(4,6) +" "+reqdate.slice(0,3) + " " +reqdate.slice(8,12) +" "+reqdate.slice(13,21),
                    "txnId": result[4],
                    "remarks": "UPI Mandate",
                    "name": "Upi Mandate",
                    "frequency": result[13],
                    "amount": result[15],
                    "startDate": reqdate.slice(4,6)+" "+reqdate.slice(0,3)+" "+reqdate.slice(8,12),
                    "endDate": "20 Dec 2020",
                    "UMN": receivedParams.payuId,
                    "isRevokeable": result[14],
                    "payerVPA": result[0],
                    "payerName": result[10],
                    "payeeVPA": "payutest@hdfcbank",
                    "payeeName": "PayU Payments Private Limited",
                    "status": upiConstant.statusCodeDesc_HDFCOTM[txnStatusCode][4],
                    "statusDesc": upiConstant.statusCodeDesc_HDFCOTM[txnStatusCode][1],
                    "debitIfsc": "HDFC0002373",
                    "debitAccount": "50100101672620",
                    "creditIfsc": "HDFC0000012",
                    "crediAccount": "0050200012103079",
                    "noOfDebit": 5,
                    "onBehalf_Of": "PAYEE",
                    "amt_rule": result[12],
                    "create_date_time": reqdate.slice(4,6) +" "+reqdate.slice(0,3) + " " +reqdate.slice(8,12) +" "+reqdate.slice(13,21),
                    "ref_url": "https://www.hdfc.co.in",
                    "payType": "P2M",
                    "errCode": txnStatusCode,
                    "respCode": "VF",
                    "show_QR": "N",
                    "callback_type": "MANDATE_EXCECUTION",
                    "purpose_code": "14",
                    "merchantType": "SMALL",
                    "message": upiConstant.statusCodeDesc_HDFCOTM[txnStatusCode][1],
                    "is_verified": false,
                    "blockFund": "N",
                    "initiatedBy": "PAYEE",
                    "nextRecurDate": reqdate.slice(4,6) +" "+reqdate.slice(0,3) + " " +reqdate.slice(8,12) +" "+reqdate.slice(13,21),
                    "remRecuCount": 4,
                    "pydMobile": "919999900099",
                    "orgTxnId": result[4]
                }
            ]
        };
        break;
    case "hdfcSiRevokeCallback":
        responseParams = {
            "requestInfo": {
                "pgMerchantId": result[11],
                "pspRefNo": receivedParams.payuId
            },
            "mandateDtls": [
                {
                    "custRefNo": result[1],
                    "requestDate": reqdate.slice(4,6) +" "+reqdate.slice(0,3) + " " +reqdate.slice(8,12) +" "+reqdate.slice(13,21),
                    "referenceNumber": receivedParams.payuId,
                    "txnId": result[4],
                    "remarks": "UPI Mandate",
                    "name": "Upi Mandate",
                    "mandateType": "REVOKE",
                    "frequency": result[13],
                    "amount": result[3],
                    "startDate": reqdate.slice(4,6)+" "+reqdate.slice(0,3)+" "+reqdate.slice(8,12),
                    "endDate": "20 Dec 2020",
                    "UMN": receivedParams.payuId,
                    "isRevokeable": result[14],
                    "payerVPA": result[0],
                    "payerName": result[10],
                    "payeeVPA": "payutest@hdfcbank",
                    "payeeName": "PayU Payments Private Limited",
                    "status": upiConstant.statusCodeDesc_HDFCOTM[txnStatusCode][7],
                    "statusDesc": "Request Processed Successfully",
                    "debitIfsc": "HDFC0002373",
                    "debitAccount": "50100101672620",
                    "creditIfsc": "HDFC0000012",
                    "crediAccount": "0050200012103079",
                    "noOfDebit": 6,
                    "onBehalf_Of": "PAYEE",
                    "amt_rule": result[12],
                    "has_update_authority": "Y",
                    "create_date_time": reqdate.slice(4,6) +" "+reqdate.slice(0,3) + " " +reqdate.slice(8,12) +" "+reqdate.slice(13,21),
                    "ref_url": "https://www.hdfc.co.in",
                    "payType": "P2M",
                    "show_QR": "N",
                    "callback_type": "MANDATE_STATUS",
                    "purpose_code": "14",
                    "merchantType": "SMALL",
                    "errCode": txnStatusCode,
                    "message":upiConstant.statusCodeDesc_HDFCOTM[txnStatusCode][9] ,
                    "is_verified": false,
                    "blockFund": "N",
                    "initiatedBy": "PAYEE",
                    "nextRecurDate": reqdate.slice(4,6) +" "+reqdate.slice(0,3) + " " +reqdate.slice(8,12) +" "+reqdate.slice(13,21),
                    "remRecuCount": 6
                }
            ]
        };
        break;
    case "hdfcSiUnpauseCallback":
        responseParams = {
            "requestInfo":{
                "pgMerchantId":result[11],
                "pspRefNo":receivedParams.payuId
            },
            "mandateDtls":[
                {
                    "custRefNo":result[1],
                    "requestDate":reqdate.slice(4,6) +" "+reqdate.slice(0,3) + " " +reqdate.slice(8,12) +" "+reqdate.slice(13,21),
                    "referenceNumber":receivedParams.payuId,
                    "txnId": result[4],
                    "remarks":"UPI Mandate",
                    "name":"Upi Mandate",
                    "mandateType":"UNPAUSE",
                    "frequency":result[13],
                    "amount":result[3],
                    "startDate": reqdate.slice(4,6)+" "+reqdate.slice(0,3)+" "+reqdate.slice(8,12),
                    "endDate":"20 Dec 2025",
                    "UMN":receivedParams.payuId,
                    "isRevokeable":result[14],
                    "payerVPA":"aastha@hdfcbank",
                    "payerName":result[10],
                    "payeeVPA":"payutest@hdfcbank",
                    "payeeName":"PayU Payments Private Limited",
                    "status": upiConstant.statusCodeDesc_HDFCOTM[txnStatusCode][5],
                    "statusDesc":"Request Processed Successfully",
                    "debitIfsc":"HDFC0002373",
                    "debitAccount":"50100101672620",
                    "creditIfsc":"HDFC0000012",
                    "crediAccount":"0050200012103079",
                    "noOfDebit":6,
                    "onBehalf_Of":"PAYEE",
                    "amt_rule":"MAX",
                    "has_update_authority":"Y",
                    "create_date_time":reqdate.slice(4,6) +" "+reqdate.slice(0,3) + " " +reqdate.slice(8,12) +" "+reqdate.slice(13,21),                    "ref_url":"https://www.hdfc.co.in",
                    "payType":"P2M",
                    "show_QR":"N",
                    "callback_type":"MANDATE_STATUS",
                    "purpose_code":"14",
                    "merchantType":"SMALL",
                    "message": upiConstant.statusCodeDesc_HDFCOTM[txnStatusCode][10],
                    "is_verified":false,
                    "blockFund":"N",
                    "initiatedBy":"PAYEE",
                    "errCode": txnStatusCode,
                    "nextRecurDate":reqdate.slice(4,6) +" "+reqdate.slice(0,3) + " " +reqdate.slice(8,12) +" "+reqdate.slice(13,21),
                    "remRecuCount":6,
                    "isPause":"Y"
                }
            ]
        };
        break;
    case "hdfcSiPauseCallback":
        responseParams = {
            "requestInfo":{
                "pgMerchantId":result[11],
                "pspRefNo":receivedParams.payuId
            },
            "mandateDtls":[
                {
                    "custRefNo":result[1],
                    "requestDate":reqdate.slice(4,6) +" "+reqdate.slice(0,3) + " " +reqdate.slice(8,12) +" "+reqdate.slice(13,21),
                    "referenceNumber":receivedParams.payuId,
                    "txnId": result[4],
                    "remarks":"UPI Mandate",
                    "name":"Upi Mandate",
                    "mandateType":"PAUSE",
                    "frequency":result[13],
                    "amount":result[3],
                    "startDate": reqdate.slice(4,6)+" "+reqdate.slice(0,3)+" "+reqdate.slice(8,12),
                    "endDate":"20 Dec 2020",
                    "UMN":receivedParams.payuId,
                    "isRevokeable": result[14],
                    "errCode": txnStatusCode,
                    "payerVPA":result[0],
                    "payerName":result[10],
                    "payeeVPA":"payutest@hdfcbank",
                    "payeeName":"PayU Payments Private Limited",
                    "status": upiConstant.statusCodeDesc_HDFCOTM[txnStatusCode][6],
                    "statusDesc":"Request Processed Successfully",
                    "debitIfsc":"HDFC0002373",
                    "debitAccount":"50100101672620",
                    "creditIfsc":"HDFC0000012",
                    "crediAccount":"0050200012103079",
                    "noOfDebit":6,
                    "onBehalf_Of":"PAYEE",
                    "amt_rule":result[12],
                    "has_update_authority":"Y",
                    "create_date_time":reqdate.slice(4,6) +" "+reqdate.slice(0,3) + " " +reqdate.slice(8,12) +" "+reqdate.slice(13,21),                    "ref_url":"https://www.hdfc.co.in",
                    "payType":"P2M",
                    "show_QR":"N",
                    "callback_type":"MANDATE_STATUS",
                    "purpose_code":"14",
                    "merchantType":"SMALL",
                    "message": upiConstant.statusCodeDesc_HDFCOTM[txnStatusCode][8],
                    "is_verified":false,
                    "blockFund":"N",
                    "initiatedBy":"PAYEE",
                    "nextRecurDate":reqdate.slice(4,6) +" "+reqdate.slice(0,3) + " " +reqdate.slice(8,12) +" "+reqdate.slice(13,21),
                    "remRecuCount":6,
                    "isPause":"Y"
                }
            ]
        };
        break;
    case "hdfcSiUpdateCallback":
        responseParams = {
            "requestInfo": {
                "pgMerchantId": result[11],
                "pspRefNo": receivedParams.payuId
            },
            "mandateDtls": [
                {
                    "custRefNo": result[1],
                    "requestDate": reqdate.slice(4,6) +" "+reqdate.slice(0,3) + " " +reqdate.slice(8,12) +" "+reqdate.slice(13,21),
                    "RefId": receivedParams.payuId,
                    "txnId": result[4],
                    "remarks": "Upi Mandate",
                    "name": "Upi Mandate",
                    "mandateType": "UPDATE",
                    "frequency": result[13],
                    "amount": result[3],
                    "startDate": reqdate.slice(4,6)+" "+reqdate.slice(0,3)+" "+reqdate.slice(8,12),
                    "endDate": result[18],
                    "UMN": receivedParams.payuId,
                    "isRevokeable": result[14],
                    "payerVPA": result[0],
                    "payerName": result[10],
                    "payeeVPA": "payutest@hdfcbank",
                    "payeeName": "PayU Payments Private Limited",
                    "status":  upiConstant.statusCodeDesc_HDFCOTM[txnStatusCode][3],
                    "statusDesc": "Request Processed Successfully",
                    "debitIfsc": "HDFC0002373",
                    "debitAccount": "50100101672620",
                    "creditIfsc": "HDFC0002373",
                    "crediAccount": "50100100670905",
                    "noOfDebit": 2,
                    "onBehalf_Of": "PAYEE",
                    "amt_rule": result[12],
                    "ruleType": result[16],
                    "ruleValue": result[17],
                    "has_update_authority": "Y",
                    "create_date_time": reqdate.slice(4,6) +" "+reqdate.slice(0,3) + " " +reqdate.slice(8,12) +" "+reqdate.slice(13,21),
                    "ref_url": "https://www.hdfc.co.in",
                    "errCode": "00",
                    "respCode": "00",
                    "payType": "P2M",
                    "show_QR": "N",
                    "callback_type": "MANDATE_STATUS",
                    "purpose_code": "14",
                    "merchantType": "SMALL",
                    "message": "APPROVED OR COMPLETED SUCCESSFULLY",
                    "is_verified": false,
                    "blockFund": "N",
                    "initiatedBy": "PAYEE",
                    "nextRecurDate": reqdate.slice(4,6) +" "+reqdate.slice(0,3) + " " +reqdate.slice(8,12) +" "+reqdate.slice(13,21),
                    "remRecuCount": 2,
                    "pydMobile": "919999900099",
                    "orgTxnId": result[4]
                }
            ]
        };
        break;
    case "bobCollectResponseInvalidVpa":
         responseParams = {
            tranhashkey: util.generateRandom(8,"A#") + "-" + util.generateRandom(8,"A#"),
            error_code_tag: "IPAY0200005 - UPI VPA Address in invalid.",
            error_text: "IPAY0200005 - UPI VPA Address in invalid.",
            payid: util.generateRandomNumber(18),
            trackid: receivedParams.request.action[0],
            amt: data.request.amt[0],
            udf11: data.request.amt[0],
            type: "",
            card: ""
        }
        break;
    case "bobCollectSuccessResponse":
         responseParams = [
            {
                tranhashkey: util.generateRandom(8, "A#") + "-" + util.generateRandom(8, "A#"),
                result: "CAPTURED",
                ref: util.generateRandomNumber(12),
                postdate: new Date(),
                payid: util.generateRandomNumber(18),
                tranid: util.generateRandomNumber(15),
                amt: receivedParams.request.amt[0],
                trackid: receivedParams.request.trackid[0],
                udf11: receivedParams.request.amt[0],
                type: "",
                card: receivedParams.request.card[0]
            },

            {
                tranhashkey: util.generateRandom(8, "A#") + "-" + util.generateRandom(8, "A#"),
                result: "NOT CAPTURED",
                ref: util.generateRandomNumber(12),
                postdate: new Date(),
                payid: util.generateRandomNumber(18),
                tranid: util.generateRandomNumber(15),
                amt: receivedParams.request.amt[0],
                trackid: receivedParams.request.trackid[0],
                udf11: receivedParams.request.amt[0],
                type: "",
                card: receivedParams.request.card[0]
            },

            {
                tranhashkey: util.generateRandom(8, "A#") + "-" + util.generateRandom(8, "A#"),                //"KNSQ5OPH-C7AUOV2",
                result: "TIMEOUT",
                ref: util.generateRandomNumber(12),
                postdate: new Date(),
                payid: util.generateRandomNumber(18),
                tranid: util.generateRandomNumber(15),
                amt: receivedParams.request.amt[0],
                trackid: receivedParams.request.trackid[0],
                udf11: receivedParams.request.amt[0],
                type: "",
                card: receivedParams.request.card[0]
            }
        ]
        break;
    case "bobVerifySuccessResponse":
        responseParams = [
            {
                result: "SUCCESS",
                ref: util.generateRandomNumber(12),
                avr: "N",
                postdate: reqdate,
                tranid: util.generateRandomNumber(15),
                trackid: receivedParams.request.trackid[0],
                payid: util.generateRandomNumber(18),
                udf11: receivedParams.request.amt[0],
                amt: receivedParams.request.amt[0]
            },
            {
                result: "FAILURE",
                ref: util.generateRandomNumber(12),
                avr: "N",
                postdate: reqdate,
                tranid: util.generateRandomNumber(15),
                trackid: receivedParams.request.trackid[0],
                payid: util.generateRandomNumber(18),
                udf11: receivedParams.request.amt[0],
                amt: receivedParams.request.amt[0]
            }
        ]
        break;
    case "indusUnautorisedResponse":
        responseParams = {
            payuId: "NA",
            upiTxnId: "NA",
            npciTxnId: "NA",
            custRefNumber: "NA",
            txnAmount: "NA",
            txnTime: "NA",
            statusCode: "F",
            statusCodeDesc: "Unauthorized request",
            addInfo: {
                addInfo9: "NA",
                addInfo10:"NA"
            },
            customerVpa: "NA",
            merchantVpa: "NA",
            pgMerchantId: "NA"
        };
        break;
    case "hdfcVpaValidationResponse":
        responseParams = {
            requestId: receivedParams[1],
            customerVpa: receivedParams[2],
            customerName: merchantVpa,
            verificationStatus: txnStatusCode,
            verificationStatusMessage: txnStatusCode
        };
        break;
    case "axisValidateVpaResponse":
        responseParams = {
            code: txnStatusCode,
            result: receivedParams,
            customerName: merchantVpa
        };
        break;
    case "axisChecksumMismatch":
          responseParams = {"code":"U15","result":"CHECKSUM FAILED","data":"Checksum mismatch"};
         break;
    case "tezOmniInvalidUserResponse":
        responseParams = {
            "error":{
                "code":404,
                "message":"User is not a valid Google Pay user",
                "status":"NOT_FOUND"
            }
        };
        break;
    case "tezOmniRedisHandling":
        responseParams = {
            payuId: receivedParams.merchantTransactionDetails.transactionId,
            collectTxnId: "NA",
            txnAmount: "NA",
            txnStatus: "FAILURE",
            txnStatusDesc: "Internal server error. Problem occurred while fetching values for " +receivedParams.merchantTransactionDetails.transactionId,
            customerVpa: result,
            merchantVpa: merchantVpa,
            rrn: "NA"
        };
        break;
    case "IntentTPVSuccessResponse":
        responseParams = {
            payuId: receivedParams[1],
            txnStatus: "SUCCESS",
            txnStatusDesc: "Transaction initiated successfully.",
            MEBR: "MEBR",
            collectTxnId: collectTxnId,
            txnAmount: receivedParams[8],
            merchantVpa: merchantVpa,
            AccountNo: receivedParams[15],
            rrn: rrnId
        };
        break;
    case "IciciSiSuccessCollectResponse":
        responseParams={
            "response": "92",
            "merchantId":  receivedParams.merchantId,
            "subMerchantId": receivedParams.merchantId,
            "terminalId":  receivedParams.terminalId,
            "success": "true",
            "message": "Transaction Initiated",
            "merchantTranId": receivedParams.merchantTranId,
            "BankRRN": rrnId
        };
        break;
    case "IciciSiCreateVerifySuccessResponse":
        responseParams={
            "subMerchantId": receivedParams.merchantId,
            "merchantId": receivedParams.merchantId,
            "response": "0",
            "success": "true",
            "OriginalBankRRN": result[0][0],
            "terminalId": receivedParams.terminalId,
            "message": "Transaction Successful",
            "merchantTranId": receivedParams.merchantTranId,
            "status": upiConstant.statusCodeDesc_ICICI[txnStatusCode][3],
            "Amount": result[6][0],
            "TxnInitDate": result[4][0],
            "TxnCompletionDate": result[6][0],
            "payerVA": result[3][0],
            "UMN": receivedParams.merchantTranId,
            "respCodeDescription" : upiConstant.statusCodeDesc_ICICI[txnStatusCode][5]
        };
        break;
    case "IciciSiExecuteVerifySuccessResponse" :
        responseParams= {
        "subMerchantId": receivedParams.merchantId,
        "merchantId": receivedParams.merchantId,
        "response": txnStatusCode,
        "success": "true",
        "OriginalBankRRN":  result[0][0],
        "terminalId": receivedParams.terminalId,
        "message": "Transaction Successful",
        "merchantTranId": receivedParams.merchantTranId,
        "status": upiConstant.statusCodeDesc_ICICI[txnStatusCode][4],
        "Amount":  result[7][0],
        "TxnInitDate": result[4][0],
        "TxnCompletionDate": result[6][0],
        "respCodeDescription" : upiConstant.statusCodeDesc_ICICI[txnStatusCode][5],
        "payerVA": receivedParams.merchantTranId.toString().replace('exec','')
    };
        break;
    case "IciciSiExecuteSuccessResponse":
        responseParams= {
            "response": txnStatusCode[0],
            "merchantId": receivedParams.merchantId,
            "subMerchantId": receivedParams.merchantId,
            "terminalId": receivedParams.terminalId,
            "success": "true",
            "message": "Transaction Initiated",
            "merchantTranId": receivedParams.merchantTranId,
            "BankRRN": result[1][0],
            "respCodeDescription" : upiConstant.statusCodeDesc_ICICI[txnStatusCode][5]
        };
        break;
    case "IciciSiCreationCallback" :
        responseParams ={
            "TxnStatus": upiConstant.statusCodeDesc_ICICI[txnStatusCode][3],
            "subMerchantId": result[11],
            "PayerAmount": result[3],
            "ResponseCode": txnStatusCode,
            "PayerName": result[0],
            "terminalId": result[19],
            "TxnInitDate": reqdate,
            "merchantTranId": receivedParams.payuId ,
            "PayerMobile": "8135200014",
            "UMN": receivedParams.payuId ,
            "BankRRN": result[4],
            "merchantId":result[11],
            "PayerVA": result[0],
            "TxnCompletionDate": result[18],
            "RespCodeDescription" : upiConstant.statusCodeDesc_ICICI[txnStatusCode][5]
        };
        break;
    case "IciciSiExecutionCallback":
        responseParams ={
            "TxnStatus": upiConstant.statusCodeDesc_ICICI[txnStatusCode][4],
            "subMerchantId": result[11],
            "PayerAmount": result[15],
            "ResponseCode": txnStatusCode,
            "PayerName": result[0],
            "terminalId": result[19],
            "TxnInitDate": reqdate,
            "merchantTranId": result[6]+"exec" ,
            "PayerMobile": "8135200014",
            "UMN": receivedParams.payuId ,
            "BankRRN": result[4],
            "merchantId":result[11],
            "PayerVA": result[0],
            "TxnCompletionDate": result[18],
            "respCodeDescription" : upiConstant.statusCodeDesc_ICICI[txnStatusCode][5]
        };
        break;
    case "IciciSiNotifyResponse":
        responseParams ={
            "response" : txnStatusCode,
            "merchantId" : receivedParams.merchantId,
            "subMerchantId" : receivedParams.merchantId,
            "terminalId" : receivedParams.terminalId,
            "BankRRN" : result[1][0],
            "merchantTranId" : receivedParams.merchantTranId,
            "amount" : receivedParams.amount,
            "success" : "true",
            "message" : upiConstant.statusCodeDesc_ICICI[txnStatusCode][5]
        };
        break;
    case "IciciSiRevokeResponse":
        responseParams ={
            "response": txnStatusCode,
            "merchantId": receivedParams.merchantId,
            "subMerchantId": receivedParams.merchantId,
            "terminalId": receivedParams.terminalId,
            "Amount": receivedParams.amount,
            "success": "true",
            "message": upiConstant.statusCodeDesc_ICICI[txnStatusCode][5],
            "merchantTranId": receivedParams.merchantTranId,
            "BankRRN": "asdfasdfasdfsadf"
        };
        break;
    case "IciciSiRevokeResponseFail":
        responseParams ={
            "response": txnStatusCode,
            "merchantId": receivedParams.merchantId,
            "subMerchantId": receivedParams.merchantId,
            "terminalId": receivedParams.terminalId,
            "Amount": receivedParams.amount,
            "success": "false",
            "message": "Mandate has not been revoked successfully",
            "merchantTranId": receivedParams.merchantTranId,
            "BankRRN": result[1][0]
        };
        break;
    case "IciciRevokeCallbackResponse" :
        responseParams ={
            "TxnStatus": upiConstant.statusCodeDesc_ICICI[txnStatusCode][6],
            "subMerchantId": result[11],
            "PayerAmount": result[15],
            "ResponseCode": txnStatusCode,
            "PayerName": result[0],
            "terminalId": result[19],
            "TxnInitDate": reqdate,
            "merchantTranId": receivedParams.payuId ,
            "PayerMobile": "8135200014",
            "UMN": receivedParams.payuId ,
            "BankRRN": result[4],
            "merchantId":result[11],
            "PayerVA": result[0],
            "TxnCompletionDate": result[18],
        };
        break;
    case "IciciPauseCallbackResponse" :
        responseParams ={
            "TxnStatus": upiConstant.statusCodeDesc_ICICI[txnStatusCode][7],
            "subMerchantId": result[11],
            "PayerAmount": result[15],
            "ResponseCode": txnStatusCode,
            "PayerName": result[0],
            "terminalId": result[19],
            "TxnInitDate": reqdate,
            "merchantTranId": receivedParams.payuId ,
            "PayerMobile": "8135200014",
            "UMN": receivedParams.payuId ,
            "BankRRN": result[4],
            "merchantId":result[11],
            "PayerVA": result[0],
            "TxnCompletionDate": result[18],
        };
        break;
    case "IciciUnpauseCallbackResponse" :
        responseParams ={
            "TxnStatus": upiConstant.statusCodeDesc_ICICI[txnStatusCode][8],
            "subMerchantId": result[11],
            "PayerAmount": result[15],
            "ResponseCode": txnStatusCode,
            "PayerName": result[0],
            "terminalId": result[19],
            "TxnInitDate": reqdate,
            "merchantTranId": receivedParams.payuId ,
            "PayerMobile": "8135200014",
            "UMN": receivedParams.payuId ,
            "BankRRN": result[4],
            "merchantId":result[11],
            "PayerVA": result[0],
            "TxnCompletionDate": result[18],
        };
        break;
    case "IciciSiModifyResponse":
        responseParams ={
            "response": txnStatusCode,
            "merchantId": receivedParams.merchantId,
            "subMerchantId": receivedParams.merchantId,
            "terminalId": receivedParams.terminalId,
            "Amount": receivedParams.amount,
            "success": "true",
            "message": upiConstant.statusCodeDesc_ICICI[txnStatusCode][1],
            "merchantTranId": receivedParams.merchantTranId,
            "BankRRN": result[1][0]
        };
        break;
    case "IciciSiModifyResponseFail":
        responseParams ={
            "response": txnStatusCode,
            "merchantId": receivedParams.merchantId,
            "subMerchantId": receivedParams.merchantId,
            "terminalId": receivedParams.terminalId,
            "Amount": receivedParams.amount,
            "success": "false",
            "message": "Mandate has not been modified successfully",
            "merchantTranId": receivedParams.merchantTranId,
            "BankRRN": result[1][0]
        };
        break;
    case "AirtelCollectSuccessResponse":
        responseParams =  {
        "txnId": collectTxnId,
        "rrn": rrnId,
        "txnStatus": "TXN_INIT",
        "hdnOrderID": receivedParams.hdnOrderID,
        "messageText": "SUCCESS",
        "code": "0",
        "errorCode": "000",
        "hash": result
    };
        break;
    case "AirtelVerifyPendingResponse":
        responseParams=    {
        "meta": {
        "status": "1",
            "description": "Your Transaction is being processed. PLease try again after sometime.",
            "code": "MER_026"
    },
        "data": null
    };
    break;
    case "AirtelVerifySuccessResponse":
        responseParams=   {
            "txnId": collectTxnId,
            "rrn": result[4][0],
            "txnStatus": upiConstant.statusCodeDesc_airtel[txnStatusCode[0]][0],
            "hdnOrderID":  receivedParams.hdnOrderID,
            "messageText": upiConstant.statusCodeDesc_airtel[txnStatusCode[0]][1],
            "code": upiConstant.statusCodeDesc_airtel[txnStatusCode[0]][2],
            "errorCode": txnStatusCode[0],
            "amount": result[2][0],
            "orgOrderID": receivedParams.hdnOrderID,
            "payerVPA": result[3][0],
            "payeeVPA":  result[5][0],
            "mid": "MER0000002537086",
            "txnRefNo": rrnId,
            "hash": hash
        }
        break;
    case "airtelCallbackResponse":
        responseParams =
            {
                "amount": result[3],
                "mid": result[11],
                "rrn": result[4],
                "txnStatus": upiConstant.statusCodeDesc_airtel[txnStatusCode][0],
                "hdnOrderID": receivedParams.body.payuId,
                "messageText": upiConstant.statusCodeDesc_airtel[txnStatusCode][1],
                "code": upiConstant.statusCodeDesc_airtel[txnStatusCode][2],
                "errorCode": txnStatusCode,
                "hash": hash,
                "payerVPA": result[0],
                "payeeVPA":  result[7],
                "txnRefNo":  result[5]
            };
        break;
        case "IciciSiIntentResponse":
            responseParams={
                "ActCode": "0",
                "subMerchantId": receivedParams.merchantId,
                "SignedQRData": "upi://mandate?pa=payutesting@icici&pn=PAYU PAYMENTS PRIVATE LIMITED&tr=EZM2022083118055810866491&am="+receivedParams.amount+"&cu=INR&orgid=400011&mc="+receivedParams.terminalId+"&purpose=14&tn=Upi Mandate&validitystart="+receivedParams.validityStartDate+"&validityend="+receivedParams.validityEndDate+"&amrule="+receivedParams.amountLimit+"&recur="+receivedParams.frequency+"&recurvalue=NA&recurtype=NA&rev=Y&share=Y&block=N&umn=null&txnType=CREATE&mode=13&sign=MEQCIDXKTwZbrUnMqXnnDsCE5SMuquTQ1WWpYiiGrNAQhBWPAiAu/nz4GV8UH1JrF5duPoeiOPk1\r\nYRZAx+B5rhNHDcgN7g==\r\n",
                "refId": rrnId,
                "merchantId":  receivedParams.merchantId,
                "terminalId":  receivedParams.terminalId,
                "success": "true",
                "message": "Transaction Successful",
                "merchantTranId": receivedParams.merchantTranId,
                "Amount": receivedParams.amount
            };
            break;
}


    return await responseParams;
}
module.exports = upiResponse;