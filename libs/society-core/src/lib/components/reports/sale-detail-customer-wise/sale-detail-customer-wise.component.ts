import { Component, OnInit } from '@angular/core';
import { SharedServicesAuthModule } from '@society/shared/services/auth';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-sale-detail-customer-wise',
  templateUrl: './sale-detail-customer-wise.component.html',
  styleUrls: ['./sale-detail-customer-wise.component.scss'],
})
export class SaleDetailCustomerWiseComponent implements OnInit {
  lblAmount: any = 0;
  lblPaid: any = 0;
  lblBalance: any = 0;
  lblCustomer: any = '';

  searchPartyName: any = '';

  cmbParty: any = '';

  partyList: any = [];
  soldFileCustomerList: any = [];

  constructor(
    private authService: SharedServicesAuthModule,
    private dataService: SharedServicesDataModule,
    private global: SharedServicesGlobalDataModule
  ) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Sold Files Detail Customer Wise Report');

    this.getParty();
  }

  getParty() {
    this.dataService.getHttp('core-api/getparty', '').subscribe(
      (response: any) => {
        this.partyList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  getCustomerSaleDetail() {
    this.soldFileCustomerList = [];

    this.lblAmount = 0;
    this.lblPaid = 0;
    this.lblBalance = 0;
    this.lblCustomer = '';

    var data = this.partyList.filter(
      (x: { partyID: any }) => x.partyID == this.cmbParty
    );

    this.lblCustomer = data[0].partyName;

    this.dataService
      .getHttp('core-api/getCustomerSaleDetail?PartyID=' + this.cmbParty, '')
      .subscribe(
        (response: any) => {
          this.soldFileCustomerList = response;

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
