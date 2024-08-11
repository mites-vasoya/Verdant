import axios from "axios";
import {returnWithData, returnWithDataDefault} from "../utils/custom_types";
import {dbUsers} from "../model/dbusers";

export class upstoxService {

  public base_url: string = "https://api.upstox.com/v2";

  constructor() {
  }

  //Generate Access Token After Login Redirection from UpStox
  async generateUpstoxAT(auth_code: any) {

    let return_data: returnWithData = {...returnWithDataDefault};
    console.log("---- Generating Token ----");
    console.log(auth_code);

    let body: Object = {
      code: auth_code,
      client_id: process.env["UPSTOX_API_KEY"],
      client_secret: process.env["UPSTOX_SECRET_KEY"],
      redirect_uri: "http://localhost:4200/redirect",
      grant_type: "authorization_code",
    };

    console.log("body : ", body);

    let header: Object = {
      headers: {
        "accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }


    let response: any = await axios.post(this.base_url + "/login/authorization/token", body, header);

    console.log("Response : ", response.data);

    if (!response || response.status != 200 || response.statusText != "OK") {
      return return_data;
    }

    response.data.auth_code = auth_code;

    //Insert User Details in the DB
    let usersObj = new dbUsers();
    let addUpdateRes: number = await usersObj.addUpdateUserData(response.data.auth_code, response.data);

    //Fetch User data
    usersObj.rpp = 1;
    usersObj.where = " user_id = '" + response.data.user_id + "'";
    let userData: any[] = await usersObj.select("*");

    console.log("User Data :", userData);

    if (userData.length <= 0) {
      return_data.data = [];
      return_data.message = "Something Broken";
      return return_data;
    }

    return_data.data = userData;
    return_data.message = "Login Success";
    return_data.error = false;
    return return_data;
  }

  async fetchStocksList() {

  }
}

