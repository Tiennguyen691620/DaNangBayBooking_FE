
import { DecimalPipe } from "@angular/common";
import { RoomTypeModel } from "../room-type/room-type.model";

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