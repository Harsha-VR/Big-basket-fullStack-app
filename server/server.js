const express = require("express");
const app = express();
const cors = require("cors");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");

// configure the cors
app.use(cors());

//  configure the express for recieving the form data
app.use(express.json());

// configure the dot env file
dotEnv.config({ path: "./.env" });

// configure the mongoose

mongoose
  .connect(process.env.MONGO_DB_LOCAL_URL, {})
  .then(() => {
    console.log("Successfully connectd to mongoDB");
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const hostname = process.env.HOST_NAME;
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("<h2>your bakend server is started at port nu 7000</h2>");
});

// router configuration

app.use("/api", require("./router/productRouter"));

app.listen(port, hostname, () => {
  console.log(`express server started at http://${hostname}:${port}`);
});
