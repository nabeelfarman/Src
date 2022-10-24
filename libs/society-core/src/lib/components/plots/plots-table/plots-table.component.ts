import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, PlotsForListInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-plots-table',
  templateUrl: './plots-table.component.html',
  styleUrls: ['./plots-table.component.scss']
})
export class PlotsTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  error: any;
  tableData: any =[];
  
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) { }

  ngOnInit(): void {
    this.getPlots()
  }
  
  getPlots(){
    this.dataService.getHttp('core-api/getPlot', '').subscribe((response: any) => {
      this.tableData = response;
      console.log(response)
    }, (error: any) => {
      console.log(error);
    });
  }
  
  edit(item: any){
    this.eventEmitter.emit(item);
  }

  delete(item: any){
    var pageFields = {
      plotID: '0',
      spType: '',
      UserID:''
    };

    var formFields: MyFormField[] = [
      {
        value: pageFields.plotID,
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
    
    formFields[0].value = item.plotID;
    formFields[1].value = "delete";
    formFields[2].value = this.globalService.getUserId().toString();

    this.dataService
      .deleteHttp(
        pageFields,
        formFields,
        'core-api/deleteplot'
      )
      .subscribe(
        (response: any) => {
          if(response.msg == "Data Deleted Successfully"){
            this.valid.apiInfoResponse('Record deleted successfully');
            this.getPlots();
            // this.eventEmitterDelete.emit(item);
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
