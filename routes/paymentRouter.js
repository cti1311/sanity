require('dotenv').config()

const router = require('express').Router()
const payuClient = require('../payu')

router.get("/initiate",(req,res)=>{
  // // console.log(req.query)
  let data = {
    txnid: Math.floor(Math.random()*1000000000),
    amount: req.query.amount || 10.00,
    productinfo: req.query.amount || "sanity",
    firstname: req.query.firstname || "sanity",
    email: req.query.email || "sanity@tesdfst.com",
    phone: req.query.phone || "9999999999",
    surl: req.query.surl || `http://localhost:${process.env.PORT}/payment/response`,
    furl: req.query.furl || `http://localhost:${process.env.PORT}/payment/response`,
  }

  // // console.log( typeof req.query)
  for(let param in req.query){
    if (!data[param]){
      data[param] = req.query[param];
    }
  }
  res.send(payuClient.paymentInitiate(data))
})

router.post("/response",(res,req)=>{
  // // console.log([req.body])
  req.send(res.body)
})

module.exports = router