import { Component, OnInit, ViewChild } from '@angular/core';
import { NG_ASYNC_VALIDATORS } from '@angular/forms';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, PlotsInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { PlotsTableComponent } from './plots-table/plots-table.component';

@Component({
  selector: 'society-plots',
  templateUrl: './plots.component.html',
  styleUrls: ['./plots.component.scss'],
})
export class PlotsComponent implements OnInit {
  
  @ViewChild(PlotsTableComponent) plotsTable: any;

  pageFields: PlotsInterface = {
    NewplotID: '0',
    spType: '',
    userId: '',
    plotCategoryId: '',
    plotTypeId: '',
    plotNatureId: '',
    streetNo: '',
    plotNo: '',
    block: '',
  };


  formFields: MyFormField[] = [
    {
      value: this.pageFields.NewplotID,
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
      value: this.pageFields.plotCategoryId,
      msg: 'select plot category',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.plotTypeId,
      msg: 'select plot type',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.plotNatureId,
      msg: 'select plot nature',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.streetNo,
      msg: 'enter street no',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.plotNo,
      msg: 'select block',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.block,
      msg: 'enter block',
      type: 'textBox',
      required: false,
    },
  ];

  plotCategoryList: any = [];
  plotTypeList: any = [];
  plotNatureList: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Plots');
    this.formFields[2].value = this.globalService.getUserId().toString();

    this.getPlotCategory();
    this.getPlotType();
    this.getPlotNature();
  }
    
  getPlotCategory(){
    this.dataService.getHttp('society-api/PlotCategory/getPlotCategory', '').subscribe((response: any) => {
      this.plotCategoryList = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  getPlotType(){
    this.dataService.getHttp('society-api/PlotType/getPlotType', '').subscribe((response: any) => {
      this.plotTypeList = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  getPlotNature(){
    this.dataService.getHttp('society-api/PlotNature/getPlotNature', '').subscribe((response: any) => {
      this.plotNatureList = response;
      console.log(response)
    }, (error: any) => {
      console.log(error);
    });
  }

  savePlots() {

    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'society-api/Plots/savePlots'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            if(this.formFields[0].value > 0)
            {
              this.valid.apiInfoResponse('Plot updated successfully');
            }else{
              this.valid.apiInfoResponse('Plot added successfully');
            }
            this.plotsTable.getPlots();
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
  }
    
  edit(item: any, obj: any) {

    this.formFields[3].value = item.item.plotCategoryId;
    this.formFields[4].value = item.item.plotTypeId;
    this.formFields[5].value = item.item.plotNatureId;
    this.formFields[0].value = item.item.plotId;
    
    if(obj.num == '2')
    {
      this.formFields[6].value = '';
      this.formFields[7].value = '';
      this.formFields[8].value = '';  
      
      this.dataService
      .deleteHttp(
        this.pageFields,
        this.formFields,
        'society-api/Plots/savePlots'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            this.valid.apiInfoResponse('Record deleted successfully');
            this.plotsTable.getPlots();
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
  }

}
