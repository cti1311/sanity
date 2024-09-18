const config = require('../config.js')

const router = require('express').Router()
const qs = require('qs')

const axios = require('axios')
const url = require('node:url');


router.post("/:url",(req,res)=>{
    const params = new url.URLSearchParams(req.body);
  axios.post(decodeURIComponent(req.params.url),params,{
    headers: { 'content-type': 'application/x-www-form-urlencoded' }
  }).then((ress)=>{
    console.log(ress.data);
    res.send("ok")
  })
})


module.exports = router