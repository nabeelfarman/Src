import { Component, OnInit } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'society-remaining-installment-report',
  templateUrl: './remaining-installment-report.component.html',
  styleUrls: ['./remaining-installment-report.component.scss'],
})
export class RemainingInstallmentReportComponent implements OnInit {
  lblPartyName: any = '';
  lblFileName: any = '';
  lblMobile: any = '';
  lblCNIC: any = '';

  searchFileName: any = '';

  lblAmount: any = 0;
  lblPaid: any = 0;
  lblBalance: any = 0;

  logoImg: any = '';
  dtpFromDate: any = '';
  dtpToDate: any = '';

  remInstallmentList: any = [];

  constructor(
    private valid: SharedHelpersFieldValidationsModule,
    private dataService: SharedServicesDataModule,
    private global: SharedServicesGlobalDataModule,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Remaining Installment Report');

    this.dtpFromDate = new Date();
    this.dtpToDate = new Date();
  }

  showReport() {
    if (this.dtpFromDate > this.dtpToDate) {
      this.valid.apiInfoResponse('select correct date');
    } else {
      //alert(this.datePipe.transform(this.dtpFromDate, 'yyyy-MM-dd'));
      //alert(this.datePipe.transform(this.dtpToDate, 'yyyy-MM-dd'));
      this.dataService
        .getHttp(
          'core-api/GetDueInstallmentDetail?FromDate=' +
            this.datePipe.transform(this.dtpFromDate, 'yyyy-MM-dd') +
            '&ToDate=' +
            this.datePipe.transform(this.dtpToDate, 'yyyy-MM-dd'),
          ''
        )
        .subscribe(
          (response: any) => {
            this.remInstallmentList = response;

            console.log(response);
            // this.lblPartyName = response[0].partyName;
            // this.lblFileName = response[0].fileName;
            // this.lblCNIC = response[0].partyCNIC;
            // this.lblMobile = response[0].mobile;

            this.lblAmount = 0;
            this.lblPaid = 0;
            this.lblBalance = 0;

            for (var i = 0; i < response.length; i++) {
              this.lblAmount =
                parseInt(this.lblAmount) + parseInt(response[i].amount);
              this.lblPaid =
                parseInt(this.lblPaid) + parseInt(response[i].paid);
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
  }

  printReport(printSection: string) {
    this.global.printData(printSection);
  }
}
