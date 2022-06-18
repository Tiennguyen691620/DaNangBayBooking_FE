
import { LocationModel } from './../master-data/location.model';
import { AccommodationTypeModel } from './accommodation-type.model';
import { DictionaryItem } from '../master-data/dictionary-item.model';

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
  images: {
    id: string;
    image: string;
  }[];

  index?: number;
  status: boolean;
  isStatus: DictionaryItem;
}
