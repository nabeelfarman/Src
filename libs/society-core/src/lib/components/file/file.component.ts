import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { FileInterface, MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { FileTableComponent } from './file-table/file-table.component';

@Component({
  selector: 'society-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent implements OnInit {
  @ViewChild(FileTableComponent) fileTable: any;

  pageFields: FileInterface = {
    fileID: '0',
    spType: '',
    userID: '',
    fileName: '',
    fileDescription: '',
    fileCatagoryID: '',
    fileTypeID: '',
    fileNatureID: '',
    IsActive: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.fileID,
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
      value: this.pageFields.fileName,
      msg: 'enter file name',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.fileDescription,
      msg: 'enter file description',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.fileCatagoryID,
      msg: 'select category',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.fileTypeID,
      msg: 'select type',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.fileNatureID,
      msg: 'select nature',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.IsActive,
      msg: 'select plot',
      type: 'textBox',
      required: false,
    },
  ];

  plotCategoryList: any = [];
  plotTypeList: any = [];
  plotNatureList: any = [];
  plotList: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('File');
    this.formFields[2].value = this.globalService.getUserId().toString();

    this.getPlots();

    this.getPlotCategory();
    this.getPlotType();
    this.getPlotNature();
  }

  onLoad() {
    this.getPlots();

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

  getPlots() {
    this.dataService.getHttp('core-api/getPlot', '').subscribe(
      (response: any) => {
        this.plotList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  save() {
    // if(this.formFields[5].value == ''){
    //   this.formFields[5].value = '';
    // }
    this.formFields[8].value = false;

    if (this.formFields[0].value > 0) {
      this.dataService
        .savetHttp(this.pageFields, this.formFields, 'core-api/updatefile')
        .subscribe(
          (response: any) => {
            if (response.msg == 'Data Updated Successfully') {
              this.valid.apiInfoResponse('Record updated successfully');
              this.fileTable.getFile();
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
        .savetHttp(this.pageFields, this.formFields, 'core-api/insertfile')
        .subscribe(
          (response: any) => {
            if (response.msg == 'Data Saved Successfully') {
              this.valid.apiInfoResponse('Record saved successfully');
              this.fileTable.getFile();
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
    this.formFields[4].value = '';
  }

  edit(item: any) {
    this.formFields[0].value = item.fileID;
    this.formFields[3].value = item.fileName;
    this.formFields[4].value = item.fileDescription;
    this.formFields[5].value = item.fileCatagoryID;
    this.formFields[6].value = item.fileTypeID;
    this.formFields[7].value = item.fileNatureID;
  }
}
