import express from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

//sign up ke liye
authRouter.post("/signup", signUp);
// Sign in ke liye
authRouter.post("/signin", signIn);
// Sign out ke liye
authRouter.get("/signout", signOut);

export default authRouter;
