import { Router } from "express";
import userController from "../controllers/user.controller";
// import { cookieAuthCheck } from "../middleware/auth";

const userRouter = Router();

userRouter.post("/", userController.addUser);
userRouter.post("/login", userController.loginUser);

export default userRouter;
