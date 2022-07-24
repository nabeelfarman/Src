import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'society-payroll-dashboard',
  templateUrl: './payroll-dashboard.component.html',
  styleUrls: ['./payroll-dashboard.component.scss'],
})
export class PayrollDashboardComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  employee_types_pieChart: Chart | undefined;
  est_budget_chart: Chart | undefined;
  salary_range_chart: Chart | undefined;

  ngOnInit(): void {
    this.global.setHeaderTitle('Payroll Dasboard');
    this.employeeTypesPieChart();
    this.estBudgetChart();
    this.salaryRangeChart();
  }
  employeeTypesPieChart() {
    let chart = new Chart({
      chart: {
        styledMode: false,
      },

      title: {
        text: 'Organization Strength',
      },

      xAxis: {
        categories: ['Officers', 'Staff', 'Helpers', 'Drivers'],
      },

      series: [
        {
          type: 'pie',
          allowPointSelect: true,
          keys: ['name', 'y', 'selected', 'sliced'],
          data: [
            ['Officers', 32, false],
            ['Staff', 68, false],
            ['helpers', 18, false],
            ['Helpers', 14, false],
          ],
          showInLegend: true,
        },
      ],
    });
    this.employee_types_pieChart = chart;
  }

  estBudgetChart() {
    let chart = new Chart({
      chart: {
        type: 'line',
      },
      title: {
        text: 'Monthly Budget Analysis',
      },
      subtitle: {
        text: '',
      },
      xAxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
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
          name: 'Budget',
          type: 'line',
          data: [
            7.0,
            6.9,
            9.5,
            14.5,
            18.4,
            21.5,
            25.2,
            26.5,
            23.3,
            18.3,
            13.9,
            9.6,
          ],
        },
        {
          name: 'Expenditures',
          type: 'line',
          data: [
            3.9,
            4.2,
            5.7,
            8.5,
            11.9,
            15.2,
            17.0,
            16.6,
            14.2,
            10.3,
            6.6,
            4.8,
          ],
        },
      ],
    });
    this.est_budget_chart = chart;
  }

  salaryRangeChart() {
    let chart = new Chart({
      chart: {
        type: 'columnrange',
        inverted: true,
      },

      accessibility: {
        description: '',
      },

      title: {
        text: 'Salary Ranges by BPS',
      },

      subtitle: {
        text: '',
      },

      xAxis: {
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      },

      yAxis: {
        title: {
          text: 'Rs. in Thousands',
        },
      },

      tooltip: {
        valueSuffix: '°C',
      },

      plotOptions: {
        columnrange: {
          dataLabels: {
            enabled: true,
            format: '{y}k',
          },
        },
      },

      legend: {
        enabled: false,
      },

      series: [
        {
          name: 'Temperatures',
          type: 'columnrange',
          data: [
            [9.9, 10.3],
            [8.1, 8.5],
            [10.2, 11.8],
            [11.7, 12.2],
            [12.6, 23.1],
            [19.7, 25.4],
            [16.0, 26.2],
            [16.7, 21.4],
            [13.5, 19.5],
          ],
        },
      ],
    });
    this.salary_range_chart = chart;
  }
}
