import { Router } from "express";
import * as userController from "../controller/users.controller.js";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id/", userController.getUserById);
// CRUD: create, read, update, delete

export default router;