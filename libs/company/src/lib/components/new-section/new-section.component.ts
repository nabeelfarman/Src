import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, SectionInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { NewSectionTableComponent } from './new-section-table/new-section-table.component';

@Component({
  selector: 'society-new-section',
  templateUrl: './new-section.component.html',
  styleUrls: ['./new-section.component.scss']
})
export class NewSectionComponent implements OnInit {
  @ViewChild(NewSectionTableComponent) sectTable: any;

  pageFields: SectionInterface = {
    newsectionId: '0',
    spType: '',
    userId: '',
    departmentId: '',
    sectionTitle: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.newsectionId,
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
      value: this.pageFields.departmentId,
      msg: 'select department',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.sectionTitle,
      msg: 'enter section',
      type: 'textBox',
      required: true,
    },
  ];
  
  departmentList: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle("Section");
    this.formFields[2].value = this.globalService.getUserId().toString();

    this.getDepartment();
  }

  getDepartment(){
    this.dataService.getHttp('company-api/Department/getDepartment', '').subscribe(
      (response: any) => {
        this.departmentList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  save(){

    this.formFields;
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'company-api/Section/saveSection'
      )
      .subscribe(
        (response: any[]) => {
          if (response[0].includes('Success') == true) {
            if (this.formFields[0].value > 0) {
              this.valid.apiInfoResponse('Record updated successfully');
            } else {
              this.valid.apiInfoResponse('Record saved successfully');
            }
            this.sectTable.getSection();
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

  reset(){
    this.formFields = this.valid.resetFormFields(this.formFields);
    this.formFields[0].value = '0';

  }

  edit(item: any){

    this.formFields[0].value = item.sectionId;
    this.formFields[3].value = item.departmentId;
    this.formFields[4].value = item.sectionTitle;
  }
}
