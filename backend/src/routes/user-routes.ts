import { Router } from "express";
import {
  getAllUsers,
  userSignUp,
  userLogin,
} from "../controllers/user-controllers.js";
import {
  signupValidator,
  loginValidator,
  validate,
} from "../utils/validators.js";

const userRoutes = Router();

userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignUp); // Added middleware validation for signup
userRoutes.post("/login", validate(loginValidator), userLogin); // Added middleware validation for login

export default userRoutes;
