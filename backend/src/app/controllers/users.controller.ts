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

interface GetUsersQuery {
  search?: string;
}

export const getUsers = async (
  req: Request<{}, {}, {}, GetUsersQuery>,
  res: Response
) => {
  try {
    const loggedInUserId = req.user._id;
    const { search } = req.query;

    // Get all users except yourself and filter them by the search param
    let query: any = { _id: { $ne: loggedInUserId } };
    if (search && search.trim() !== "") {
      const regex = new RegExp(search.trim(), "i"); // case-insensitive search
      query.fullName = regex;
    }
    const filteredUsers = await User.find(query).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsers controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
