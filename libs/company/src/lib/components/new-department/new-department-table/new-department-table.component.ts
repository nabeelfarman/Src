import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-new-department-table',
  templateUrl: './new-department-table.component.html',
  styleUrls: ['./new-department-table.component.scss']
})
export class NewDepartmentTableComponent implements OnInit {
  @Output() eventEmitter = new EventEmitter();

  tblSearch: any = '';

  tableData: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.getDepartment();
  }

  getDepartment(){
    this.dataService.getHttp('company-api/Department/getDepartment', '').subscribe(
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
      newdepartmentId: '0',
      spType: '',
      userId: '',
    };

    var formFields: MyFormField[] = [
      {
        value: pageFields.newdepartmentId,
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

    formFields[0].value = item.departmentId;
    formFields[2].value = this.globalService.getUserId().toString();

    this.dataService
      .deleteHttp(
        pageFields,
        formFields,
        'company-api/Department/saveDepartment'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            this.valid.apiInfoResponse('Record deleted successfully');
            this.getDepartment();
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
