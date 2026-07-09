export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: {
    url: string;
    publicId: string;
  };
  role: "user" | "admin";
}
