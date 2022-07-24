import { Component, OnInit } from '@angular/core';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  txtAddress: string | undefined;
  cmbCountry: string | undefined;
  cmbCity: string | undefined;
  txtMobile: string | undefined;
  txtEmail: string | undefined;

  countryList: any = [];
  cityList: any = [];
  tempCityList: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule,
    private global: SharedServicesGlobalDataModule
  ) {}

  mobileMask = this.global.mobileMask();

  ngOnInit(): void {
    this.getCountry();
  }

  getCountry() {
    this.dataService.getHttp('company-api/Company/getCountry', '').subscribe(
      (response: any) => {
        this.countryList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getCity(item: any) {
    this.dataService
      .getHttp('company-api/Company/getCity?countryId=' + item, '')
      .subscribe(
        (response: any) => {
          this.cityList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
