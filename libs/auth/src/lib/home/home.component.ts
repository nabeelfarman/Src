import { Component, OnInit } from '@angular/core';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { environment } from 'apps/society/src/environments/environment';

@Component({
  selector: 'society-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  logoUrl: any = '';

  constructor(
    private global: SharedServicesGlobalDataModule,
    private dataService: SharedServicesDataModule,
    ) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Home Page');

    this.getCompany();
    
  }
  
  getCompany(){
    this.dataService.getHttp('company-api/Company/getCompany', '').subscribe(
      (response: any) => {
        if (response.length > 0) {
          this.logoUrl = environment.imageSavedPath + 'company/' + 
                            response[0].companyShortName + '.png';
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
