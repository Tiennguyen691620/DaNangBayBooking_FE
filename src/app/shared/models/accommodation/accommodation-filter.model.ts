export class AccommodationFilterModel {
  searchKey?: string;
  accommodationTypeID?: string;
  provinceID?: string;
  districtID?: string;

  constructor(
    searchKey?: string,
    accommodationTypeID?: string,
    provinceID?: string,
    districtID?: string
  ) {
    (this.searchKey = searchKey),
      (this.accommodationTypeID = accommodationTypeID),
      (this.provinceID = provinceID),
      (this.districtID = districtID);
  }
}
