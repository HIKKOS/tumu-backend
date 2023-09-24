// import { Role } from "./role";

import User from "../models/user";
import { Role } from "./role";

export default interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userPassword?: string;
  phone: string;
  rolId: number;
  role?: Role | null;
  status: boolean;
  copyWith: (
    id: number | null,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    userPassword: string | null,
    phone: string | null,
    rolId: number | null,
    role: string | null,
    status: boolean | null
  ) => User;
}
