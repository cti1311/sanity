const util = require('./util')

const axisaggregatorMerchant = {
    vpa: 'payu@axis',
    merchId: 'PAYU',
    merChanId: 'PAYUCOLLECT'
};

const axismerchantVPAs = {
    'payu@axis': { merchId: 'PAYU', merchChanId: 'PAYUCOLLECT' },
    'kk.payu@axis': { merchId: 'PAYU1', merchChanId: 'PAYUCOLLECT1' },
    'aa.payu@axis': { merchId: 'PAYU2', merchChanId: 'PAYUCOLLECT2' },
    'bb.payu@axis': { merchId: 'PAYU3', merchChanId: 'PAYUCOLLECT3' },
    'cc.payu@axis': { merchId: 'PAYU4', merchChanId: 'PAYUCOLLECT4' },
    'dd.payu@axis': { merchId: 'PAYU5', merchChanId: 'PAYUCOLLECT5' },
    'ee.payu@axis': { merchId: 'PAYU6', merchChanId: 'PAYUCOLLECT6' }
};
const testEnvUrl = "https://test.payu.in/upi/HdfcMandateUpiCallback.php";
const ICICISItestEnvUrl = "https://test.payu.in/upi/IciciSiUpiCallback.php";

const axiscollect = ['merchid', 'merchchanid', 'unqtxnid', 'amount', 'txndtl', 'currency', 'orderid', 'customervpa', 'expiry', 'unqcustid', 'callBackUrl', 'checksum'];
const axisvalidateVPAKeys = ['merchId', 'merchChanId', 'customerVpa','checkSum'];
const axistokenGenerationKeys = ['merchId', 'merchChanId', 'unqTxnId', 'unqCustId', 'amount', 'txnDtl', 'currency', 'orderId', 'customerVpa', 'expiry', 'sId', 'checkSum'];
const axisverifyStatusKeys = ['merchid', 'merchchanid', 'tranid', 'mobilenumber','checksum'];
var axisTransactionStatusKeys =['customerVPA', 'time', 'amount', 'rrn', 'merchantVPA', 'txnStatusCode', 'remarks', 'expiry', 'refNum'];

const axisprivateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAl1Gpgu9TXUjDkzU58wHnSyQbD2+pECT+SLqjcpLFfucW8xaS
M4FeotFaJIGGxvBhj6PnvqhlILf1401lH8EL/962H20/cY/0fGxYnBh8n2kdlWyg
q9eq5nSpN2qj2DSAMmNOzHCiP80fb097mTcBWPoEmGEFsbbflJnA/CU5FmP+Z+q8
VBxABqNpYgFZs2Zgo+TOFm+y+4pIynGJPoo8mTamdXERY0h1eWndRW9Fjyz7pQnx
wBjtMfCCccnfq48CiA2f1APulnLTkXyWFZGnst5KoZQ3zgkwbl0GE/nbZI9sARC/
+FXa60XvOQk9i3thu1Z3ObMs6GJUa3Mvq+2SQQIDAQABAoIBAAFt4Qb+kbAA3vAG
Aa0c6H1aMvM7X8JqRwiS0rZjUoA3WI0lOm5IG4e4KHzNyGMapCFCMA8p8gKUGjty
YLEjFqTtCpVTZ9T/whRmxZN727l5ubDOnNniqJeSpIKEfFWvcUKIk5b0vWOS4Wgg
vQ8eaOHZQq/Zwr8B9iymIx9+joJ6nZPg4i8SX4A6wqq1dMaeqV1vZhWLkZF0hl4M
BJU5i730D+jmoE2AAlaHjKjE5wokKv18LnSk05+l1PJO1fzW8b/JQqRAQkQV8hkF
UHzwCU/Qu5xNJuzxLQYfmQlhc1ju26Vs530Adsb/3gNUg5VBV+6d35ZZWn0pfUv4
UkfoKUECgYEA0Xiq22/aSoBpcfI8hECwpYt466/daFWmM1cl8W3C6VGp3JGjQnAK
FWOeTp3zwJdssIGkg7mx1p73E7+8X+4XkgQPY8qBvLucEOJmAY+qE7dd9HLrpYmT
xZIscHClb3o4rGSmE8/Hsyz2/HOriBc2bONa4emqVMQOQYcbQhPDx/kCgYEAuO47
Ta3ZgKX2mPLR3hoGYiNFnwMLa7lKTx0dAz5STHS1yee3zhIh5+1P0lkV3DaHKpwW
dl5gXEVyxrpqBDd/d6hiJECN+Xd+mBmebzKPYmpR1zO4MXP6MAJlCq/y7nHnrA5V
nbjpO2cxKoV1UXcx2s4jM545TI42G2MNy5ZTfokCgYBogQL8pzkIojf5GRkIAh4e
+Q5Cx2J2gwR/6KKNaG0tagiMejwxESR2t1RrdHH/S4x2Ireo4CPRJ02tFKMuWOJ5
fn0PFCDVv+OEqO6rKLl5TKobIppd491NXDe/gPOIQjm0CCKzD55Zzb0LBco2Ax6s
BGF7A9BuqcFS/8yhkqrCQQKBgCEvHpUhzRW4sjdf2yjvopWZnrSZ50K9TQhFQR+D
32C40KYaXnEr78meW+Ry9+k8H6UVvTIgXUoxbBcc/EklbEocfP/kVZWeS6kfb76k
Y/ZU/bqQHU1CcnKK+3affAgtiFTnfZV/yNpP+hKXQCYOLXQF6WspyT5jhnIDpEYU
A4eBAoGAP+fxA/DLAoxACsb1Tb2RbonLjBL0izpwDL4VXVrJR2FWp5shAgg0t3AJ
PepWN+4Ru5yZtjoz9H1E0Fff0eN7BUgvIZhoykGlZpOWIpyREEufPMlgV5tihfEW
qhzSy8VgVt8MSADFOfjx7cl+Cyf5ypveamcL0MbGJMyeA/SwOVM=
-----END RSA PRIVATE KEY-----`;

const axispublicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAl1Gpgu9TXUjDkzU58wHn
SyQbD2+pECT+SLqjcpLFfucW8xaSM4FeotFaJIGGxvBhj6PnvqhlILf1401lH8EL
/962H20/cY/0fGxYnBh8n2kdlWygq9eq5nSpN2qj2DSAMmNOzHCiP80fb097mTcB
WPoEmGEFsbbflJnA/CU5FmP+Z+q8VBxABqNpYgFZs2Zgo+TOFm+y+4pIynGJPoo8
mTamdXERY0h1eWndRW9Fjyz7pQnxwBjtMfCCccnfq48CiA2f1APulnLTkXyWFZGn
st5KoZQ3zgkwbl0GE/nbZI9sARC/+FXa60XvOQk9i3thu1Z3ObMs6GJUa3Mvq+2S
QQIDAQAB
-----END PUBLIC KEY-----`;

const axiscallbackKey = "PAYU112233445566";

const axiscallbackChecksumKey = `-----BEGIN PUBLIC KEY-----
MIIBITANBgkqhkiG9w0BAQEFAAOCAQ4AMIIBCQKCAQB8pLEgrYgZ940GDObeYfbZ
+ZBKAkUwMNjB4QtWX2Exl6Q0ttxtkkPdqpHnUCwiTbSxe4Ag7HdNDyF3a12zUwPO
g7mi26Zof+nRNaLL1dhI79+cGw/PohwXUuJEJUtu0ywBzM46JU72Jd14KV9Ixu1J
PodIEKgOY+Ny/jJffyLiXwtRi1PnNpJwJQFuTSh4bxBpVH/Gq89EpyhY0nJf+kZD
K9u4db0pqbkhor9YC9tnfdfC8zwHgaJTYwJ4/OfAy5pmX8+OBV3Cys15OjmpYg52
jdMWNUVVb6l12BvFu0q8nNCgM2peH6iYTWTtzf0O5gVvssn/cDX7JN2OEnAJ9SwN
AgMBAAE=
-----END PUBLIC KEY-----`;


