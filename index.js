require("dotenv").config();

const express = require("express");
const app = express();
const config = require("./config.js")

app.use(express.urlencoded({extended: false}))

app.use("/", require("./routes/index"));

app.listen(config.server.port, () => {
  // console.log(`Server started at PORT ${process.env.PORT}`);
});


