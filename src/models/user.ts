import { Role } from "../@types/role";
import IUser from "../@types/user";
export default class User implements IUser {
  private id: number;
  private firstName: string;
  private lastName: string;
  private email: string;
  private userPassword?: string | null;
  private phone: string;
  private rolId: number;
  private role?: Role | null;
  private status: boolean;
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    userPassword: string,
    phone: string,
    rolId: number,
    role: string,
    status: boolean
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.userPassword = userPassword;
    this.phone = phone;
    this.rolId = rolId;
    this.role = role;
    this.status = status;
  }
  public copyWith(
    id: number | null,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    userPassword: string | null,
    phone: string | null,
    rolId: number | null,
    role: string | null,
    status: boolean | null
  ): User {
    return new User(
      id || this.id,
      firstName || this.firstName,
      lastName || this.lastName,
      email || this.email,
      userPassword || this.userPassword,
      phone || this.phone,
      rolId || this.rolId,
      role || this.role,
      status || this.status
    );
  }
  public fromJson(json: any): IUser {
    return new User(
      json.id,
      json.firstName,
      json.lastName,
      json.email,
      json.userPassword,
      json.phone,
      json.rolId,
      json.role,
      json.status
    );
  }
}