const hdfcaggregatorMerchant = {
    vpa: 'payutest@hdfcbank',
    pgMerchantId: 'HDFC000000000105',
    encKey: `167e3f6b790fb494a3b6c9b9253ea40d`
};

const hdfcmerchantVPAs = {
    'payutest@hdfcbank': { pgMerchantId: 'HDFC000000000105', encKey: `167e3f6b790fb494a3b6c9b9253ea40d` },
    'kk.payutest@hdfcbank': { pgMerchantId: 'HDFC000000000106', encKey: `168e3f6b790fb494a3b6c9b9253ea40d`},
    'yellowqr.testing121@hdfcbank': { pgMerchantId: 'HDFC000000061898', encKey: `167e3f6b790fb494a3b6c9b9253ea40d`},
    'aa.payutest@hdfcbank': { pgMerchantId: 'HDFC000000000107', encKey: `16d3f6b790fb494a3b6c9b9253ea40d`},
    'bb.payutest@hdfcbank': { pgMerchantId: 'HDFC000000000108', encKey: `16d90fb494a3b6c9b9253ea40d`},
    'cc.payutest@hdfcbank': { pgMerchantId: 'HDFC000000000109', encKey: `168e3ff790fb494a3b6c9b9253ea40d`},
    'dd.payutest@hdfcbank': { pgMerchantId: 'HDFC000000000101', encKey: `168e3f6byhh90fb494a3b6c9b9253ea40d`},
    'ee.payutest@hdfcbank': { pgMerchantId: 'HDFC000000000102', encKey: `168e3f6b790fb494a3b6c9b9253ea40d`},
    'ff.payutest@hdfcbank': { pgMerchantId: 'HDFC000000000103', encKey: `168e3f6bd90fb494a3b6c9b9253ea40d`},
    'gg.payutest@hdfcbank': { pgMerchantId: 'HDFC000000000100', encKey: `168e3f6bd90fb4d94a3b6c9b9253ea40d`},
    'hh.payutest@hdfcbank': { pgMerchantId: 'HDFC000000001001', encKey: `168e3sf6bd90fb4d94a3b6c9b9253ea40d`},
    'yellowqr.testing122@hdfcbank': { pgMerchantId: 'HDFC000000061899', encKey: `167e3f6b790fb494a3b6c9b9253ea41d`},
    'yellowqr.testing123@hdfcbank': { pgMerchantId: 'HDFC000000061900', encKey: `167e3f6b790fb494a3b6c9b9253ea42d`}
};

const hdfcmccCode = "6012";
const hdfcrrnPrefix = "HDF",
 hdfcMEBR = "MEBR";

const hdfcrequestKeys = ['requestMsg', 'pgMerchantId'],
      hdfcAccountNo = ['AccountNo'];

const hdfcSIrequestKeys =['pgMerchantId', 'payload','key_data'];

const hdfcSImandateRequestKeys = ['amount','recurrence','payerType','ref_id','ref_url'];
const hdfcSIrecurrenceRequestKeys = ['startDate','endDate','pattern','action_type','revokeable','expiryTime','purpose_code','txn_id'];
const hdfcSIrecurRedisKeys = ['upiTxnId','rrn', 'txnStatusCode','customerVPA','amount','merchant_id','frequency','revokable','customerName','startDate','endDate','ruleValue','ruleType','amt_rule'],
        hdfcSIrecurKeysFreqisAdhoc =['upiTxnId', 'rrn', 'txnStatusCode', 'customerVPA', 'amount', 'merchant_id', 'frequency', 'revokable', 'customerName', 'startDate', 'endDate', 'amt_rule'],
        hdfcSINotifyRedisKeys = ['upiTxnId','rrn','txnStatusCode','customerVPA','amount','merchant_id','startDate','endDate','customerVPA','frequency'],
        hdfcSIModifyRedisKeys=['upiTxnId', 'rrn', 'txnStatusCode', 'customerVPA', 'amount', 'merchant_id', 'frequency', 'revokable', 'customerName', 'merchantVPA', 'amt_rule', 'ruleType', 'ruleValue', 'startDate'],
        hdfcSIModifyRedisKeysAdhocFreq=['upiTxnId', 'rrn', 'txnStatusCode', 'customerVPA', 'amount', 'merchant_id', 'frequency', 'revokable', 'customerName', 'merchantVPA', 'amt_rule','startDate'],
        hdfcSIFrequency=['frequency'];

const hdfcSIVerifyRedisKeys = ['upiTxnId','rrn','txnStatusCode','customerVPA','customerName','amount','startDate','frequency','endDate','revokable','amt_rule','merchant_id'];
const hdfcVerifyRedisKeys =['upiTxnId', 'amount', 'time', 'customerVPA', 'refNum', 'remarks', 'rrn', 'txnStatusCode'];
const hdfcSITransactionStatus = ['upiTxnId','rrn','txnStatusCode','customerVPA','customerName','amount','startDate','frequency','endDate','revokable','amt_rule','debitAmount','merchant_id'];

const indusclientId = "eba496ee-387a-4d3e-aacb-ce98fb2b5f11";
const indusclientSecret = "O6pL6lE0oJ5bP8yX4rM8jC6cG5dY6mD4oG3eO7cS5xJ5aE1mC6",
indusTransactionStatusKeys=['upiTxnId', 'rrn', 'refNum', 'amount', 'time', 'customerVPA', 'remarks', 'txnStatusCode'];

const indusaggregatorMerchant = {
    vpa: 'payuppl@indus',
    pgMerchantId: 'INDB000000001792',
    encKey: `dead14605176edb8ba9414a7354be6d2`
};

const indusmerchantVPAs = {
    'payuppl@indus': { pgMerchantId: 'INDB000000001792', encKey: `dead14605176edb8ba9414a7354be6d2`},
    'kk.payuppl@indus': { pgMerchantId: 'INDB000000001793', encKey: `54b8773a07294c0e739944eee6978feb` },
    'gauravdua4.payu@indus': { pgMerchantId: 'INDB000000035917', encKey: `dead14605176edb8ba9414a7354be6d2`},
    'payuppl@indus': { pgMerchantId: 'INDB000000001792', encKey:  `dead14605176edb8ba9414a7354be6d2`},
    'kk.payuppl@indus': { pgMerchantId: 'INDB000000001793', encKey: `54b8773a07294c0e739944eee6978feb` },
    'aa.payuppl@indus': { pgMerchantId: 'INDB000000001794', encKey: `154b8773a07294c0e739944eee6978feb` },
    'bb.payuppl@indus': { pgMerchantId: 'INDB000000001795', encKey: `5w4b8773a07294c0e739944eee6978feb` },
    'cc.payuppl@indus': { pgMerchantId: 'INDB000000001796', encKey: `524b8773a07294c0e739944eee6978feb` },
    'dd.payuppl@indus': { pgMerchantId: 'INDB000000001797', encKey: `5422b8773a07294c0e739944eee6978feb` },
    'ee.payuppl@indus': { pgMerchantId: 'INDB000000001798', encKey: `54111b8773a07dcr294c0e739944eee6978feb` },
    'gauravduaTest1.payu@indus': { pgMerchantId: 'INDB000000035918', encKey: `53b8773a07294c0e739944eee6979feb`},
    'gauravduaTest2.payu@indus': { pgMerchantId: 'INDB000000035919', encKey: `53b8773a07294c0e739944eee6980feb`},
};

