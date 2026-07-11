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

const router: Router = Router();

/*
    User Authentication & Profile Routes

    POST    /api/users/register
    POST    /api/users/login
    POST    /api/users/logout

    GET     /api/users/me
    PATCH   /api/users/update
    DELETE  /api/users/delete
*/

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/me", protect, getMe);

router.patch("/update", protect, updateUser);

router.delete("/delete", protect, deleteUser);

export default router;
