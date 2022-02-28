// import { Permisstion } from "./permission.model";

export class AuthenticationModel {
  userId!: string;
  userEmail!: string;
  userName!: string;
  userGroupId!: string;
  employeeId!: string;
  employeeName!: string;
  isFirstLogin!: boolean;
  tokenType!: string;
  accessToken!: string;
  expiresInSeconds!: number;
  // permission!: Permisstion[];
}