const airtelmerchantVPAs =
    {
    'uat.payu@appl': {merchantId: 'MER0000002537086', secretKey: `b489f78d-d3d1-43`},
    'testmerchant@airtel': {merchantId: 'MER000000253708613', secretKey: `168e3f6b790fb494a3b6c9b9253ea40d`}
};

const indusnpciTxnIdPrefix = "INDB";

const indusrequestKeys = ['requestMsg', 'pgMerchantId'];


const icicirequestKeys =['merchantId','merchantName','payerVa','amount','terminalId','merchantTranId','billNumber','collectByDate'];
const iciciCollectrequestKeys =['payerVa', 'amount','note','collectByDate','merchantId','merchantName','terminalId','merchantTranId','billNumber'],
iciciVerifyRequestKeys=['merchantId','subMerchantId','merchantTranId','terminalId'],
iciciSiCollectRequestKeys =['merchantId','subMerchantId','terminalId','merchantName','subMerchantName','payerVa','amount','collectByDate','merchantTranId','billNumber','note','requestType','validityStartDate','validityEndDate','amountLimit','frequency','remark','autoExecute','debitDay','debitRule','revokable','blockfund','purpose'],
    iciciSiVerifyRequestKeys=['merchantId','subMerchantId','terminalId','transactionType','merchantTranId'],
    iciciVerifySiRedisKeys =['upiTxnId','rrnId','txnStatusCode','customerVPA','startDate','amount','endDate','debitAmount'],
  icicirecurSIRedisKeys = ['upiTxnId','rrn', 'txnStatusCode'],
    iciciSiRecurrPay =['merchantId','subMerchantId','terminalId','merchantName','subMerchantName','merchantTranId','amount','remark','billNumber','retryCount','mandateSeqNo','UMN','purpose'],
    iciciSiUpdateRedisKeys=['upiTxnId','txnStatusCode','amount','rrnId'],
    iciciSiUpdateKeys=['merchantId','subMerchantId','terminalId','merchantName','subMerchantName','payerVa','amount','note','collectByDate','merchantTranId','billNumber','validityStartDate','validityEndDate','amountLimit','remark','requestType','frequency','autoExecute','debitDay','debitRule','revokable','blockfund','purpose','UMN'],
iciciSiNotifyKeys =['merchantId','subMerchantId','terminalId','merchantName','subMerchantName','payerVa','amount','note','executionDate','merchantTranId','mandateSeqNo','key','value'];


const icicimerchantVPAs = {
    'aa@icici': { pgMerchantId: 'ICICI000000000105', encKey: `167e3f6b790fb494a3b6c9b9253ea40d` },
    'kk@icici': { pgMerchantId: 'ICICI000000000106', encKey: `168e3f6b790fb494a3b6c9b9253ea40d`},
    'ab@icici': { pgMerchantId: 'ICICI000000000107', encKey: `168e3f6b790fb494a3b6c9b9253ea40d`},
    'cd@icici': { pgMerchantId: 'ICICI000000000108', encKey: `168e3f6b790fb494a3b6c9b9253ea40d`},
    'ef@icici': { pgMerchantId: 'ICICI000000000106', encKey: `168e3f6b790fb494a3b6c9b9253ea40d`},
    'gh@icici': { pgMerchantId: '401195', encKey: `168e3f6b790fb494a3b6c9b9253ea40d`},
    'ij@icici': { pgMerchantId: 'ICICI000000000106', encKey: `168e3f6b790fb494a3b6c9b9253ea40d`},
    'kl@icici': { pgMerchantId: 'ICICI000000000106', encKey: `168e3f6b790fb494a3b6c9b9253ea40d`}
};


const icicirrnPrefix = "ICI",
iciciIntentTransactionStatusKeys = ['upiTxnId','rrn','txnStatusCode','customerVPA','amount'],
iciciCollectTransactionStatusKeys=['upiTxnId','rrn','txnStatusCode','customerVPA','amount','refNum'];

const icicipublic_key= '-----BEGIN PUBLIC KEY-----\n'+
    'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAujq6/UnJMA9NM0R18jEs\n'+
    'geoEhiXJJFSGHYmuvmKleZLqcAogNf+Kqs3uyNXgaCsuk8sHUs/5XYwdT57XbbEF\n'+
    's8h6VjLU6If/gtQvpOtXKRfa3jn68/QOcQTklTFwPRORmvjatg9KK8eh1V6HR8sc\n'+
    'tsEAApzPCp0nf9ojdKzubI2E+PV9PEaAhGLVDHgE+dht638x4hy1vEhpXGoZ+kAV\n'+
    '193V5H9EEb8B7GjVzPdNkwnMytewI1F7g+jBrpH9WyNIVdODdnkg3AhgtBy8avHX\n'+
    'zA7MG4HUH+DMMEpKF92NpQC3JegWiBt10gLke7Y7LMTCmW/kDdQhWMA7y/QkoJYV\n'+
    'IlsKqRrb3xtNgBrwMdeWSC7Zeoo7RdaYx2Ow23M9add/ctwuRfWcHu1AnSPSi7tu\n'+
    'IvGbg9hJq3T2tEFrq5nBPSwZYxzECiRI6BXoiT6uxJkf4lNbvbIqk9VuFxQjwBRR\n'+
    'BNeq7LZgZFAj9ptusresA4Fx7Lday9b5/pk+7eoxjIaX5sLMVjpN484h5+vjF/PM\n'+
    'pOAZRRhjbKAh60oba7DEDTqm74Iu8n+1XJKM6LLvRVcE4+3NpGnmXIXPDIx5ycoP\n'+
    '90i7I/ZmnWoGKNB7VPoAoBHkRMrhqGsqYKWpb8I9GwlmQl9H2ZDYculyP1YAYnv8\n'+
    'pSXhDkFtYwDhgSZzCi28W4MCAwEAAQ==\n'+
    '-----END PUBLIC KEY-----';

const iciciprivate_key = '-----BEGIN RSA PRIVATE KEY-----\n'+
    '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\n'+
    '-----END RSA PRIVATE KEY-----';

const icicisi_privateKey= '-----BEGIN RSA PRIVATE KEY-----\n' +
    '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\n' +
    '-----END RSA PRIVATE KEY-----\n';

const icicisi_publicKey ='-----BEGIN PUBLIC KEY-----\n' +
    'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAmxhjBt4563vrCeq4f76h\n' +
    'jyhM6n7pKIJ9FIDEtCFxtWBQZQj7Nf/d/6O4zJHAwC4BtQ25yP70eq/m7UYRtS18\n' +
    'sfyEGHWdk+807Tmy8LY2jPmA2YMp4ANShrbZrFGHkgONmlA4lSeJUnc7lChfciVo\n' +
    'QvXvj8Ia1VDGQBvpuqxC1O6jUYR8uKtHKajwkOKzuTYWmtFVVQFowN3kWr/ZymDc\n' +
    'EL+Ey2m21kLEt4DIJF9w4jQbJKIzwiAvlvvp/by0DhGnRaBetef5UHZ+a7WRj43j\n' +
    'KuDIU1EkKPf1ZWypaZxEYYGYkkC6cci1ls1p0e1kunJkRjv0+U6qYTU5mFYfCL0O\n' +
    'xGsNlfpyPx5WNdoHrhYeFJOkznaUXB9ZN0E18IekCutV5Qjt5sEGYZ8wLXUFLGHF\n' +
    'Yzqi4mUvAVhsxdRhjEkm0nP/TDlkNLvHD3CMBj4FW9nNBB7tI66KiKLxoeigxZgf\n' +
    'nOEPx+IyOT5+qZHoCwSQP/zeUIJ4ndqI9NrMRSC6vQtamexRkdrXFhW8rdmwwhqu\n' +
    '17s3GNXjXsDsr5rI+39YXGeYAFH59v4PZhOyMt3H8fLFYls9WXnJZshlP9ZO1k/1\n' +
    '7eO7hegvkOSl5XeHFSUcGO7pge6eeWv97Pi998mrx2ZyGbUrQCCOqTNTdyUWWupP\n' +
    'Lx6bFwy2GA/NPRtjjKDs5HkCAwEAAQ==\n' +
    '-----END PUBLIC KEY-----\n';

