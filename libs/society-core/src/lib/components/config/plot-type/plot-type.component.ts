import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, PlotTypeInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { PlotTypeTableComponent } from './plot-type-table/plot-type-table.component';

@Component({
  selector: 'society-plot-type',
  templateUrl: './plot-type.component.html',
  styleUrls: ['./plot-type.component.scss'],
})
export class PlotTypeComponent implements OnInit {
  
  @ViewChild(PlotTypeTableComponent) plotTypeTable: any;

  pageFields: PlotTypeInterface = {
    NewplotTypeId: '0',
    spType: '',
    userId: '',
    plotTypeTitle: '',
    plotTypeDescription: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.NewplotTypeId,
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
      value: this.pageFields.plotTypeTitle,
      msg: 'enter plot title',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.plotTypeDescription,
      msg: 'enter plot description',
      type: 'textbox',
      required: true,
    },
  ];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Plot Types');

    this.formFields[2].value = this.globalService.getUserId().toString();

  }
  
  savePlotType() {
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'society-api/PlotType/savePlotType'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            if(this.formFields[0].value > 0)
            {
              this.valid.apiInfoResponse('Plot type updated successfully');
            }else{
              this.valid.apiInfoResponse('Plot type added successfully');
            }
            this.plotTypeTable.getPlotType();
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
  }

  edit(item: any, obj: any) {
    this.formFields[3].value = item.item.plotTypeTitle;
    this.formFields[4].value = item.item.plotTypeDescription;
    this.formFields[0].value = item.item.plotTypeId;
    
    if(obj.num == '2')
    {
      this.dataService
      .deleteHttp(
        this.pageFields,
        this.formFields,
        'society-api/PlotType/savePlotType'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            this.valid.apiInfoResponse('Record deleted successfully');
            this.plotTypeTable.getPlotType();
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
