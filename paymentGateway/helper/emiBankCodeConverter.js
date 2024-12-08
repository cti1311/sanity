const mappingData = {
    EMIA: "UTIB",
    EMI: "HDFC"
}

module.exports = (bankcode)=>{
    console.log(bankcode);
    const re = /^([A-Za-z]{2,10})(\d{0,2})/
    const result = re.exec(bankcode);
    console.log(result)
    if (result.length < 2 ) return ""
    return mappingData[result[1]] || ""
}