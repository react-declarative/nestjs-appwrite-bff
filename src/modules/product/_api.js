const { listProduct } = require("./_controller");

const router = require("express").Router();

router.get("/product", listProduct);

module.exports = router;
