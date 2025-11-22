import type { Request, Response } from "express";
import mongoose from "mongoose";
import Message from "../models/message.model";
import User from "../models/user.model";
import { getIo, getReceiverSocketId } from "../lib/socket";

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    // Get all messages between the two specified users
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    // Send message with 200 (OK) status code and messages
    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  const { text } = req.body;
  try {
    const { id: receiverId } = req.params;
    const myId = req.user._id;

    if (!receiverId) {
      return res.status(400).json({ message: "Receiver ID is missing" });
    }

    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      return res.status(400).json({ message: "Receiver ID is not valid" });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    // Create new Message in the DB
    const newMessage = await Message.create({
      senderId: myId,
      receiverId,
      text,
    });
    await newMessage.save();

    // Get the receiver’s socket ID and send them a newMessage event if they are online
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      getIo().to(receiverSocketId).emit("newMessage", newMessage);
    }

    // Send message with 201 (Created) status code and message data
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getChannelMessages = async (req: Request, res: Response) => {
  try {
    const { id: channelId } = req.params;

    if (!channelId || !mongoose.Types.ObjectId.isValid(channelId)) {
      return res.status(400).json({ message: "Invalid channel ID" });
    }

    // Get all messages from the channel and fetch senders' names
    const messages = await Message.find({ channelId })
      .populate("senderId", "fullName")
      .lean();

    const formattedMessages = messages.map((msg) => ({
      ...msg,
      sender: msg.senderId, // rename key
      senderId: undefined, // remove old key
    }));

    // Send message with 200 (OK) status code and messages
    return res.status(200).json(formattedMessages);
  } catch (error) {
    console.log("Error in getChannelMessages controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendChannelMessage = async (req: Request, res: Response) => {
  const { text } = req.body;
  try {
    const { id: channelId } = req.params;
    const myId = req.user._id;

    if (!channelId || !mongoose.Types.ObjectId.isValid(channelId)) {
      return res.status(400).json({ message: "Invalid channel ID" });
    }

    const newMessage = await Message.create({
      senderId: myId,
      channelId,
      text,
    });

    // Populate senderId to get fullName
    await newMessage.populate("senderId", "fullName");

    // Optional: rename key for clarity
    const formattedMessage = {
      ...newMessage.toObject(),
      sender: newMessage.senderId,
      senderId: undefined,
    };

    // Broadcast to all users in the channel (implement later)
    // const channelSocketIds = getChannelSocketIds(channelId);
    // channelSocketIds.forEach((socketId) => {
    //   getIo().to(socketId).emit("newMessage", newMessage);
    // });

    res.status(201).json(formattedMessage);
  } catch (error) {
    console.error("Error in sendChannelMessage controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
