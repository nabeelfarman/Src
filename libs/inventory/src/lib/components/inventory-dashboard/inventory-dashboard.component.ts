import { Component, OnInit } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'society-inventory-dashboard',
  templateUrl: './inventory-dashboard.component.html',
  styleUrls: ['./inventory-dashboard.component.scss'],
})
export class InventoryDashboardComponent implements OnInit {
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  totalTagsCount: any = 0;
  condemnedAssetCount: any = 0;
  catWiseTagsCount: any = 0;
  sectionTagsCount: any = 0;
  
  asset_wise_chart: Chart | undefined;

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Inventory Dashboard');
    this.CategoryWise();

    this.getTotalTagCount();
    this.getCategoryWiseTagCount();
    this.getCondemnedAssetCount();
    this.getSectionWiseTag();
  }

  getTotalTagCount(){
    this.dataService.getHttp('inventory-api/InventoryDashboard/getTotalTagCount', '').subscribe((response: any) => {
      this.totalTagsCount = response[0].costAmount;
    }, (error: any) => {
      console.log(error);
    });
  }

  getCondemnedAssetCount(){
    this.dataService.getHttp('inventory-api/InventoryDashboard/getCondemnedAssetCount', '').subscribe((response: any) => {
      this.condemnedAssetCount = response[0].costAmount;
    }, (error: any) => {
      console.log(error);
    });
  }

  getCategoryWiseTagCount(){
    this.dataService.getHttp('inventory-api/InventoryDashboard/getCategoryWiseTagCount', '').subscribe((response: any) => {
      this.catWiseTagsCount = response[0].costAmount;
    }, (error: any) => {
      console.log(error);
    });
  }

  getSectionWiseTag(){
    this.dataService.getHttp('inventory-api/InventoryDashboard/getSectionWiseTag', '').subscribe((response: any) => {
      this.sectionTagsCount = response[0].costAmount;
    }, (error: any) => {
      console.log(error);
    });
  }

  CategoryWise() {
    let chart = new Chart({
      chart: {
        type: 'column',
      },
      title: {
        text: 'Asset Category Wise',
      },
      subtitle: {
        text: 'No. of Items',
      },
      xAxis: {
        categories: [
          'Furntinure',
          'Office Equipment',
          'Computers',
          'Machinery',
          'vehicles',
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
          name: 'Account No',
          type: 'column',

          data: [62010, 71523, 10642, 12920, 14400],
        },
      ],
    });
    this.asset_wise_chart = chart;
  }
}
