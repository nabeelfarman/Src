import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, OwnershipFileInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { FileOwnershipTableComponent } from './file-ownership-table/file-ownership-table.component';
import { OwnershipFilePrintComponent } from './ownership-file-print/ownership-file-print.component';

@Component({
  selector: 'society-file-ownership',
  templateUrl: './file-ownership.component.html',
  styleUrls: ['./file-ownership.component.scss'],
})
export class FileOwnershipComponent implements OnInit, AfterViewInit {
  @ViewChild(FileOwnershipTableComponent) ownerTable: any;
  @ViewChild(OwnershipFilePrintComponent) ownerPrint: any;

  // @ViewChildren('myInput') myInput!: QueryList<ElementRef>;
  @ViewChild('myInput', { static: false }) nameField!: ElementRef;

  dtpAllotmentDate: any = '';
  cmbInstallment: any = '';
  txtAmount: any = 0;
  dtpDueDate: any = '';
  searchFileName: string = '';
  searchPartyName: string = '';
  searchPaymentPlanName: string = '';
  lblTotal: any = 0;

  pageFields: OwnershipFileInterface = {
    FileID: '0', //0
    spType: '', //1
    UserID: '', //2
    PartyID: '', //3
    AllotmentDate: '', //4
    FosDescription: '', //5
    ReferredBy: '', //6
    PlotBookingTypeID: '', //7
    PaymentPlanID: '0', //8
    PaymentPlanDetail: '', //9
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.FileID,
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
      value: this.pageFields.PartyID,
      msg: 'select party',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.AllotmentDate,
      msg: 'select allotment date',
      type: 'date',
      required: true,
    },
    {
      value: this.pageFields.FosDescription,
      msg: 'enter description',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.ReferredBy,
      msg: 'select referred by',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.PlotBookingTypeID,
      msg: 'select booking type',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.PaymentPlanID,
      msg: 'select payment plan',
      type: 'selectbox',
      required: false,
    },
    {
      value: this.pageFields.PaymentPlanDetail,
      msg: 'enter payment plan detail with date',
      type: 'textBox',
      required: true,
    },
  ];

  installmentList: any = [];
  fileList: any = [];
  partyList: any = [];
  referredList: any = [];
  paymentList: any = [];
  bookingList: any = [];
  paymentDetailList: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
    public datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Ownership File');

    this.formFields[2].value = this.globalService.getUserId().toString();

    this.dtpAllotmentDate = new Date();
    this.getOwnershipDetail();
    this.getPlotBookingType();
    this.getFile();
    this.getParty();
    this.getPayment();
    this.getInstallmentType();
    this.getAdvertisementCompany();

    //$("#autoFocus").focus();
  }

  ngAfterViewInit() {
    // this.nameField.focused = true;
    // const inputEl = this.myInput.first;
    // console.log(inputEl);
    // if (inputEl) {
    //   setTimeout(() => inputEl.nativeElement.focus(), 500);
    // }
  }

  onLoad() {
    this.getOwnershipDetail();
    this.getPlotBookingType();
    this.getFile();
    this.getParty();
    this.getPayment();
    this.getInstallmentType();
    this.getAdvertisementCompany();
  }

  getPlotBookingType() {
    this.dataService.getHttp('core-api/getPlotBookingType', '').subscribe(
      (response: any) => {
        this.bookingList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getFile() {
    this.dataService.getHttp('core-api/getunsoldfile', '').subscribe(
      (response: any) => {
        this.fileList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getOwnershipDetail() {
    this.dataService.getHttp('core-api/getfileownerdetail', '').subscribe(
      (response: any) => {
        this.ownerTable.tableData = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getInstallmentType() {
    this.dataService.getHttp('core-api/getinstallmenttype', '').subscribe(
      (response: any) => {
        this.installmentList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getParty() {
    this.dataService.getHttp('core-api/getparty', '').subscribe(
      (response: any) => {
        this.partyList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getPayment() {
    this.dataService.getHttp('core-api/getpaymentplan', '').subscribe(
      (response: any) => {
        this.paymentList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getAdvertisementCompany() {
    this.dataService.getHttp('core-api/getadvertisementcompany', '').subscribe(
      (response: any) => {
        this.referredList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getPaymentDetail(item: any) {
    this.paymentDetailList = [];
    if (item > 0) {
      this.dataService
        .getHttp('core-api/getpaymentplandetail?paymentplanid=' + item, '')
        .subscribe(
          (response: any) => {
            this.paymentDetailList = [];
            this.lblTotal = 0;

            for (let i = 0; response.length; i++) {
              this.paymentDetailList.push({
                installmentTypeID: response[i].installmentTypeID,
                installmentTypeName: response[i].installmentTypeName,
                amount: response[i].amount,
                dueDate: '',
              });

              this.lblTotal += response[i].amount; //this.paymentDetailList[i].amount;
            }
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  onBookingChange(item: any) {
    if (item < 4) {
      this.cmbInstallment = item;
      this.formFields[8].value = '0';
      this.paymentDetailList = [];
    } else {
      this.cmbInstallment = '';
    }
  }

  save() {
    this.formFields[4].value = this.datePipe.transform(
      this.dtpAllotmentDate,
      'yyyy-MM-dd'
    );
    if (this.paymentDetailList.length > 0) {
      for (var i = 0; i < this.paymentDetailList.length; i++) {
        if (this.paymentDetailList[i].dueDate == '') {
          this.valid.apiErrorResponse('enter plan detail date');
          return;
        }
      }
      this.formFields[9].value = JSON.stringify(this.paymentDetailList);
    }

    this.dataService
      .savetHttp(this.pageFields, this.formFields, 'core-api/InsertOwnerShip')
      .subscribe(
        (response: any) => {
          if (response.msg == 'Data Saved Successfully') {
            this.valid.apiInfoResponse('Record saved successfully');
            this.getFile();
            this.getOwnershipDetail();
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
    this.formFields[5].value = '';
    this.formFields[8].value = '0';
    this.paymentDetailList = [];
    this.cmbInstallment = '';
    this.txtAmount = 0;
  }

  swapList() {
    this.paymentDetailList.reverse();
  }

  addPaymentPlan() {
    if (this.cmbInstallment == '') {
      this.valid.apiErrorResponse('select installment type');
      return;
    } else if (
      this.txtAmount == '0' ||
      this.txtAmount == '' ||
      this.txtAmount == null
    ) {
      this.valid.apiErrorResponse('enter amount');
      return;
    } else if (
      this.dtpDueDate == '' ||
      this.dtpDueDate == '' ||
      this.dtpDueDate == null
    ) {
      this.valid.apiErrorResponse('select due date');
      return;
    } else {
      let data = this.installmentList.filter(
        (x: { installmentTypeID: any }) =>
          x.installmentTypeID == this.cmbInstallment
      );
      let installmentName = data[0].installmentTypeName;

      if (this.paymentDetailList.length == 0) {
        this.paymentDetailList.push({
          installmentTypeID: this.cmbInstallment,
          installmentTypeName: installmentName,
          amount: this.txtAmount,
          dueDate: this.datePipe.transform(this.dtpDueDate, 'yyyy-MM-dd'),
        });
      } else {
        var found = false;
        for (var i = 0; i < this.paymentDetailList.length; i++) {
          if (
            this.datePipe.transform(
              this.paymentDetailList[i].dueDate,
              'yyyy-MM-dd'
            ) >= this.datePipe.transform(this.dtpDueDate, 'yyyy-MM-dd')
          ) {
            this.valid.apiInfoResponse('date is not correct');
            return;
          }
          if (
            this.paymentDetailList[i].installmentTypeID == this.cmbInstallment
          ) {
            found = true;
            i = this.paymentDetailList.length + 1;
          }
        }
        if (found == false) {
          this.paymentDetailList.push({
            installmentTypeID: this.cmbInstallment,
            installmentTypeName: installmentName,
            amount: this.txtAmount,
            dueDate: this.dtpDueDate,
          });
        } else {
          this.valid.apiErrorResponse('installemnt already added');
          return;
        }
      }
      if (this.paymentDetailList.length > 0) {
        this.lblTotal = 0;
        for (var i = 0; i < this.paymentDetailList.length; i++) {
          this.lblTotal += this.paymentDetailList[i].amount;
        }
      }
    }
  }

  remove(index: any) {
    this.paymentDetailList.splice(index, 1);
    if (this.paymentDetailList.length > 0) {
      this.lblTotal = 0;
      for (let i = 0; i < this.paymentDetailList.length; i++) {
        this.lblTotal += this.paymentDetailList[i].amount;
      }
    }
  }

  printData(item: any) {
    // console.log(item);return;
    this.ownerPrint.tableData = item.response;
    setTimeout(() => this.globalService.printData('#print-summary'), 200);
  }
}
