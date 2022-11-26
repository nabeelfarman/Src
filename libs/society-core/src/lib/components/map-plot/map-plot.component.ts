import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MapPlotInterface, MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { MapPlotTableComponent } from './map-plot-table/map-plot-table.component';

@Component({
  selector: 'society-map-plot',
  templateUrl: './map-plot.component.html',
  styleUrls: ['./map-plot.component.scss']
})
export class MapPlotComponent implements OnInit {

  @ViewChild(MapPlotTableComponent) mapPlotTable: any;

  pageFields: MapPlotInterface = {
    FileID: '0',
    spType: '',
    UserID: '',
    PlotID: '',
  };


  formFields: MyFormField[] = [
    {
      value: this.pageFields.FileID,
      msg: 'select file',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.spType,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.UserID,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.PlotID,
      msg: 'select plot',
      type: 'selectbox',
      required: true,
    }
  ];

  fileList: any = [];
  plotList: any = [];

  error: any;
  
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle("Map Plots");

    this.formFields[2].value = this.globalService.getUserId().toString();

    this.getFile();
    this.getPlot();
    this.getMapPlot();
  }

  getMapPlot(){
    this.dataService.getHttp('core-api/GetMappedPlot', '').subscribe((response: any) => {
      this.mapPlotTable.tableData = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  getFile() {
    this.dataService.getHttp('core-api/getfile', '').subscribe(
      (response: any) => {
        this.fileList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getPlot() {
    this.dataService.getHttp('core-api/getunmappedplot', '').subscribe(
      (response: any) => {
        this.plotList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  save(){
    
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'core-api/mapplot'
      )
      .subscribe(
        (response: any) => {
          if (response.msg == "Plot Mapped Successfully") {
            this.valid.apiInfoResponse('Record saved successfully');
            this.reset();
            this.getMapPlot();
          } else {
            this.valid.apiErrorResponse(response.msg);
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
}
