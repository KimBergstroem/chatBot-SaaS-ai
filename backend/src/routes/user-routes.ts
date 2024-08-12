import { Router } from "express";
import {
  getAllUsers,
  userSignUp,
  userLogin,
  verifyUser,
  userLogout,
} from "../controllers/user-controllers.js";
import {
  signupValidator,
  loginValidator,
  validate,
} from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignUp); // middleware validation for signup
userRoutes.post("/login", validate(loginValidator), userLogin); // middleware validation for login
userRoutes.get("/auth-status", verifyToken, verifyUser); // middleware validation for user token
userRoutes.get("/logout", verifyToken, userLogout);

export default userRoutes;
