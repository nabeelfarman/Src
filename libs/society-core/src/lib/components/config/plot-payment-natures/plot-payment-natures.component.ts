import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, PlotPaymentInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { PlotPaymentNaturesTableComponent } from './plot-payment-natures-table/plot-payment-natures-table.component';

@Component({
  selector: 'society-plot-payment-natures',
  templateUrl: './plot-payment-natures.component.html',
  styleUrls: ['./plot-payment-natures.component.scss'],
})
export class PlotPaymentNaturesComponent implements OnInit {
  
  @ViewChild(PlotPaymentNaturesTableComponent) plotPaymentTable: any;

  pageFields: PlotPaymentInterface = {
    NewpaymentnatureId: '0',
    spType: '',
    userId: '',
    PaymentnatureTitle: '',
    description: '',
    coaID: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.NewpaymentnatureId,
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
      value: this.pageFields.PaymentnatureTitle,
      msg: 'enter plot payment nature',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.description,
      msg: 'enter description',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.coaID,
      msg: 'enter Account Title',
      type: '',
      required: false,
    },
  ];

  accountHeadList: any = [];
  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Plot Payment Natures');
    this.formFields[2].value = this.globalService.getUserId().toString();

    this.getChartofAccount();
  }
      
  getChartofAccount(){
    this.dataService.getHttp('society-api/PlotFilePayment/getChartofAccount', '').subscribe(
      (response: any) => {
        this.accountHeadList = response;
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  savePlotPayment() {

    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'society-api/PlotPayment/savePlotPayment'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            if(this.formFields[0].value > 0)
            {
              this.valid.apiInfoResponse('Payment Nature updated successfully');
            }else{
              this.valid.apiInfoResponse('Payment Nature added successfully');
            }
            this.plotPaymentTable.getPlotPayment();
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

  reset() {
    this.formFields = this.valid.resetFormFields(this.formFields);
    this.formFields[4].value = '';
    this.formFields[5].value = '';
  }
    
  edit(item: any, obj: any) {
    this.formFields[3].value = item.item.paymentNatureTitle;
    this.formFields[4].value = item.item.description;
    this.formFields[5].value = item.item.coaID;
    this.formFields[0].value = item.item.paymentNatureId;
    
    if(obj.num == '2')
    {
      this.dataService
      .deleteHttp(
        this.pageFields,
        this.formFields,
        'society-api/PlotPayment/savePlotPayment'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            this.valid.apiInfoResponse('Record deleted successfully');
            this.plotPaymentTable.getPlotPayment();
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

}
