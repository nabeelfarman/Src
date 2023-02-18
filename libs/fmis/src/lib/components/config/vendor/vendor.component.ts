import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { CustomerInterface, MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { VendorTableComponent } from './vendor-table/vendor-table.component';

@Component({
  selector: 'society-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss'],
})
export class VendorComponent implements OnInit {
  @ViewChild(VendorTableComponent) vendorTable: any;

  searchCity: any = '';

  pageFields: CustomerInterface = {
    partyID: '0',
    spType: '',
    userID: '',
    partyType: '',
    partyName: '',
    partyCNIC: '',
    mobile: '',
    Mobile2: '',
    Email: '',
    cityID: '',
    partyAddress: '',
    NextToKin: '',
    BranchID: '',
    Description: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.partyID,
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
      value: this.pageFields.partyType,
      msg: 'select party type',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.partyName,
      msg: 'enter party name',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.partyCNIC,
      msg: 'enter cnic',
      type: 'cnic',
      required: true,
    },
    {
      value: this.pageFields.mobile,
      msg: 'enter mobile',
      type: 'mobile',
      required: true,
    },
    {
      value: this.pageFields.Mobile2,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.Email,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.cityID,
      msg: 'select city',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.partyAddress,
      msg: 'enter party address',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.NextToKin,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.BranchID,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.Description,
      msg: '',
      type: '',
      required: false,
    },
  ];

  error: any;
  cityList: any = [];

  mobileMask = this.globalService.mobileMask();

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Vendor Profile');
    this.formFields[2].value = this.globalService.getUserId().toString();

    this.getCity();
  }

  getCity() {
    this.dataService.getHttp('company-api/Company/getCity', '').subscribe(
      (response: any) => {
        this.cityList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  save() {
    this.formFields[12].value = '1';

    if (this.formFields[0].value > 0) {
      this.dataService
        .savetHttp(this.pageFields, this.formFields, 'core-api/updateparty')
        .subscribe(
          (response: any) => {
            if (response.msg == 'Data Updated Successfully') {
              this.valid.apiInfoResponse('Record updated successfully');
              this.vendorTable.getParty();
              this.reset();
            } else {
              this.valid.apiErrorResponse(response.msg);
            }
          },
          (error: any) => {
            this.error = error;
            this.valid.apiErrorResponse(this.error);
          }
        );
    } else {
      this.dataService
        .savetHttp(this.pageFields, this.formFields, 'core-api/insertparty')
        .subscribe(
          (response: any) => {
            if (response.msg == 'Data Saved Successfully') {
              this.valid.apiInfoResponse('Record saved successfully');
              this.vendorTable.getParty();
              this.reset();
            } else {
              this.valid.apiErrorResponse(response.msg);
            }
          },
          (error: any) => {
            this.error = error;
            this.valid.apiErrorResponse(this.error);
          }
        );
    }
  }

  reset() {
    this.formFields = this.valid.resetFormFields(this.formFields);
    this.formFields[0].value = '0';
    this.formFields[7].value = '';
    this.formFields[8].value = '';
    this.formFields[11].value = '';
  }

  setCnicData() {
    if (
      this.formFields[5].value.length == 5 ||
      this.formFields[5].value.length == 13
    ) {
      this.formFields[5].value = this.formFields[5].value + '-';
    }
  }

  edit(item: any) {
    this.formFields[0].value = item.partyID;
    this.formFields[3].value = item.partyType;
    this.formFields[4].value = item.partyName;
    this.formFields[5].value = item.partyCNIC;
    this.formFields[6].value = item.mobile;
    this.formFields[7].value = item.mobile2;
    this.formFields[8].value = item.email;
    this.formFields[9].value = item.cityID;
    this.formFields[10].value = item.partyAddress;
    this.formFields[11].value = item.nextToKin;
    this.formFields[12].value = item.branchID;
  }
}
