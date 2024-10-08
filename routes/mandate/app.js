const express = require('express')
const app = express()

app.use(express.json())

app.use('/',require('./newSim.js'))
app.use('/proxy',require('./newSim2.js'))


app.listen('3000',console.log("server started at port 3000"))