require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.urlencoded({extended: false}))

app.use("/", require("./routes/index"));

app.listen(process.env.PORT, () => {
  console.log(`Server started at PORT ${process.env.PORT}`);
});


