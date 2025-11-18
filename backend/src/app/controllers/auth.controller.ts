import type { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import cloudinary from "../lib/cloudinary";

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

    // Create new User in the database
    const newUser = await User.create({
      fullName,
      email,
      password,
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

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    // Check if the user with the given email exists
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the given password with hashed password from the DB
    const isPasswordCorrect = await bcrypt.compare(password, user!.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Add JWT token in the user's cookies
    generateToken(user._id, res);

    // Send user data with 200 (OK) status code
    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    // Remove JWT token from the user's cookies
    res.cookie("jwt", "", { maxAge: 0 });

    // Send message with 200 (OK) status code
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { fullName, profilePic } = req.body;
  try {
    const userId = req.user._id;

    // Upload new profilePic to cloudibary
    const uploadReponse = await cloudinary.uploader.upload(profilePic);

    // Update the user entry in the DB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        profilePic: uploadReponse.secure_url,
      },
      { new: true }
    );

    // Send message with 200 (OK) status code and updatedUser data
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in updateProfile controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
