import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { InboxTableComponent } from './inbox-table/inbox-table.component';
import { SentTableComponent } from './sent-table/sent-table.component';
import { SentTransferVerificationTableComponent } from './sent-transfer-verification-table/sent-transfer-verification-table.component';
import { TransferVerificationTableComponent } from './transfer-verification-table/transfer-verification-table.component';

@Component({
  selector: 'society-transfer-verification',
  templateUrl: './transfer-verification.component.html',
  styleUrls: ['./transfer-verification.component.scss']
})
export class TransferVerificationComponent implements OnInit {

  @ViewChild(TransferVerificationTableComponent) transferTable: any;
  @ViewChild(SentTransferVerificationTableComponent) sentTransferTable: any;
  
  @ViewChild(InboxTableComponent) inboxTable: any;
  @ViewChild(SentTableComponent) sentTable: any;

  tabIndex = 0;
  lblMemberShip: string = '';
  lblSentMemberShip: string = '';

  tempTransList: any = [];
  error: any;

  constructor(  
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) { }

  ngOnInit(): void {
    this.globalService.setHeaderTitle('transfer Verification');
    
    this.getTransferInbox()
  }

  getTransferInbox(){
    this.lblMemberShip = '';
    this.lblSentMemberShip = '';
    
    this.dataService.getHttp('society-api/TransferInbox/getTransferInbox?userID=' + this.globalService.getUserId().toString(), '').subscribe((response: any) => {
      this.tempTransList = response;
      this.sentTable.sentTableData = response.filter((x: {transferProcessstatus: any }) => x.transferProcessstatus == 0);
      this.inboxTable.tableData = response.filter((x: {transferProcessstatus: any }) => x.transferProcessstatus == 1);
    }, (error: any) => {
      console.log(error);
    });
  }
  
  getTransferApplicantDetail(item: any, str: any){
    this.dataService.getHttp('society-api/TransferInbox/getTransferApplicantDetail?transferID=' + item, '').subscribe((response: any) => {

      if(response.length > 0){
        if(str == 'inbox'){
          this.transferTable.lblType = response[0].memberType; 
          this.transferTable.lblName = response[0].memberName; 
          this.transferTable.lblSDWName = response[0].SDWofName; 
          this.transferTable.lblCNIC = response[0].memberCNIC; 
          this.transferTable.lblDOB = response[0].memberDOB; 
          this.transferTable.lblMobile = response[0].mobileNo1; 
          this.transferTable.lblEmail = response[0].email; 
          this.transferTable.lblPresentAddress = response[0].presentAddress; 
          this.transferTable.lblPermanentAddress = response[0].permanentAddress;
          this.transferTable.lblPlotFileID = response[0].plotFileId;
        }else if(str == 'sent'){
          this.sentTransferTable.lblType = response[0].memberType; 
          this.sentTransferTable.lblName = response[0].memberName; 
          this.sentTransferTable.lblSDWName = response[0].SDWofName; 
          this.sentTransferTable.lblCNIC = response[0].memberCNIC; 
          this.sentTransferTable.lblDOB = response[0].memberDOB; 
          this.sentTransferTable.lblMobile = response[0].mobileNo1; 
          this.sentTransferTable.lblEmail = response[0].email; 
          this.sentTransferTable.lblPresentAddress = response[0].presentAddress; 
          this.sentTransferTable.lblPermanentAddress = response[0].permanentAddress;
          this.sentTransferTable.lblPlotFileID = response[0].plotFileId;
        }
        
      }
    }, (error: any) => {
      console.log(error);
    });
  }
  
  changeTabHeader(tabNum: any) {
    this.tabIndex = tabNum;
  }

  getInboxData(item: any){
    this.getTransferApplicantDetail(item.transferId, 'inbox')
    this.transferTable.getProcessCheckList(item.transferId)
    this.transferTable.formFields[5].value = item.transferId;
    this.lblMemberShip = item.memberShipNo
  }

  getSentData(item: any){
    this.getTransferApplicantDetail(item.transferId, 'sent')
    this.sentTransferTable.getProcessCheckList(item.transferId)
    this.lblSentMemberShip = item.memberShipNo

  }
  resetSent(){
    this.lblSentMemberShip = '';
  }
}
