import { DecimalPipe } from "@angular/common";
import { ImageRoomModel } from "../dictionary-image/image-room.model";

export class RoomModel{
  roomID!: string;
  accommodationID!: string;
  roomTypeID!:string;
  name!: string;
  availableQty!: number;
  purchasedQty!: number;
  maximumPeople!: number;
  price!: DecimalPipe;
  bookedQty!: number;
  imageRooms!: ImageRoomModel;
}