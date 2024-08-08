import axios from "axios";

export class upstoxService {

  public base_url: string = "https://api.upstox.com/v2";
  constructor() {
  }

  //Generate Access Token After Login Redirection from UpStox
  async generateUpstoxAT(auth_code: any) {
    console.log("---- Generating Token ----");
    console.log(auth_code);

    let body: Object = {
      code : auth_code,
      client_id : process.env["UPSTOX_API_KEY "],
      client_secret: process.env["UPSTOX_API_SECRET "],
      redirect_uri: "https://localhost:4200/redirect",
      grant_type: "authorization_code",
    };

    let header: Object = {
      headers: {
        "accept":"application/json",
        "Content-Type":"application/x-www-form-urlencoded"
      }
    }

    let response: string = await axios.post(this.base_url + "/login/authorization/token", body, header);

    console.log("Response : ", response);

    return response;
  }

  async fetchStocksList() {

  }
}

