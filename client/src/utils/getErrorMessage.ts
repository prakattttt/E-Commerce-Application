import { isAxiosError } from "axios";

export const getErrorMessage = (error: unknown, message?: string) => {
  if (isAxiosError<{ message: string }>(error)) {
    return message ?? error.response?.data.message ?? "Something went wrong";
  }

  return "Something went wrong";
};
