import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, PlotFilePaymentMultipleInterface, PlotFilePaymentSingleInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import * as XLSX from 'xlsx';
import { ImportPlotFilePaymentTableComponent } from './import-plot-file-payment-table/import-plot-file-payment-table.component';
import { SavedPlotFilePaymentTableComponent } from './saved-plot-file-payment-table/saved-plot-file-payment-table.component';
import { MembershipPaymentsDetailComponent } from '../create-transfer/membership-payments-detail/membership-payments-detail.component';
@Component({
  selector: 'society-plot-file-payments',
  templateUrl: './plot-file-payments.component.html',
  styleUrls: ['./plot-file-payments.component.scss']
})
export class PlotFilePaymentsComponent implements OnInit {

  @ViewChild(SavedPlotFilePaymentTableComponent) paymentTable: any;
  @ViewChild(ImportPlotFilePaymentTableComponent) importTable: any;
  @ViewChild(MembershipPaymentsDetailComponent) memPaymentTable: any;

  @ViewChild('filName') inputFileName: ElementRef;

  searchFile: string = '';
  lblCategory: string = '';
  lblNature: string = '';
  lblType: string = '';
  tabIndex = 0;

  pageFieldsSingle: PlotFilePaymentSingleInterface = {
    newPLotFilePaymentId: '0',
    spType: '',
    userId: '',
    plotFileId: '',
    memberProfileId: '',
    receiptDate: '',
    bankId: '',
    depositSlipNo: '',
    referenceNo: '',
    coaId: '',
    amount: '',
    collectionBrCode: '',
    collectionBranch: '',
    memberName: '',
    memberCNIC: '',
    phoneNo1: '',
    trnTypeId: '',
  };

  pageFieldsMultiple: PlotFilePaymentMultipleInterface = {
    newPLotFilePaymentId: '0',
    spType: '',
    userId: '',
    receiptDate: '',
    bankId: '',
    json: '',
  };

  formFieldsSingle: MyFormField[] = [
    {
      value: this.pageFieldsSingle.newPLotFilePaymentId,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFieldsSingle.spType,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFieldsSingle.userId,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFieldsSingle.plotFileId,
      msg: 'select membership no',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFieldsSingle.memberProfileId,
      msg: 'select member',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFieldsSingle.receiptDate,
      msg: 'select payment date',
      type: 'date',
      required: true,
    },
    {
      value: this.pageFieldsSingle.bankId,
      msg: 'select bank',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFieldsSingle.depositSlipNo,
      msg: 'enter deposit slip no',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFieldsSingle.referenceNo,
      msg: 'enter reference no',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFieldsSingle.coaId,
      msg: 'select account head',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFieldsSingle.amount,
      msg: 'enter amount',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFieldsSingle.collectionBranch,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFieldsSingle.collectionBrCode,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFieldsSingle.memberName,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFieldsSingle.memberCNIC,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFieldsSingle.phoneNo1,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFieldsSingle.trnTypeId,
      msg: '',
      type: '',
      required: false,
    },
  ];

  formFieldsMultiple: MyFormField[] = [
    {
      value: this.pageFieldsMultiple.newPLotFilePaymentId,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFieldsMultiple.spType,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFieldsMultiple.userId,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFieldsMultiple.receiptDate,
      msg: 'select payment date',
      type: 'date',
      required: true,
    },
    {
      value: this.pageFieldsMultiple.bankId,
      msg: 'select bank',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFieldsMultiple.json,
      msg: 'import File',
      type: 'textbox',
      required: true,
    },
  ];

  error: any;
  selectedFile: File | undefined;

  plotList:any = [];
  bankList:any = [];
  accountHeadList:any = [];
  memberList:any = [];
  tempList: any = [];

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('plot File Payment');

    this.formFieldsSingle[2].value = this.globalService.getUserId().toString();
    this.formFieldsMultiple[2].value = this.globalService.getUserId().toString();
    this.formFieldsSingle[16].value = '1';

