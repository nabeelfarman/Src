import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { MemberProfileTableComponent } from '../member-profile/member-profile-table/member-profile-table.component';
import {
  ApplicantProfileInterface,
  MyFormField,
} from '@society/shared/interface';

@Component({
  selector: 'society-applicant-profile',
  templateUrl: './applicant-profile.component.html',
  styleUrls: ['./applicant-profile.component.scss'],
})
export class ApplicantProfileComponent implements OnInit {
  @ViewChild(MemberProfileTableComponent) applicantTable: any;

  rdbCnic: string = '2';

  cmbPresentCountry: string = '';
  cmbPermanentCountry: string = '';

  searchPresentCity: any = '';
  searchPermanentCity: any = '';

  pageFields: ApplicantProfileInterface = {
    newMemberProfileId: '0',
    spType: '',
    userid: '',
    memberName: '',
    memberType: '',
    SDWofName: '',
    memberCNIC: '',
    memberDOB: '',
    phoneNo1: '',
    phoneNo2: '',
    mobileNo1: '',
    mobileNo2: '',
    Email: '',
    presendAddress: '',
    presentAddresscityId: '',
    permanentAddress: '',
    permanentAddresscityId: '0',
    nextofKin: ''
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.newMemberProfileId,
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
      value: this.pageFields.userid,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.memberName,
      msg: 'enter applicant name',
      type: 'name',
      required: true,
    },
    {
      value: this.pageFields.memberType,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.SDWofName,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.memberCNIC,
      msg: 'enter applicant cnic',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.memberDOB,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.phoneNo1,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.phoneNo2,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.mobileNo1,
      msg: 'enter mobile',
      type: 'mobile',
      required: false,
    },
    {
      value: this.pageFields.mobileNo2,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.Email,
      msg: 'enter email',
      type: 'email',
      required: false,
    },
    {
      value: this.pageFields.presendAddress,
      msg: 'enter address',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.presentAddresscityId,
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
      value: this.pageFields.permanentAddresscityId,
      msg: 'select permanent address city',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.nextofKin,
      msg: '',
      type: '',
      required: false,
    },
  ];

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

  cnicMask = this.globalService.cnicMask();
  mobileMask = this.globalService.mobileMask();
  phoneMask = this.globalService.phoneMask();

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Applicant Profile');
    this.formFields[2].value = this.globalService.getUserId().toString();
    this.formFields[4].value = 'Applicant';

    this.rdbCnic = '2';

    this.getCountry();
    this.getCity();
    this.getApplicantProfile();
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

  getApplicantProfile() {
    this.dataService
      .getHttp('society-api/MemberProfile/getApplicantProfile', '')
      .subscribe(
        (response: any) => {
          this.applicantTable.tableData = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  typeChangeCnic(){
    this.formFields[6].value = '';
  }

  setCnicData() {
    if(this.rdbCnic == '1'){
      if(this.formFields[6].value.length == 3 || this.formFields[6].value.length == 6 )
      {
        this.formFields[6].value = this.formFields[6].value + '-';
      }
    }else{
      if(this.formFields[6].value.length == 5 || this.formFields[6].value.length == 13 )
      {
        this.formFields[6].value = this.formFields[6].value + '-';
      }
    }
  }

  saveApplicantProfile() {
    if (this.formFields[16].value == '') {
      this.formFields[16].value = '0';
    }
    
    if(this.formFields[6].value == ''){
      this.valid.apiInfoResponse('enter cnic');
      return;
    } else {
      if(this.rdbCnic == '1'){
        if(this.formFields[6].value.length < 13){
          this.valid.apiInfoResponse("enter cnic");
          return;
        }
      }else{
        if(this.formFields[6].value.length < 15){
          this.valid.apiInfoResponse("enter cnic");
          return;
        }
      }
    }

    this.formFields;
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'society-api/MemberProfile/saveMemberProfile'
      )
      .subscribe(
        (response: any[]) => {
          if (response[0].includes('Success') == true) {
            if (this.formFields[0].value > 0) {
              this.valid.apiInfoResponse('Record updated successfully');
            } else {
              this.valid.apiInfoResponse('Record saved successfully');
            }
            this.getApplicantProfile();
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
    this.formFields[10].value = '';
    this.formFields[12].value = '';
    this.formFields[5].value = '';
    this.formFields[6].value = '';
    this.formFields[7].value = '';
    this.formFields[15].value = '';
    this.formFields[16].value = '';
    this.cmbPermanentCountry = '';
    this.cmbPresentCountry = '';

    this.rdbCnic = '2';
    this.permanentCityList = [];
    this.presentCityList = [];
  }

  edit(item: any, obj: any) {
    var perCountry = this.tempCityList.filter(
      (j: { cityID: any }) => (j.cityID = item.item.permanentAddresscityId)
    );
    if (perCountry.length > 0) {
      this.cmbPermanentCountry = perCountry[0].countryId;
      this.getPermanentCity(this.cmbPermanentCountry);
    }

    var preCountry = this.tempCityList.filter(
      (l: { cityID: any }) => (l.cityID = item.item.presentAddresscityId)
    );
    if (preCountry.length > 0) {
      this.cmbPresentCountry = preCountry[0].countryId;
      this.getPresentCity(this.cmbPresentCountry);
    }

    if(item.item.memberCNIC.length == 13){
      this.rdbCnic = '1';
    }else{
      this.rdbCnic = '2';
    }
    this.formFields[0].value = item.item.memberProfileId;
    this.formFields[3].value = item.item.memberName;
    this.formFields[4].value = 'Applicant';
    this.formFields[5].value = item.item.sdWofName;
    this.formFields[6].value = item.item.memberCNIC;
    this.formFields[7].value = new Date(item.item.memberDOB);
    this.formFields[8].value = item.item.phoneNo1;
    this.formFields[9].value = item.item.phoneNo2;
    this.formFields[10].value = item.item.mobileNo1;
    this.formFields[11].value = item.item.mobileNo2;
    this.formFields[12].value = item.item.email;
    this.formFields[13].value = item.item.presentAddress;
    this.formFields[14].value = item.item.presentAddresscityId;
    this.formFields[15].value = item.item.permanentAddress;
    this.formFields[16].value = item.item.permanentAddresscityId;

    if (obj.num == '2') {
      this.dataService
        .deleteHttp(
          this.pageFields,
          this.formFields,
          'society-api/MemberProfile/saveMemberProfile'
        )
        .subscribe(
          (response: any[]) => {
            if (response[0].includes('Success') == true) {
              this.valid.apiInfoResponse('Record deleted successfully');
              this.getApplicantProfile();
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
  }
}
