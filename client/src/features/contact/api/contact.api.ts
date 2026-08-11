import api from "../../../api/axios";

import type { ContactData } from "../types/schemas/contact.schemas";

export const submitContactMessage = async (data: ContactData) => {
  const response = await api.post("/contact", data);

  return response.data;
};
