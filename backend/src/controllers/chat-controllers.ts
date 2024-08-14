import { NextFunction, Request, Response } from "express";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../utils/constants.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";
import User from "../models/User.js";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(401)
        .json({ message: ERROR_MESSAGES.USER_NOT_REGISTERED });

    //Grab chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    //send all chats with new one to OPENAI API
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });
    if (chatResponse.data.choices[0].message) {
      user.chats.push(chatResponse.data.choices[0].message);
    }
    await user.save();
    return res.status(200).json({ chats: user.chats });
    //get latest response
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token verification
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: ERROR_MESSAGES.USER_NOT_REGISTERED });
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res
        .status(403)
        .json({ message: ERROR_MESSAGES.PERMISSIONS_MISMATCH });
    }
    return res
      .status(200)
      .json({ message: SUCCESS_MESSAGES.OK, chats: user.chats });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error sending chat to user:", error.message);
      return res.status(500).json({
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        cause: error.message,
      });
    } else {
      console.error("Unknown error:", error);
      return res.status(500).json({
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        cause: "An unknown error occurred",
      });
    }
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token verification
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: ERROR_MESSAGES.USER_NOT_REGISTERED });
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res
        .status(403)
        .json({ message: ERROR_MESSAGES.PERMISSIONS_MISMATCH });
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: SUCCESS_MESSAGES.OK });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error deleting chat:", error.message);
      return res.status(500).json({
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        cause: error.message,
      });
    } else {
      console.error("Unknown error:", error);
      return res.status(500).json({
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        cause: "An unknown error occurred",
      });
    }
  }
};
