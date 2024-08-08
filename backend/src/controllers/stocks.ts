import {Response, Request, NextFunction} from "express";
import {responseWithData, returnWithData, returnWithDataDefault} from "../utils/custom_types";
import {sendResponse} from "../utils/functions";
import {angelOneService} from "../services/angelOneService";
import {upstoxService} from "../services/upstoxService";

//This is test function created initially
export const testRoute = async (req: Request, res: Response) => {
    console.log("Test route");

    let response: responseWithData = {...returnWithDataDefault};

    sendResponse(res, response);
}

export const generateUpstoxAccessToken = async (req: Request, res: Response) => {
  let return_data: responseWithData = {...returnWithDataDefault};

  console.log("Generate upstox access token : ", req.params);

  let upstoxObj = new upstoxService();
  let generateAT = await upstoxObj.generateUpstoxAT(req.params.auth_code);
}


export const fetchStocks = async (req : Request, res : Response) => {
    console.log("Fetch Stocks");
    let return_data: responseWithData = {...returnWithDataDefault};

    //Fetch Stock List from the AngelOne
    const angelOneServiceObj = new angelOneService();
    let stockListRes: returnWithData = await angelOneServiceObj.fetchStocksList();

    return_data.error = false;
    return_data.message = "List fetch successfully";
    sendResponse(res, return_data);
}
