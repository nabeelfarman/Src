import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'society-fmis-dashboard',
  templateUrl: './fmis-dashboard.component.html',
  styleUrls: ['./fmis-dashboard.component.scss'],
})
export class FmisDashboardComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  income_expense_chart: Chart | undefined;
  bank_balance_chart: Chart | undefined;
  profit_loss_chart: Chart | undefined;
  expense_pie_chart: Chart | undefined;

  ngOnInit(): void {
    this.global.setHeaderTitle('FMIS Dashboard');
    this.incomeExpenseChart();
    this.banksChart();
    this.profitLoss();
    this.expensePieChart();
  }

  incomeExpenseChart() {
    let chart = new Chart({
      chart: {
        type: 'column',
      },
      title: {
        text: 'Income Vs. Expenese',
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
          name: 'Income',
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
          name: 'Expense',
          type: 'column',
          data: [
            83.6,
            78.8,
            98.5,
            93.4,
            106.0,
            84.5,
            105.0,
            104.3,
            91.2,
            83.5,
            106.6,
            92.3,
          ],
        },
      ],
    });
    this.income_expense_chart = chart;
  }

  banksChart() {
    let chart = new Chart({
      chart: {
        type: 'column',
      },
      title: {
        text: 'Bank Balances',
      },
      subtitle: {
        text: '',
      },
      xAxis: {
        categories: ['2350-2', '1325-3', '5220-2', '6320-9'],
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
          name: 'Account No',
          type: 'column',

          data: [49.9, 71.5, 106.4, 129.2, 144.0],
        },
      ],
    });
    this.bank_balance_chart = chart;
  }

  profitLoss() {
    let chart = new Chart({
      chart: {
        type: 'line',
      },
      title: {
        text: 'Annual Profit Analysis',
      },
      subtitle: {
        text: '',
      },
      xAxis: {
        categories: ['2017', '2018', '2019', '2020', '2021'],
      },
      yAxis: {
        title: {
          text: 'Rs. in million',
        },
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
          },
          enableMouseTracking: false,
        },
      },
      series: [
        {
          name: 'Profit / Loss',
          type: 'line',
          data: [7.0, 6.9, 9.5, 14.5, 18.4],
        },
      ],
    });
    this.profit_loss_chart = chart;
  }

  expensePieChart() {
    let chart = new Chart({
      chart: {
        styledMode: false,
      },

      title: {
        text: 'Expenses Analysis',
      },

      xAxis: {
        categories: [
          'salaries',
          'medical',
          'entertainment',
          'stationary',
          'printing',
        ],
      },

      series: [
        {
          type: 'pie',
          allowPointSelect: true,
          keys: ['name', 'y', 'selected', 'sliced'],
          data: [
            ['salaries', 29.9, false],
            ['medical', 71.5, false],
            ['entertainment', 106.4, false],
            ['stationery', 129.2, false],
            ['printing', 144.0, false],
          ],
          showInLegend: true,
        },
      ],
    });
    this.expense_pie_chart = chart;
  }
}