const NodeRSA = require('node-rsa');
const icicikey_private =new NodeRSA(iciciprivate_key);
const icicikey_public = new NodeRSA(icicipublic_key);
const icicisi_private= new NodeRSA(icicisi_privateKey);
const icicisi_public = new NodeRSA(icicisi_publicKey);
icicikey_public.setOptions({encryptionScheme: 'pkcs1',environment:"browser"});
icicikey_private.setOptions({encryptionScheme: 'pkcs1',environment:"browser"});
icicisi_private.setOptions({encryptionScheme:'pkcs1',environment:"browser"});
icicisi_public.setOptions({encryptionScheme:'pkcs1',environment:"browser"});

var dateInMillis = new Date().getTime();
var startTime = util.getDateTime(dateInMillis, "yyyy-mm-dd HH:MM:SS");
var expiryInSeconds = 5 * 60;
var expiryTime = util.getDateTime(dateInMillis + (expiryInSeconds * 1000), "yyyy-mm-dd HH:MM:SS");

const statusCodeDesc_axis = {
    '00': ['S', 'TRANSACTION HAS BEEN APPROVED', 'C'],
    '01': ['P', 'TRANSACTION PENDING', 'P'],
    'AA1': ['No Data Found', 'NO DATA FOUND', 'RNF'],
    'S0': ['Invalid Transaction', 'SPAM COLLECT DECLINED BY PSP', 'SPAM'],
    'TM': ['Blocked', 'REQUESTOR BLOCKED BY CUSTOMER', 'BLOCKED'],
    'U28': ['Bank not available', 'BANK NOT AVAILABLE ON UPI', 'FAILED'],
    'U30': ['Debit Failed', 'DEBIT HAS FAILED', 'FAILED'],
    'U66': ['Device Fingerprint Mismatch', 'MOBILE NO. REGISTERED WITH ANOTHER DEVICE.PLEASE REGISTER AGAIN', 'FAILED'],
    'U48': ['VALIDATION ERROR', 'VALIDATION ERROR', 'FAILED'],
    'U69': ['E', 'COLLECT EXPIRED', 'E'],
    'UB': ['Internal Server Error', 'INTERNAL SERVER ERROR', 'FAILED'],
    'Z6': ['PIN tries exceeded', 'NUMBER OF PIN TRIES EXCEEDED', 'FAILED'],
    'Z9': ['Insufficient funds', 'INSUFFICIENT FUNDS', 'FAILED'],
    'ZA': ['R', 'TRANSACTION DECLINED BY CUSTOMER', 'R'],
    'ZB': ['Invalid Merchant', 'PAYEE NOT VALID', 'FAILED'],
    'ZM': ['Invalid MPIN', 'INCORRECT PIN ENTERED', 'FAILED'],
    'O60':['Unknown Error','Unknown Error','Failed'],
    'O98':['Mandatory parameter or data missing','Mandatory parameter or data missing','Failed'],
    '091':['TIMEOUT','Timeout receive from bank','PENDING'],
    '404':['NO DATA FOUND','No Record Found','Inprogress'],
    '111':['UNKNOWN OR DUPLICATE PARAMETERS','UNKNOWN OR DUPLICATE PARAMETERS','Failed'],
    'ML01':['Multiple Order Ids found','Multiple Order Ids found','Failed'],
    '96':['TIMEOUT','Timeout receive from bank','PENDING'],
    '91':['TIMEOUT','Timeout receive from bank','PENDING'],
    'O98':['Mandatory parameter or data missing','Mandatory parameter or data missing','Failed'],
    '041':['Transaction Not Found','Transaction Not Found','Failed'],
    'O80':['Database error','Database error','Failed'],
    'O60':['Unknown Error','Unknown Error','Failed'],
    '070':['Technical Error','Technical Error','Failed'],
    '111':['MISSING OR EMPTY PARAMETER','MISSING OR EMPTY PARAMETER','Failed'],
    '125':['VALIDATION ERROR','VALIDATION ERROR','Failed'],
    'A79':['AMOUNT CANNOT BE ZERO OR NEGATIVE','AMOUNT CANNOT BE ZERO OR NEGATIVE','Failed'],
    '444':['CHECKSUM ERROR','CHECKSUM ERROR','Failed'],
    '303':['DUPLICATE_TRANSACTION_ID','DUPLICATE_TRANSACTION_ID','Failed']
};

