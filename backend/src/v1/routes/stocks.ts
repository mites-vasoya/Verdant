import express, {Request, Response} from "express";
import {responseWithData, returnWithDataDefault} from "../../utils/custom_types";
import {sendResponse} from "../../utils/functions";
import {fetchStocks, generateUpstoxAccessToken, testRoute} from "../../controllers/stocks";

const router = express.Router();

router.get("/test", testRoute);

router.get("/access_token/generate/:auth_code", generateUpstoxAccessToken)
router.post("/list", fetchStocks);

module.exports = router;
