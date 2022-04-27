import * as moment from 'moment';
import { startOfDay } from 'date-fns';

export default class DateTimeConvertHelper {
  private static readonly dateFormat = 'DD/MM/YYYY';
  private static readonly dateTimeFormat = 'DD/MM/YYYY HH:mm:ss';
  private static readonly secondFormat = 'X';

  static fromDtObjectToTimestamp(dtObject: Date): number | null {
    return dtObject ? Math.floor(dtObject.getTime() / 1000) : null;
  }

  static fromTimestampToDtObject(timestamp: number): Date | null {
    return timestamp ? new Date(timestamp * 1000) : null;
  }

  static fromTimestampToDtStr(timestamp: number): string {
    return moment(timestamp * 1000).format(this.dateFormat);
  }

  static fromTimestampToDtTimeStr(timestamp: number): string {
    return moment(timestamp * 1000).format(this.dateTimeFormat);
  }

  static fromDtObjectToDtStr(dtObject: Date): string {
    return moment(dtObject).format(this.dateFormat);
  }

  static startOfDay(dtObject: Date): Date {
    return startOfDay(dtObject);
  }
}
