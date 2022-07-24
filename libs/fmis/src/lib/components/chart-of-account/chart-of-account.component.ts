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

  ddlType: string = "";
  searchSubGroup: string = "";
  lblAccountCode: string = "";

  pageFields: ChartOfAccountInterface = {
    newCoaID: '0',
    spType: '',
    userId: '',
    WhichLevel: '',
    level1: '',
    level2: '',
    level3: '',
    level4: '',
    AccountCode: '',
    AccounTitle: '',
    subgroupId: '',
    budgetSubcodeId: '',
    levelavailable: '',
    forMemberReceipt: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.newCoaID,
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
      value: this.pageFields.userId,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.WhichLevel,
      msg: 'select level',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.level1,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.level2,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.level3,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.level4,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.AccountCode,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.AccounTitle,
      msg: 'enter account title',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.subgroupId,
      msg: 'select sub group',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.budgetSubcodeId,
      msg: 'select budget head',
      type: 'selectBox',
      required: false,
    },
    {
      value: this.pageFields.levelavailable,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.forMemberReceipt,
      msg: '',
      type: '',
      required: false,
    },
  ];

  subGroupList: any = [];
  budgetHeadList: any = [];
  coaLevelsList: any = [];
  coaLevel1List: any = [];
  coaLevel2List: any = [];
  coaLevel3List: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
    ) {}

  levelNo: number = 0;
  accountCode: string = '';

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Chart of Accounts');
    this.formFields[2].value = this.globalService.getUserId().toString();

    this.getSubGroup();
    this.getBudgetHead();
    this.getChartOfAccountLevels();
    this.getChartOfAccountLevel1();
    this.getChartOfAccountLevel2();
    this.getChartOfAccountLevel3();
  }

  getSubGroup(){
    this.dataService.getHttp('fmis-api/SubGroup/getSubGroup', '').subscribe((response: any) => {
      this.subGroupList = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  getBudgetHead(){
    this.dataService.getHttp('fmis-api/BudgetHead/getBudgetSubCode', '').subscribe((response: any) => {
      this.budgetHeadList = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  getChartOfAccountLevels(){
    this.dataService.getHttp('fmis-api/ChartOfAccount/getChartOfAccountLevels', '').subscribe((response: any) => {
      this.coaLevelsList = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  getChartOfAccountLevel1(){
    this.dataService.getHttp('fmis-api/ChartOfAccount/getChartOfAccountLevel1', '').subscribe((response: any) => {
      this.coaLevel1List = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  getChartOfAccountLevel2(){
    this.dataService.getHttp('fmis-api/ChartOfAccount/getChartOfAccountLevel2', '').subscribe((response: any) => {
      this.coaLevel2List = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  getChartOfAccountLevel3(){
    this.dataService.getHttp('fmis-api/ChartOfAccount/getChartOfAccountLevel3', '').subscribe((response: any) => {
      this.coaLevel3List = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  save() {

    if(this.formFields[12].value == ''){
      this.formFields[12].value = "0";
    }
    if(this.formFields[13].value == ''){
      this.formFields[13].value = "0";
    }
    
    if(this.formFields[11].value == ''){
      this.formFields[11].value = "0";
    }

    if(this.ddlType == ""){
      this.valid.apiInfoResponse('select type');
      return;
    }

    if(this.formFields[3].value == '1'){
      if(this.formFields[4].value == ''){
        this.valid.apiInfoResponse('enter level 1');
        return;
      }
      this.formFields[8].value = this.formFields[4].value;
      this.formFields[5].value = "0";
      this.formFields[6].value = "0";
      this.formFields[7].value = "0";

    }else if(this.formFields[3].value == '2'){
      if(this.formFields[4].value == ''){
        this.valid.apiInfoResponse('select level 1');
        return;
      }else if(this.formFields[5].value == ''){
        this.valid.apiInfoResponse('enter level 2');
        return;
      }
      this.formFields[8].value = this.formFields[4].value
                                + this.formFields[5].value;
      this.formFields[6].value = "0";
      this.formFields[7].value = "0";

    }else if(this.formFields[3].value == '3'){
      if(this.formFields[4].value == ''){
        this.valid.apiInfoResponse('select level 1');
        return;
      }else if(this.formFields[5].value == ''){
        this.valid.apiInfoResponse('select level 2');
        return;
      }else if(this.formFields[6].value == ''){
        this.valid.apiInfoResponse('enter level 3');
        return;
      }
      this.formFields[8].value = this.formFields[4].value
                                + this.formFields[5].value
                                + this.formFields[6].value;
      this.formFields[7].value = "0";
                          
    }else if(this.formFields[3].value == '4'){
      if(this.formFields[4].value == ''){
        this.valid.apiInfoResponse('select level 1');
        return;
      }else if(this.formFields[5].value == ''){
        this.valid.apiInfoResponse('select level 2');
        return;
      }else if(this.formFields[6].value == ''){
        this.valid.apiInfoResponse('select level 3');
        return;
      }else if(this.formFields[6].value == ''){
        this.valid.apiInfoResponse('enter level 4');
        return;
      }
      this.formFields[8].value = this.formFields[4].value
                                + this.formFields[5].value
                                + this.formFields[6].value
                                + this.formFields[7].value;

    }


    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'fmis-api/ChartOfAccount/saveChartOfAccount'
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
            this.coaTable.getChartOfAccount();
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
    this.formFields[0].value = "0";
    this.lblAccountCode = "";
    this.ddlType = "";
    this.formFields[13].value = "";
    this.formFields[12].value = "";
    this.formFields[11].value = "";
    this.formFields[4].value = "";
    this.formFields[5].value = "";
    this.formFields[6].value = "";
    this.formFields[7].value = "";
  }

  getLevel(value: any){
    if(value == 1){
      this.lblAccountCode = this.formFields[4].value;
    }else if(value == 2){
      this.lblAccountCode = this.formFields[4].value 
                          + '.' + this.formFields[5].value;
    }else if(value == 3){
      this.lblAccountCode = this.formFields[4].value 
                          + '.' + this.formFields[5].value 
                          + '.' + this.formFields[6].value;
    }else if(value == 4){
      this.lblAccountCode = this.formFields[4].value 
                          + '.' + this.formFields[5].value 
                          + '.' + this.formFields[6].value
                          + '.' + this.formFields[7].value;
    }
  }

  edit(item: any){

    $("#newCOA").modal("show");

    this.formFields[0].value = item.coaID;
    this.formFields[4].value = item.level1.toString();
    this.formFields[5].value = item.level2.toString();
    this.formFields[6].value = item.level3.toString();
    this.formFields[7].value = item.level4.toString();
    this.formFields[8].value = item.accountCode;
    this.formFields[9].value = item.accountTitle;
    this.formFields[10].value = item.subGroupID
    this.formFields[11].value = item.budgetSubCodeId;
    this.formFields[12].value = item.levelAvailable
    this.formFields[13].value = item.formemberReceipt;
    this.lblAccountCode = item.accountCode;
    this.ddlType = item.coaType.toLowerCase(); 

    if(item.level4 != 0){
      this.formFields[3].value = 4;
    }else if(item.level3 != 0 && item.level4 == 0){
      this.formFields[3].value = 3;
    }else if(item.level2 != 0 && item.level3 == 0){
      this.formFields[3].value = 2;
    }else if(item.level1 != 0 && item.level2 == 0){
      this.formFields[3].value = 1;
    }
  }
}
