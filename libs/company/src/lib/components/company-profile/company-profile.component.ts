import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CompanyProfileInterface,
  MyFormField,
} from '@society/shared/interface';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { AddressComponent } from 'libs/blocks/src/lib/components/address/address.component';
import { ImageUploadingComponent } from 'libs/blocks/src/lib/components/image-uploading/image-uploading.component';
import { filter } from 'rxjs/operators';
import { environment } from 'apps/society/src/environments/environment';
@Component({
  selector: 'society-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
})
export class CompanyProfileComponent implements OnInit {
  @ViewChild(AddressComponent) addressComponent: any;
  @ViewChild(ImageUploadingComponent) imageUpload: any;

  pageFields: CompanyProfileInterface = {
    companyId: '0',
    spType: '',
    userID: '0',
    companyTypeid: '',
    companyName: '',
    displayName: '',
    shortName: '',
    registrationDate: '',
    registrationNo: '',
    ntn: '',
    strn: '',
    registrationDoc: '',
    path: '',
    address: '',
    phoneno1: '',
    cityID: '0',
    cellno1: '',
    email1: '',
  };
  formFields: MyFormField[] = [
    {
      value: this.pageFields.companyId,
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
      value: this.pageFields.companyTypeid,
      msg: 'enter ownership type',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.companyName,
      msg: 'enter company name',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.displayName,
      msg: 'enter display name',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.shortName,
      msg: 'enter short name',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.registrationDate,
      msg: 'enter registration date',
      type: 'date',
      required: true,
    },
    {
      value: this.pageFields.registrationNo,
      msg: 'enter registration no',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.ntn,
      msg: 'enter ntn number',
      type: 'ntn',
      required: true,
    },
    {
      value: this.pageFields.strn,
      msg: 'enter strn',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.registrationDoc,
      msg: 'select logo',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.path,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.address,
      msg: 'enter address',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.phoneno1,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.cityID,
      msg: 'select city',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.cellno1,
      msg: 'enter mobile no',
      type: 'mobile',
      required: true,
    },
    {
      value: this.pageFields.email1,
      msg: 'enter email',
      type: 'email',
      required: true,
    },
  ];

  compTypeList: any = [];
  error: any;
  companyLogo: any;

  constructor(
    private global: SharedServicesGlobalDataModule,
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ntnMask = this.global.ntnMask();

  ngOnInit(): void {
    this.formFields[2].value = this.global.getUserId().toString();

    this.global.setHeaderTitle('Company Profile');

    this.getCompany();
    this.getCompanyType();
  }

  companyLogoUrl(path: any, logoName: any) {
    if (path == '' || path == undefined) {
      this.companyLogo = 'http://i.pravatar.cc/500?img=7';
    } else {
      // this.companyLogo = environment.imageSavedPath + 'company/' + logoName + '.png';
      this.companyLogo = environment.imageSavedPath + 'company/' + logoName + '.png';
      // this.companyLogo = 'assets/ui/ssechs.png';
    }
  }

  getCompany() {
    this.dataService.getHttp('company-api/Company/getCompany', '').subscribe(
      (response: any) => {
        if (response.length > 0) {
          this.formFields[0].value = response[0].companyId;
          this.formFields[3].value = response[0].companyTypeid;
          this.formFields[4].value = response[0].companyName;
          this.formFields[5].value = response[0].companyDisplayName;
          this.formFields[6].value = response[0].companyShortName;
          this.formFields[7].value = new Date(response[0].registerationDate);
          this.formFields[8].value = response[0].registerationNo;
          this.formFields[9].value = response[0].ntn;
          this.formFields[10].value = response[0].strn;
          this.formFields[11].value = response[0].registerationDoc;

          this.addressComponent.txtAddress = response[0].address;
          this.addressComponent.cmbCountry = response[0].countryId;

          this.addressComponent.getCity(this.addressComponent.cmbCountry);

          this.addressComponent.cmbCity = response[0].cityID;
          this.addressComponent.txtMobile = response[0].cellno1;
          this.addressComponent.txtEmail = response[0].email1;

          this.companyLogoUrl(
            response[0].registerationDoc,
            response[0].companyShortName
          );
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getCompanyType() {
    this.dataService
      .getHttp('company-api/Company/getCompanyType', '')
      .subscribe(
        (response: any) => {
          this.compTypeList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  save() {
    this.formFields[11].value = environment.imageUrl + 'company/';
    this.formFields[12].value = this.imageUpload.image;

    this.formFields[13].value = this.addressComponent.txtAddress;
    this.formFields[15].value = this.addressComponent.cmbCity;
    this.formFields[16].value = this.addressComponent.txtMobile;
    this.formFields[17].value = this.addressComponent.txtEmail;

    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'company-api/Company/saveCompany'
      )
      .subscribe(
        (response: any[]) => {
          console.log(response);
          if(response[0].includes('Success') == true){
            this.valid.apiInfoResponse('Company created successfully');
            this.reset();
          }else{
            this.valid.apiErrorResponse(response[0]);
          }
          // this.roleTable.getRole();
        },
        (error: any) => {
          this.error = error;
          this.valid.apiErrorResponse(this.error);
        }
      );
  }

  reset() {}
}
