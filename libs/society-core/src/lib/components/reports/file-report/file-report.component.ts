import { Component, OnInit } from '@angular/core';
import { SharedServicesAuthModule } from '@society/shared/services/auth';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { environment } from 'apps/society/src/environments/environment';

@Component({
  selector: 'society-file-report',
  templateUrl: './file-report.component.html',
  styleUrls: ['./file-report.component.scss']
})
export class FileReportComponent implements OnInit {

  logoImg: any = '';

  fileList: any = [];

  constructor(
    private authService: SharedServicesAuthModule,
    private dataService: SharedServicesDataModule,
    private global: SharedServicesGlobalDataModule
    ) {
  }

  ngOnInit(): void {
    this.global.setHeaderTitle('File Report');

    this.getCompany();
    this.getFile();
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

  getFile(){
    this.dataService.getHttp('core-api/getfile', '').subscribe((response: any) => {
      this.fileList = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  printReport(printSection: string) {
    this.global.printData(printSection);
  }

}
