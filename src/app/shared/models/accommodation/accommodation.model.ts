import { RoomModel } from './../room/room.model';
import { LocationModel } from './../master-data/location.model';
import { AccommodationTypeModel } from './accommodation-type.model';
import { BookRoomModel } from '../book-room/book-room.model';
import { DictionaryItem } from '../master-data/dictionary-item.model';
import { ImageModel } from '../master-data/image.model';

export class AccommodationModel {
  accommodationID: string;
  province: LocationModel;
  district: LocationModel;
  subDistrict: LocationModel;
  accommodationType: AccommodationTypeModel;
  name: string;
  abbreviationName: string;
  address: string;
  description: string;
  phone: string;
  email: string;
  mapURL: string;
  no: string;
  images: ImageModel[];
  // utilities!: UtilityModel[];
  // rooms!: RoomModel[];
  // bookRooms!: BookRoomModel[];

  status: boolean;
  isStatus: DictionaryItem;
}
