import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import Swal from 'sweetalert2/dist/sweetalert2.js';
declare var $: any;

@Component({
  selector: 'society-voucher-supervision-table',
  templateUrl: './voucher-supervision-table.component.html',
  styleUrls: ['./voucher-supervision-table.component.scss'],
})
export class VoucherSupervisionTableComponent implements OnInit {
  tblSearch: any = '';

  rdbStatus: any = '';

  @Output() eventEmitter = new EventEmitter();
  public config: PerfectScrollbarConfigInterface = {};

  tableData: any = [];
  tempTableData: any = [];
  tableDetailData: any = [];
  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.rdbStatus = '2';
  }

  getVoucherDetail(item: any) {
    this.dataService
      .getHttp('core-api/GetSpecificVocherDetail?InvoiceNo=' + item, '')
      .subscribe(
        (response: any) => {
          this.tableDetailData = response;
          $('#voucherModal').modal('show');
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  onStatusChange(item: any) {
    this.tableData = this.tempTableData;
    if (item != '2') {
      var status: any;
      if (item == '1') {
        status = true;
      } else {
        status = false;
      }
      var data = this.tableData.filter(
        (x: { approvedStatus: any }) => x.approvedStatus == status
      );
      this.tableData = data;
    }
  }

  approveVoucher(item: any) {
    Swal.fire({
      title: 'Do you want to approved voucher?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result: any) => {
      if (result.value) {
        var pageFields = {
          invoiceNo: '0',
          userID: '',
        };

        var formFields: MyFormField[] = [
          {
            value: pageFields.invoiceNo,
            msg: '',
            type: 'hidden',
            required: false,
          },
          {
            value: pageFields.userID,
            msg: '',
            type: 'hidden',
            required: false,
          },
        ];

        formFields[0].value = item.invoiceNo;
        formFields[1].value = this.globalService.getUserId().toString();

        this.dataService
          .receivedtHttp(pageFields, formFields, 'core-api/approveVoucher')
          .subscribe(
            (response: any) => {
              console.log(response.msg);
              if (response.msg == 'Voucher Supervise Successfully') {
                this.valid.apiInfoResponse('Voucher Supervise Successfully');
                this.eventEmitter.emit();
              } else {
                this.valid.apiErrorResponse(response.msg);
              }
            },
            (error: any) => {
              this.error = error;
              this.valid.apiErrorResponse(this.error);
            }
          );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', '', 'error');
      }
    });
  }
}
