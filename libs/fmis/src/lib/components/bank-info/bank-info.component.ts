import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { BankInfoInterface, MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { BankInfoTableComponent } from './bank-info-table/bank-info-table.component';

@Component({
  selector: 'society-bank-info',
  templateUrl: './bank-info.component.html',
  styleUrls: ['./bank-info.component.scss'],
})
export class BankInfoComponent implements OnInit {

  @ViewChild(BankInfoTableComponent) bankTable: any;

  pageFields: BankInfoInterface = {
    BankID: '0',
    spType: '',
    UserID: '',
    BankName: '',
    BankAlias: '',
    BankAccountTitle: '',
    BankAccountNo: '',
    BranchName: '',
    BranchCode: '',
    BankAddress: '',
    BankDescription: '',
  };


  formFields: MyFormField[] = [
    {
      value: this.pageFields.BankID,
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
      value: this.pageFields.UserID,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.BankName,
      msg: 'enter bank name',
      type: 'name',
      required: true,
    },
    {
      value: this.pageFields.BankAlias,
      msg: 'enter bank alias',
      type: 'name',
      required: true,
    },
    {
      value: this.pageFields.BankAccountTitle,
      msg: 'enter bank account title',
      type: 'name',
      required: true,
    },
    {
      value: this.pageFields.BankAccountNo,
      msg: 'enter bank account no',
      type: 'number',
      required: true,
    },
    {
      value: this.pageFields.BranchName,
      msg: 'enter branch name',
      type: 'name',
      required: true,
    },
    {
      value: this.pageFields.BranchCode,
      msg: 'enter branch code',
      type: 'number',
      required: true,
    },
    {
      value: this.pageFields.BankAddress,
      msg: 'enter bank address',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.BankDescription,
      msg: 'enter bank description',
      type: 'textBox',
      required: true,
    },
  ];

  bankList: any = [];
  bankCOAccountList: any = [];
  bankTypeList: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Banks Information');
    this.formFields[2].value = this.globalService.getUserId().toString();

  }
  
  saveBanks() {

    if (this.formFields[0].value > 0) {
      this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'core-api/UpdateBank'
      )
      .subscribe(
        (response: any) => {
          if (response.msg == "Data Updated Successfully") {
            this.valid.apiInfoResponse('Record updated successfully');
            this.bankTable.getBankAccount();
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
    }else{
      this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'core-api/InsertBank'
      )
      .subscribe(
        (response: any) => {
          if (response.msg == "Data Saved Successfully") {
            this.valid.apiInfoResponse('Record saved successfully');
            this.bankTable.getBankAccount();
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
    // this.formFields[11].value = '';
    // this.formFields[12].value = '';
  }
      
  edit(item: any) {
    
    this.formFields[0].value = item.bankID;
    this.formFields[3].value = item.bankName;
    this.formFields[4].value = item.bankAlias;
    this.formFields[5].value = item.bankAccountTitle;
    this.formFields[6].value = item.bankAccountNo;
    this.formFields[7].value = item.branchName;
    this.formFields[8].value = item.branchCode;
    this.formFields[9].value = item.bankAddress;
    this.formFields[10].value = item.bankDescription;
    
  }
}
