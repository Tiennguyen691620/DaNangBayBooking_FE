import { map } from 'rxjs/operators';
import { ReportService } from './../../../shared/services/report.service';
import { Router } from '@angular/router';
import { AccommodationService } from 'src/app/shared/services/accommodation.service';
import { AccommodationModel } from 'src/app/shared/models/accommodation/accommodation.model';
import { Component, OnInit } from '@angular/core';
import { RevenueReportFilter } from 'src/app/shared/models/report/revenue/revenue-report-filter.model';
import * as Highchart from 'highcharts';
import DateTimeConvertHelper from 'src/app/shared/helpers/datetime-convert.helper';

declare var require: any;
let variablePie = require('highcharts/modules/variable-pie');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

variablePie(Highchart);
noData(Highchart);
More(Highchart);
@Component({
  selector: 'app-revenue-management',
  templateUrl: './revenue-management.component.html',
  styleUrls: ['./revenue-management.component.scss'],
})
export class RevenueManagementComponent implements OnInit {
  accommodationList: AccommodationModel[] = [];
  filterModel = new RevenueReportFilter();
  isShow = false;

  pieRevenueData: any[] = [];
  pieRevenueNote: any[] = [];
  constructor(
    private accommodationService: AccommodationService,
    private router: Router,
    private reportService: ReportService
  ) {}

  ngOnInit(): void {
    this.accommodationService.getAllAccommodation().subscribe((res) => {
      this.accommodationList = res;
    });
  }

  filter(): void {
    this.isShow = true;
    const filter = { ...this.filterModel };
    this.reportService.getRevenueReport(filter).subscribe((res) => {
      const viewByAccommodationColors = this.getRandomColor(
        (res.viewByAccommodation ?? []).length
      );
      (res.viewByAccommodation ?? []).forEach((item, index) => {
        const color = Highchart.color(viewByAccommodationColors[index])
          .brighten(-0.2)
          .get();
        this.pieRevenueNote.push({
          name: item?.name,
          color: color,
          y: item?.amount,
          z: 400,
        });

        if (item?.amount > 0) {
          this.pieRevenueData.push({
            name: item?.name,
            color: color,
            y: item?.amount,
            z: 400,
          });
        }
      });
      // this.pieRevenueNote = this.pieRevenueNote.sort(
      //   (a, b) => b.value - a.value
      // );
      this.createPieChart('container', this.pieRevenueData);
    });
  }

  createPieChart(renderTo: HTMLElement | string, data: any): void {
    const totalQty = data
      ?.map((item) => item.y)
      ?.reduce((acc, cur) => acc + cur, 0);
    const option: Highchart.Options = {
      chart: {
        type: 'pie',
        height: 400,
      },
      tooltip: {
        headerFormat: '',
        borderRadius: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderWidth: 0,
        className: '',
        padding: 10,
        shadow: false,
        shape: 'square',
        pointFormat:
          '<span style="color: white;">- {point.name}</span></b><br/>' +
          '<span style="color: white;">- abc: <b>{point.y}</span></b><br/>',
      },
      credits: {
        enabled: false,
      },
      title: {
        text: totalQty,
        verticalAlign: 'middle',
        align: 'center',
      },
      plotOptions: {
        variablepie: {
          allowPointSelect: true,
          cursor: 'pointer',
          // dataLabels: {
          //   enabled: false,
          // },
          dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>'
            },
          borderWidth: 0,
          states: {
            hover: {
              brightness: 0,
              halo: {
                opacity: 1,
              },
            },
          },
        },
      },
      series: [
        {
          type: 'variablepie',
          minPointSize: 10,
          innerSize: '50%',
          zMin: 0,
          name: '',
          data: data,
        },
      ],
    };
    Highchart.chart(`${renderTo}`, option);
  }

  getRandomColor(qty: number): string[] {
    const colors: string[] = [];
    for (let i = 1; i <= qty; i++) {
      const color = Math.floor(0x1000000 * Math.random()).toString(16);
      colors.push('#' + ('000000' + color).slice(-6));
    }
    return colors;
  }

  onChange(result: any): void {
    this.filterModel.toDate =
      DateTimeConvertHelper.fromDtObjectToTimestamp(result[1]);
    this.filterModel.fromDate =
      DateTimeConvertHelper.fromDtObjectToTimestamp(result[0]);
    this.filter();
  }
}
