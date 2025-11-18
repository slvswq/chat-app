import type { Request, Response } from "express";
import User from "../models/user.model";

export const getMe = (req: Request, res: Response) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in getMe controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    // Get all users except yourself
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsers controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
