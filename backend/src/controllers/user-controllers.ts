import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
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
    return res.status(201).json({ message: "OK", id: user._id.toString() });
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
    return res.status(201).json({ message: "OK", id: user._id.toString() });
  } catch (error) {
    console.error(error.message);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
