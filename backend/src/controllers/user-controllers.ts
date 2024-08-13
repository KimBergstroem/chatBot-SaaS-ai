import { NextFunction, Request, Response } from "express";
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  COOKIE_NAME,
  TOKEN_EXPIRATION,
} from "../utils/constants.js";
import User from "../models/User.js";
import { createToken } from "../utils/token-manager.js";
import { hash, compare } from "bcrypt"; // Encrypt password
const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get all users
    const users = await User.find();
    return res.status(200).json({ message: SUCCESS_MESSAGES.OK, users });
  } catch (error) {
    console.error(error.message);
    return res.status(200).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      cause: error.message,
    });
  }
};

export const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user signup
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(401)
        .send({ message: ERROR_MESSAGES.USER_ALREADY_EXISTS });
    const hashedPassword = await hash(password, 10); // Generating encoded password and store it in hashedPassword
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    //create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: COOKIE_DOMAIN,
      signed: true,
      path: "/",
    });

    const token = createToken(
      user._id.toString(),
      user.email,
      TOKEN_EXPIRATION
    );
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    /* 
    Send the token to frontend and sets it as a cookie
    Change localhost variable to the server domain when deployed
    */
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: COOKIE_DOMAIN,
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({
      message: SUCCESS_MESSAGES.OK,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      cause: error.message,
    });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user login
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(401)
        .send({ message: ERROR_MESSAGES.USER_DOES_NOT_EXIST });
    }
    const isPasswordCorrect = await compare(password, user.password); // Gives boolean value
    if (!isPasswordCorrect) {
      return res
        .status(403)
        .send({ message: ERROR_MESSAGES.INCORRECT_PASSWORD });
    }

    //create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: COOKIE_DOMAIN,
      signed: true,
      path: "/",
    });

    const token = createToken(
      user._id.toString(),
      user.email,
      TOKEN_EXPIRATION
    );
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    /* 
    Send the token to frontend and sets it as a cookie
    Change localhost variable to the server domain when deployed
    */
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: COOKIE_DOMAIN,
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({
      message: SUCCESS_MESSAGES.OK,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      cause: error.message,
    });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token verification
    if (!res.locals.jwtData || !res.locals.jwtData.id) {
      return res
        .status(401)
        .json({ message: ERROR_MESSAGES.INVALID_TOKEN_DATA });
    }
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
    return res.status(200).json({
      message: SUCCESS_MESSAGES.OK,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      cause: error.message,
    });
  }
};

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token verification
    if (!res.locals.jwtData || !res.locals.jwtData.id) {
      return res
        .status(401)
        .json({ message: ERROR_MESSAGES.INVALID_TOKEN_DATA });
    }
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

    //Clear user cookies when logging out
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: COOKIE_DOMAIN,
      signed: true,
      path: "/",
    });

    return res.status(200).json({
      message: SUCCESS_MESSAGES.OK,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Verification error:", error);
    return res.status(500).json({
      message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
      cause: error.message,
    });
  }
};
