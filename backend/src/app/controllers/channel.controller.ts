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

    const isMemberListValid = await checkMembers(res, members);
    if (!isMemberListValid) return;

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
    const channelId = getChannelId(req, res);
    if (!channelId) return;

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

export const addChannelMembers = async (req: Request, res: Response) => {
  const { members } = req.body;
  try {
    const channelId = getChannelId(req, res);
    if (!channelId) return;

    const isMemberListValid = await checkMembers(res, members);
    if (!isMemberListValid) return;

    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Add new member IDs to the list of members
    const currentMembers = channel.members.map((id) => id.toString());
    channel.members = [...new Set([...currentMembers, ...members])];
    await channel.save();

    // Send message with 200 (OK) status code and updated channel data
    return res.status(200).json(channel);
  } catch (error) {
    console.log("Error in addChannelMembers controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteChannelMember = async (req: Request, res: Response) => {
  const { memberId } = req.params;
  try {
    const channelId = getChannelId(req, res);
    if (!channelId) return;

    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Remove given memberId from the list of members
    const currentMembers = channel.members.map((id) => id.toString());
    channel.members = currentMembers.filter((id) => id !== memberId) as any[];
    await channel.save();

    // Send message with 200 (OK) status code and updated channel data
    return res.status(200).json(channel);
  } catch (error) {
    console.log("Error in deleteChannelMember controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteChannel = async (req: Request, res: Response) => {
  try {
    const channelId = getChannelId(req, res);
    if (!channelId) return;

    const channel = await Channel.findByIdAndDelete(channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Send message with 204 (No content)
    return res.sendStatus(204);
  } catch (error) {
    console.log("Error in deleteChannel controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * Extracts and validates the `channelId` parameter from the request.
 *
 * This function checks whether the `channelId` exists and whether it is a
 * valid MongoDB ObjectId.
 * If the ID is missing or invalid, an HTTP 400 response is returned.
 *
 * @param req - Express request object containing route parameters.
 * @param res - Express response object used to send error messages.
 * @returns The validated channel ID as a string, or `null` if validation fails.
 */
function getChannelId(req: Request, res: Response) {
  const { id: channelId } = req.params;

  if (!channelId) {
    res.status(400).json({ message: "Channel ID is missing" });
    return null;
  }

  if (!mongoose.Types.ObjectId.isValid(channelId)) {
    res.status(400).json({ message: "Channel ID is not valid" });
    return null;
  }

  return channelId;
}

/**
 * Verifies that all provided member IDs correspond to existing users.
 *
 * This function queries the database for users whose `_id` values are included
 * in the `members` array.
 * If the number of found users does not match the number of provided IDs,
 * it responds with HTTP 400 and an appropriate error message.
 *
 * @param res - Express response object used to send validation errors.
 * @param members - Array of user ID strings to validate.
 * @returns `true` if all members exist, or `false` if validation fails.
 */
async function checkMembers(res: Response, members: string[]) {
  const existingUsers = await User.find({ _id: { $in: members } }).select(
    "_id"
  );
  if (existingUsers.length !== members.length) {
    res.status(400).json({
      message: "One or more member IDs do not exist",
    });
    return false;
  }

  return true;
}
