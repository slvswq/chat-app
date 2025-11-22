import type { Request, Response } from "express";
import User from "../models/user.model";
import Channel from "../models/channel.model";

interface GetChannelsQuery {
  search?: string;
}

export const getChannels = async (
  req: Request<{}, {}, {}, GetChannelsQuery>,
  res: Response
) => {
  try {
    const { search } = req.query;

    // Get all channels filter them by the search param
    let query: any = {};
    if (search && search.trim() !== "") {
      const regex = new RegExp(search.trim(), "i"); // case-insensitive search
      query.name = regex;
    }
    const filteredChannels = await Channel.find(query);

    res.status(200).json(filteredChannels);
  } catch (error) {
    console.log("Error in getChannels controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createChannel = async (req: Request, res: Response) => {
  const { name, members } = req.body;
  try {
    const creatorId = req.user._id;

    // Check if all given member IDs exist in the DB
    const existingUsers = await User.find({ _id: { $in: members } }).select(
      "_id"
    );
    if (existingUsers.length !== members.length) {
      return res.status(400).json({
        message: "One or more member IDs do not exist",
      });
    }

    // Create new Channel in the DB
    const newChannel = await Channel.create({
      name,
      creator: creatorId,
      members: [creatorId, ...(members || [])],
    });
    if (!newChannel) {
      return res.status(400).json({ message: "Invalid channel data" });
    }
    await newChannel.save();

    // Send channel data with 201 (Created) status code
    res.status(201).json(newChannel);
  } catch (error) {
    console.log("Error in createChannel controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
