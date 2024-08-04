import express, {Request, Response} from "express";
import {responseWithData, returnWithDataDefault} from "../../utils/custom_types";
import {sendResponse} from "../../utils/functions";
import {fetchStocks, testRoute} from "../../controllers/stocks";

const router = express.Router();

router.get("/test", testRoute);
router.post("/list", fetchStocks);

module.exports = router;
