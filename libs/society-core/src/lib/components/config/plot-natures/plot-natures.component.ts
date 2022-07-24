import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, PlotNatureInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { PlotNaturesTableComponent } from './plot-natures-table/plot-natures-table.component';

@Component({
  selector: 'society-plot-natures',
  templateUrl: './plot-natures.component.html',
  styleUrls: ['./plot-natures.component.scss'],
})
export class PlotNaturesComponent implements OnInit {
  
  @ViewChild(PlotNaturesTableComponent) plotNatureTable: any;

  pageFields: PlotNatureInterface = {
    NewplotnatureId: '0',
    spType: '',
    userId: '',
    plotnatureTitle: '',
    description: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.NewplotnatureId,
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
      value: this.pageFields.plotnatureTitle,
      msg: 'enter plot title',
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
    this.globalService.setHeaderTitle('Plot Natures');
    this.formFields[2].value = this.globalService.getUserId().toString();
  }
  
  savePlotNature() {
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'society-api/PlotNature/savePlotNature'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            if(this.formFields[0].value > 0)
            {
              this.valid.apiInfoResponse('Plot nature updated successfully');
            }else{
              this.valid.apiInfoResponse('Plot nature added successfully');
            }
            this.plotNatureTable.getPlotNature();
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
    this.formFields[4].value = '';
  }
  
  edit(item: any, obj: any) {
    this.formFields[3].value = item.item.plotNatureTitle;
    this.formFields[4].value = item.item.description;
    this.formFields[0].value = item.item.plotNatureID;
    
    if(obj.num == '2')
    {
      this.dataService
      .deleteHttp(
        this.pageFields,
        this.formFields,
        'society-api/PlotNature/savePlotNature'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            this.valid.apiInfoResponse('Record deleted successfully');
            this.plotNatureTable.getPlotNature();
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
