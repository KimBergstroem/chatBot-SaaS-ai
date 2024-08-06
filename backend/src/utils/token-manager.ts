import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME, ERROR_MESSAGES } from "./constants.js";

export const createToken = (id: string, email: string, expiresIn: string) => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn });
  return token;
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token || token.trim() === "") {
      return res
        .status(401)
        .json({ message: ERROR_MESSAGES.TOKEN_NOT_RECEIVED });
    }
    await new Promise<void>((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          res.locals.jwtData = decoded;
          resolve();
        }
      });
    });
    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: ERROR_MESSAGES.INVALID_TOKEN_DATA });
  }
};