    this.getPlotFile();
    this.getAllBank();
    this.getChartofAccount();
  }

  getPlotFile() {
    this.dataService.getHttp('society-api/PlotFile/getPlotFile', '').subscribe(
      (response: any) => {
        this.plotList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getAllBank() {
    this.dataService.getHttp('society-api/PlotFilePayment/getAllBank', '').subscribe(
      (response: any) => {
        this.bankList = response;
        // console.log(response)
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  
  getChartofAccount() {
    this.dataService.getHttp('society-api/PlotFilePayment/getChartofAccount', '').subscribe(
      (response: any) => {
        this.accountHeadList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  
  membershipChange(item: any){
    this.dataService.getHttp('society-api/PlotFilePayment/getPlotFilePaymentSummary?plotFileID=' + item, '').subscribe(
      (response: any) => {
        this.memPaymentTable.tableData = response;
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );

    this.dataService.getHttp('society-api/InPerson/getActiveMemberPlotFile?plotID=' + item, '').subscribe(
      (response: any) => {
        this.memberList = response;
        // console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );

    var obj = this.plotList.filter(
      (x: { plotFileId: any }) => x.plotFileId == parseInt(item)
    );

    if(obj.length > 0){
      this.lblCategory = obj[0].plotCategoryTitle;
      this.lblNature = obj[0].plotNatureTitle;
      this.lblType = obj[0].plotTypeTitle;
    }

  }

  memberChange(item: any){
    var obj = this.memberList.filter(
      (x: { memberProfileId: any }) => x.memberProfileId == parseInt(item)
    );

    if(obj.length > 0){
      this.formFieldsSingle[13].value = obj[0].memberName;
      this.formFieldsSingle[14].value = obj[0].memberCNIC;
      this.formFieldsSingle[15].value = obj[0].mobileNo1;
    }
  }

  bankChange(item: any){
    var obj = this.bankList.filter(
      (x: { bankId: any }) => x.bankId == parseInt(item)
    );

    if(obj.length > 0){
      this.formFieldsSingle[11].value = obj[0].branchCode;
      this.formFieldsSingle[12].value = obj[0].nameofBank;
    }
  }

  saveplotFilePayment(val: any) {
    var pageField;
    var formFields: MyFormField[] = [];

    if(val == 1){
      this.resetImport()
      pageField = this.pageFieldsSingle;
      formFields = this.formFieldsSingle;
    }else if(val == 2){
      this.reset();
      pageField = this.pageFieldsMultiple;
      formFields = this.formFieldsMultiple;
      if(this.tempList.length > 0){
        if(this.formFieldsMultiple[4].value != ''){
          var tempJsonList: any = [];
          for(var i = 0; i <  this.tempList.length; i++){
            tempJsonList.push({
                "plotFileId": this.tempList[i]['plotFileId'],
                "coaId": this.tempList[i]['coaId'],
                "MemberCNIC":this.tempList[i]['MemberCNIC'],
                "MemberName":this.tempList[i]['MemberName'],
                "PhoneNo1":this.tempList[i]['PhoneNo1'],
                "receiptDate":this.tempList[i]['receiptDate'],
                "Amount":this.tempList[i]['Amount'],
                "bankId":this.formFieldsMultiple[4].value,
                "TrnId":1,
                "ReferenceNO":this.tempList[i]['ReferenceNO'],
                "DepositSlipNo":this.tempList[i]['DepositSlipNo'],
                "CollectionBranchCode":this.tempList[i]['CollectionBranchCode'],
                "CollectionBranchName":this.tempList[i]['CollectionBranchName']                
            })
          }
          this.formFieldsMultiple[5].value = JSON.stringify(tempJsonList)
          this.formFieldsMultiple[1].value = 'Insert-Bulk'
        }
      }
    }

    this.dataService
      .savetHttp(
        pageField,
        formFields,
        'society-api/PlotFilePayment/savePlotFilePayment'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            if(this.formFieldsSingle[0].value > 0)
            {
              this.valid.apiInfoResponse('Record updated successfully');
            }else{
              this.valid.apiInfoResponse('Record added successfully');
            }
            this.reset();
            this.resetImport();
            this.paymentTable.getplotFilePayment();
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

  resetImport(){
    this.formFieldsMultiple = this.valid.resetFormFields(this.formFieldsMultiple);
    this.selectedFile = undefined;
    this.tempList = [];

    this.importTable.tableData = [];

    this.inputFileName.nativeElement.value = '';
  }

  reset() {
    this.formFieldsSingle = this.valid.resetFormFields(this.formFieldsSingle);

    this.formFieldsSingle[0].value = '0';

    this.lblCategory = '';
    this.lblNature = '';
    this.lblType = '';

    this.memberList = [];
  }

  onFileSelected(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if(target.files.length > 1){
      this.valid.apiErrorResponse('Cannot use Multiple Files');
      return;
    }
    if (event.target.files[0].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      let reader = new FileReader();

      reader.onload = (e) =>{
        
        const bstr = reader.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        const wsName: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsName];

        var data: any[][] = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
        var count = 0;
        
        var format = ['TxnDate', 'CollectionBranchCode', 
                      'CollectionBranchName', 'MemberName', 
                      'MembershipNo', 'MemberCNIC',
                      'ContactNumber', 'DepositSlipNo',
                      'Reference No', 'AccountHead',
                      'TotalAmount', 'AccountCode'];
            
        for(var i = 0; i < data.length; i++){
          if(i == 0){
            count = 0;
            if(data[i][0] == format[0] && 
              data[i][1] == format[1] &&
              data[i][2] == format[2] &&
              data[i][3] == format[3] &&
              data[i][4] == format[4] &&
              data[i][5] == format[5] &&
              data[i][6] == format[6] &&
              data[i][7] == format[7] &&
              data[i][8] == format[8] &&
              data[i][9] == format[9] &&
              data[i][10] == format[10] &&
              data[i][11] == format[11] ){
                count = 1;
              }
          }else {
            if(count == 0){
              this.tempList = [];
              this.selectedFile = undefined;
              this.inputFileName.nativeElement.value = '';
              this.valid.apiErrorResponse('File Format not Correct');return
            }else if(count == 1){
              var found = false;
              for( var j = 0; j < data[i].length; j++){
                if(data[i][j] == '' || data[i][j] == undefined || data[i][j] == null){
                  found = true;
                  this.valid.apiErrorResponse('data is missing in that file');
                  j = data[i].length + 1;
                  this.tempList = [];
                  this.selectedFile = undefined;
                  this.inputFileName.nativeElement.value = '';
                }  
              }
              if(found == false){
                this.tempList.push({
                  "accountTitle": data[i][9],
                  "plotFileId": data[i][4],
                  "coaId": data[i][11],
                  "MemberCNIC":data[i][5],
                  "MemberName":data[i][3],
                  "PhoneNo1":data[i][6],
                  "receiptDate": new Date(data[i][0]),
                  "Amount":data[i][10],
                  "bankId":'0',
                  "TrnId":1,
                  "ReferenceNO":data[i][8],
                  "DepositSlipNo":data[i][7],
                  "CollectionBranchCode":data[i][1],
                  "CollectionBranchName":data[i][2]                
                });
              }
            }
          }
        }

        this.importTable.tableData = this.tempList;
      };

      reader.readAsBinaryString(target.files[0]);

    } else {
      this.valid.apiErrorResponse('Please Select EXCEL File');

      this.selectedFile = undefined;
    }
  }

  edit(item: any){

    this.tabIndex = 0;

    this.formFieldsSingle[0].value = item.plotFilePaymentId;
    this.formFieldsSingle[3].value = item.plotFileId;
    this.membershipChange(item.plotFileId);

    this.formFieldsSingle[5].value = new Date(item.receiptDate);
    this.formFieldsSingle[6].value = item.bankId; 
    this.formFieldsSingle[7].value = item.depositSlipNo;
    this.formFieldsSingle[8].value = item.referenceNO;
    this.formFieldsSingle[9].value = item.coaId;
    this.formFieldsSingle[10].value = item.amount;
    this.formFieldsSingle[11].value = item.collectionBranchCode;
    this.formFieldsSingle[12].value = item.collectionBranchName;
    this.formFieldsSingle[13].value = item.memberName;
    this.formFieldsSingle[14].value = item.memberCNIC;
    this.formFieldsSingle[15].value = item.phoneNo1;
    this.formFieldsSingle[4].value = item.memberProfileId;
    
  }

  changeTabHeader(tabNum: any) {
    this.tabIndex = tabNum;
  }
}
