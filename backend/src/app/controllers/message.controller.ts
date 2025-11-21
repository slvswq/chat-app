import type { Request, Response } from "express";
import mongoose from "mongoose";
import Message from "../models/message.model";
import User from "../models/user.model";

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

    // Send message with 201 (Created) status code and message data
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
