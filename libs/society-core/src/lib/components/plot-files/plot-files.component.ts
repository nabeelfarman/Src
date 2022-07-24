import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, PlotFileInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { PlotFilesTableComponent } from './plot-files-table/plot-files-table.component';

@Component({
  selector: 'society-plot-files',
  templateUrl: './plot-files.component.html',
  styleUrls: ['./plot-files.component.scss'],
})
export class PlotFilesComponent implements OnInit {

  @ViewChild(PlotFilesTableComponent) plotFileTable: any;

  pageFields: PlotFileInterface = {
    newPlotFileId: '0',
    spType: '',
    userId: '',
    fileNo: '',
    plotCategoryId: '',
    plotNatureId: '',
    plotTypeId: '',
    paymentPlanId: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.newPlotFileId,
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
      value: this.pageFields.fileNo,
      msg: 'enter membership no',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.plotCategoryId,
      msg: 'select plot category',
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
      value: this.pageFields.plotTypeId,
      msg: 'select plot type',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.paymentPlanId,
      msg: '',
      type: '',
      required: false,
    },
  ];

  categoryList: any = [];
  natureList: any = [];
  typeList: any = [];

  error: any;

  constructor(
    private global: SharedServicesGlobalDataModule,
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('plotFiles');

    this.formFields[2].value = this.global.getUserId().toString();
    this.formFields[7].value = '0';
    
    this.getPlotCategory();
    this.getPlotNature();
    this.getPlotType();
    
  }
  
  getPlotCategory(){
    this.dataService.getHttp('society-api/PlotCategory/getPlotCategory', '').subscribe((response: any) => {
      this.categoryList = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  getPlotNature(){
    this.dataService.getHttp('society-api/PlotNature/getPlotNature', '').subscribe((response: any) => {
      this.natureList = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  getPlotType(){
    this.dataService.getHttp('society-api/PlotType/getPlotType', '').subscribe((response: any) => {
      this.typeList = response;
    }, (error: any) => {
      console.log(error);
    });
  }
        
  save(){
    
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'society-api/PlotFile/savePlotFile'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            if(this.formFields[0].value > 0)
            {
              this.valid.apiSuccessResponse('Record updated successfully');
            }else{
              this.valid.apiSuccessResponse('Record added successfully');
            }
            this.plotFileTable.getPlotFile();
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

  reset(){
    this.formFields = this.valid.resetFormFields(this.formFields);
    
    this.formFields[0].value = '0';
  }

  edit(item: any, obj: any){
    
    this.formFields[0].value = item.item.plotFileId;
    this.formFields[3].value = item.item.fileNo;
    this.formFields[4].value = item.item.plotCategoryId;
    this.formFields[5].value = item.item.plotNatureId;
    this.formFields[6].value = item.item.plotTypeId;

    if(obj.num == '2')
    {
      this.dataService
      .deleteHttp(
        this.pageFields,
        this.formFields,
        'society-api/PlotFile/savePlotFile'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            this.valid.apiInfoResponse('Record deleted successfully');
            this.plotFileTable.getPlotFile();
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
