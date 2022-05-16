import { AccommodationModel } from 'src/app/shared/models/accommodation/accommodation.model';
import { RoomModel } from './../room/room.model';
//import { Customer } from 'src/app/shared/models/customer/customer.model';
import { DictionaryItem } from './../master-data/dictionary-item.model';
//import { SubItem } from '../master-data/sub-item.model';

export class BookingModel {
  BookRoomID: string;
  no: string;
  fromDate: Date;
  toDate: Date;
  qty: number;
  totalDay: number;
  totalPrice: number;
  personNumber: number;
  childNumber: number;
  checkInName: string;
  checkInPhoneNumber: string;
  checkInIdentityCard: string;
  checkInMail: string;
  checkInNote: string;
  bookingDate: Date;
  accommodation: AccommodationModel;
  room: RoomModel;
  status: number;
  //customer: Customer;

  index?: number;

  checkInCode: string; // mã nhận phòng (cslt điền khi xác nhận)
  cancelReason: string; // lý do hủy
  cancelDate: Date; // ngày hủy
}
