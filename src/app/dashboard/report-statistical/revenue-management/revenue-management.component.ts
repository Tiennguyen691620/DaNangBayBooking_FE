import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ReportService } from './../../../shared/services/report.service';
import { Router } from '@angular/router';
import { AccommodationService } from 'src/app/shared/services/accommodation.service';
import { AccommodationModel } from 'src/app/shared/models/accommodation/accommodation.model';
import { Component, OnInit } from '@angular/core';
import { RevenueReportFilter } from 'src/app/shared/models/report/revenue/revenue-report-filter.model';
import * as Highchart from 'highcharts';
import { ToDate } from 'src/app/shared/helpers/must-match.validator';
import variablePie from 'highcharts/modules/variable-pie';
import station from 'highcharts/modules/variable-pie';
import * as moment from 'moment';

declare var require: any;
// let variablePie = require('highcharts/modules/variable-pie');
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
  formFilter: FormGroup;
  accommodationList: AccommodationModel[] = [];
  filterModel = new RevenueReportFilter();
  isShow = false;
  dateRange: [Date, Date];
  end = new Date();
  start = new Date();

  pieRevenueData: any[] = [];
  pieRevenueNote: any[] = [];
  columnData: any[] = [];
  constructor(
    private accommodationService: AccommodationService,
    private router: Router,
    private reportService: ReportService,
    private fb: FormBuilder
  ) {
    this.dateRange = [this.start, this.end];
  }

  ngOnInit(): void {
    this.createForm();
    this.accommodationService.getAllAccommodation().subscribe((res) => {
      this.accommodationList = res;
    });
  }

  createForm(): void {
    this.formFilter = this.fb.group(
      {
        accommodation: ['', [Validators.required]],
        fromDate: ['', [Validators.required]],
        toDate: ['', [Validators.required]],
      },
      {
        validator: ToDate(
          'fromDate',
          'toDate',
          'Ngày bắt đầu',
          'Ngày kết thúc'
        ),
      }
    );
  }

  filter(): void {
    if (this.formFilter.valid) {
      this.isShow = true;
      const filter = { ...this.filterModel };
      this.pieRevenueData = [];
      this.pieRevenueNote = [];
      this.reportService.getRevenueReport(filter).subscribe((res) => {
        //Biểu đồ tròn
        const viewByAccommodationColors = this.getRandomColor(
          (res.viewByAccommodation ?? []).length
        );
        (res.viewByAccommodation ?? []).forEach((item, index) => {
          const color = Highchart.color(viewByAccommodationColors[index])
            .brighten(-0.2)
            .get();
          this.pieRevenueNote.push({
            name: item?.name,
            color,
            x: Highchart.numberFormat(item?.amount, 0, ',', ','),
            y: item?.qty,
            z: 400,
          });

          if (item?.amount > 0) {
            this.pieRevenueData.push({
              name: item?.name,
              color,
              x: Highchart.numberFormat(item?.amount, 0,',', ','),
              y: item?.qty,
              z: 400,
            });
          }
        });
        // this.pieRevenueNote = this.pieRevenueNote.sort(
        //   (a, b) => b.value - a.value
        // );
        this.createPieChart('container', this.pieRevenueData);

        //Biểu đồ cột
        this.columnData = [];
        (res.viewByDate ?? []).forEach((item) => {
          this.columnData.push({
            name: moment(item?.date * 1000).format('DD/MM'),
            y: item?.amount ?? 0,
            color: '#074494',
          });
        });
        this.createColumnChart('columnChart', this.columnData);
      });
    }
  }

  createPieChart(renderTo: HTMLElement | string, data: any): void {
    const qty = data
      ?.map((item) => item.y)
      ?.reduce((acc, cur) => acc + cur, 0);
    // const totalQty = data
    //   ?.map((item) => item.y)
    //   ?.reduce((acc, cur) => Highchart.numberFormat(acc + cur,0,',', ','));
    const option: Highchart.Options = {
      chart: {
        type: 'pie',
        height: 400,
      },
      lang: {
        noData: 'Không có dữ liệu',
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
          '<span style="color: white;">- Tổng tiền: <b>{point.x} VND</span></b><br/>' +
          '<span style="color: white;">- Số lượng đặt: <b>{point.y} </span></b><br/>',
      },
      //  +'<span style="color: white;">- abc: <b>{point.percentage:.1f}%</span></b><br/>'
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      credits: {
        enabled: false,
      },
      title: {
        text: qty,
        verticalAlign: 'middle',
        align: 'center',
        y: 0,
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
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
          type: 'pie',
          // minPointSize: 10,
          innerSize: '55%',
          // zMin: 0,
          name: '',
          data: data,
        },
      ],
    };
    Highchart.chart(`${renderTo}`, option);
  }

  createColumnChart(renderTo: HTMLElement | string, data: any): void {
    const option: Highchart.Options = {
      chart: {
        type: 'column',
        marginRight: 30,
        marginLeft: 70,
      },
      credits: {
        enabled: false,
      },
      title: {
        text: null,
      },
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        height: '93%',
        width: '97%',
        type: 'category',
        title: {
          text: 'Ngày<br>đặt phòng',
          align: 'high',
          textAlign: 'center',
          offset: 0,
          rotation: 0,
          y: 10,
          x: 20,
          style: {
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: '550',
            fontFamily: 'Segoe UI',
          },
        },
        labels: {
          rotation: -45,
          style: {
            color: '#576d86',
            fontSize: '11',
          },
        },
      },
      yAxis: {
        height: '78%',
        top: '15%',
        title: {
          text: 'SL phòng đặt',
          align: 'high',
          offset: 0,
          rotation: 0,
          y: -10,
          x: 80,
          style: {
            fontSize: '12px',
            fontWeight: '550',
            fontFamily: 'Segoe UI',
          },
        },
        labels: {
          step: 1,
          // format: '{value:.0f}',
          style: {
            color: '#576d86',
            fontSize: '11px',
          },
        },
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 1056,
            },
            chartOptions: {
              plotOptions: {
                column: {
                  pointWidth: 20,
                },
              },
            },
          },
          {
            condition: {
              maxWidth: 876,
            },
            chartOptions: {
              xAxis: {
                title: {
                  y: 26,
                  x: 0,
                },
              },
              plotOptions: {
                column: {
                  pointWidth: 15,
                },
              },
            },
          },
          {
            condition: {
              maxWidth: 700,
            },
            chartOptions: {
              xAxis: {
                title: {
                  y: 26,
                  x: 0,
                },
              },
              plotOptions: {
                column: {
                  pointWidth: 10,
                },
              },
            },
          },
        ],
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: false,
          },
        },
        column: {
          pointWidth: 22,
        },
      },

      tooltip: {
        headerFormat: '',
        borderRadius: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderWidth: 0,
        className: '',
        padding: 10,
        shadow: false,
        style: {
          color: '#f1f1f1',
        },
        pointFormat: '<span>{point.y}</span>',
      },

      series: [
        {
          name: 'Station',
          type: 'column',
          colorByPoint: false,
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
    this.filterModel.fromDate = result[0];
    this.filterModel.toDate = result[1];
    // this.filter();
  }
}
