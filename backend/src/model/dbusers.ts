import {db} from "./db";

export class dbUsers extends db{
  constructor() {
    super();
    this.table = "users";
  }

  async addUpdateUserData(user_id: number, data : any) {
    console.log("Adding new user data");

    //Add/Update user data
    let addUpdateRes: number = await this.upsert([data], ["email", "user_id"]);

    console.log("Add Update Result : ", addUpdateRes);
    return addUpdateRes;
  }
}
