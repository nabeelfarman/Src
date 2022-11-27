import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { ChartOfAccountInterface, MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { ChartOfAccountTableComponent } from './chart-of-account-table/chart-of-account-table.component';

declare var $: any;
@Component({
  selector: 'society-chart-of-account',
  templateUrl: './chart-of-account.component.html',
  styleUrls: ['./chart-of-account.component.scss'],
})
export class ChartOfAccountComponent implements OnInit {
  
  @ViewChild(ChartOfAccountTableComponent) coaTable: any;

  pageFields: ChartOfAccountInterface = {
    coaID: '0',
    spType: '',
    userID: '',
    coaTypeID: '',
    coaTitle: '',
    accountCode: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.coaID,
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
      value: this.pageFields.coaTypeID,
      msg: 'select type',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.coaTitle,
      msg: 'enter acoount title',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.accountCode,
      msg: 'enter account code',
      type: 'textbox',
      required: true,
    }
  ];

  coaTypeList: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
    ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Chart of Accounts');
    this.formFields[2].value = this.globalService.getUserId().toString();

    this.getCoaType();
  }

  getCoaType(){
    this.dataService.getHttp('core-api/getcoatype', '').subscribe((response: any) => {
      this.coaTypeList = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  save() {

    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'core-api/insertChartOfAccount'
      )
      .subscribe(
        (response: any) => {
          if(response.msg == "Data Saved Successfully"){
            if(this.formFields[0].value > 0)
            {
              this.valid.apiInfoResponse('record updated successfully');
            }else{
              this.valid.apiInfoResponse('record saved successfully');
            }
            this.coaTable.getChartOfAccount();
            this.reset();
          }else{
            this.valid.apiErrorResponse(response.msg);
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
    this.formFields[0].value = "0";
  }

  edit(item: any){

    // $("#newCOA").modal("show");

    // this.formFields[0].value = item.coaID;
    // this.formFields[4].value = item.level1.toString();
    // this.formFields[5].value = item.level2.toString();
  }
}
