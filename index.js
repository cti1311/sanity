require("dotenv").config();

const express = require("express");
const app = express();
const config = require("./config.js")
const cors = require('cors')
const log = require('./logger.js');

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use("/", require("./routes/index"));

app.listen(config.server.port, () => {
  log.info(`Server started at PORT ${config.server.port}`);
});