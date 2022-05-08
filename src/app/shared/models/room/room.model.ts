import { RoomTypeModel } from 'src/app/shared/models/room-type/room-type.model';
import { DecimalPipe } from "@angular/common";
import { ImageRoomModel } from "../dictionary-image/image-room.model";

export class RoomModel {
  roomID: string;
  roomType: RoomTypeModel;
  name: string;
  no: string;
  availableQty: number;
  purchasedQty: number;
  maximumPeople: number;
  price: number;
  bookedQty: number;
  description: string;
  image: string;

  uploadController?: any;
}