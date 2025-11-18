import jwt from "jsonwebtoken";
import User from "../models/user.model";
import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "../../types/jwt";

/**
 * Protects private routes by verifying the JWT stored in the `jwt` cookie.
 *
 * @param {import("express").Request} req - The Express request object.
 * @param {import("express").Response} res - The Express response object.
 * @param {import("express").NextFunction} next - Callback to pass control to the next middleware.
 *
 * @description
 * 1. Reads the `jwt` cookie.
 * 2. Verifies and decodes the token.
 * 3. Finds the user by ID from the decoded token.
 * 4. Attaches the user object to `req.user` (password excluded).
 *
 * @returns {void} Sends:
 * - 401 if token is missing or invalid.
 * - 404 if user is not found.
 * - 500 for server errors.
 *
 * @example
 * app.get("/profile", protectRoute, (req, res) => {
 *   res.json(req.user);
 * });
 */
export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt;

    // Check if token is provided
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unathorized - No Token Provided" });
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "TEST"
    ) as JwtPayload;

    // Check if JWT token is valid
    if (!decoded) {
      return res.status(401).json({ message: "Unathoruzed - Invalid Token" });
    }

    // Find the user by the ID and exclude the password from the result
    const user = await User.findById(decoded.id).select("-password");

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
