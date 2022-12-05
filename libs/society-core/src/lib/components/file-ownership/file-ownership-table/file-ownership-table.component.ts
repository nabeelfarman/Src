import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
declare var $: any;

@Component({
  selector: 'society-file-ownership-table',
  templateUrl: './file-ownership-table.component.html',
  styleUrls: ['./file-ownership-table.component.scss']
})
export class FileOwnershipTableComponent implements OnInit {

  @Output() eventEmitterPrint = new EventEmitter();

  tblSearch: any = '';

  lblFile: any = '';
  lblParty: any = '';

  tableData: any = [];
  paymentPlanDetailList: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
  ) {}

  ngOnInit(): void {
    this.getFileOwnerDetail();
  }

  getFileOwnerDetail() {
    this.dataService.getHttp('core-api/getfileownerdetail', '').subscribe(
      (response: any) => {
        this.tableData = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getPaymentDetail(item: any){
    this.lblFile = '';
    this.lblParty = '';

    this.lblFile = item.fileName;
    this.lblParty = item.partyName;
    
    this.paymentPlanDetailList = [];
    this.dataService.getHttp('core-api/GetFilePaymentPlan?FileID=' + item.fileID, '').subscribe(
      (response: any) => {
        this.paymentPlanDetailList = response;
        $('#paymentDetailModal').modal('show');
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  
  printData(item: any){
    // console.log(item);return;
    this.dataService.getHttp('core-api/GetSpecificFileDetail?FileOwnerID=' + item.fileOwnerShipID, '').subscribe((response: any) => {
      this.eventEmitterPrint.emit({item, response});
    }, (error: any) => {
      console.log(error);
    });
  }

}
