import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { BranchInterface, MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { NewBranchTableComponent } from './new-branch-table/new-branch-table.component';

@Component({
  selector: 'society-new-branch',
  templateUrl: './new-branch.component.html',
  styleUrls: ['./new-branch.component.scss']
})
export class NewBranchComponent implements OnInit {
  @ViewChild(NewBranchTableComponent) branchTable: any;

  cmbCountry: any = '';

  pageFields: BranchInterface = {
    branchId: '0',
    spType: '',
    userId: '',
    companyId: '',
    branchDescription: '',
    cityId: '',
    branchAddress: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.branchId,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.spType,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.userId,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.companyId,
      msg: 'select company',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.branchDescription,
      msg: 'enter branch name',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.cityId,
      msg: 'select city',
      type: 'selectBox',
      required: false,
    },
    {
      value: this.pageFields.branchAddress,
      msg: 'enter branch address',
      type: 'textBox',
      required: true,
    },
  ];
    
  companyList: any = [];
  cityList: any = [];
  countryList: any = [];
  tempCityList: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle("Branch");
    this.formFields[2].value = this.globalService.getUserId().toString();

    this.getCompany();
    this.getCountry();
    this.getCity();
  }

  getCompany(){
    this.dataService.getHttp('company-api/Company/getCompany', '').subscribe(
      (response: any) => {
        this.companyList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
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

  getCity() {
    this.dataService.getHttp('company-api/Company/getCity', '').subscribe(
      (response: any) => {
        this.tempCityList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getPresentCity(item: any) {
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

  save(){

    this.formFields;
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'company-api/Branch/saveBranch'
      )
      .subscribe(
        (response: any[]) => {
          if (response[0].includes('Success') == true) {
            if (this.formFields[0].value > 0) {
              this.valid.apiInfoResponse('Record updated successfully');
            } else {
              this.valid.apiInfoResponse('Record saved successfully');
            }
            this.branchTable.getBranch();
            this.reset();
          } else {
            this.valid.apiErrorResponse(response[0]);
          }
        },
        (error: any) => {
          this.error = error;
          this.valid.apiErrorResponse(this.error);
        }
      );

  }

  reset(){
    this.formFields = this.valid.resetFormFields(this.formFields);
    this.formFields[0].value = '0';
    this.formFields[5].value = '0';
    this.cmbCountry = '';
  }

  edit(item: any){
    var perCountry = this.tempCityList.filter(
      (j: { cityID: any }) => (j.cityID = item.cityId)
    );
    if (perCountry.length > 0) {
      this.cmbCountry = perCountry[0].countryId;
      this.getPresentCity(this.cmbCountry);
    }

    this.formFields[0].value = item.branchId;
    this.formFields[3].value = item.companyId;
    this.formFields[4].value = item.branchDescription;
    this.formFields[5].value = item.cityId;

  }
}
