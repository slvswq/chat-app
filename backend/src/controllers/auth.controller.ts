import type { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils";

export const signup = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body;
  try {
    // Check if user with given email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new User in the database
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });
    if (!newUser) return res.status(400).json({ error: "Invalid user data" });

    // Generate JWT token
    generateToken(newUser._id, res);
    await newUser.save();

    // Send user data with 201 (Created) status code
    return res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("Error in signup controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = (req: Request, res: Response) => {
  res.send("Login route");
};

export const logout = (req: Request, res: Response) => {
  res.send("Logout route");
};
