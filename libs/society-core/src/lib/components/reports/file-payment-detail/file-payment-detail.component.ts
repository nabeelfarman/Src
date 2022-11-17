import { Component, OnInit } from '@angular/core';
import { SharedServicesAuthModule } from '@society/shared/services/auth';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { environment } from 'apps/society/src/environments/environment';

@Component({
  selector: 'society-file-payment-detail',
  templateUrl: './file-payment-detail.component.html',
  styleUrls: ['./file-payment-detail.component.scss']
})
export class FilePaymentDetailComponent implements OnInit {

  logoImg: any = '';
  cmbFile: any = '';

  fileList: any = [];
  filePaymentList: any = [];

  constructor(
    private authService: SharedServicesAuthModule,
    private dataService: SharedServicesDataModule,
    private global: SharedServicesGlobalDataModule
    ) {
  }

  ngOnInit(): void {
    this.global.setHeaderTitle('File Payment Report');

    this.getFile()
    this.getCompany()
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

  getFilePayment(){
    this.dataService.getHttp('core-api/GetFilePaymentDetail?fileid=' + this.cmbFile, '').subscribe((response: any) => {
      this.filePaymentList = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  getFile(){
    this.dataService.getHttp('core-api/getFile', '').subscribe((response: any) => {
      this.fileList = response;
      console.log(response)
    }, (error: any) => {
      console.log(error);
    });
  }

  printReport(printSection: string) {
    this.global.printData(printSection);
  }
  
}
