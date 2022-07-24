import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, PaymentPlanInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { PaymentPlanDetailTableComponent } from './payment-plan-detail-table/payment-plan-detail-table.component';
import { PaymentPlanTableComponent } from './payment-plan-table/payment-plan-table.component';
import { from, of } from 'rxjs';
import { distinct } from 'rxjs/operators';
import { ContentObserver } from '@angular/cdk/observers';

interface PaymentPlots{
  plotTypeID: number,
  plotNatureID: number,
  plotCategoryID: number,
  paymentPlanID: number,
  plotSize: number,
  isDeleted: number,
  paymentPlanDate: string,
  paymentPlanDescription: string,
  paymentPlanTitle: string,
  plotCategoryTitle: string,
  plotNatureTitle: string,
  plotTypeTitle: string,
  unit: string,
}
@Component({
  selector: 'society-payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.scss'],
})
export class PaymentPlanComponent implements OnInit {
  
  @ViewChild(PaymentPlanDetailTableComponent) paymentPlanDetailTable: any; 
  @ViewChild(PaymentPlanTableComponent) paymentPlanTable: any;

  pageFields: PaymentPlanInterface = {
    newPaymentplanId: '0',
    spType: '',
    Userid: '',
    paymentPlanDate: '',
    plotCategoryId: '',
    plotNatureId: '',
    plotTypeId: '',
    paymentPlanTitle: '',
    paymentPlanDescription: '',
  };


  formFields: MyFormField[] = [
    {
      value: this.pageFields.newPaymentplanId,
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
      value: this.pageFields.Userid,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.paymentPlanDate,
      msg: 'select payment plan date',
      type: 'date',
      required: true,
    },
    {
      value: this.pageFields.plotCategoryId,
      msg: 'select plot category',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.plotNatureId,
      msg: 'select plot nature',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.plotTypeId,
      msg: 'select plot type',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.paymentPlanTitle,
      msg: 'enter payment plan title',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.paymentPlanDescription,
      msg: 'enter payment plan description',
      type: 'textBox',
      required: true,
    },
  ];

  tabIndex = 0;
  error: any;
  result: any;

  categoryList: any = [];
  natureList: any = [];
  typeList: any = [];
  logList: any = [];
  tableList: any = [];

  constructor(
    private global: SharedServicesGlobalDataModule,
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}
  
  ngOnInit(): void {
    this.global.setHeaderTitle('Payment Plan');
    this.formFields[2].value = this.global.getUserId().toString();

    this.getPlotCategory();
    this.getPlotNature();
    this.getPlotType();
    this.getPaymentPlans('', '', '');
  }

  getPaymentPlans(category:any, nature: any, type: any){
    this.dataService.getHttp('society-api/PaymentPlan/getPaymentPlans', '').subscribe((response: any) => {
      
      this.tableList = response;
      var tempList: PaymentPlots[] = [];
  
      tempList = response.reverse();
      
      var tempData: any = [];
      from(tempList).pipe(distinct((x)=> (x.plotCategoryID) || (x.plotNatureID) || (x.plotTypeID))).subscribe(
        data => tempData.push(data)
      );

      this.paymentPlanTable.tableData = tempData;

      if(category != '' && nature != '' && type != '')
      {
        this.logList = response.filter(
          (m: {plotCategoryID: any, plotNatureID: any, plotTypeID: any})=> 
          m.plotCategoryID == category && m.plotNatureID == nature && m.plotTypeID == type);
      }
    }, (error: any) => {
      console.log(error);
    });
  }

  getHistoryLog(category: any, nature: any, type: any){
    
    if(category != '' && nature != '' && type != '')
    {
      this.logList = this.tableList.filter(
        (m: {plotCategoryID: any, plotNatureID: any, plotTypeID: any})=> 
        m.plotCategoryID == category && m.plotNatureID == nature && m.plotTypeID == type);
    }
      
  }

  getPlotCategory(){
    this.dataService.getHttp('society-api/PlotCategory/getPlotCategory', '').subscribe((response: any) => {
      this.categoryList = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  getPlotNature(){
    this.dataService.getHttp('society-api/PlotNature/getPlotNature', '').subscribe((response: any) => {
      this.natureList = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  getPlotType(){
    this.dataService.getHttp('society-api/PlotType/getPlotType', '').subscribe((response: any) => {
      this.typeList = response;
    }, (error: any) => {
      console.log(error);
    });
  }
    
  save(){
    
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'society-api/PaymentPlan/savePaymentPlan'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            this.result = this.valid.splitResponse(response[0].toString());
            if(this.formFields[0].value > 0)
            {
              this.valid.apiSuccessResponse('Payment plan updated successfully');
            }else{
              this.valid.apiSuccessResponse('Payment plan added successfully');
            }
            this.getPaymentPlans(
              this.formFields[4].value, 
              this.formFields[5].value, 
              this.formFields[6].value);
            if(this.result != undefined || this.result != ""){
              this.paymentPlanDetailTable.getPaymentPlansDetail(this.result);
            }
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
    this.formFields = this.valid.resetFormFields(this.formFields);
    
    this.formFields[0].value = '0';
    this.paymentPlanDetailTable.reset();
    this.paymentPlanDetailTable.paymentID = '';
    this.paymentPlanDetailTable.tableData = [];
    this.tableList = [];
    this.logList = [];
  }

  edit(item: any, obj: any){
    
    this.formFields[0].value = item.item.paymentPlanID;
    this.formFields[3].value = new Date(item.item.paymentPlanDate);
    this.formFields[7].value = item.item.paymentPlanTitle;
    this.formFields[8].value = item.item.paymentPlanDescription;
    this.formFields[5].value = item.item.plotNatureID;
    this.formFields[6].value = item.item.plotTypeID;
    this.formFields[4].value = item.item.plotCategoryID;

    this.getHistoryLog(item.item.plotCategoryID, 
                        item.item.plotNatureID, 
                        item.item.plotTypeID);

    if(obj.num == '1')
    {
      this.tabIndex = 0;
      this.paymentPlanDetailTable.mode = false;
      this.paymentPlanDetailTable.getPaymentPlansDetail(item.item.paymentPlanID);
    } else{
      this.dataService
      .deleteHttp(
        this.pageFields,
        this.formFields,
        'society-api/PaymentPlan/savePaymentPlan'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            this.valid.apiInfoResponse('Record deleted successfully');
            this.getPaymentPlans(
              this.formFields[4].value, 
              this.formFields[5].value, 
              this.formFields[6].value
              );
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
  }

  editPlan(item: any){
    this.formFields[0].value = item.paymentPlanID;
    this.formFields[3].value = new Date(item.paymentPlanDate);
    this.formFields[7].value = item.paymentPlanTitle;
    this.formFields[8].value = item.paymentPlanDescription;
    this.formFields[5].value = item.plotNatureID;
    this.formFields[6].value = item.plotTypeID;
    this.formFields[4].value = item.plotCategoryID;

    this.paymentPlanDetailTable.getPaymentPlansDetail(item.paymentPlanID);
    this.paymentPlanDetailTable.mode = false;
  }
  
  changeTabHeader(tabNum: any) {
    this.tabIndex = tabNum;
  }
  
}
