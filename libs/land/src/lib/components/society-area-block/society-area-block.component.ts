import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, SocietyBLockInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { SocietyAreaBlockTableComponent } from './society-area-block-table/society-area-block-table.component';

@Component({
  selector: 'society-society-area-block',
  templateUrl: './society-area-block.component.html',
  styleUrls: ['./society-area-block.component.scss']
})
export class SocietyAreaBlockComponent implements OnInit {

  @ViewChild(SocietyAreaBlockTableComponent) societyBlockTable: any;

  pageFields: SocietyBLockInterface = {
    newSocietyBlockId: '0',
    spType: '',
    userId: '',
    block: '',
    description: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.newSocietyBlockId,
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
      value: this.pageFields.block,
      msg: 'enter block',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.description,
      msg: '',
      type: '',
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
    this.globalService.setHeaderTitle("Society Block");
    this.formFields[2].value = this.globalService.getUserId().toString();

  }

  save() {
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'land-api/SocietyBlock/saveSocietyBlock'
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
            this.societyBlockTable.getSocietyBlock();
            this.reset();
          }else{
            this.valid.apiErrorResponse(response.toString());
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
    this.formFields[0].value = item.societyBlockID;
    this.formFields[3].value = item.block;
    this.formFields[4].value = item.description;
  }

}
