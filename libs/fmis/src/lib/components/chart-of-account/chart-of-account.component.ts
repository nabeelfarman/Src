import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import {
  ChartOfAccountInterface,
  MyFormField,
} from '@society/shared/interface';
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

  lblAccountCode: any = '';
  cmbLevelNo: any = '';

  pageFields: ChartOfAccountInterface = {
    coaID: '0', //0
    spType: '', //1
    userID: '', //2
    coaTypeID: '', //3
    level1: '', //4
    level2: '', //5
    level3: '', //6
    level4: '', //7
    coaTitle: '', //8
    transactionAllowed: '', //9
    memberReceiptHead: '', //10
    haveCDNote: '', //11
    dNote: '', //12
    cNote: '', //13
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
      value: this.pageFields.coaTitle,
      msg: 'enter acoount title',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.transactionAllowed,
      msg: '',
      type: 'radioButton',
      required: true,
    },
    {
      value: this.pageFields.memberReceiptHead,
      msg: '',
      type: 'checkbox',
      required: false,
    },
    {
      value: this.pageFields.haveCDNote,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.dNote,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.cNote,
      msg: '',
      type: '',
      required: false,
    },
  ];

  levelTypeList: any = [
    {
      typeID: '1',
      typeName: 'Level 1',
    },
    {
      typeID: '2',
      typeName: 'Level 2',
    },
    {
      typeID: '3',
      typeName: 'Level 3',
    },
    {
      typeID: '4',
      typeName: 'Level 4',
    },
  ];
  coaTypeList: any = [];
  coaLevel1List: any = [];
  coaLevel2List: any = [];
  coaLevel3List: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Chart of Accounts');
    this.formFields[2].value = this.globalService.getUserId().toString();

    this.formFields[9].value = 'true';
    this.formFields[11].value = false;
    this.getCoaType();
  }

  getCoaType() {
    this.dataService.getHttp('core-api/getcoatype', '').subscribe(
      (response: any) => {
        this.coaTypeList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getlevel01(item: any) {
    this.formFields[4].value = '';
    this.formFields[5].value = '';
    this.formFields[6].value = '';
    this.formFields[7].value = '';
    this.lblAccountCode = '';

    this.coaLevel1List = [];
    this.coaLevel2List = [];
    this.coaLevel3List = [];

    if (this.cmbLevelNo > '1' && item != '') {
      this.dataService
        .getHttp('core-api/getlevel1?level0=' + item, '')
        .subscribe(
          (response: any) => {
            this.coaLevel1List = response;
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  getlevel02(item: any) {
    this.dataService
      .getHttp(
        'core-api/getlevel2?level0=' +
          this.formFields[3].value +
          '&level1=' +
          item,
        ''
      )
      .subscribe(
        (response: any) => {
          this.coaLevel2List = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getlevel03(item: any) {
    this.dataService
      .getHttp(
        'core-api/getlevel3??level0=' +
          this.formFields[3].value +
          '&level1=' +
          this.formFields[4].value +
          '&level2=' +
          item,
        ''
      )
      .subscribe(
        (response: any) => {
          this.coaLevel3List = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  save() {
    if (this.formFields[9].value == 'true') {
      this.formFields[9].value = true;
    } else if (this.formFields[9].value == 'false') {
      this.formFields[9].value = false;
    }

    if (this.formFields[10].value == '') {
      this.formFields[10].value = false;
    }

    if (this.cmbLevelNo == '1') {
      if (this.formFields[4].value == '') {
        this.valid.apiInfoResponse('enter level 1');
        return;
      }
    } else if (this.cmbLevelNo == '2') {
      if (this.formFields[4].value == '') {
        this.valid.apiInfoResponse('select level 1');
        return;
      } else if (this.formFields[5].value == '') {
        this.valid.apiInfoResponse('enter level 2');
        return;
      }
    } else if (this.cmbLevelNo == '3') {
      if (this.formFields[4].value == '') {
        this.valid.apiInfoResponse('select level 1');
        return;
      } else if (this.formFields[5].value == '') {
        this.valid.apiInfoResponse('select level 2');
        return;
      } else if (this.formFields[6].value == '') {
        this.valid.apiInfoResponse('enter level 3');
        return;
      }
    } else if (this.cmbLevelNo == '4') {
      if (this.formFields[4].value == '') {
        this.valid.apiInfoResponse('select level 1');
        return;
      } else if (this.formFields[5].value == '') {
        this.valid.apiInfoResponse('select level 2');
        return;
      } else if (this.formFields[6].value == '') {
        this.valid.apiInfoResponse('select level 3');
        return;
      } else if (this.formFields[7].value == '') {
        this.valid.apiInfoResponse('enter level 4');
        return;
      }
    }

    // console.log(this.formFields);
    // return;
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'core-api/insertChartOfAccount'
      )
      .subscribe(
        (response: any) => {
          if (response.msg == 'Data Saved Successfully') {
            if (this.formFields[0].value > 0) {
              this.valid.apiInfoResponse('record updated successfully');
            } else {
              this.valid.apiInfoResponse('record saved successfully');
            }
            this.coaTable.getChartOfAccount();
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

  reset() {
    this.formFields = this.valid.resetFormFields(this.formFields);
    this.formFields[0].value = '0';
    this.formFields[4].value = '';
    this.formFields[5].value = '';
    this.formFields[6].value = '';
    this.formFields[7].value = '';
    this.formFields[10].value = '';
    this.lblAccountCode = '';

    this.coaLevel1List = [];
    this.coaLevel2List = [];
    this.coaLevel3List = [];
  }

  edit(item: any) {
    // $("#newCOA").modal("show");
    // this.formFields[0].value = item.coaID;
    // this.formFields[4].value = item.level1.toString();
    // this.formFields[5].value = item.level2.toString();
  }

  getLevel(value: any) {
    if (value == 1) {
      this.lblAccountCode = this.formFields[4].value;
    } else if (value == 2) {
      this.lblAccountCode =
        this.formFields[4].value + '.' + this.formFields[5].value;
    } else if (value == 3) {
      this.lblAccountCode =
        this.formFields[4].value +
        '.' +
        this.formFields[5].value +
        '.' +
        this.formFields[6].value;
    } else if (value == 4) {
      this.lblAccountCode =
        this.formFields[4].value +
        '.' +
        this.formFields[5].value +
        '.' +
        this.formFields[6].value +
        '.' +
        this.formFields[7].value;
    }
  }
}
