const express = require("express");
const cors = require("cors");
const ip = require("ip");

const app = express();

app.use(cors());
app.use(express.json());

// import router
const address_route = require("./modules/product/_api");

// registered router
app.use(address_route);

app.listen(5001, () => {
  console.log(`SERVER HAS BEEN STARTED ON LOCAL PORT ${5001}`);
  console.log(`SERVER HAS BEEN STARTED ON PORT http://${ip.address()}:${5001}`);
});