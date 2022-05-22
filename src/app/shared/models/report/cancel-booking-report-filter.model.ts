export class CancelBookingReportFilter {
  status: number | string;
  bookingFromDate: Date;
  bookingToDate: Date;
  checkInFromDate: Date;
  checkInToDate: Date;
  accommodationId: string;
}

export class CancelBookingReportExcel {
    status: number | string;
    bookingFromDate: string;
    bookingToDate: string;
    checkInFromDate: string;
    checkInToDate: string;
    accommodationId: string;
}