const statusCodeDesc = {
    '00': ['Success', 'TRANSACTION HAS BEEN APPROVED', 'SUCCESS'],
    'B3': ['Failed','Transaction fail:Credit Failed','FAILED'],
    '22': ['Pending', 'TRANSACTION PENDING', 'PENDING'],
    'AA1': ['No Data Found', 'NO DATA FOUND', 'RNF'],
    'S0': ['Invalid Transaction', 'SPAM COLLECT DECLINED BY PSP', 'SPAM'],
    'TM': ['Blocked', 'REQUESTOR BLOCKED BY CUSTOMER', 'BLOCKED'],
    'U28': ['Bank not available', 'BANK NOT AVAILABLE ON UPI', 'FAILED'],
    'U30': ['Debit Failed', 'DEBIT HAS FAILED', 'FAILED'],
    'U66': ['Device Fingerprint Mismatch', 'MOBILE NO. REGISTERED WITH ANOTHER DEVICE.PLEASE REGISTER AGAIN', 'FAILED'],
    'U67': ['Failed', 'DEBIT TIMEOUT. TRY AGAIN', 'FAILED'],
    'U69': ['Expired', 'COLLECT EXPIRED', 'EXPIRED'],
    'UB': ['Internal Server Error', 'INTERNAL SERVER ERROR', 'FAILED'],
    'Z6': ['PIN tries exceeded', 'NUMBER OF PIN TRIES EXCEEDED', 'FAILED'],
    'Z9': ['Insufficient funds', 'INSUFFICIENT FUNDS', 'FAILED'],
    'ZA': ['Rejected', 'TRANSACTION DECLINED BY CUSTOMER', 'REJECTED'],
    'ZB': ['Invalid Merchant', 'PAYEE NOT VALID', 'FAILED'],
    'ZM': ['Invalid MPIN', 'INCORRECT PIN ENTERED', 'FAILED'],
    'O60':['Unknown Error','Unknown Error','Failed'],
    'O98':['Mandatory parameter or data missing','Mandatory parameter or data missing','Failed'],
    '091':['TIMEOUT','Timeout receive from bank','PENDING'],
    'U48':['VALIDATION ERROR','VALIDATION ERROR','Failed'],
    '404':['NO DATA FOUND','No Record Found','Inprogress'],
    '111':['UNKNOWN OR DUPLICATE PARAMETERS','UNKNOWN OR DUPLICATE PARAMETERS','Failed'],
    'ML01':['Multiple Order Ids found','Multiple Order Ids found','Failed'],
    '96':['TIMEOUT','Timeout receive from bank','PENDING'],
    '91':['TIMEOUT','Timeout receive from bank','PENDING'],
    'O98':['Mandatory parameter or data missing','Mandatory parameter or data missing','Failed'],
    '041':['Transaction Not Found','Transaction Not Found','Failed'],
    'O80':['Database error','Database error','Failed'],
    'O60':['Unknown Error','Unknown Error','Failed'],
    '070':['Technical Error','Technical Error','Failed'],
    '111':['MISSING OR EMPTY PARAMETER','MISSING OR EMPTY PARAMETER','Failed'],
    '125':['VALIDATION ERROR','VALIDATION ERROR','Failed'],
    'A79':['AMOUNT CANNOT BE ZERO OR NEGATIVE','AMOUNT CANNOT BE ZERO OR NEGATIVE','Failed'],
    '444':['CHECKSUM ERROR','CHECKSUM ERROR','Failed'],
    '303':['DUPLICATE_TRANSACTION_ID','DUPLICATE_TRANSACTION_ID','Failed'],
    'MD329' : ['V','Duplicate Request(PSP Reference Number must be unique for every request)','FAILED'],
    'U01' :['THE REQUEST IS DUPLICATE','THE REQUEST IS DUPLICATE','FAILED'],
    'U02' : ['AMOUNT CAP IS EXCEEDED','AMOUNT CAP IS EXCEEDED','FAILED'],
    'U03' : ['NET DEBIT CAP IS EXCEEDED','NET DEBIT CAP IS EXCEEDED','FAILED'],
    'U04' : ['REQUEST IS NOT FOUND','REQUEST IS NOT FOUND','FAILED'],
    'U05' : ['FORMATION IS NOT PROPER','FORMATION IS NOT PROPER','FAILED'],
    'U06' :['TRANSACTION ID IS MISMATCHED VALIDATION ERROR','TRANSACTION ID IS MISMATCHED VALIDATION ERROR','FAILED'],
    'U07' :['VALIDATION ERROR','VALIDATION ERROR','FAILED']

};
const validVPAs = { 'kk@okaxis': ['KUNAL KUKREJA', '+917985392981', 'State Bank of India!1111111111!SBIN0011111!', '1234'],'9268780884@upi': ['ATUL ARORA', '+919268780884', 'State Bank of India!1234567890!SBIN0011111!', '1234'], 'kk@axis': ['KUNAL KUKREJA', '+916666666666', 'Axis Bank!6666666666!AXIN0066666!', '1234'], 'testsim@axis': ['AXIS SIMULATOR', '+917777777777', 'Axis Bank!7777777777!AXIN0077777!', '0000'], 'kk@hdfcbank': ['KUNAL KUKREJA', '+918888888888', 'Hdfc Bank!8888888888!HDIN0088888!', '1234'], 'testsim@hdfcbank': ['HDFC SIMULATOR', '919999999999', 'Hdfc Bank!9999999999!HDIN0099999!', '0000'],'aa@okaxis': ['TezOmniSimulator', '+917607833550', 'Hdfc Bank!9999999990!HDIN0099998!', '1428'],'7985392981@ybl': ['KUNAL KUKREJA', '+917985392981', 'State Bank of India!000000000000!SBIN0011111!', '1234'],'kk@okhdfcbank': ['AASTHA MALIK', '+917985392982', 'State Bank of India!098765432211!SBIN0011111!', '1234'],'7985392981@upi': ['ATUL ARORA', '+917985392981', 'State Bank of India!123478999996!SBIN0011111!', '1234'],'ps@paytm': ['PUSPENDRA SINGH', '+917985392981', 'State Bank of India!987652424256!SBIN0011111!', '1234'],'aa@icici': ['Aastha Malik', '+919560889803', 'State Bank of India!22356777778989!SBIN0011111!', '0987'],'aastha@hdfcbank': ['Aastha Malik', '+919560889803', 'State Bank of India!124567755444!SBIN0011111!', '0987'],'9999999999@upi': ['Aastha Malik', '+919560889803', 'State Bank of India!9865536733838!SBIN0011111!', '0987'],'1111111111@upi': ['Aastha Malik', '+919560889803', 'State Bank of India!1235777766444!SBIN0011111!', '0987'],'6666666666@upi': ['Aastha Malik', '+919560889803', 'State Bank of India!0987525674848!SBIN0011111!', '0987'],'7777777777@apl': ['Aastha Malik', '+919560889803', 'State Bank of India!0973345671345!SBIN0011111!', '0987'],'yy@okhdfcbank': ['Aastha Malik', '+919560889803', 'State Bank of India!9865536733838!SBIN0011111!', '0987'], '8368040967@apl': ['ANKIT BISHERWAL', '+918368040967', 'State Bank of India!3333333333!SBIN0033333!', '1234'],'9999999999@okhdcbank': ['Aastha Malik', '+91999999999', 'State Bank of India!9876543332!SBIN0011111!', '0987'],'9304025844@airtel': ['Aastha Malik', '+91999999999', 'State Bank of India!9876543332!SBIN0011111!', '0987']};

