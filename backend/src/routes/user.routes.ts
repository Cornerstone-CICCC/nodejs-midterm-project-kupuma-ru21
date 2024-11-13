import { Router } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/", userController.addUser);
userRouter.post("/login", userController.loginUser);

export default userRouter;
