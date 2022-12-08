import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { FixedAssetInterface, MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { FixedAssetTableComponent } from './fixed-asset-table/fixed-asset-table.component';

@Component({
  selector: 'society-fixed-asset',
  templateUrl: './fixed-asset.component.html',
  styleUrls: ['./fixed-asset.component.scss']
})
export class FixedAssetComponent implements OnInit {

  @ViewChild(FixedAssetTableComponent) assetTable: any;

  rdbType: any = '1';

  pageFields: FixedAssetInterface = {
    InvoiceDate: '0', //0
    spType: '', //1
    userID: '', //2
    BranchID: '', //3
    ProjectID: '', //4
    PartyID: '', //5
    BankID: '', //6
    BankReceiptNo: '', //7
    InvoiceDescription: '', //8
    Amount: '', //9
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.InvoiceDate,
      msg: 'select invoice date',
      type: 'date',
      required: true,
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
      value: this.pageFields.BranchID,
      msg: 'select branch',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.ProjectID,
      msg: 'select project',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.PartyID,
      msg: 'select party',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.BankID,
      msg: 'select bank',
      type: 'selectbox',
      required: false,
    },
    {
      value: this.pageFields.BankReceiptNo,
      msg: 'enter bank receipt no',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.InvoiceDescription,
      msg: 'enter description',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.Amount,
      msg: 'enter amount',
      type: 'number',
      required: true,
    }
  ];

  branchList: any = [];
  projectList: any = [];
  partyList: any =[];
  bankList: any =[];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
    ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Fixed Asset');
    this.formFields[2].value = this.globalService.getUserId().toString();
    
    this.rdbType = '1';
    this.getBankAccount();
    this.getProject();
    this.getParty();
    this.getFixedAsset();
  }

  getFixedAsset(){
    this.dataService.getHttp('core-api/GetFixedAssetDetail', '').subscribe((response: any) => {
      this.assetTable.tableData = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  getBankAccount(){
    this.dataService.getHttp('core-api/getBank', '').subscribe((response: any) => {
      this.bankList = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  getProject(){
    this.dataService.getHttp('core-api/getProject', '').subscribe((response: any) => {
      this.projectList = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  getParty(){
    this.dataService.getHttp('core-api/GetVendor', '').subscribe((response: any) => {
      this.partyList = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  save() {

    this.formFields[3].value = '1';

    if(this.rdbType == '2'){
      if(this.formFields[6].value == ''){
        this.valid.apiInfoResponse('select bank');return;
      }
      if(this.formFields[7].value == ''){
        this.valid.apiInfoResponse('enter bank receipt no');return;
      }
    }else{
      this.formFields[6].value = '0';
      this.formFields[7].value = '';
    }

    this.dataService
    .savetHttp(
      this.pageFields,
      this.formFields,
      'core-api/InsertFixedAsset'
    )
    .subscribe(
      (response: any) => {
        if(response.msg == 'Data Saved Successfully'){
          this.valid.apiInfoResponse('record added successfully');

          this.reset();
          this.getFixedAsset();
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

  }
}
