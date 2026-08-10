import { Router } from "express";

import {
  createContact,
  deleteContact,
  getContact,
  getContacts,
  updateContactStatus,
} from "../controllers/contact.controllers.js";

import { protect } from "../middlewares/authentication.js";
import { authorize } from "../middlewares/authorization.js";

const router: Router = Router();

// Public
router.post("/", createContact);

// Admin
router.get("/", protect, authorize, getContacts);

router.get("/:id", protect, authorize, getContact);

router.patch("/:id/status", protect, authorize, updateContactStatus);

router.delete("/:id", protect, authorize, deleteContact);

export default router;
