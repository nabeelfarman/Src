import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { DepreciationInterface, MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { DepreciationTableComponent } from './depreciation-table/depreciation-table.component';
declare var $: any;

@Component({
  selector: 'society-fixed-asset-table',
  templateUrl: './fixed-asset-table.component.html',
  styleUrls: ['./fixed-asset-table.component.scss']
})
export class FixedAssetTableComponent implements OnInit {

  @ViewChild(DepreciationTableComponent) depTable: any;

  pageFields: DepreciationInterface = {
    InvoiceDate: '', //0
    spType: '', //1
    userID: '', //2
    BranchID: '', //3
    ProjectID: '', //4
    InvoiceNo: '', //5
    InvoiceDescription: '', //6
    Amount: '', //7
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
      value: this.pageFields.InvoiceNo,
      msg: 'enter invoice no',
      type: 'textbox',
      required: true,
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

  tableData: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
    ) {}

  ngOnInit(): void {
    this.formFields[2].value = this.globalService.getUserId().toString();

  }

  getDepreciation(item: any){
    this.formFields[5].value = item.invoiceNo;

    this.dataService.getHttp('core-api/GetDepreciationDetail?refinvno=' + item.invoiceNo, '').subscribe((response: any) => {
      this.depTable.tableData = response;
      $('#depreciationModal').modal('show');
    }, (error: any) => {
      console.log(error);
    });
  }

  save(){
    this.formFields[3].value = '1';
    this.formFields[4].value = '1';

    this.dataService
    .savetHttp(
      this.pageFields,
      this.formFields,
      'core-api/InsertDepreciation'
    )
    .subscribe(
      (response: any) => {
        console.log(response);
        if(response.msg == 'Data Saved Successfully'){
          this.valid.apiInfoResponse('record added successfully');

          this.reset();
          this.getDepreciation(this.formFields[5].value);
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
    this.formFields[3].value = '';
    this.formFields[4].value = '';
    this.formFields[0].value = '';
    this.formFields[6].value = '';
    this.formFields[7].value = '';
  }
}
