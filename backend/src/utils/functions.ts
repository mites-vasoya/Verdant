import {Response} from "express";
// import bcrypt from "bcrypt";
import {responseWithData} from "./custom_types";

export const sendResponse = (res: Response, response: responseWithData) => {
  return res.json(response);
};

/**
 * Hashes a plain text password.
 * @param password - The plain text password to hash.
 * @returns The hashed password.
 */
// export const encryptPassword = async (password: string): Promise<string> => {
//   const salt = await bcrypt.genSalt(10);
//   return await bcrypt.hash(password, salt);
// };
//
// /**
//  * Compares a plain text password with a hashed password.
//  * @param password - The plain text password.
//  * @param hashedPassword
//  * @returns True if the passwords match, false otherwise.
//  */
// export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
//   return await bcrypt.compare(password, hashedPassword);
// };
