import { isAxiosError } from "axios";

export const getErrorMessage = (error: unknown) => {
  if (isAxiosError<{ message: string }>(error)) {
    return error.response?.data.message ?? "Something went wrong";
  }

  return "Something went wrong";
};
