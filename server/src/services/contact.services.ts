import { Contact } from "../models/contact.models.js";
import AppError from "../utils/AppError.js";

interface CreateContactData {
  name: string;
  email: string;
  subject: "order" | "product" | "payment" | "account" | "other";
  message: string;
}

export const createContactService = async (data: CreateContactData) => {
  const contact = await Contact.create(data);

  return contact;
};

export const getContactsService = async () => {
  return Contact.find().sort({ createdAt: -1 });
};

export const getContactService = async (id: string) => {
  const contact = await Contact.findById(id);

  if (!contact) {
    throw new AppError("Contact message not found", 404);
  }

  return contact;
};

export const updateContactStatusService = async (
  id: string,
  status: "unread" | "read" | "resolved",
) => {
  const contact = await Contact.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!contact) {
    throw new AppError("Contact message not found", 404);
  }

  return contact;
};

export const deleteContactService = async (id: string) => {
  const contact = await Contact.findByIdAndDelete(id);

  if (!contact) {
    throw new AppError("Contact message not found", 404);
  }

  return contact;
};