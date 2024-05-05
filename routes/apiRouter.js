require('dotenv').config()

const router = require('express').Router()
const payuClient = require('../payu')
const fs = require('fs')
const path = require('path')
router.get("/status",(req,res)=>{
  try{
    let data = fs.readFileSync(path.join( __dirname, '../result/cli.json'),'utf8')
    res.json({
      status: 1,
      timeStamp: fs.statSync(path.join( __dirname, '../result/cli.json')).mtime,
      data: JSON.parse(data)
    })
  }catch(e) {
    console.log(e)
    res.json({
      status: 0,
      err: "Exception while processing data"
    })
  }
})

module.exports = router