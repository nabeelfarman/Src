import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { InstallmentVoucherInterface, MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { InstallmentVoucherReportComponent } from './installment-voucher-report/installment-voucher-report.component';
import { InstallmentVoucherTableComponent } from './installment-voucher-table/installment-voucher-table.component';

@Component({
  selector: 'society-installment-voucher',
  templateUrl: './installment-voucher.component.html',
  styleUrls: ['./installment-voucher.component.scss']
})
export class InstallmentVoucherComponent implements OnInit {

  
  public config: PerfectScrollbarConfigInterface = {};

  lblInstallmentAmount: any = 0;
  lblPaidAmount: any = 0;

  @ViewChild(InstallmentVoucherTableComponent) installmentTable: any;
  @ViewChild(InstallmentVoucherReportComponent) installmentReport: any;

  pageFields: InstallmentVoucherInterface = {
    InvoiceDate: '',
    spType: '',
    UserID: '',
    BranchID: '',
    PartyID: '',
    FileID: '',
    InstallmentTypeID: '',
    BankID: '',
    InvoiceDescription: '',
    CoaID: '',
    Amount: '',
    BankReceiptNo: ''
  };


  formFields: MyFormField[] = [
    {
      value: this.pageFields.InvoiceDate,
      msg: 'select date',
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
      value: this.pageFields.UserID,
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
      value: this.pageFields.PartyID,
      msg: 'select party',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.FileID,
      msg: 'select party file',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.InstallmentTypeID,
      msg: 'select installment type',
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
      value: this.pageFields.InvoiceDescription,
      msg: 'enter invoice description',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.CoaID,
      msg: 'select type',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.Amount,
      msg: 'enter amount',
      type: 'number',
      required: true,
    },
    {
      value: this.pageFields.BankReceiptNo,
      msg: 'enter amount',
      type: 'number',
      required: false,
    },
  ];

  partyList: any = [];
  fileList: any = [];
  paymentPlanList: any = [];
  bankList: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Installment Voucher');
    this.formFields[2].value = this.globalService.getUserId().toString();
    this.formFields[9].value = '1';
    
    this.getParty();
    this.getBank();
  }

  // getInstallmentDetail(){
  //   this.dataService.getHttp('core-api/GetSavedInstallmentDetail', '').subscribe((response: any) => {
  //     this.bankList = response;
  //   }, (error: any) => {
  //     console.log(error);
  //   });
  // }

  getBank(){
    this.dataService.getHttp('core-api/getbank', '').subscribe((response: any) => {
      this.bankList = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  getParty(){
    this.dataService.getHttp('core-api/GetParty', '').subscribe((response: any) => {
      this.partyList = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  getPartyFile(item: any){
    this.fileList = [];
    this.paymentPlanList = [];
    this.lblInstallmentAmount = 0;
    this.lblPaidAmount = 0;
    this.formFields[5].value = "";
    this.formFields[6].value = "";

    this.dataService.getHttp('core-api/GetPartyFile?partyid=' + item, '').subscribe((response: any) => {
      this.fileList = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  getPaymentPlan(item: any){
    this.paymentPlanList = [];
    this.formFields[6].value = "";

    this.dataService.getHttp('core-api/GetFilePaymentPlan?fileid=' + item, '').subscribe((response: any) => {
      this.paymentPlanList = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  getRemainingAmount(partyID: any, fileID: any, paymentPlanID: any){
    if(partyID != '' && fileID != '' && paymentPlanID != ''){
      // alert(partyID)
      // alert(fileID)
      // alert(paymentPlanID)
      this.dataService.getHttp('core-api/GetInstallmentRemainingAmount?partyid=' + partyID + '&fileid=' + fileID + '&installmenttypeid=' + paymentPlanID, '').subscribe((response: any) => {
        //console.log(response);
        this.lblPaidAmount = response[0].amount;
        this.formFields[10].value = this.lblInstallmentAmount - response[0].amount;
      }, (error: any) => {
        console.log(error);
      });
    }
  }

  onPlanChange(item: any){
    this.lblInstallmentAmount = 0;
    var data = this.paymentPlanList.filter((x: {installmentTypeID: any}) => x.installmentTypeID == item);
    this.lblInstallmentAmount = data[0].amount;
  }

  save(printSection: string) {

    this.formFields[3].value = 1;
    if(this.formFields[9].value == 2){
      if(this.formFields[7].value == ''){
        this.valid.apiInfoResponse('select bank');
        return;
      }else if(this.formFields[11].value == ''){
        this.valid.apiInfoResponse('enter bank receipt no');
        return;
      }
    }else{
      this.formFields[7].value = '0';
    }
    if(this.formFields[10].value > (this.lblInstallmentAmount - this.lblPaidAmount)){
      this.valid.apiInfoResponse('enter valid amount');
      return;
    }
    this.dataService
    .savetHttp(
      this.pageFields,
      this.formFields,
      'core-api/InsertInstallmentInvoice'
    )
    .subscribe(
      (response: any) => {
        if (response.msg == "Data Saved Successfully") {
          this.valid.apiInfoResponse('Record saved successfully');
          // this.bankTable.getBankAccount();
          
          var nature = '';
          if(this.formFields[9].value == '1'){
            nature = 'Cash';
          }else if(this.formFields[9].value == '2'){
            nature = 'Bank';
            var bankData = this.bankList.filter((x: {bankID: any}) => x.bankID == this.formFields[7].value);
          }

          var fileData = this.fileList.filter((x: {fileID: any}) => x.fileID == this.formFields[5].value);
          var ownerData = this.partyList.filter((x: {partyID: any}) => x.partyID == this.formFields[4].value);
          var installmentData = this.paymentPlanList.filter((x: {installmentTypeID: any}) => x.installmentTypeID == this.formFields[6].value);



          this.installmentReport.lblInvoiceNo = response.invNo;
          this.installmentReport.lblInvoiceDate = this.formFields[0].value;
          this.installmentReport.lblFileName = fileData[0].fileName;
          this.installmentReport.lblOwnerName = ownerData[0].partyName;
          this.installmentReport.lblAmount = this.formFields[10].value;
          this.installmentReport.lblInstallmentType = installmentData[0].installmentTypeName;
          this.installmentReport.lblPaymentNature = nature;
          
          if(this.formFields[9].value == '2'){
            this.installmentReport.lblBankReceipt = this.formFields[11].value;
              this.installmentReport.lblBankName = bankData[0].bankName;

          }
        
          
          setTimeout(() => this.globalService.printData(printSection), 200);
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
    this.formFields[0].value = '';
    this.formFields[8].value = '';
    this.formFields[9].value = '1';
    this.lblInstallmentAmount = 0;
    this.lblPaidAmount = 0;
    this.fileList = [];
    this.paymentPlanList = [];
    this.formFields[11].value = "";
    this.formFields[7].value = ''

}
  
}
