import type { User } from "../../auth/types/auth.types";

export interface IUser extends User {
  _id: string;
  createdAt: string;
}
