// import { Permisstion } from "./permission.model";

export class AuthenticationModel {
  id: string;
  email: string;
  userName: string;
  fullName: string;
  phoneNumber: string;
  dob: string;
  avatar: string;
  accessToken: string;
  roles: string[];
}
