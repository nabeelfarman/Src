import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, SrcPaymentInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { SrcPaymentPlanTableComponent } from './src-payment-plan-table/src-payment-plan-table.component';

@Component({
  selector: 'society-src-payment-plan',
  templateUrl: './src-payment-plan.component.html',
  styleUrls: ['./src-payment-plan.component.scss']
})
export class SrcPaymentPlanComponent implements OnInit {

  @ViewChild(SrcPaymentPlanTableComponent) paymentTable: any;
  
  cmbInstallment: any = '';
  txtAmount: any = 0;

  pageFields: SrcPaymentInterface = {
    PaymentPlanID: '0',
    spType: '',
    UserID: '',
    PaymentPlanName: '',
    PaymentPlanDescription: '',
    DurationTypeID: '',
    PaymentPlanDetail: [],
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.PaymentPlanID,
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
      value: this.pageFields.PaymentPlanName,
      msg: 'enter payment plan name',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.PaymentPlanDescription,
      msg: 'enter party name',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.DurationTypeID,
      msg: 'select duration',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.PaymentPlanDetail,
      msg: 'select payment plan detail',
      type: 'textbox',
      required: true,
    }
  ];

  error: any;
  
  durationList:any = [];
  installmentList:any = [];
  paymentPlanTable: any = [];

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule

  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle("Payment Plan");

    this.formFields[2].value = this.globalService.getUserId().toString();
    this.getDurationType();
    this.getInstallmentType();
  }

  getDurationType(){
    this.dataService.getHttp('core-api/getdurationtype', '').subscribe(
      (response: any) => {
        this.durationList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getInstallmentType(){
    this.dataService.getHttp('core-api/getinstallmenttype', '').subscribe(
      (response: any) => {
        this.installmentList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  save(){
    if(this.paymentPlanTable.length > 0){
      this.formFields[6].value = JSON.stringify(this.paymentPlanTable);
    }

    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'core-api/insertpaymentplan'
      )
      .subscribe(
        (response: any) => {
          if (response.msg == "Data Saved Successfully") {
            this.valid.apiInfoResponse('Record saved successfully');
            this.paymentTable.getPaymentPlan();
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

  reset(){
    this.formFields = this.valid.resetFormFields(this.formFields);
    this.formFields[0].value = '0';
    this.formFields[4].value = '';
    this.paymentPlanTable.tableData = [];
    this.cmbInstallment = '';
    this.txtAmount = 0;
  }

  addPaymentPlan(){
    if(this.cmbInstallment == ''){
      this.valid.apiErrorResponse('select installment type');return;
    }else if(this.txtAmount == '0' || this.txtAmount == '' || this.txtAmount == null){
      this.valid.apiErrorResponse('enter amount');return;
    }else{

      var data = this.installmentList.filter((x: { installmentTypeID: any }) => x.installmentTypeID == this.cmbInstallment);
      var installmentName = data[0].installmentTypeName;

      if(this.paymentPlanTable.length == 0){
        this.paymentPlanTable.push({
          installmentTypeID: this.cmbInstallment,
          installmentTypeName: installmentName,
          amount: this.txtAmount,
        });
      }else{
        var found = false;
        for(var i = 0; i < this.paymentPlanTable.length; i++){
          if(this.paymentPlanTable[i].installmentTypeID == this.cmbInstallment){
            found = true;
            i = this.paymentPlanTable.length + 1;
          }
        }
        if(found == false){
          this.paymentPlanTable.push({
            installmentTypeID: this.cmbInstallment,
            installmentTypeName: installmentName,
            amount: this.txtAmount,
          });
        }else{
          this.valid.apiErrorResponse('installemnt already added');return;
        }
      }
    }
  }

  remove(index: any){
    this.paymentPlanTable.splice(index, 1);
  }
}