const statusCodeDesc_ICICI={
    '92' : ['Transaction Initiated', 'Transaction Initiated', 'inprogress','CREATE-INITIATED','PENDING','Transaction pending','REVOKE-PENDING','SUSPEND-PENDING','REACTIVATE-PENDING'],
    '0' : ['SUCCESS', 'Transaction successful', 'SUCCESS','CREATE-SUCCESS', 'SUCCESS','Transaction Successful','REVOKE-SUCCESS','SUSPEND-SUCCESS','REACTIVATE-SUCCESS'],
    '00': ['Success', 'TRANSACTION HAS BEEN APPROVED', 'SUCCESS','CREATE-SUCCESS', 'SUCCESS','Transaction Successful','REVOKE-SUCCESS','SUSPEND-SUCCESS','REACTIVATE-SUCCESS'],
    '1' : ['User profile not found', 'User profile not found', 'failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '4' : ['Response parsing error', 'Response parsing error', 'failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '9' : ['Transaction rejected', 'Transaction rejected', 'failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '10' : ['Insufficient data', 'Insufficient data', 'failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '99' : ['Transaction cannot be processed', 'Transaction cannot be processed', 'inprogress','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5000' : ['Invalid Request', 'Invalid Request', 'inprogress','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5001' : ['Invalid Merchant ID', 'Invalid Merchant ID', 'failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5002' : ['Duplicate MerchantTranId', 'Duplicate MerchantTranId', 'failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5003' : ['Merchant Transaction Id is mandatory', 'Merchant Transaction Id is mandatory', 'failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5004' : ['Invalid Data', 'Invalid Data', 'failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5005' : ['Collect By date should be greater than or equal to Current date', 'Collect By date should be greater than or equal to Current date', 'failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5006' : ['Merchant TranId is not available', 'Merchant TranId is not available', 'inprogress','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5007' : ['Virtual address not presentd', 'Virtual address not present', 'inprogress','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5009' : ['Service unavailable. Please try later.', 'Service unavailable', 'inprogress','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5011' : ['This transaction is already processed (Online duplicate transaction)', 'This transaction is already processed (Online duplicate transaction)', 'failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5012' : ['Request has already been initiated for this transaction (Offline duplicate transaction)', 'Request has already been initiated for this transaction (Offline duplicate transaction)', 'inprogress','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5013' : ['Invalid VPA', 'Invalid VPA', 'inprogress','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5014' : ['Insufficient Amount', 'Insufficient Amount', 'failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5017' : ['Sorry you cant initiate refund request', 'Sorry you cant initiate refund request', 'inprogress','CREATE-FAILED','FAILED','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5020' : ['No response from Beneficiary Bank. Please wait for recon before initiating the transaction again.', 'No response from Beneficiary Bank. Please wait for recon before initiating the transaction again.', 'inprogress','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5021' : ['Transaction Timed out. Please check transaction status before initiating again.', 'Transaction Timed out', 'inprogress','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5019' : ['Invalid Terminal Id', 'Invalid Terminal Id', 'failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5022' : ['Terminal Id is mandatory', 'Terminal Id is mandatory', 'failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5023' : ['Multiple transactions against given parameter. Please provide bank RRN', 'Multiple transactions against given parameter', 'failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5024' : ['Record not found against given parameters', 'Record not found against given parameters', 'inprogress','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5025' : ['Please enter valid refund amount', 'Please enter valid refund amount', 'inprogress','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5029' : ['No Response From Switch', 'No Response From Switch', 'inprogress','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5031' : ['Validity start date should not be less than current date', 'Validity start date should not be less than current date', 'failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5032' :['Validity end date should not be less than validity start date','Validity end date should not be less than validity start date','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5033' :['Mandate request not created','Mandate request not created','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5034' :['No Approved Mandates are available','No Approved Mandates are available','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5035' :['Mandate amounts mis-matched','Mandate amounts mis-matched','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5037' :['Execution amount exceeded to Mandate approved amount','Execution amount exceeded to Mandate approved amount','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5038' :['Invalid Validate Payer Account Flag','Invalid Validate Payer Account Flag','inprogress','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5039' :['Invalid Payer Account','Invalid Payer Account','inprogress','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '5040' :['Invalid Payer IFSC','Invalid Payer IFSC','inprogress','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '8000' :['Invalid Encrypted Request','Invalid Encrypted Request','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '8001' :['JSON IS EMPTY','JSON IS EMPTY','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '8002' :['INVALID_JSON','INVALID_JSON','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '8004' :['MISSING_REQUIRED_FIELD_DATA','MISSING_REQUIRED_FIELD_DATA','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '8003' :['INVALID_FIELD FORMAT OR LENGTH','INVALID_FIELD FORMAT OR LENGTH','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '8005' :['MISSING_REQUIRED_FIELD','MISSING_REQUIRED_FIELD','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '8006' :['INVALID_FIELD_LENGTH','INVALID_FIELD_LENGTH','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '8007' :['Invalid JSON,OPEN CURLY BRACE MISSING','Invalid JSON,OPEN CURLY BRACE MISSING','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '8008' :['Invalid JSON,END CURLY BRACE MISSING','Invalid JSON,END CURLY BRACE MISSING','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '8009' :['Internal Server Error','Internal Server Error','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '8010' :['Internal Service Failure','Internal Service Failure','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '8011' :['INTERNAL_SERVICE_FAILURE','INTERNAL_SERVICE_FAILURE','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '8012' : ['BACKEND_CONNECTION_TIMEOUT','BACKEND_CONNECTION_TIMEOUT','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '8013' : ['BACKEND_READ_TIMEOUT','INTERNAL_SERVICE_FAILURE','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '8014' : ['BACKEND_BAD_URL','BACKEND_BAD_URL','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '8015' : ['BACKEND_BAD_URL','BACKEND_BAD_URL','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '8016' : ['Decryption Fail','Decryption Fail','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '8017' : ['INVALID JSON','INVALID JSON','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '500' : ['Internal Server Error','Internal Server Error','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '401' : ['Unauthorized','Unauthorized','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '403' : ['Forbidden','Forbidden','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE'],
    '429' : ['Too Many Requests','Too Many Requests','failed','CREATE-FAILED','FAILED','Transaction rejected','REVOKE-FAILURE','SUSPEND-FAILURE','REACTIVATE-FAILURE']
};

const statusCodeDesc_HDFCOTM={
    'MD00' :['Request Processed Successfully','Request Processed Successfully','success','ACTIVE','COMPLETED','UNPAUSE','PAUSE','REVOKED','Mandate pause success','Mandate has been revoked successfully','Mandate unpause success'],
    'MD200' :['Mandate Request Pending','Mandate Request Pending','inprogress','PENDING','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD202' :['Mandate Request Approved','Mandate Request Approved','success','ACTIVE','COMPLETED','UNPAUSE','PAUSE','REVOKED','Mandate pause success','Mandate has been revoked successfully','Mandate unpause success'],
    'MD203' :['Request has been timed out','Request has been timed out','failed','Rejected','Rejected','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD300' :['Invalid NPCI TxnId','Invalid NPCI TxnId','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD301' :['Invalid Payee Name','nvalid Payee Name','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD302' :['Invalid Revokeable Flag','Invalid Revokeable Flag','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD303' :['Invalid IIN number','Invalid IIN number','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD304' :['SuccessfullyRequest Processed ','SuccessfullyRequest Processed','inprogress','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD305' :['Same Payer and Payee virtual address can not be allowed for transaction','Same Payer and Payee virtual address can not be allowed for transaction','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD306' :['mandate.recurrence not found','mandate.recurrence not found','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD307' :['Invalid Mandate Recurrence Pattern','Invalid Mandate Recurrence Pattern','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD308' :['Invalid Mandate Recurrence Rule Type','Invalid Mandate Recurrence Rule Type','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD309' :['Invalid Mandate Start Date','Invalid Mandate Start Date','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD310' :['Invalid Mandate End Date','Invalid Mandate End Date','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD311' :['Invalid Mandate Amount Rule Type','Invalid Mandate Amount Rule Type','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD312' :['Invalid Mandate Amount Value','Invalid Mandate Amount Value','failed','Rejected','Rejected','Rejected','Rejected','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD313' :['shareToPayee N is applicable only for ONETIME recurrence pattern as well as for PAYER initiated transactions only','shareToPayee N is applicable only for ONETIME recurrence pattern as well as for PAYER initiated transactions only','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD314' :['Rule type unapplicable for the mentioned frequency','Rule type unapplicable for the mentioned frequency','failed','Rejected','FAILED','FAILED','PENDING','UNREVOKED','Mandate pause/unpause unsucessful','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD316' :['Invalid Mandate Date Rule Type','Invalid Mandate Date Rule Type','failed','Rejected','PENDING','PENDING','FAILED','FAILED','Mandate pause/unpause unsucessful','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD317' :['Invalid Mandate Date Rule Value','Invalid Mandate Date Rule Value','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD318' :['Invalid Mandate Start Date Format','Invalid Mandate Start Date Format','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD319' :['Invalid Mandate End Date Format','Invalid Mandate End Date Format','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD320' :['Mandate Start Date should be greater than present date','Mandate Start Date should be greater than present date','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD321' :['Expired Mandate End Date','Expired Mandate End Date','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD322' :['Invalid Mandate Date Range','Invalid Mandate Date Range','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD323' :['Invalid Transaction date: Transaction already done for this Mandate period','Invalid Transaction date: Transaction already done for this Mandate period','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD324' :['onBehalf_Of type is invalid','onBehalf_Of type is invalid','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD325' :['Mandate Request Expriy time must valid and min 1, Max 6400 mins','Mandate Request Expriy time must valid and min 1, Max 6400 mins','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD326' :['Invalid mandate action_type','Invalid mandate action_type','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD327' :['Invalid Virtual Address','Invalid Virtual Address','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD328' :['Invalid PSP Reference number and min length 10, max length 35','Invalid PSP Reference number and min length 10, max length 35','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD329' :['Duplicate Request(PSP Reference Number must be unique for every request)','Duplicate Request(PSP Reference Number must be unique for every request)','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD330' :['Mandate on behalf of is invalid','Mandate on behalf of is invalid','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD331' :['Invalid Mandate Search Date Range','Invalid Mandate Search Date Range','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD332' :['Invalid Account ID','Invalid Account ID','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD333' :['UMN must be present and max length 32','UMN must be present and max length 32','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD334' :['Duplicate UMN','Duplicate UMN','failed','Rejected','PENDING','PENDING','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD335' :['Invalid Payee Virtual Address','Invalid Payee Virtual Address','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD336' :['Invalid Payee Beneficiary Account number','Invalid Payee Beneficiary Account number','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD337' :['Invalid Payee Beneficiary Mobile number','Invalid Payee Beneficiary Mobile number','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD338' :['Invalid Payee Beneficiary MMID','Invalid Payee Beneficiary MMID','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD339' :['Invalid Beneficiary Aadhar number','Invalid Beneficiary Aadhar number','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD340' :['Payee Block not found','Payee Block not found','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD341' :['Ref Url is not valid or proper format. e.g. http://www.yyy.zzz','Ref Url is not valid or proper format. e.g. http://www.yyy.zzz','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD342' :['Invalid Payer Virtual Address','Invalid Payer Virtual Address','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD343' :['Invalid Cred block','Invalid Cred block','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD344' :['Invalid Transaction date','Invalid Transaction date','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD345' :['Invalid Transaction date as per Mandate Recurr rule','Invalid Transaction date as per Mandate Recurr rule','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD346' :['Recurrence Amount should not be more than Mandate Amount','Recurrence Amount should not be more than Mandate Amount','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD347' :['Recurrence Amount should not be less than Mandate Amount for Amount Rule:EXACT','Recurrence Amount should not be less than Mandate Amount for Amount Rule:EXACT','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD901' :['Request Payload not in proper format','Request Payload not in proper format','failed','Rejected','PENDING','PENDING','PENDING','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD902' :['Crypto error, Unable to decrypt payload','Crypto error, Unable to decrypt payload','failed','Rejected','PENDING','PENDING','PENDING','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD903' :['Crypto error, Unable to build payload response','Crypto error, Unable to build payload response','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD904' :['Internal Server Error','Internal Server Error','failed','Rejected','PENDING','PENDING','PENDING','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD905' :['PSP not found or configured','PSP not found or configured','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD906' :['Technical issues while processing the request','Technical issues while processing the request','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD907' :['Invalid PSP ID','Invalid PSP ID','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD908' :['Mismatch between PSP ID in wrapper request and enrypted object','Mismatch between PSP ID in wrapper request and enrypted object','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD909' :['Invalid Merchant ID','Invalid Merchant ID','failed','Rejected','PENDING','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD910' :['Mismatch between MID in wrapper request and enrypted object','Mismatch between MID in wrapper request and enrypted object','failed','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD912' :['purpose_code must be valid and length of 2','purpose_code must be valid and length of 2','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD913' :['orgPspRefNo must be valid and min length 10, max length 35','orgPspRefNo must be valid and min length 10, max length 35','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD914' :['Either UMN or orgPspRefNo must be present for mandate status','Either UMN or orgPspRefNo must be present for mandate status','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully'],
    'MD915' :['Unable to post request to NPCI','Unable to post request to NPCI','failed','Rejected','PENDING','PENDING','PENDING','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD500' :['Merchant not found','Merchant not found','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD501' :['Merchant Account details not found or configured','Merchant Account details not found or configured','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD502' :['Merchant not allowed on behalf of PAYER','Merchant not allowed on behalf of PAYER','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD503' :['Mandate Obj not found','Mandate Obj not found','failed','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD504' :['Minimum Mandate amount value should INR 1.00','Minimum Mandate amount value should INR 1.00','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD505' :['Customer account details not found','Customer account details not found','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD506' :['Customer data not found','Customer data not found','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD507' :['No pending request found to approve','No pending request found to approve','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD508' :['No record found for Recurrence Payment','No record found for Recurrence Payment','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD509' :['No Mandate data found to Revoke','No Mandate data found to Revoke','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD510' :['Mandate is not allowed for Revoke','Mandate is not allowed for Revoke','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD511' :['Invalid Beneficiary IFSC','Invalid Beneficiary IFSC','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD512' :['No Mandate Update data found to Approve','No Mandate Update data found to Approve','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD513' :['Old Mandate record not found','Old Mandate record not found','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess','Mandate unpause unsucess'],
    'MD514' :['Mandate Update Request already initiated for Same UMN','Mandate Update Request already initiated for Same UMN','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD515' :['No Mandate data found to Modify','No Mandate data found to Modify','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD520' :['Mandate status not active for Recurrence Payment','Mandate status not active for Recurrence Payment','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD521' :['Recurrence Payment is in progress','Recurrence Payment is in progress','inprogress','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD522' :['Recurrence Payment is already completed','Recurrence Payment is already completed','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD523' :['VPA is not available for transaction','VPA is not available for transaction','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD524' :['VPA is available for transaction','VPA is available for transaction','inprogress','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD525' :['VPA is available for transaction','VPA is available for transaction','inprogress','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD526' :['Payee initiated mandate cant be revoked by Payer','Rayee initiated mandate cant be revoked by Paye','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD527' :['Mandate Payee VPA mismatch with request payee VPA','Mandate Payee VPA mismatch with request payee VPA','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD528' :['Remarks allowed only alphanumeric, special characters @ and dot(.)','Remarks allowed only alphanumeric, special characters @ and dot(.)','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD600' :['Sign or Verify action_type is invalid','Sign or Verify action_type is invalid','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD601' :['intent_url must be presnt and valid','intent_url must be presnt and valid','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD602' :['intent_url not in proper format','intent_url not in proper format','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD603' :['Key not found to sign/verify intent. Kinldy contact to service provider','Key not found to sign/verify intent. Kinldy contact to service provider','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess'],
    'MD604' :['Signature is not valid or Tampered','Signature is not valid or Tampered','failed','Rejected','PENDING','FAILED','FAILED','UNREVOKED','Mandate pause/unpause unsucessful','Mandate has not been revoked successfully','Mandate unpause unsucess']
};

const txnExpiry = 604800; //Expiry time for transaction data (Setting it as 30 minutes in sync with expireTxn cron)

const intentRequestKeys = ['refId', 'customerVpa', 'merchantVpa', 'amount', 'sendCallback', 'expStatusCode', 'remarks', 'callbackUrl'];
const dateFormat = "yyyy-mm-dd HH:MM:SS";
const actionType={'PAUSE':'PAUSE', 'REVOKE':'REVOKE','UNPAUSE':'UNPAUSE'};
const redisKeyNames = { 'token': 'UPIToken', 'customerVPA': 'VPA', 'upiTxnId': 'UpiTxnId', 'amount': 'TxnAmount', 'time': 'TxnTime', 'expiry': 'ExpiryTime', 'rrn': 'TxnRrn', 'txnStatusCode': 'TxnStatusCode', 'remarks': 'Remarks', 'refNum': 'ReferenceNumber', 'bank': 'BankName' , 'merchantVPA': 'MVPA', 'action_type': 'Action','customerName': 'CustName','merchant_id': 'MID','startDate' : 'StartDate','endDate' :'EndDate','pattern': 'SiPattern','UMN':'UMN','frequency':'frequency','revokable':'revokable','ruleValue':'ruleValue','ruleType':'ruleType','amt_rule':'amt_rule','debitAmount':'debitAmount','AccountNo':'AccountNo','TerminalId' : 'TerminalId'};
const supportedCallbackEnvList = ['MobileTest', 'MobileDev','PP18Secure','PP20Secure', 'PP33Secure', 'PP34Secure', 'BizCheckoutTest', 'NewTestApi', 'PP31Secure', 'PP32Secure', 'PP35Secure', 'PP42Secure', 'PP44Secure', 'PP38Secure', 'PP39Secure','PP64Secure'];

//Supported banks
const Bank = {
    AXIS: "axis",
    HDFC : "hdfc",
    INDUS: "indus",
    TezOmni : "TezOmni",
    ICICI : "icici",
    AIRTEL : "airtel"
};

const Algo = {
    AES_128_ECB: 'AES-128-ECB',
    AES_128_CBC : 'AES-128-CBC'
};

var sendCallbackFlag= 'true' ;
const bobcipher = "des-ede3";
const bobkey = "934018220677934018220690";
const bobivKey = "";

const airtelCollectKeys = ['amount','expiryType','feSessionId','hdnOrderID','mid','payeeVirtualAdd','payerMobNo','payerVirtualAdd','remarks','ver','hash'];
const airtelVerifyKeys =['hdnOrderID','merchantId','ver','hash'],
    airtelRedisKeys =['upiTxnId','txnStatusCode','amount','customerVPA','rrn','merchantVPA'];

const statusCodeDesc_airtel = {
    '0': ['SUCCESS','SUCCESS','0'],
    '000': ['REFUND_INIT','SUCCESS','0'],
    '2': ['FAILURE', 'I/O error', '1'],
    '3': ['FAILURE', 'Account Blocked.', '1'],
    '4': ['FAILURE', 'No debits allowed on Account.', '1'],
    '5': ['FAILURE', 'I/O error', '1'],
    '10': ['FAILURE', 'I/O error', '1'],
    '29': ['FAILURE', 'I/O error', '1'],
    '51': ['FAILURE', 'FAILURE', '1'],
    '86': ['FAILURE', 'Sorry! Transaction could not be processed due to insufficient funds', '1'],
    '96': ['FAILURE', 'FAILURE', '1'],
    '91': ['FAILURE', 'TimeOut', '1'],
    '116': ['FAILURE', 'FAILURE', '1'],
    '1206': ['FAILURE', 'Sorry! Transaction could not be processed. Please try later', '1'],
    '1210': ['FAILURE', 'Database Error :', '1'],
    '1294': ['FAILURE', 'Internal error', '1'],
    'ZA': ['DECLINED', 'FAILURE', '1']
};
var upiConstant = {

    dateInMillis : dateInMillis,
    startTime :startTime,
    expiryTime : expiryTime,
    expiryInSeconds : expiryInSeconds,

    axisaggregatorMerchant : axisaggregatorMerchant,
    axismerchantVPAs : axismerchantVPAs,
    axiscollect : axiscollect,
    axisvalidateVPAKeys : axisvalidateVPAKeys,
    axistokenGenerationKeys : axistokenGenerationKeys,
    axisverifyStatusKeys : axisverifyStatusKeys,
    axisprivateKey : axisprivateKey,
    axispublicKey : axispublicKey,
    axiscallbackKey : axiscallbackKey,
    axiscallbackChecksumKey : axiscallbackChecksumKey,
    axisTransactionStatusKeys : axisTransactionStatusKeys,

    hdfcaggregatorMerchant : hdfcaggregatorMerchant,
    hdfcmerchantVPAs : hdfcmerchantVPAs,
    hdfcmccCode : hdfcmccCode,
    hdfcrrnPrefix : hdfcrrnPrefix,
    hdfcrequestKeys : hdfcrequestKeys,
    hdfcMEBR : hdfcMEBR,

    hdfcSIrequestKeys : hdfcSIrequestKeys,
    hdfcSImandateRequestKeys : hdfcSImandateRequestKeys,
    hdfcSIrecurrenceRequestKeys : hdfcSIrecurrenceRequestKeys,
    hdfcSIVerifyRedisKeys : hdfcSIVerifyRedisKeys,
    hdfcVerifyRedisKeys : hdfcVerifyRedisKeys,
    hdfcSITransactionStatus : hdfcSITransactionStatus,
    hdfcSIrecurRedisKeys : hdfcSIrecurRedisKeys,
    hdfcSIrecurKeysFreqisAdhoc : hdfcSIrecurKeysFreqisAdhoc,
    hdfcSINotifyRedisKeys : hdfcSINotifyRedisKeys,
    hdfcSIModifyRedisKeys : hdfcSIModifyRedisKeys,
    hdfcSIModifyRedisKeysAdhocFreq : hdfcSIModifyRedisKeysAdhocFreq,
    hdfcSIFrequency : hdfcSIFrequency,

    indusclientId : indusclientId,
    indusclientSecret : indusclientSecret,
    indusaggregatorMerchant : indusaggregatorMerchant,
    indusmerchantVPAs : indusmerchantVPAs,
    indusrequestKeys : indusrequestKeys,
    indusnpciTxnIdPrefix : indusnpciTxnIdPrefix,
    indusTransactionStatusKeys : indusTransactionStatusKeys,

    icicirequestKeys : icicirequestKeys,
    iciciVerifyRequestKeys : iciciVerifyRequestKeys,
    iciciCollectrequestKeys : iciciCollectrequestKeys,
    icicimerchantVPAs : icicimerchantVPAs,
    icicirrnPrefix : icicirrnPrefix,
    icicipublic_key : icicipublic_key,
    iciciprivate_key : iciciprivate_key,
    icicikey_private : icicikey_private,
    icicikey_public : icicikey_public,
    iciciIntentTransactionStatusKeys : iciciIntentTransactionStatusKeys,
    iciciCollectTransactionStatusKeys : iciciCollectTransactionStatusKeys,

    hdfcAccountNo : hdfcAccountNo,
    statusCodeDesc_axis : statusCodeDesc_axis,
    validVPAs : validVPAs,
    statusCodeDesc : statusCodeDesc,
    statusCodeDesc_ICICI : statusCodeDesc_ICICI,
    statusCodeDesc_HDFCOTM : statusCodeDesc_HDFCOTM,
    testEnvUrl : testEnvUrl,
    txnExpiry : txnExpiry,
    intentRequestKeys :intentRequestKeys,
    dateFormat : dateFormat,
    actionType : actionType,
    supportedCallbackEnvList : supportedCallbackEnvList,
    redisKeyNames : redisKeyNames,
    Bank : Bank,
    Algo : Algo,
    sendCallbackFlag : sendCallbackFlag,
    bobcipher : bobcipher,
    bobkey : bobkey,
    bobivKey : bobivKey,

    icicisi_private : icicisi_private,
    icicisi_public : icicisi_public,
    iciciSiCollectRequestKeys : iciciSiCollectRequestKeys,
    iciciSiVerifyRequestKeys : iciciSiVerifyRequestKeys,
    iciciVerifySiRedisKeys : iciciVerifySiRedisKeys,
    icicirecurSIRedisKeys : icicirecurSIRedisKeys,
    iciciSiRecurrPay : iciciSiRecurrPay,
    iciciSiNotifyKeys : iciciSiNotifyKeys,
    iciciSiUpdateRedisKeys : iciciSiUpdateRedisKeys,
    iciciSiUpdateKeys : iciciSiUpdateKeys,

    airtelmerchantVPAs : airtelmerchantVPAs,
    airtelCollectKeys : airtelCollectKeys,
    airtelVerifyKeys : airtelVerifyKeys,
    airtelRedisKeys : airtelRedisKeys,
    statusCodeDesc_airtel : statusCodeDesc_airtel,
    ICICISItestEnvUrl : ICICISItestEnvUrl
}

module.exports = upiConstant;