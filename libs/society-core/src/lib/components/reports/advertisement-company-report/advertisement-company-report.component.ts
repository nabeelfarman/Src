import { Component, OnInit } from '@angular/core';
import { SharedServicesAuthModule } from '@society/shared/services/auth';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { environment } from 'apps/society/src/environments/environment';

@Component({
  selector: 'society-advertisement-company-report',
  templateUrl: './advertisement-company-report.component.html',
  styleUrls: ['./advertisement-company-report.component.scss']
})
export class AdvertisementCompanyReportComponent implements OnInit {

  logoImg: any = '';

  advertisementList: any = [];

  constructor(
    private authService: SharedServicesAuthModule,
    private dataService: SharedServicesDataModule,
    private global: SharedServicesGlobalDataModule
    ) {
  }

  ngOnInit(): void {
    this.global.setHeaderTitle('Advertisement Company Report');

    this.getCompany();
    this.getAdvertisement();
  }

  getCompany(){
    this.authService.getCompanyHttp('auth-api/logo', '').subscribe(
      (response: any) => {
        console.log(response)
        if (response.length > 0) {
          this.logoImg = environment.imageSavedPath + 'company/' +
                            response[0].companyShortName + '.png';
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getAdvertisement(){
    this.dataService.getHttp('core-api/getadvertisementcompany', '').subscribe((response: any) => {
      this.advertisementList = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  printReport(printSection: string) {
    this.global.printData(printSection);
  }


}
