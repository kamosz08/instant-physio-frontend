export interface User {
  id: number;
  email: string;
  name: string;
  type: "specialist" | "user" | "admin";
  status: "active" | "waiting_approval" | "denied" | "inactive";
  avatar: string | null;
}
