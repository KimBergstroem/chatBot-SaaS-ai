import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { COOKIE_NAME } from "../utils/constants.js";
import { createToken } from "../utils/token-manager.js";
import { hash, compare } from "bcrypt"; // Encrypt password

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //get all users
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.error(error.message);
    return res.status(200).json({ message: "ERROR", cause: error.message });
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
      return res.status(401).send({ message: "User already exists" });
    const hashedPassword = await hash(password, 10); // Generating encoded password and store it in hashedPassword
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    //create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    /* 
    Send the token to frontend and sets it as a cookie
    Change localhost variable to the server domain when deployed
    */
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(201)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.error(error.message);
    return res.status(200).json({ message: "ERROR", cause: error.message });
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
      return res.status(401).send({ message: "User does not exist" });
    }
    const isPasswordCorrect = await compare(password, user.password); // Gives boolean value
    if (!isPasswordCorrect) {
      return res.status(403).send({ message: "Incorrect Password" });
    }

    //create token and store cookie
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain: "localhost",
      signed: true,
      path: "/",
    });

    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    /* 
    Send the token to frontend and sets it as a cookie
    Change localhost variable to the server domain when deployed
    */
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error) {
    console.error(error.message);
    return res.status(200).json({ message: "ERROR", cause: error.message });
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
      return res.status(401).json({ message: "Invalid token data" });
    }
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered or token malfunctioned" });
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(403).json({ message: "Permissions mismatch" });
    }
    return res.status(200).json({
      message: "OK",
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Verification error:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", cause: error.message });
  }
};
