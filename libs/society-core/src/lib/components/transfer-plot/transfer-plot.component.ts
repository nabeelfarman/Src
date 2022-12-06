import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, TransferPlotInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { TransferPlotTableComponent } from './transfer-plot-table/transfer-plot-table.component';

@Component({
  selector: 'society-transfer-plot',
  templateUrl: './transfer-plot.component.html',
  styleUrls: ['./transfer-plot.component.scss']
})
export class TransferPlotComponent implements OnInit {

  @ViewChild(TransferPlotTableComponent) transferTable: any;
  dtpAllotmentDate: any = '';
  searchFileName: string = '';
  searchPartyName: string = '';

  pageFields: TransferPlotInterface = {
    FileID: '0',
    spType: '',
    UserID: '',
    PartyID: '',
    AllotmentDate: '',
    FosDescription: '',
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
      value: this.pageFields.PartyID,
      msg: 'select party',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.AllotmentDate,
      msg: 'select allotment date',
      type: 'date',
      required: true,
    },
    {
      value: this.pageFields.FosDescription,
      msg: 'enter description',
      type: 'textbox',
      required: false,
    }
  ];

  fileList: any = [];
  partyList: any = [];

  error: any;
  
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle("Ownership File");

    this.formFields[2].value = this.globalService.getUserId().toString();

    this.getFile();
    this.getParty();
    this.getTransfer();
  }

  getTransfer() {
    this.dataService.getHttp('core-api/GetFileTransferDetail', '').subscribe(
      (response: any) => {
        this.transferTable.tableData = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getParty() {
    this.dataService.getHttp('core-api/getparty', '').subscribe(
      (response: any) => {
        this.partyList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getFile() {
    this.dataService.getHttp('core-api/getfileownerdetail', '').subscribe(
      (response: any) => {
        this.fileList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  save(){
    
    // this.formFields[4].value = this.datePipe.transform(this.dtpAllotmentDate, 'yyyy-MM-dd');
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'core-api/Inserttransfer'
      )
      .subscribe(
        (response: any) => {
          if (response.msg == "File Transferred Successfully") {
            this.valid.apiInfoResponse('Record saved successfully');
            this.reset();
            this.getTransfer();
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
    this.formFields[5].value = '';
  }
}
