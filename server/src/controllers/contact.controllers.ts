import type { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { contactSchema } from "../validators/contact.validators.js";

import {
  createContactService,
  deleteContactService,
  getContactService,
  getContactsService,
  updateContactStatusService,
} from "../services/contact.services.js";
import AppError from "../utils/AppError.js";

export const createContact: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const data = contactSchema.parse(req.body);

    const contact = await createContactService(data);

    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully",
      contact,
    });
  },
);

export const getContacts: RequestHandler = expressAsyncHandler(
  async (_req, res) => {
    const contacts = await getContactsService();

    res.status(200).json({
      success: true,
      contacts,
    });
  },
);

export const getContact: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const contact = await getContactService(req.params.id as string);

    res.status(200).json({
      success: true,
      contact,
    });
  },
);

export const updateContactStatus: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const { status } = req.body;

    if (!["unread", "read", "resolved"].includes(status)) {
      throw new AppError("Invalid contact status", 400);
    }

    const contact = await updateContactStatusService(
      req.params.id as string,
      status,
    );

    res.status(200).json({
      success: true,
      message: "Contact status updated successfully",
      contact,
    });
  },
);

export const deleteContact: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    await deleteContactService(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Contact message deleted successfully",
    });
  },
);
