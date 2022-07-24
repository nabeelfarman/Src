import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import {
  PartnerInterface,
  MyFormField,
  GetPartnerInterface,
} from '@society/shared/interface';

@Component({
  selector: 'society-director-panel',
  templateUrl: './director-panel.component.html',
  styleUrls: ['./director-panel.component.scss'],
})
export class DirectorPanelComponent implements OnInit {
  pageFields: PartnerInterface = {
    partnerID: '0',
    spType: '',
    userID: '0',
    partnerTitle: '',
    designationID: '',
    companyid: '0',
    CNICNo: '',
    partnerAddress: '',
    countryid: '',
    cityId: '',
    partnerCellNo: '',
    partnerEmail: '',
  };
  formFields: MyFormField[] = [
    {
      value: this.pageFields.partnerID,
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
      value: this.pageFields.partnerTitle,
      msg: 'enter partner name',
      type: 'name',
      required: true,
    },
    {
      value: this.pageFields.designationID,
      msg: 'select partner title',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.companyid,
      msg: 'enter company',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.CNICNo,
      msg: 'enter cnic no',
      type: 'cnic',
      required: true,
    },
    {
      value: this.pageFields.partnerAddress,
      msg: 'enter partner address',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.countryid,
      msg: 'select country',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.cityId,
      msg: 'select city',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.partnerCellNo,
      msg: 'enter partner mobile number',
      type: 'mobile',
      required: true,
    },
    {
      value: this.pageFields.partnerEmail,
      msg: 'enter partner email',
      type: 'email',
      required: true,
    },
  ];

  countryList: any = [];
  designationList: any = [];
  cityList: any = [];

  itemList: GetPartnerInterface[] = [];

  cnicMask = this.global.cnicMask();
  mobileMask = this.global.mobileMask();

  error: any;
  constructor(
    private global: SharedServicesGlobalDataModule,
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.formFields[2].value = this.global.getUserId().toString();

    this.getCountry();
    this.getDesignation();
    this.getPartner();
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

  getDesignation() {
    this.dataService
      .getHttp('company-api/Company/getDesignation', '')
      .subscribe(
        (response: any) => {
          this.designationList = response;
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

  getPartner() {
    this.dataService.getHttp('company-api/Company/getPartner', '').subscribe(
      (response: any) => {
        console.log(response);
        if (response.length > 0) {
          this.itemList = [];

          for (var i = 0; i < response.length; i++) {
            this.getCity(response[i].countryId);
            var designName = this.designationList.filter(
              (x: { designationID: any }) =>
                x.designationID == response[i].designationId
            );

            this.itemList.push({
              partnerId: response[i].partnerId,
              partnerTitle: response[i].partnerTitle,
              designationId: response[i].designationId,
              companyId: response[i].companyId,
              cnicNo: response[i].cnicNo,
              partnerAddress: response[i].partnerAddress,
              cityId: response[i].cityId,
              partnerCellNo: response[i].partnerCellNo,
              partnerEmail: response[i].partnerEmail,
              countryid: response[i].countryId,
              designationName: designName[0].designationName,
            });
          }
        }
        this.itemList.push({
          partnerId: '0',
          partnerTitle: '',
          designationId: '',
          companyId: '0',
          cnicNo: '',
          partnerAddress: '',
          cityId: '',
          partnerCellNo: '',
          partnerEmail: '',
          countryid: '',
          designationName: '',
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  save(item: any) {
    // console.log(item);
    this.formFields[9].value = item.cityId;
    this.formFields[6].value = item.cnicNo;
    this.formFields[5].value = 1;
    this.formFields[8].value = item.countryid;
    this.formFields[7].value = item.partnerAddress;
    this.formFields[10].value = item.partnerCellNo;
    this.formFields[11].value = item.partnerEmail;
    this.formFields[0].value = item.partnerId;
    this.formFields[4].value = item.designationId;
    this.formFields[3].value = item.partnerTitle;

    // console.log(this.formFields);return

    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'company-api/Company/savePartner'
      )
      .subscribe(
        (response: any[]) => {
          this.valid.apiInfoResponse('Record saved successfully');
          this.getPartner();
        },
        (error: any) => {
          this.error = error;
          this.valid.apiErrorResponse(this.error);
        }
      );
  }
}
