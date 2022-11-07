import { Component, OnInit } from '@angular/core';
import { SharedServicesAuthModule } from '@society/shared/services/auth';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { environment } from 'apps/society/src/environments/environment';

@Component({
  selector: 'society-unsold-report',
  templateUrl: './unsold-report.component.html',
  styleUrls: ['./unsold-report.component.scss']
})
export class UnsoldReportComponent implements OnInit {

  logoImg: any = '';

  unSoldFileList: any = [];

  constructor(
    private authService: SharedServicesAuthModule,
    private dataService: SharedServicesDataModule,
    private global: SharedServicesGlobalDataModule
    ) {
  }

  ngOnInit(): void {
    this.global.setHeaderTitle('Unsold File Report');

    this.getCompany();
    this.getUnSoldFile();
  }

  getCompany(){
    this.authService.getCompanyHttp('auth-api/logo', '').subscribe(
      (response: any) => {
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

  getUnSoldFile(){
    this.dataService.getHttp('core-api/getunsoldfile', '').subscribe((response: any) => {
      this.unSoldFileList = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  printReport(printSection: string) {
    this.global.printData(printSection);
  }

}
