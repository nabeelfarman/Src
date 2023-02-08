import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import Swal from "sweetalert2/dist/sweetalert2.js";

declare var $: any;

@Component({
  selector: 'society-saved-voucher-table',
  templateUrl: './saved-voucher-table.component.html',
  styleUrls: ['./saved-voucher-table.component.scss']
})
export class SavedVoucherTableComponent implements OnInit {

  @Output() eventEmitterDelete = new EventEmitter();
  @Output() eventEmitterPrint = new EventEmitter();

  tblSearch: any = '';

  public config: PerfectScrollbarConfigInterface = {};

  tableData: any = [];
  tableDetailData: any = [];
  error: any;

  constructor(
    private global: SharedServicesGlobalDataModule,
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}


  ngOnInit(): void {
    // this.getUnpaidTransaction();
  }

  getVoucherDetail(item: any){
    
    this.dataService.getHttp('core-api/GetSpecificVocherDetail?InvoiceNo=' + item, '').subscribe((response: any) => {
      this.tableDetailData = response;
      $('#voucherModal').modal('show');
    }, (error: any) => {
      console.log(error);
    });
  }
  
  delete(item: any){
    Swal.fire({
      title: "Do you want to delete record?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result: any) => {
      if (result.value) {
        var pageFields = {
          InvoiceNo: '0',
          spType: '',
          UserID: '',
        };

        var formFields: MyFormField[] = [
          {
            value: pageFields.InvoiceNo,
            msg: '',
            type: 'hidden',
            required: false,
          },
          {
            value: pageFields.spType,
            msg: '',
            type: 'hidden',
            required: false,
          },
          {
            value: pageFields.UserID,
            msg: '',
            type: 'hidden',
            required: false,
          }
        ];

        formFields[0].value = item.invoiceNo;
        formFields[1].value = "delete";
        formFields[2].value = this.global.getUserId().toString();

        this.dataService
          .deleteHttp(
            pageFields,
            formFields,
            'core-api/DeleteVoucher'
          )
          .subscribe(
            (response: any) => {
              if(response.msg == "Data Deleted Successfully"){
                this.valid.apiInfoResponse('Record deleted successfully');
              }else{
                this.valid.apiErrorResponse(response[0]);
              }
              this.eventEmitterDelete.emit();
            },
            (error: any) => {
              this.error = error;
              this.valid.apiErrorResponse(this.error);
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelled", "", "error");
        }
      });
  }

  printData(item: any){
    this.dataService.getHttp('core-api/GetSpecificVocherDetail?InvoiceNo=' + item.invoiceNo, '').subscribe((response: any) => {
      this.eventEmitterPrint.emit({item, response});
    }, (error: any) => {
      console.log(error);
    });
  }
}
