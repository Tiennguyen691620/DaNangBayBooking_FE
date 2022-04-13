import { RoomModel } from './../room/room.model';
import { UtilityModel } from './../ultility/ultility.model';
import { ImageAccommodationModel } from '../dictionary-image/image-accommodation.model';
import { LocationModel } from './../master-data/location.model';
import { AccommodationTypeModel } from './accommodation-type.model';
import { BookRoomModel } from '../book-room/book-room.model';

export class AccommodationModel {
  accommodationID!: string;
  location!: LocationModel;
  accommodationType!: AccommodationTypeModel;
  name!: string;
  abbreviationName!: string;
  address!: string;
  description!: string;
  phone!: string;
  email!: string;
  mapUrl!: string;
  no!: string;
  sortOrder!: number;
  imageAccommodations!: ImageAccommodationModel[];
  utilities!: UtilityModel[];
  rooms!: RoomModel[];
  bookRooms!: BookRoomModel[];

  status!: boolean;
}