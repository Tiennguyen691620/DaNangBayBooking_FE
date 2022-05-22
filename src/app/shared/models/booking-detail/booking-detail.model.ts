import { RoomModel } from "../room/room.model";

export class BookingDetailModel {
  bookRoomDetailId: string;
  personNumber: number;
  childNumber: number;
  cancelDate: Date | any;
  cancelReason: string;
  status: number;
  room: RoomModel;
}