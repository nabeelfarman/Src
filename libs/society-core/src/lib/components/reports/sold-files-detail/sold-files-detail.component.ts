import { Component, OnInit } from '@angular/core';
import { SharedServicesAuthModule } from '@society/shared/services/auth';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-sold-files-detail',
  templateUrl: './sold-files-detail.component.html',
  styleUrls: ['./sold-files-detail.component.scss'],
})
export class SoldFilesDetailComponent implements OnInit {
  lblAmount: any = 0;
  lblPaid: any = 0;
  lblBalance: any = 0;

  cmbBooking: any = '';

  bookingList: any = [];
  soldFileList: any = [];

  constructor(
    private authService: SharedServicesAuthModule,
    private dataService: SharedServicesDataModule,
    private global: SharedServicesGlobalDataModule
  ) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('File Payment Report');

    this.getPlotBookingType();
  }

  getPlotBookingType() {
    this.dataService.getHttp('core-api/getPlotBookingType', '').subscribe(
      (response: any) => {
        this.bookingList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getFileSaleDetail() {
    this.soldFileList = [];

    this.lblAmount = 0;
    this.lblPaid = 0;
    this.lblBalance = 0;

    this.dataService
      .getHttp('core-api/getFileSaleDetail?BookingType=' + this.cmbBooking, '')
      .subscribe(
        (response: any) => {
          this.soldFileList = response;

          for (var i = 0; i < response.length; i++) {
            this.lblAmount =
              parseInt(this.lblAmount) + parseInt(response[i].amount);
            this.lblPaid = parseInt(this.lblPaid) + parseInt(response[i].paid);
            this.lblBalance =
              parseInt(this.lblBalance) +
              (parseInt(response[i].amount) - parseInt(response[i].paid));
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  printReport(printSection: string) {
    this.global.printData(printSection);
  }
}
