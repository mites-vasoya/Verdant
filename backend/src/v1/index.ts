import express from "express";

const router = express.Router();

const stocks = require("./routes/stocks");

router.use("/stocks", stocks);

module.exports = router;