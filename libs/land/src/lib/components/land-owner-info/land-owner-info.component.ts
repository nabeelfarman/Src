import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { LandOwnerInterface, MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { LandOwnerInfoTableComponent } from './land-owner-info-table/land-owner-info-table.component';

@Component({
  selector: 'society-land-owner-info',
  templateUrl: './land-owner-info.component.html',
  styleUrls: ['./land-owner-info.component.scss'],
})
export class LandOwnerInfoComponent implements OnInit {
  
  @ViewChild(LandOwnerInfoTableComponent) landTable: any;

  cmbPresentCountry: string = '';
  cmbPermanentCountry: string = '';

  pageFields: LandOwnerInterface = {
    newMemberProfileID: '0',
    spType: '',
    userID: '',
    membername: '',
    SDWofName: '',
    memberCNIC: '',
    applicationDate: '',
    mObileNO1: '',
    email: '',
    presentAddress: '',
    presentAddressCityID: '0',
    permanentAddress: '',
    permanentAddressCityID: '0',
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
      msg: 'select name',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.SDWofName,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.memberCNIC,
      msg: 'enter cnic',
      type: 'cnic',
      required: true,
    },
    {
      value: this.pageFields.applicationDate,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.mObileNO1,
      msg: 'enter mobile no',
      type: 'mobile',
      required: true,
    },
    {
      value: this.pageFields.email,
      msg: 'enter email',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.presentAddress,
      msg: 'enter address',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.presentAddressCityID,
      msg: 'select present city',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.permanentAddress,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.permanentAddressCityID,
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

  ngOnInit(): void {
    this.globalService.setHeaderTitle("Land Owner's Info");
    this.formFields[2].value = this.globalService.getUserId().toString();

    this.getCountry();
    this.getCity();
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
        'land-api/LandOwner/saveLandOwner'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            if(this.formFields[0].value > 0)
            {
              this.valid.apiInfoResponse('Record updated successfully');
            }else{
              this.valid.apiInfoResponse('Record added successfully');
            }
            this.landTable.getLandOwner();
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

  reset() {
    this.formFields = this.valid.resetFormFields(this.formFields);

    this.formFields[0].value = '0';
    this.formFields[4].value = '';
    this.formFields[6].value = '';
    this.formFields[11].value = '';
    this.formFields[12].value = '0';
    this.cmbPermanentCountry = '';
    this.cmbPresentCountry = '';
  }

  edit(item: any){

    // var perCountry = this.tempCityList.filter(
    //   (j: { cityID: any }) => (j.cityID = item.permanentAddresscityId)
    // );
    // if (perCountry.length > 0) {
    //   this.cmbPermanentCountry = perCountry[0].countryId;
    //   this.getPermanentCity(this.cmbPermanentCountry);
    // }

    // var preCountry = this.tempCityList.filter(
    //   (l: { cityID: any }) => (l.cityID = item.presentAddresscityId)
    // );
    // if (preCountry.length > 0) {
    //   this.cmbPresentCountry = preCountry[0].countryId;
    //   this.getPresentCity(this.cmbPresentCountry);
    // }

    this.formFields[0].value = item.memberProfileId;
    this.formFields[3].value = item.memberName;
    this.formFields[4].value = item.sdWofName;
    this.formFields[5].value = item.memberCNIC;
    this.formFields[7].value = item.mobileNo1;
    this.formFields[8].value = item.email;
    this.formFields[9].value = item.presentAddress;
    // this.formFields[10].value = item.presentAddresscityId;
    this.formFields[11].value = item.permanentAddress;
    // this.formFields[12].value = item.permanentAddresscityId;
    this.formFields[6].value = new Date(item.applicationDate);

  }
}
