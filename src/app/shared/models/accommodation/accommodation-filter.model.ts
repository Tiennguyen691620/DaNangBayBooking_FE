export class AccommodationFilterModel {
  searchKey?: string;
  accommodationTypeID?: string;
  locationID?: string;

  constructor(
    searchKey?: string,
    accommodationTypeID?: string,
    locationID?: string
  ) {
    (this.searchKey = searchKey),
      (this.accommodationTypeID = accommodationTypeID),
      (this.locationID = locationID);
  }
}
