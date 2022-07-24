import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { LandPlotInterface, MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { LandPlotingTableComponent } from './land-ploting-table/land-ploting-table.component';

@Component({
  selector: 'society-land-ploting',
  templateUrl: './land-ploting.component.html',
  styleUrls: ['./land-ploting.component.scss']
})
export class LandPlotingComponent implements OnInit {

  @ViewChild(LandPlotingTableComponent) landPlotTable: any;

  pageFields: LandPlotInterface = {
    newplotID: '0',
    spType: '',
    userId: '',
    plotCategoryId: '0',
    plotNatureId: '0',
    plotTypeId: '0',
    societyBlockId: '0',
    streetNo: '',
    plotNo: '',
    isAlloted: '',
    isPossession: '',
    isUnderconstruction: '',
    isStructured: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.newplotID,
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
      value: this.pageFields.plotNatureId,
      msg: 'select plot nature',
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
      value: this.pageFields.societyBlockId,
      msg: 'select society block',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.streetNo,
      msg: 'enter street no',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.plotNo,
      msg: 'enter plot no',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.isAlloted,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.isPossession,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.isUnderconstruction,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.isStructured,
      msg: '',
      type: '',
      required: false,
    },
  ];

  plotCategoryList: any = [];
  plotTypeList: any = [];
  plotNatureList: any = [];
  societyBlockList: any = [];
  
  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle("Land Plot");
    this.formFields[2].value = this.globalService.getUserId().toString();

    this.getPlotCategory();
    this.getPlotType();
    this.getPlotNature();
    this.getSocietyBlock()
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
    }, (error: any) => {
      console.log(error);
    });
  }

  getSocietyBlock(){
    this.dataService.getHttp('land-api/SocietyBlock/getSocietyBlock', '').subscribe((response: any) => {
      this.societyBlockList = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  save() {
    if(this.formFields[9].value == ''){
      this.formFields[9].value = 0;
    }else{
      this.formFields[9].value = 1;
    }
    if(this.formFields[10].value == ''){
      this.formFields[10].value = 0;
    }else{
      this.formFields[10].value = 1;
    }
    if(this.formFields[11].value == ''){
      this.formFields[11].value = 0;
    }else{
      this.formFields[11].value = 1;
    }
    if(this.formFields[12].value == ''){
      this.formFields[12].value = 0;
    }else{
      this.formFields[12].value = 1;
    }

    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'land-api/LandPlot/saveLandPlot'
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
            this.landPlotTable.getLandPlot();
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
    this.formFields[9].value = '';
    this.formFields[10].value = '';
    this.formFields[11].value = '';
    this.formFields[12].value = '';
  }

  edit(item: any){
    console.log(item)
    this.formFields[0].value = item.plotId;
    this.formFields[3].value = item.plotCategoryId;
    this.formFields[4].value = item.plotNatureId;
    this.formFields[5].value = item.plotTypeId;
    // this.formFields[6].value = item.description;
    this.formFields[7].value = item.streetNo;
    this.formFields[8].value = item.plotNo;
    this.formFields[9].value = item.isAlloted;
    this.formFields[10].value = item.isPossession;
    this.formFields[11].value = item.isUnderConstruction;
    this.formFields[12].value = item.isStructure;
  }

}
