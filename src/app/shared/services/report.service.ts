import { RevenueReportChartModel } from './../models/report/revenue/revenue-report-chart.model';

import { HttpClient } from '@angular/common/http';
import { BaseService } from 'src/app/shared/services/base.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RevenueReportFilter } from '../models/report/revenue/revenue-report-filter.model';
import { filter } from 'lodash';
import Utils from '../helpers/utils.helper';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
   }

  getRevenueReport(filterModel: RevenueReportFilter): Observable<RevenueReportChartModel>{
    const url = `api/Report/filter/revenue`;
    return this.get(url, Utils.createFilterParam(filterModel));
  }
}
