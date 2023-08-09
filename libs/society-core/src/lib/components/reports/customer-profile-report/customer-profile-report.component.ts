import { Component, OnInit } from '@angular/core';
import { SharedServicesAuthModule } from '@society/shared/services/auth';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { environment } from 'apps/society/src/environments/environment';

@Component({
  selector: 'society-customer-profile-report',
  templateUrl: './customer-profile-report.component.html',
  styleUrls: ['./customer-profile-report.component.scss'],
})
export class CustomerProfileReportComponent implements OnInit {
  logoImg: any = '';

  searchParty: any = '';
  cmbParty: any = '';

  partyList: any = [];
  tableData: any = [];

  constructor(
    private authService: SharedServicesAuthModule,
    private dataService: SharedServicesDataModule,
    private global: SharedServicesGlobalDataModule
  ) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Customer Profile Report');

    this.getCompany();
    this.getParty();
  }

  getCompany() {
    this.authService.getCompanyHttp('auth-api/logo', '').subscribe(
      (response: any) => {
        if (response.length > 0) {
          this.logoImg =
            environment.imageSavedPath +
            'company/' +
            response[0].companyShortName +
            '.png';
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
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

  getReportList() {
    this.dataService
      .getHttp('core-api/getparty?partyID=' + this.cmbParty, '')
      .subscribe(
        (response: any) => {
          this.tableData = response;
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
