// import { Role } from "./role";

import { Role } from "./role";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userPassword?: string;
  phone: string;
  rolId: number;
  role?: Role | null;
  status: boolean;
}
