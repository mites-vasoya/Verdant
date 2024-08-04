let {SmartAPI, WebSocket, WebSocketV2} = require("smartapi-javascript");

import {returnWithData, returnWithDataDefault} from "../utils/custom_types";

let smart_api = new SmartAPI({
    api_key: process.env["ANGELONE_API_KEY "], // PROVIDE YOUR API KEY HERE
    // OPTIONAL : If user has valid access token and refresh token then it can be directly passed to the constructor.
    // access_token: "YOUR_ACCESS_TOKEN",
    // refresh_token: "YOUR_REFRESH_TOKEN"
});

export class angelOneService {
    constructor() {
    }

    async fetchStocksList() {
        let return_data: returnWithData = {...returnWithDataDefault};

        return return_data;
    }
}