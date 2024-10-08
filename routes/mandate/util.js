var crypto = require('crypto');
const crc = require('crc');
// var client = require('../util/redis');
// const config = require('../settings');
var Cipher = require('aes-ecb');
var axios = require('axios');
var https = require('https');
/**
 * Util Object
 */
var util = {
        /**
         * Function to left pad data
         *
         * @param data          Data to be left padded
         * @param padding       Element to be used for padding
         * @param size          Size of the padded element
         */
        leftPad: function (data, padding, size) {
                data = data + "";
                if (data.length >= size)
                        return data;
                while (data.length < size)
                        data = padding + data;
                return data;
        },

        /**
         * Function to set key in redis
         * @param {String} key
         * @param {String} value
         * @param {Number} expiry
         */
        setKeyInRedis: function (key, value, expiry) {
                if(expiry && !isNaN(expiry)) {
                        client.set(key, value, 'ex', expiry)
                }
                else {
                        client.set(key, value);
                }
        },

        /**
         * Function to set key expiry in redis
         * @param {String} key
         * @param {Number} expiry
         */
        setKeyExpiryInRedis: function (key, expiry) {
                client.expire(key, expiry);
        },

        /**
         * Function to delete key in redis
         */
        deleteKeyInRedis: function (key) {
                client.del(key);
        },

        /**
         * Function to get key from redis
         */
        getKeysFromRedis: function (keys) {
                var keysToFetch = keys.join(",");
                return client.mget(keysToFetch);
        },


        /**
         * Function to get key from redis
         */
        getKeyFromRedis: function (key) {
                client.get(key, function (error, result) {
                        if (error) {
                                console.log(error);
                                throw error;
                        }
                        console.log('GET result ->' + result);
                        return result;

                });
        },

        /**
         * Function to parse given request data
         *
         * @param data  Data to be parsed
         * @param type  Type of request
         */
        parse: function (data, type) {
                switch (type.toLowerCase()) {
                        case "pareq":
                                return data;
                        case "vereq":
                                body = decode(data).split("\n").join("");
                                return body;
                                break;
                        default:
                                return ("Request not supported");
                }
        },
        /**
         * Function to generate a random number of given length
         * @param {number} length 
         */
        generateRandomNumber: function (length) {
                var minValue = 1 * Math.pow(10, length - 1), maxValue = 9 * Math.pow(10, length - 1);
                return Math.floor(Math.random() * maxValue + minValue)
        },
        /**
         * Function to generate pares id
         */
        generateParesId: function () {
                var random = util.generateRandomNumber(12) + "";
                var date = new Date();
                date = date.getTime() + "";
                var paresId = random.substr(random.length - 6) + date.substr(date.length - 5) + random.substr(0, 3) + date.substr(0, 2);
                return paresId;
        },
        /**
         * Function to generate XID
         */
        generateXid: function () {
                var random = util.generateRandomNumber(12) + "";
                var date = new Date();
                date = date.getTime() + "";
                var xid = new Buffer(random.substr(random.length - 6) + date.substr(date.length - 6) + random.substr(0, 3) + date.substr(0, 3), 'utf-8');
                return xid.toString('base64');
        },
        /**
         * Function to generate date time
         * @param {string | number} dateString 
         * @param {string} format
         */
    getCurrentDate :function() {
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1; //January is 0!

                var yyyy = today.getFullYear();
                if(dd<10){
                        dd='0'+dd
                } 
                if(mm<10){
                        mm='0'+mm
                } 
                var currentDate = yyyy+mm+dd;
                return currentDate;
        },
        getDateTime: function (dateString, format) {
                var date = dateString ? new Date(dateString) : new Date();
                var dateFormat = "yyyymmdd HH:MM:SS";
                if (format && format.match("^(([yY]{4}|[yY]{2}|m{2}|[dD]{2}|[hH]{2}|M{2}|[sS]{2})?([\-\/.: ]?)([yY]{4}|[yY]{2}|m{2}|[dD]{2}|[hH]{2}|M{2}|[sS]{2})?){1,5}$"))
                        dateFormat = format;
                var year = dateFormat.includes("yyyy") ? date.getFullYear() : date.getFullYear().toString().substr(-2, 2),
                        month = util.leftPad(date.getMonth() + 1, "0", 2),
                        day = util.leftPad(date.getDate(), "0", 2),
                        hour = util.leftPad(date.getHours(), "0", 2),
                        minute = util.leftPad(date.getMinutes(), "0", 2),
                        second = util.leftPad(date.getSeconds(), "0", 2);
                var dateTime = dateFormat.replace("yyyy", year).replace("yy", year).replace("mm", month).replace("dd", day)
                        .replace("HH", hour).replace("MM", minute).replace("SS", second);
                return dateTime;
        },
        /**
         * Function to generate cvv
         */
        generateCavv: function () {
                var random = util.generateRandomNumber(12) + "";
                var date = new Date();
                var [day, year, hour, minute] = [date.getDate(), date.getFullYear(), date.getHours(), date.getMinutes()];
                var dateTime = (day +""+ year +"" + hour +"" + minute);
                //var randomKey = new Buffer(random.substr(random.length - 6) + date.substr(date.length - 5) + random.substr(0, 3) + date.substr(0, 2));
                //var cavv = new Buffer(this.calculateSha1(randomKey), 'hex');
                var cavv = ("100"+ dateTime.toString() + "0000000" + random.toString());
                return util.encodeBase64(cavv);
        },
        /**
         * Function to generate ECI
         *
         * @param pan           PAN number
         * @param status        Status that is set for response
         */
        getEci: function (pan, status) {
                switch (pan.substr(0, 1)) {
                        // maestro and mastercard
                        case "6":
                        case "5":
                                switch (status) {
                                        case "A": return "01";
                                        case "N": return "00";
                                        case "Y": return "02";
                                }
                        // visa
                        case "4":
                                switch (status) {
                                        case "A": return "06";
                                        case "N": return "07";
                                        case "Y": return "05";
                                }
                        // default case
                        default:
                                switch (status) {
                                        case "A": return "06";
                                        case "N": return "";
                                        case "Y": return "05";
                                }
                }
        },
        /**
         * Function to calculate sha1 for given data
         *
         * @param data data whose hash is to be calculated
         */
        calculateSha1: function (data) {
                return crypto.createHash('sha1').update(data).digest('hex');
        },
        /**
         * Function to generate random string
         *
         * @param length        length of string to be generated
         * @param options       options for generating string including a, A, # or !
         */
        generateRandom: function (length, options) {
                var charSet = "";
                if (options.indexOf("a") > -1) charSet += "abcdefghijklmnopqrstuvwxyz";
                if (options.indexOf("A") > -1) charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                if (options.indexOf("#") > -1) charSet += "0123456789";
                if (options.indexOf("!") > -1) charSet += "~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
                var result = "";
                for (var i = 0; i < length; i++)
                        result += charSet[Math.floor(Math.random() * charSet.length)];
                return result;
        },
        /**
         * Function to generate random string for DS Id
         *
         * @param length        length of string to be generated
         */
        generateRandomDsId: function (length) {
                var charSet = "abcdef0123456789";
                var set = "012345";
                var set2 = "089ab";
                var result = "";
                for (var i = 0; i < length; i++){
                        if (i == 8 || i == 13 || i == 18 || i == 23)
                                result += "-";
                        else if (i == 14)
                                result += set[Math.floor(Math.random() * set.length)];
                        else if (i == 19)
                                result += set2[Math.floor(Math.random() * set2.length)];
                        else
                                result += charSet[Math.floor(Math.random() * charSet.length)];
                }
                return result;
        },
        /**
         * Function to validate Pareq, MD and TermUrl
         *
         * @param req                   req that is received
         * @param callback  callback that is to be called
         */
        validateMandatoryParam: function (req, callback) {

                if (req == undefined || req == null) {
                        callback(0, "Invalid request recieved.");
                        return;
                }
                var pareq = "";
                var md = "";
                var termUrl = "";
                var isreturnUrlflow=0;
                if (req.PaReq != undefined && req.PaReq != null && req.PaReq != '' && req.PaReq != 'null' && req.PaReq != 'NULL') {
                        pareq = req.PaReq;
                } else {
                        callback(0, "Invalid/Empty Pareq recieved");
                        return;
                }
                if (req.MD != undefined && req.MD != null && req.MD != '' && req.MD != 'null' && req.MD != 'NULL') {
                        md = req.MD;
                } else {
                        callback(0, "Invalid/Empty MD recieved.");
                        return;
                }

                if (req.TermUrl != undefined )
                {
                        termUrl = req.TermUrl;
                }
                else
                {
                        termUrl="http://secure.payubiz.in:3000/mpi/verifyPg";
                }
                callback(1, {
                        'MD': md,
                        'PaReq': pareq,
                        'TermUrl': termUrl
                });
        },
        /**
         * Method to get acs url based on pan in request
         *
         * @param pan card number of request
         */
        getAcsUrl: function (pan) {
                switch (pan) {
                        case "4213306394971002":
                        case "4854460198765435":
                        case "5242540398765430":
                                return "https://acssim.payubiz.in:3000/headless/hdfc/payerAuthOptions"; // hdfc simulated page
                        case "4143670598765436":
                                return "https://acssim.payubiz.in:3000/headless/icici/acspage/cap"; // icici simulated page
                        case "4317549876543212":
                                return "https://acssim.payubiz.in:3000/headless/sbi/acspage/cap"; // sbi simulated page
                        case "4726529876543219":
                                return "https://acssim.payubiz.in:3000/headless/kotak/server/AccessControlServer"; // kotak simulated page
                        case "4601339876570232":
                                return "https://acssim.payubiz.in:3000/headless/canara/server/AccessControlServer"; // canara simulated page
                        case "5223180004000014":  // for icici ivr
                                return "https://acssim.payubiz.in:3000/iciciIvr";
                        case "5497774415170603":
                                return "https://acssim.payubiz.in:3000/headless/citi/server/AccessControlServer"; // citi simulated page
                        case "5534141234567895":  // for icici ivr not Enrolled case
                                return "";
                        default:
                                return "https://acssim.payubiz.in:3000/";
                }
        },
        /**
         * Method to calculate base 64 encoded data of request
         *
         * @param data text to be encoded
         */
    encodeBase64: function (data) {
                var encoded = Buffer.from(data).toString('base64');
                return encoded;
        },
        /**
         * Method to calculate secret key
         *
         * @param data text to be encoded
         */
    generateSecretKey: function () {
                var key = "";
                for (var i = 0; i < 12; i++) {
                        if(i<4){
             key += "B23";
                        }
                        if(i>3&&i<8){
                                key += "D4E";
                        }
                        if(i>7&&i<12){
                                key += "7A";
                        }
                }
                logger.info("Encrypted Key : "+ key);
                return key;
        },
        /**
         * Method to decode base 64 encoded data
         *
         * @param base64 encoded data
         */
        decodeBase64: function (data) {
                return Buffer.from(data, 'base64').toString();
        },
        /**
         * Method to calculate sha 256 of given data
         *
         * @param data data that is to be hashed
         */
        calculateSha256: function (data) {
                return crypto.createHash('sha256').update(data).digest('hex');
        },
        /**
         * Method to calculate sha 512 of given data
         *
         * @param data data that is to be hashed
         */
        calculateSha512: function (data) {
                return crypto.createHash('sha512').update(data).digest('hex');
        },
        /**
         * Method to calculate sha384 of given data|| returns buffer needs to be converted to required format like 'hex'
         *
         * @param data data that is to be hashed
         */
        calculateSha384: function (data) {
                return crypto.createHash('sha384').update(data).digest('hex');
        },
        /**
         * Method to calculate crc32 of given data
         *
         * @param data data that is to be crc32 checksum
         */
        calculateCrc32: function (data) {
                return crc.crc32(data);
        },

        /**
         * Method to calculate sha384 hash_hmac of given data
         *
         * @param data data that is to be hashed
         */
        Hash_hmac: function (algo, string_to_sign, shared_secret) {
                var hmac = crypto.createHmac(algo, shared_secret);
                hmac.write(string_to_sign);
                hmac.end()
                return hmac.read();
        },
        /**
         * Method to calculate aes-ecb hash_hmac of given data
         *
         * @param data data that is to be hashed
         */
        encyptAES: function (algo, Iv, IvFormate,secretKey,secretKeyFormate,encryptedInput,encryptedInputFormate,encryptedOutputFormate,binaryField) {
                var binaryEncryptionKey = secretKey;
                var inputForEncryption  = encryptedInput;
                switch(binaryField){
         case "secretKey":
                          var binaryEncryptionKey = Buffer.from( secretKey, secretKeyFormate);
                          break;
             case "inputString":                  
                          var inputForEncryption = Buffer.from( encryptedInput, encryptedInputFormate);
                          break;
                 case "both":     
                          var binaryEncryptionKey = Buffer.from( secretKey, secretKeyFormate);
                          var inputForEncryption = Buffer.from( encryptedInput, encryptedInputFormate); 
                          break; 
                          default:
                         
                }
                var binaryIV;
                if(Number(Iv) == 0){
            binaryIV = Buffer.alloc(Iv);
                }else{
                if(IvFormate != ""){
                var binaryIV = Buffer.from( Iv, IvFormate);
                }else{
                binaryIV = Iv.slice(0,16);
                }
                }
                var cipher = crypto.createCipheriv( algo, binaryEncryptionKey, binaryIV );
                var encryptedInput = (
                        cipher.update( inputForEncryption,encryptedInputFormate,encryptedOutputFormate ) +
                        cipher.final(encryptedOutputFormate)
                );
                return encryptedInput;
        },
                /**
         * Method to calculate aes-ecb hash_hmac of given data
         *
         * @param data data that is to be hashed
         */
        decyptAES: function (algo, Iv, IvFormate,secretKey,secretKeyFormate,encryptedInput,encryptedInputFormate,encryptedOutputFormate,binaryField) {

                var binaryEncryptionKey = secretKey;
                var inputForEncryption  = encryptedInput;
                switch(binaryField){
         case "secretKey":
                          var binaryEncryptionKey = Buffer.from( secretKey, secretKeyFormate);
                          break;
             case "inputString":                  
                          var inputForEncryption = Buffer.from( encryptedInput, encryptedInputFormate);
                          break;
                 case "both":     
                          var binaryEncryptionKey = Buffer.from( secretKey, secreatKeyFormate);
                          var inputForEncryption = Buffer.from( encryptedInput, encryptedInputFormate); 
                          break; 
         default: 
                }
                let binaryIV;
                if(Number(Iv) == 0){
            binaryIV = Buffer.alloc(Iv);
                }else{
                if(IvFormate != ""){
                binaryIV = Buffer.from( Iv, IvFormate);
                }else{
                binaryIV = Iv.slice(0,16);
                }
                }
                var decipher = crypto.createDecipheriv( algo, binaryEncryptionKey, binaryIV);
                var decryptedInput = (
                        decipher.update( inputForEncryption, encryptedInputFormate, encryptedOutputFormate) +
                        decipher.final(encryptedOutputFormate )
                );
                return decryptedInput;
        },
        /**
         * Method to get query_param_string
         *
         * @param responseParams json object that is to be converted to query string param
         */
        getQueryString: function (responseParams) {
                var secureString = "";
                var responseParamKeys = Object.keys(responseParams);
                for (var i = 0; i < responseParamKeys.length; i++) {
                        secureString += "&" + responseParamKeys[i] + "=" + responseParams[responseParamKeys[i]];
                }
                secureString = secureString.substring(1, secureString.length);
                return secureString;
        },
        /**
         * Method to get json response from queried string
         *
         * @param responseParams json object that is to be converted to query string param
         */
        getJsonFromQueryString: function (responseString) {
            var param = {};
                var keyData = "";
                var responseParamKeys = responseString.split("&");
                for (var i = 0; i < responseParamKeys.length; i++) {
                        if(i==0){
                          var urlData = responseParamKeys[i].split("?");
                          param["action"] = urlData[0];
                          keyData = urlData[1];
                        }
                        keyData = responseParamKeys[i].split("=");
                        param[keyData[0]] = keyData[1];

                }
                return param;
        },
        getCheckSumKey: function(checksumRequest) {
        var checksum = checksumRequest.split("|");
        var checkSumKey = "";
        switch (Number(checksum[0])) {
            case 120: checkSumKey = "987654321011";
                break;
            case 101: checkSumKey = "987654321012";
                break;
            case 130: checkSumKey = "987654321013";
                break;
            default:
                checkSumKey = "987654321014";
        }
        logger.info("Value of checksum key " + checkSumKey);
        return checkSumKey;
        },

    json2array(json){
                var result = [];
                var keys = Object.keys(json);
                keys.forEach(function(key){
                        result.push(json[key]);
                });
                return result;
        },
        validateNullOrEmpty(key,req){
                var flag = true;
                   logger.info("Validating :::::::::::   " + key);
                   if(req[key] === undefined || req[key] == null || req[key] == ""){
                        flag = false;  
                        logger.info("Value of key " + key + " is either null or not exist   ");
                        }
                return flag;
        },
        exist(value,ObArray){
                var flag = false;
                for(var j =0 ;j< ObArray.length;j++){
                        if(ObArray[j] == value){
                        flag = true;
                        break;
                        }
                }
                return flag;
        },
        getSuccessCvv(pan,cardType){
                var cvv = "";
                if(config.server_url == "https://acssimuat.payubiz.in"){

          if(cardType == "AMEX"){
             cvv = "1234";
                  }else{
                         cvv = "123";
                  }
                }else{
                        if(cardType == "AMEX"){
                                cvv = pan.substring(2, 6);
                         }else{
                            cvv = pan.substring(3, 6);
                         }
                }
                logger.info("Cvv for  success case for  url  " + config.server_url + " is " + cvv);
                return cvv;
        },
        getSuccessOtp(){
                var successOtp = config.successOtp;
                if(config.server_url == "https://acssimuat.payubiz.in"){
                        successOtp = "123456";
            }
                logger.info("Otp for  success case for  url  " + config.server_url + " is " + successOtp);
                return successOtp;
        },
        checkValidExpiry(expiryYear){
                var flag = true;
                var expiryConditionLimit = 2025;
                if(config.server_url != "https://acssimuat.payubiz.in" && expiryYear > expiryConditionLimit) {
                        flag = false;
                }
                logger.info("Expiry as " + expiryYear + " for success case over url " + config.server_url + " is matching? " + flag);
                return flag;
        },

        decryptStoreCardData(encdata, key, iv) {

                key = crypto.createHash('sha256').update(key, 'utf-8').digest().slice(0, 16);
                iv = Buffer.from(iv, 'hex');
                encdata = Buffer.from(encdata, 'base64').toString('binary');
                var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
                var decoded = decipher.update(encdata, 'binary', 'utf8');
                decoded += decipher.final('utf8');
                return decoded;  
          },

    encryptStoreCardData(plainText,key, iv) {

                //plainText = JSON.stringify(plainText)  
        key = crypto.createHash('sha256').update(key, 'utf-8').digest().slice(0,16);  
        iv = Buffer.from(iv, 'hex');  
        const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
        var crypted = cipher.update(plainText, 'utf8', 'binary');
        crypted += cipher.final('binary');
        crypted = Buffer.from(crypted, 'binary').toString('base64');
        return crypted;
      },

    ivgenerate() {
         var iv1 = crypto.randomBytes(16);
         var ivstring = iv1.toString('hex')
         return ivstring
   },  
   
   luhnCheck(value) {

        var nCheck = 0, nDigit = 0, bEven = false;
    for (var n = value.length - 1; n >= 0; n--) {
        var cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);
        if (bEven) {
            if ((nDigit *= 2) > 9) nDigit -= 9;
        }
        nCheck += nDigit;
        bEven = !bEven;
    }
    return (nCheck % 10);
  },

