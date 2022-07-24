import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { DepartmentInterface, MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { DepartmentComponent } from '../department/department.component';
import { NewDepartmentTableComponent } from './new-department-table/new-department-table.component';

@Component({
  selector: 'society-new-department',
  templateUrl: './new-department.component.html',
  styleUrls: ['./new-department.component.scss']
})
export class NewDepartmentComponent implements OnInit {
  @ViewChild(NewDepartmentTableComponent) deptTable: any;

  pageFields: DepartmentInterface = {
    newdepartmentId: '0',
    spType: '',
    userId: '',
    departmentName: '',
    departmentDescription: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.newdepartmentId,
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
      value: this.pageFields.departmentName,
      msg: 'enter department name',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.departmentDescription,
      msg: 'enter department description',
      type: 'textBox',
      required: false,
    },
  ];
  
  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle("Department");
    this.formFields[2].value = this.globalService.getUserId().toString();

  }

  save() {

    this.formFields;
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'company-api/Department/saveDepartment'
      )
      .subscribe(
        (response: any[]) => {
          if (response[0].includes('Success') == true) {
            if (this.formFields[0].value > 0) {
              this.valid.apiInfoResponse('Record updated successfully');
            } else {
              this.valid.apiInfoResponse('Record saved successfully');
            }
            this.deptTable.getDepartment();
            this.reset();
          } else {
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
    this.formFields[0].value = '0';
    this.formFields[4].value = '';
  }

  edit(item: any){
    this.formFields[0].value = item.departmentId;
    this.formFields[3].value = item.departmentName;
    this.formFields[4].value = item.departmentDescription;
  }

}
