import type { Request, Response } from "express";
import Message from "../models/message.model";
import cloudinary from "../lib/cloudinary";

export const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    // Get all messages between the two specified users
    const messages = await Message.find({
      $or: [
        { senderId: myId, recieverId: userToChatId },
        { senderId: userToChatId, recieverId: myId },
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
  try {
    const { text, image } = req.body;
    const { id: recieverId } = req.params;
    const myId = req.user._id;

    let imageUrl;
    if (image) {
      // Upload base64 image to cloudinary
      const uploadReponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadReponse.secure_url;
    }

    // Create new Message in the DB
    const newMessage = await Message.create({
      senderId: myId,
      recieverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    // Send message with 201 (Created) status code and message data
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