browserParamCommonCheck(browserParameters){
        browserParameters.forEach(function(parameters) {
                if(typeof(parameters)=='string' && (parameters=="" || parameters== undefined))
                        return false;
                else if(typeof(parameters)=='number' && (parameters==0 || parameters== undefined))
                        return false;
                else if(typeof(parameters)=='boolean' && (parameters==false || parameters== undefined))
                        return false;
        });
        return true;
},  

        /**
         * Function to send Post data to http API
         */
        httpApiPost: function (url, data, callback) {

                const httpsAgent = new https.Agent({ rejectUnauthorized: false });
                axios.post(url, data, { httpsAgent })
                        .then(function (response) {
                                logger.info("Inside Then !!!!!!!");
                                if (response)
                                        responseMessage = "Response: " + response + " Status: " + response.status;
                                else
                                        responseMessage = "No response from server";

                                logger.info("API POST response: " + responseMessage);
                                callback(response);
                        })
                        .catch(function (error) {
                                if (error.response) {
                                        responseMessage = "Response : " +  error.response + " Status: " + response.status;
                                } else if (error.request) {
                                        responseMessage = "Request: " + error.request;
                                } else {
                                        responseMessage = "Error in setting up request: " + error.message;
                                }
                                logger.info("Error in API POST: " + responseMessage);
                                callback(error);
                        });
        }


}
module.exports = util;