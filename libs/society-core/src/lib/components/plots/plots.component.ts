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
    plotID: '0',
    spType: '',
    userID: '',
    plotName: '',
    plotShortName: '',
    plotDescription: '',
    plotLongitude: '',
    plotLateitude: '',
    plotCategoryId: '',
    plotTypeId: '',
    plotNatureId: '',
    plotBlockID: '',
    plotSubBlockID: '',
    plotSize: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.plotID,
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
      value: this.pageFields.userID,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.plotName,
      msg: 'enter plot name',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.plotShortName,
      msg: 'enter plot short name',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.plotDescription,
      msg: 'enter description',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.plotLateitude,
      msg: 'enter latitude',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.plotLongitude,
      msg: 'enter longitude',
      type: 'textBox',
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
      value: this.pageFields.plotBlockID,
      msg: 'select block',
      type: 'slectBox',
      required: false,
    },
    {
      value: this.pageFields.plotSubBlockID,
      msg: 'select sub block',
      type: 'selectBox',
      required: false,
    },
    {
      value: this.pageFields.plotSize,
      msg: 'enter plot size',
      type: 'textBox',
      required: true,
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

  getPlotCategory() {
    this.dataService
      .getHttp('society-api/PlotCategory/getPlotCategory', '')
      .subscribe(
        (response: any) => {
          this.plotCategoryList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getPlotType() {
    this.dataService.getHttp('society-api/PlotType/getPlotType', '').subscribe(
      (response: any) => {
        this.plotTypeList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getPlotNature() {
    this.dataService
      .getHttp('society-api/PlotNature/getPlotNature', '')
      .subscribe(
        (response: any) => {
          this.plotNatureList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  savePlots() {
    this.formFields[11].value = '1';
    this.formFields[12].value = '1';

    if (this.formFields[13].value < 0) {
      this.valid.apiInfoResponse('enter correct size');
      return;
    }
    if (this.formFields[0].value > 0) {
      this.dataService
        .savetHttp(this.pageFields, this.formFields, 'core-api/updateplot')
        .subscribe(
          (response: any) => {
            if (response.msg == 'Data Updated Successfully') {
              this.valid.apiInfoResponse('Record updated successfully');
              this.plotsTable.getPlots();
              this.reset();
            } else {
              this.valid.apiErrorResponse(response.msg);
            }
          },
          (error: any) => {
            this.error = error;
            this.valid.apiErrorResponse(this.error);
          }
        );
    } else {
      this.dataService
        .savetHttp(this.pageFields, this.formFields, 'core-api/insertplot')
        .subscribe(
          (response: any) => {
            if (response.msg == 'Data Saved Successfully') {
              this.valid.apiInfoResponse('Record saved successfully');
              this.plotsTable.getPlots();
              this.reset();
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
  }

  reset() {
    this.formFields = this.valid.resetFormFields(this.formFields);
    this.formFields[0].value = '0';
  }

  edit(item: any) {
    console.log(item);
    this.formFields[0].value = item.plotID;
    this.formFields[3].value = item.plotName;
    this.formFields[4].value = item.plotShortName;
    this.formFields[5].value = item.plotDescription;
    this.formFields[6].value = item.plotLateitude;
    this.formFields[7].value = item.plotLongitude;
    this.formFields[8].value = item.plotCatagoryID;
    this.formFields[9].value = item.plotTypeID;
    this.formFields[10].value = item.plotNatureID;
    this.formFields[11].value = item.plotBlockID;
    this.formFields[12].value = item.plotSubBlockID;
    this.formFields[13].value = item.plotSize;
  }
}
