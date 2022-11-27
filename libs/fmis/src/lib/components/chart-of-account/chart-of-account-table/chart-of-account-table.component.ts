import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-chart-of-account-table',
  templateUrl: './chart-of-account-table.component.html',
  styleUrls: ['./chart-of-account-table.component.scss']
})
export class ChartOfAccountTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  tableData: any = [];
  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) { }

  ngOnInit(): void {
    this.getChartOfAccount();
  }

  getChartOfAccount(){
    this.dataService.getHttp('core-api/getChartOfAccount', '').subscribe((response: any) => {
      this.tableData = response.reverse();
    }, (error: any) => {
      console.log(error);
    });
  }
  
  edit(item: any){
    this.eventEmitter.emit(item);
  }

  delete(item: any){
    var pageFields = {
      coaID: '0',
      spType: '',
      userID: '',
    };

    var formFields: MyFormField[] = [
      {
        value: pageFields.coaID,
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
        value: pageFields.userID,
        msg: '',
        type: 'hidden',
        required: false,
      },
    ];

    formFields[0].value = item.coaID;
    formFields[2].value = this.globalService.getUserId().toString();

    this.dataService
      .deleteHttp(
        pageFields,
        formFields,
        'core-api/deleteChartOfAccount'
      )
      .subscribe(
        (response: any) => {
          if(response.msg == "Data Deleted Successfully"){
            this.valid.apiInfoResponse('Record deleted successfully');
            this.getChartOfAccount();
          }else{
            this.valid.apiErrorResponse(response.msg);
          }
          
        },
        (error: any) => {
          this.error = error;
          this.valid.apiErrorResponse(this.error);
        }
      );
  }

}
