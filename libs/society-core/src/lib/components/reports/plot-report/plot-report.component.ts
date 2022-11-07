import { Component, OnInit } from '@angular/core';
import { SharedServicesAuthModule } from '@society/shared/services/auth';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { environment } from 'apps/society/src/environments/environment';

@Component({
  selector: 'society-plot-report',
  templateUrl: './plot-report.component.html',
  styleUrls: ['./plot-report.component.scss']
})
export class PlotReportComponent implements OnInit {

  logoImg: any = '';

  plotList: any = [];

  constructor(
    private authService: SharedServicesAuthModule,
    private dataService: SharedServicesDataModule,
    private global: SharedServicesGlobalDataModule
    ) {
  }

  ngOnInit(): void {
    this.global.setHeaderTitle('Plot Report');

    this.getCompany();
    this.getPlots();
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

  getPlots(){
    this.dataService.getHttp('core-api/getPlot', '').subscribe((response: any) => {
      this.plotList = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  printReport(printSection: string) {
    this.global.printData(printSection);
  }

}
