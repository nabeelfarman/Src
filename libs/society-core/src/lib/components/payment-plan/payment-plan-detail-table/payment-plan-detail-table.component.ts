import { Component, OnInit } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, PaymentPlanDetailInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-payment-plan-detail-table',
  templateUrl: './payment-plan-detail-table.component.html',
  styleUrls: ['./payment-plan-detail-table.component.scss'],
})
export class PaymentPlanDetailTableComponent implements OnInit {

  tableData: any = [];

  pageFields: PaymentPlanDetailInterface = {
    newPaymentplanDetailID: '0',
    spType: '',
    userId: '',
    paymentPlanId: '',
    paymentNatureId: '',
    installmentId: '',
    amount: '',
    duedate: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.newPaymentplanDetailID,
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
      value: this.pageFields.paymentPlanId,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.paymentNatureId,
      msg: 'select payment nature',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.installmentId,
      msg: 'select intallment',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.amount,
      msg: 'enter amount',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.duedate,
      msg: 'select date',
      type: 'date',
      required: true,
    },
  ];

  natureList:any = [];
  installmentList:any = [];

  paymentID = '';
  mode = false;
  index = 0;
  error: any;
  
  constructor(
    private global: SharedServicesGlobalDataModule,
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.formFields[2].value = this.global.getUserId().toString();
    
    this.getPaymentNature()
    this.getInstallment()
  }

  getPaymentNature(){
    this.dataService.getHttp('society-api/PaymentPlan/getPaymentNatures', '').subscribe((response: any) => {
      this.natureList = response;
    }, (error: any) => {
      console.log(error);
    });
  }
    
  getInstallment(){
    this.dataService.getHttp('society-api/PaymentPlan/getInstallmentsHeader', '').subscribe((response: any) => {
      this.installmentList = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  getPaymentPlansDetail(item: any){
    this.paymentID = item;

    this.dataService.getHttp('society-api/PaymentPlan/getPaymentPlanDetail?paymentPlanID=' + item, '').subscribe((response: any) => {
      this.tableData = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  edit(item: any) {
    for( var i = 0; i < this.tableData.length; i++)
      this.tableData[i].editMode = false;

    this.mode = true;

    item.editMode = true;
    
  }

  setPaymentDetailFormFields(item: any){

    this.formFields[0].value = item.paymentPlanDetailId.toString();
    this.formFields[4].value = item.paymentNatureID.toString();
    this.formFields[5].value = item.installmentID.toString();
    this.formFields[6].value = item.amount;
    this.formFields[7].value = item.dueDate.toString();

    this.save();
  }

  save(){

    if(this.tableData.length > 0){
      var val = this.tableData.length - 1;
      if(this.formFields[7].value < new Date(this.tableData[val].dueDate))
      {
        this.valid.apiErrorResponse('invalid date');return;
      }
    }
    
    this.formFields[3].value = this.paymentID;
    
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'society-api/PaymentPlan/savePaymentPlanDetail'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            if(this.formFields[0].value > 0)
            {
              this.valid.apiSuccessResponse('Payment plan detail updated successfully');
              this.mode = false;

            }else{
              this.valid.apiSuccessResponse('Payment plan detail added successfully');
            }
            this.paymentID = this.formFields[3].value;
            this.getPaymentPlansDetail(this.paymentID);
            this.reset();
          }else{
            this.valid.apiErrorResponse(response[0]);
          }
        },
        (error: any) => {
          this.error = error;
          this.valid.apiErrorResponse(this.error);
        }
      );
  }

  delete(item: any){
    
    this.formFields[3].value = this.paymentID;
    
    this.formFields[0].value = item.paymentPlanDetailId.toString();
    this.formFields[4].value = item.paymentNatureID.toString();
    this.formFields[5].value = item.installmentID.toString();
    this.formFields[6].value = item.amount;
    this.formFields[7].value = item.dueDate.toString();

    this.dataService
      .deleteHttp(
        this.pageFields,
        this.formFields,
        'society-api/PaymentPlan/savePaymentPlanDetail'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            this.valid.apiSuccessResponse('Record deleted successfully');
          
            this.paymentID = this.formFields[3].value;
            this.getPaymentPlansDetail(this.paymentID);
            this.reset();
          }else{
            this.valid.apiErrorResponse(response[0]);
          }
        },
        (error: any) => {
          this.error = error;
          this.valid.apiErrorResponse(this.error);
        }
      );
  }

  reset(){
    this.formFields[0].value = '0';
    this.formFields = this.valid.resetFormFields(this.formFields);
  }
}
