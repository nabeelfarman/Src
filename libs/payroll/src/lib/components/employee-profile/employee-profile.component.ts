import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { EmployeeProfileInterface, MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { EmployeeProfileTableComponent } from './employee-profile-table/employee-profile-table.component';

@Component({
  selector: 'society-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
})
export class EmployeeProfileComponent implements OnInit {

  @ViewChild(EmployeeProfileTableComponent) employeeTable: any;

  cmbPresentCountry: string = '';
  cmbPermanentCountry: string = '';
    
  pageFields: EmployeeProfileInterface = {
    newMemberProfileID: '0',
    spType: '',
    userID: '',
    membername: '',
    sdwofName: '',
    memberCNIC: '',
    memberDOB: '',
    joiningDate: '',
    retirementDate: '',
    designationId: '',
    presentAddress: '',
    presentAddressCityID: '',
    permanentAddress: '',
    permanentAddressCityId: '0',
    mObileNO1: '',
    email: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.newMemberProfileID,
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
      value: this.pageFields.userID,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.membername,
      msg: 'enter member name',
      type: 'name',
      required: true,
    },
    {
      value: this.pageFields.sdwofName,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.memberCNIC,
      msg: 'enter member cnic',
      type: 'cnic',
      required: true,
    },
    {
      value: this.pageFields.memberDOB,
      msg: 'select date of birth',
      type: 'date',
      required: false,
    },
    {
      value: this.pageFields.joiningDate,
      msg: 'select joining date',
      type: 'date',
      required: true,
    },
    {
      value: this.pageFields.retirementDate,
      msg: 'select retirement date',
      type: 'date',
      required: true,
    },
    {
      value: this.pageFields.designationId,
      msg: 'select member designation',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.presentAddress,
      msg: 'enter address',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.presentAddressCityID,
      msg: 'select present address city',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.permanentAddress,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.permanentAddressCityId,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.mObileNO1,
      msg: 'enter mobile',
      type: 'mobile',
      required: true,
    },
    {
      value: this.pageFields.email,
      msg: 'enter email',
      type: 'email',
      required: false,
    },
  ];

  designationList: any = [];
  countryList: any = [];
  presentCityList: any = [];
  permanentCityList: any = [];
  tempCityList: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  cnicMask = this.globalService.cnicMask;
  mobileMask = this.globalService.mobileMask;

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Employee Profile');
    this.formFields[2].value = this.globalService.getUserId().toString();

    this.getCountry();
    this.getCity();
    this.getDesignation();

  }
  
  getDesignation() {
    this.dataService.getHttp('hr-api/Designation/getDesignation', '').subscribe(
      (response: any) => {
        this.designationList = response;
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
          this.presentCityList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getPermanentCity(item: any) {
    this.dataService
      .getHttp('company-api/Company/getCity?countryId=' + item, '')
      .subscribe(
        (response: any) => {
          this.permanentCityList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  save() {

    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'hr-api/Employee/saveEmployee'
      )
      .subscribe(
        (response: any[]) => {
          if (response[0].includes('Success') == true) {
            if (this.formFields[0].value > 0) {
              this.valid.apiInfoResponse('Record updated successfully');
            } else {
              this.valid.apiInfoResponse('Record saved successfully');
            }
            this.employeeTable.getEmployeeProfile();
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

  reset() {
    this.formFields = this.valid.resetFormFields(this.formFields);
    this.formFields[0].value = '0';
    this.formFields[4].value = '';
    this.formFields[6].value = '';
    this.formFields[12].value = '';
    this.formFields[13].value = '0';
    this.formFields[15].value = '';

    this.cmbPermanentCountry = '';
    this.cmbPresentCountry = '';
  }

  edit(item: any){

    var perCountry = this.tempCityList.filter(
      (j: { cityID: any }) => (j.cityID = item.permanentAddresscityId)
    );
    if (perCountry.length > 0) {
      this.cmbPermanentCountry = perCountry[0].countryId;
      this.getPermanentCity(this.cmbPermanentCountry);
    }

    var preCountry = this.tempCityList.filter(
      (l: { cityID: any }) => (l.cityID = item.presentAddresscityId)
    );
    if (preCountry.length > 0) {
      this.cmbPresentCountry = preCountry[0].countryId;
      this.getPresentCity(this.cmbPresentCountry);
    }

    this.formFields[0].value = item.memberProfileId;
    this.formFields[3].value = item.memberName;
    this.formFields[4].value = item.sdWofName;
    this.formFields[5].value = item.memberCNIC;
    this.formFields[6].value = new Date(item.memberDOB);
    this.formFields[7].value = new Date(item.joiningDate);
    this.formFields[8].value = new Date(item.retirementDate);
    this.formFields[9].value = item.designationID;
    this.formFields[10].value = item.presentAddress;
    this.formFields[11].value = item.presentAddresscityId;
    this.formFields[12].value = item.permanentAddress;
    this.formFields[13].value = item.permanentAddresscityId;
    this.formFields[14].value = item.mobileNo1;
    this.formFields[15].value = item.email;

  }
}
