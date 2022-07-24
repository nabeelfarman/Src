import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, PlotCategoryInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { PlotCategoryTableComponent } from './plot-category-table/plot-category-table.component';

@Component({
  selector: 'society-plot-category',
  templateUrl: './plot-category.component.html',
  styleUrls: ['./plot-category.component.scss'],
})
export class PlotCategoryComponent implements OnInit {
  
  @ViewChild(PlotCategoryTableComponent) plotCategoryTable: any;

  pageFields: PlotCategoryInterface = {
    NewplotCategoryId: '0',
    // plotNatureId: 'NULL',
    spType: '',
    userId: '',
    plotCategoryTitle: '',
    PlotSize: '',
    Unit: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.NewplotCategoryId,
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
      value: this.pageFields.plotCategoryTitle,
      msg: 'enter plot category title',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.PlotSize,
      msg: 'enter plot category size',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.Unit,
      msg: 'enter plot category Unit',
      type: 'textbox',
      required: true,
    },
    // {
    //   value: this.pageFields.plotNatureId,
    //   msg: '',
    //   type: '',
    //   required: false,
    // },
  ];

  error: any;

  constructor(    
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Plot Categories');
    this.formFields[2].value = this.globalService.getUserId().toString();
  }
  
  savePlotCategory() {
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'society-api/PlotCategory/savePlotCategory'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            if(this.formFields[0].value > 0)
            {
              this.valid.apiInfoResponse('Plot category updated successfully');
            }else{
              this.valid.apiInfoResponse('Plot category added successfully');
            }
            this.plotCategoryTable.getPlotCategory();
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
    this.formFields[0].value = '0';
  }
    
  edit(item: any, obj: any) {
    this.formFields[3].value = item.item.plotCategoryTitle;
    this.formFields[4].value = item.item.plotSize;
    this.formFields[5].value = item.item.unit;
    this.formFields[0].value = item.item.plotCategoryId;
    
    if(obj.num == '2')
    {
      this.dataService
      .deleteHttp(
        this.pageFields,
        this.formFields,
        'society-api/PlotCategory/savePlotCategory'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            this.valid.apiInfoResponse('Record deleted successfully');
            this.plotCategoryTable.getPlotCategory();
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
