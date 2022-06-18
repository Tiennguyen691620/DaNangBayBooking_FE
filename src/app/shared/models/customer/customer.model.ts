
import { LocationModel } from "../master-data/location.model";
import { RoleModel } from "../role/role.model";


export class CustomerModel{
  id: string;
  fullName: string;
  phoneNumber: number;
  userName: string;
  email: string;
  dob: Date;
  address: string;
  identityCard: number;
  gender: string;
  avatar: string;
  activeDate: number;
  no:string;
  status: boolean;
  role: RoleModel;
  location: LocationModel;

  index?: number
}