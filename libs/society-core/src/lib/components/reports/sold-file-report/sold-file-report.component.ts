import { Component, OnInit } from '@angular/core';
import { SharedServicesAuthModule } from '@society/shared/services/auth';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { environment } from 'apps/society/src/environments/environment';

@Component({
  selector: 'society-sold-file-report',
  templateUrl: './sold-file-report.component.html',
  styleUrls: ['./sold-file-report.component.scss'],
})
export class SoldFileReportComponent implements OnInit {
  logoImg: any = '';

  searchCategory: any = '';
  searchBlock: any = '';

  cmbCategory: any = '';
  cmbBlock: any = '';

  soldFileList: any = [];
  categoryList: any = [];
  blockList: any = [];

  constructor(
    private authService: SharedServicesAuthModule,
    private dataService: SharedServicesDataModule,
    private global: SharedServicesGlobalDataModule
  ) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Sold File Report');

    this.getCompany();
    this.getSoldFile();
    this.getCategory();
    this.getBlock();
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

  getCategory() {
    // this.dataService.getHttp('core-api/getfileownerdetail', '').subscribe(
    //   (response: any) => {
    //     this.categoryList = response;
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );
  }

  getBlock() {
    // this.dataService.getHttp('core-api/getfileownerdetail', '').subscribe(
    //   (response: any) => {
    //     this.blockList = response;
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );
  }

  getSoldFile() {
    if (this.cmbCategory != '' && this.cmbBlock != '') {
      this.dataService
        .getHttp(
          'core-api/getfileownerdetail?categoryID=' +
            this.cmbCategory +
            '&blockID=' +
            this.cmbBlock,
          ''
        )
        .subscribe(
          (response: any) => {
            this.soldFileList = response;
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
