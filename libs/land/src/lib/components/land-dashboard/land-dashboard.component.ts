import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { Chart } from 'angular-highcharts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'society-land-dashboard',
  templateUrl: './land-dashboard.component.html',
  styleUrls: ['./land-dashboard.component.scss'],
})
export class LandDashboardComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  due_payments_chart: Chart | undefined;

  ngOnInit(): void {
    this.global.setHeaderTitle('Land Dashboard');
    this.duePaymentsChart();
  }
  duePaymentsChart() {
    let chart = new Chart({
      chart: {
        type: 'column',
      },
      title: {
        text: 'Dues Vs. Payments',
      },
      subtitle: {
        text: '',
      },
      xAxis: {
        categories: [
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
        ],
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: 'amount in Rs.',
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: 'Dues',
          type: 'column',

          data: [
            49.9,
            71.5,
            106.4,
            129.2,
            144.0,
            176.0,
            135.6,
            148.5,
            216.4,
            194.1,
            95.6,
            54.4,
          ],
        },
        {
          name: 'Payments',
          type: 'column',
          data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 0, 0, 0, 0, 0],
        },
      ],
    });
    this.due_payments_chart = chart;
  }
}
