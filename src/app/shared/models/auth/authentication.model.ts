// import { Permisstion } from "./permission.model";

export class AuthenticationModel {
  id!: string;
  email!: string;
  userName!: string;
  fullName!: string;
  phoneNumber!: string;
  dob!: string;
  // employeeId!: string;
  // employeeName!: string;
  // isFirstLogin!: boolean;
  // tokenType!: string;
  accessToken!: string;
  // expiresInSeconds!: number;
  // permission!: Permisstion[];
  roles!: string[];
}
