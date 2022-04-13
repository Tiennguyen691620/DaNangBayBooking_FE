import DateTimeConvertHelper from "./datetime-convert.helper";
import { merge } from "lodash";
import { NzNotificationDataOptions } from "ng-zorro-antd/notification";


export default class Utils {
  static createFilterParam(filter: any) {
    for (const key in filter) {
      if (filter[key] instanceof Date) {
        if (key === 'fromDate') {
          filter[key] = new Date(filter[key].setHours(0, 0, 0, 0));
        }
        if (key === 'toDate') {
          filter[key] = new Date(filter[key].setHours(23, 59, 59, 999));
        }
        filter[key] = DateTimeConvertHelper.fromDtObjectToTimestamp(
          filter[key]
        );
      }
      if (
        filter[key] === null ||
        filter[key] == undefined ||
        filter[key] === ''
      )
        delete filter[key];
    }
    return merge({}, filter);
  }
  static setStyleNotification(): NzNotificationDataOptions {
    return {
      // nzDuration: 0,
      nzPlacement: 'topRight',
      nzStyle: {
        background: '#074494',
        'align-items': 'center',
        'border-radius': '0.25rem',
        color: '#fff',
      },
    };
  }
}