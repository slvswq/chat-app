import type { Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

/**
 * Generates a JSON Web Token (JWT) for a given user and sets it as a cookie in the response.
 *
 * @param {string | Types.ObjectId} userId - The unique identifier of the user.
 * @param {Response} res - The Express Response object used to set the JWT cookie.
 * @returns {string} The generated JWT token.
 *
 * @remarks
 * - The token payload contains the `userId`.
 * - The token expires in 7 days.
 * - The cookie options are:
 *   - `httpOnly: true` to prevent XSS (Cross-Site Scripting) attacks.
 *   - `sameSite: "strict"` to help prevent CSRF (Cross-Site Request Forgery) attacks.
 *   - `secure: true` in production (only sent over HTTPS), `false` in development.
 *
 * @example
 * import { generateToken } from './utils/generateToken';
 *
 * app.post('/login', (req, res) => {
 *   const userId = '12345';
 *   const token = generateToken(userId, res);
 *   res.send({ message: 'Logged in successfully' });
 * });
 */
export const generateToken = (
  userId: string | Types.ObjectId,
  res: Response
) => {
  // Ensure the ID is a string
  const id = userId.toString();

  const token = jwt.sign({ id }, process.env.JWT_SECRET || "", {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS cross-site scripting attacks
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
