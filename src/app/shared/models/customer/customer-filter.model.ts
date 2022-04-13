

export class CustomerFilterModel {
  searchKey?: string;
  roleID?: string;
  constructor (
    searchKey?: string,
    roleID?: string,
  ) {
    (this.searchKey = searchKey),
    (this.roleID = roleID);
  }
}