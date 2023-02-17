import { Component, OnInit } from '@angular/core';
import { SharedServicesAuthModule } from '@society/shared/services/auth';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-sale-detail-dealer-wise',
  templateUrl: './sale-detail-dealer-wise.component.html',
  styleUrls: ['./sale-detail-dealer-wise.component.scss'],
})
export class SaleDetailDealerWiseComponent implements OnInit {
  lblAmount: any = 0;
  lblPaid: any = 0;
  lblBalance: any = 0;
  lblDealer: any = '';

  searchPartyName: any = '';

  cmbReferred: any = '';

  referredList: any = [];
  soldFileCompanyList: any = [];

  constructor(
    private authService: SharedServicesAuthModule,
    private dataService: SharedServicesDataModule,
    private global: SharedServicesGlobalDataModule
  ) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Sold Files Detail Dealer Wise Report');

    this.getAdvertisementCompany();
  }

  getAdvertisementCompany() {
    this.dataService.getHttp('core-api/getadvertisementcompany', '').subscribe(
      (response: any) => {
        this.referredList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getDealerCompanySaleDetail() {
    this.soldFileCompanyList = [];

    this.lblAmount = 0;
    this.lblPaid = 0;
    this.lblBalance = 0;
    this.lblDealer = '';

    var data = this.referredList.filter(
      (x: { companyID: any }) => x.companyID == this.cmbReferred
    );

    this.lblDealer = data[0].companyName;

    this.dataService
      .getHttp(
        'core-api/GetDealerCompanySaleDetail?DealerCompanyID=' +
          this.cmbReferred,
        ''
      )
      .subscribe(
        (response: any) => {
          this.soldFileCompanyList = response;

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
