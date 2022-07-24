import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { ExternalPartiesInterface, MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { ExternalPartiesTableComponent } from './external-parties-table/external-parties-table.component';

@Component({
  selector: 'society-external-parties',
  templateUrl: './external-parties.component.html',
  styleUrls: ['./external-parties.component.scss'],
})
export class ExternalPartiesComponent implements OnInit {
  
  @ViewChild(ExternalPartiesTableComponent) externalTable: any;

  ddlCountry: string = "";

  pageFields: ExternalPartiesInterface = {
    newMemberProfileID: '0',
    spType: '',
    userID: '',
    applicationDate: '',
    membername: '',
    presentAddress: '',
    presentAddressCityID: '',
    memberCNIC: '',
    NTN: '',
    PhoneNO1: '',
    MObileNO1: '',
    email: '',
    organization: '',
    residentStatus: '',
    taxCategory: '',
    isNTNduplication: '',
    isCNICDuplication: '',
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
      value: this.pageFields.applicationDate,
      msg: 'select business registration date',
      type: 'date',
      required: true,
    },
    {
      value: this.pageFields.membername,
      msg: 'enter title',
      type: 'name',
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
      msg: 'select city',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.memberCNIC,
      msg: 'enter cnic',
      type: 'cnic',
      required: false,
    },
    {
      value: this.pageFields.NTN,
      msg: 'enter ntn',
      type: 'ntn',
      required: false,
    },
    {
      value: this.pageFields.PhoneNO1,
      msg: 'enter phone no',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.MObileNO1,
      msg: 'enter mobile no',
      type: 'mobile',
      required: true,
    },
    {
      value: this.pageFields.email,
      msg: 'enter email',
      type: 'email',
      required: false,
    },
    {
      value: this.pageFields.organization,
      msg: 'enter organization',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.residentStatus,
      msg: 'select resident status',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.taxCategory,
      msg: 'select business nature',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.isNTNduplication,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.isCNICDuplication,
      msg: '',
      type: '',
      required: false,
    },
  ];

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
    ) {}

  cnicMask = this.globalService.cnicMask();
  ntnMask = this.globalService.ntnMask();
  mobileMask = this.globalService.mobileMask();

  countryList: any = [];
  cityList: any = [];
  tempCityList: any =[];

  error: any;

  ngOnInit(): void {
    this.globalService.setHeaderTitle('External Parties');
    this.formFields[2].value = this.globalService.getUserId().toString();

    this.getCountry();
    this.getTempCity();
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

  getTempCity() {
    this.dataService.getHttp('company-api/Company/getCity', '').subscribe(
      (response: any) => {
        this.tempCityList = response;
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

  save(){

    if(this.formFields[15].value == ''){
      this.formFields[15].value = '0';
    }
    
    if(this.formFields[16].value == ''){
      this.formFields[16].value = '0';
    }
    
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'fmis-api/ExternalParties/saveExternalParties'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            if(this.formFields[0].value > 0)
            {
              this.valid.apiInfoResponse('record updated successfully');
            }else{
              this.valid.apiInfoResponse('record added successfully');
            }
            this.externalTable.getExternalParties();
            this.reset();
          }else{
            this.valid.apiErrorResponse(response.toString());
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

    this.formFields[0].value = "0";
    this.formFields[7].value = "";
    this.formFields[8].value = "";
    this.formFields[9].value = "";
    this.formFields[11].value = "";
    this.formFields[12].value = "";
    this.formFields[13].value = "";
    this.ddlCountry = "";
  }
  
  edit(item: any) {
    console.log(item);

    var perCountry = this.tempCityList.filter(
      (j: { cityID: any }) => (j.cityID = item.presentAddresscityId)
    );

    if (perCountry.length > 0) {
      this.ddlCountry = perCountry[0].countryId;
      this.getCity(this.ddlCountry);
    }

    this.formFields[3].value = new Date(item.applicationDate);
    this.formFields[4].value = item.memberName;
    this.formFields[5].value = item.presentAddress;
    this.formFields[0].value = item.memberProfileId;
    this.formFields[6].value = item.presentAddresscityId;
    this.formFields[7].value = item.memberCNIC;
    this.formFields[8].value = item.ntn;
    this.formFields[9].value = item.phoneNo1;
    this.formFields[10].value = item.mobileNo1;
    this.formFields[11].value = item.email;
    this.formFields[12].value = item.organization;
    this.formFields[13].value = item.residentStatus;
    this.formFields[14].value = item.taxCategory;

  }
}
