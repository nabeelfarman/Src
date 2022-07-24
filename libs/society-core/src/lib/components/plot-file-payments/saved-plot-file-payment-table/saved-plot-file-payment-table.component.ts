import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-saved-plot-file-payment-table',
  templateUrl: './saved-plot-file-payment-table.component.html',
  styleUrls: ['./saved-plot-file-payment-table.component.scss']
})
export class SavedPlotFilePaymentTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  tblSearch: string = '';
  tableData: any = [];
  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
  ) { }

  ngOnInit(): void {
    this.getplotFilePayment();
  }

  getplotFilePayment() {
    this.dataService.getHttp('society-api/PlotFilePayment/getplotFilePayment', '').subscribe(
      (response: any) => {
        this.tableData = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
    
  edit(item: any){
    this.eventEmitter.emit(item);
  }

  delete(item: any){
    var pageFields = {
      newPLotFilePaymentId: '0',
      spType: '',
      userId: '',
    };
    var formFields: MyFormField[] = [
      {
        value: pageFields.newPLotFilePaymentId,
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
        value: pageFields.userId,
        msg: '',
        type: 'hidden',
        required: false,
      },
    ];

    formFields[0].value = item.plotFilePaymentId;
    formFields[2].value = this.globalService.getUserId().toString();

    this.dataService
      .deleteHttp(
        pageFields,
        formFields,
        'society-api/PlotFilePayment/savePlotFilePayment'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            this.valid.apiInfoResponse('Record deleted successfully');
            this.getplotFilePayment();
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
