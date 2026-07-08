import { Router } from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getMe,
  updateUser,
  deleteUser,
} from "../controllers/users.controllers.js";

import { protect } from "../middlewares/authentication.js";

const router:Router = Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/me", protect, getMe);

router.patch("/update", protect, updateUser);

router.delete("/delete", protect, deleteUser);

export default router;
