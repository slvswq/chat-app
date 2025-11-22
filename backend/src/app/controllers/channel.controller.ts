import type { Request, Response } from "express";
import mongoose from "mongoose";
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

export const updateChannelInfo = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const { id: channelId } = req.params;

    if (!channelId) {
      return res.status(400).json({ message: "Channel ID is missing" });
    }

    if (!mongoose.Types.ObjectId.isValid(channelId)) {
      return res.status(400).json({ message: "Channel ID is not valid" });
    }

    // Update the user entry in the DB
    const updatedChannel = await Channel.findByIdAndUpdate(
      channelId,
      {
        name,
      },
      { new: true }
    );
    if (!updatedChannel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Send message with 200 (OK) status code and updatedChannel data
    return res.status(200).json(updatedChannel);
  } catch (error) {
    console.log("Error in updateChannelInfo controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
