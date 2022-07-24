import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { CheckListInterface, MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { ChecklistTableComponent } from './checklist-table/checklist-table.component';

@Component({
  selector: 'society-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
})
export class ChecklistComponent implements OnInit {
  
  @ViewChild(ChecklistTableComponent) checkListTable: any;

  pageFields: CheckListInterface = {
    newCheckListId: '0',
    spType: '',
    userId: '',
    checkListType: '',
    checkListTitle: '',
    designationId: '0',
    isFileRequired: '',
    isExempted: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.newCheckListId,
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
      value: this.pageFields.checkListType,
      msg: 'select check list type',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.checkListTitle,
      msg: 'enter check list title',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.designationId,
      msg: 'select designation',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.isFileRequired,
      msg: 'select file required',
      type: 'radiobutton',
      required: true,
    },
    {
      value: this.pageFields.isExempted,
      msg: 'select isexempted',
      type: 'radiobutton',
      required: true,
    },
  ];

  designationList: any = [];
  checkListTypeList: any = [];
  
  error: any;

  constructor(    
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Check List');
    this.formFields[2].value = this.globalService.getUserId().toString();
  
    this.getDesignation()
    this.getCheckListType()
  }

  getDesignation(){
    this.dataService.getHttp('hr-api/Designation/getDesignation', '').subscribe((response: any) => {
      this.designationList = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  getCheckListType(){
    this.dataService.getHttp('society-api/CheckList/getCheckListType', '').subscribe((response: any) => {
      this.checkListTypeList = response;
    }, (error: any) => {
      console.log(error);
    });
  }
    
  saveCheckList() {
    
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'society-api/CheckList/saveCheckList'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            if(this.formFields[0].value > 0)
            {
              this.valid.apiInfoResponse('Record updated successfully');
            }else{
              this.valid.apiInfoResponse('Record added successfully');
            }
            this.reset();
            this.checkListTable.getCheckList();
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
    this.formFields[0].value = '0';
  }

  edit(item: any, obj: any) {
    this.formFields[3].value = item.item.checkListType;
    this.formFields[4].value = item.item.checkListTitle;
    this.formFields[5].value = item.item.designation_Id;
    this.formFields[6].value = item.item.isFileRequired.toString();
    this.formFields[7].value = item.item.isExempted.toString();
    this.formFields[0].value = item.item.checklistId;
    
    if(obj.num == '2')
    {

      this.dataService
      .deleteHttp(
        this.pageFields,
        this.formFields,
        'society-api/CheckList/saveCheckList'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            this.valid.apiInfoResponse('Record deleted successfully');
            this.checkListTable.getCheckList();
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
