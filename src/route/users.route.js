import { Router } from "express";
import * as userController from "../controller/users.controller.js";

const router = Router();

router.get("/", userController.getAllUsers);


export default router;