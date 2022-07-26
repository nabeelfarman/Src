import { Component, OnInit } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import Swal from "sweetalert2/dist/sweetalert2.js";
declare var $: any;

@Component({
  selector: 'society-src-payment-plan-table',
  templateUrl: './src-payment-plan-table.component.html',
  styleUrls: ['./src-payment-plan-table.component.scss']
})
export class SrcPaymentPlanTableComponent implements OnInit {

  tblSearch: any = '';
  tableData: any = [];
  paymentPlanDetailList: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.getPaymentPlan();
  }

  getPaymentPlan() {
    this.dataService.getHttp('core-api/getpaymentplan', '').subscribe(
      (response: any) => {
        this.tableData = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getPaymentDetail(item: any){
    
    this.paymentPlanDetailList = [];
    this.dataService.getHttp('core-api/GetPaymentPlanDetail?PaymentPlanID=' + item.paymentPlanID, '').subscribe(
      (response: any) => {
        this.paymentPlanDetailList = response;
        $('#paymentDetailModal').modal('show');
      },
      (error: any) => {
        console.log(error);
      }
    );
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
          PaymentPlanID: '0',
          spType: '',
          UserID:''
        };

        var formFields: MyFormField[] = [
          {
            value: pageFields.PaymentPlanID,
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
          },
        ];
        
        formFields[0].value = item.paymentPlanID;
        formFields[1].value = "delete";
        formFields[2].value = this.globalService.getUserId().toString();

        this.dataService
          .deleteHttp(
            pageFields,
            formFields,
            'core-api/deletepaymentplan'
          )
          .subscribe(
            (response: any) => {
              if(response.msg == "Data Deleted Successfully"){
                this.valid.apiInfoResponse('Record deleted successfully');
                this.getPaymentPlan();
              }else{
                this.valid.apiErrorResponse(response.msg);
              }
              
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
}
