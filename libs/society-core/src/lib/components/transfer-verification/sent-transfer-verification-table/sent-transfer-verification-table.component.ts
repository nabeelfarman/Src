import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { PlotFileViewComponent } from '../../core-global/plot-file-view/plot-file-view.component';

@Component({
  selector: 'society-sent-transfer-verification-table',
  templateUrl: './sent-transfer-verification-table.component.html',
  styleUrls: ['./sent-transfer-verification-table.component.scss']
})
export class SentTransferVerificationTableComponent implements OnInit {

  @Output() functionEventEmitter = new EventEmitter();

  @ViewChild(PlotFileViewComponent) plotFileView: any;

  lblType: string = '';
  lblName: string = '';
  lblSDWName: string = '';
  lblCNIC: string = '';
  lblDOB: string = '';
  lblMobile: string = '';
  lblEmail: string = '';
  lblPresentAddress: string = '';
  lblPermanentAddress: string = '';
  lblPlotFileID: string = '';

  modalType: string = '';

  sentVerifyTable: any = [];

  constructor(
    private dataService: SharedServicesDataModule,
  ) { }

  ngOnInit(): void {
  }

  getProcessCheckList(item: any){
    this.dataService.getHttp('society-api/TransferInbox/getProcessCheckList?transferID=' + item, '').subscribe((response: any) => {
      this.sentVerifyTable = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  getModalType(item: any){
    this.modalType = item;

    if(item == '2'){
      if(this.lblPlotFileID != ''){
        this.dataService.getHttp('society-api/PlotFile/getPlotFile?plotID=' + this.lblPlotFileID, '').subscribe(
          (response: any) => {
            if(response.length > 0){
              this.plotFileView.lblCategory = response[0].plotCategoryTitle;
              this.plotFileView.lblType = response[0].plotTypeTitle;
              this.plotFileView.lblNature = response[0].plotNatureTitle;
            }
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
    }
  }
  
  resetSent(){
    this.sentVerifyTable = [];

    this.functionEventEmitter.emit();  

    this.lblType = '';
    this.lblName = '';
    this.lblSDWName = '';
    this.lblCNIC = '';
    this.lblDOB = '';
    this.lblMobile = '';
    this.lblEmail = '';
    this.lblPresentAddress = '';
    this.lblPermanentAddress = '';
    this.lblPlotFileID = '';

    this.plotFileView.lblCategory = '';
    this.plotFileView.lblType = '';
    this.plotFileView.lblNature = '';
  }

}
