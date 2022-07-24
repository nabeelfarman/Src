import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, ProceedCheckListInterface, TransferInboxInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { PlotFileViewComponent } from '../../core-global/plot-file-view/plot-file-view.component';

@Component({
  selector: 'society-transfer-verification-table',
  templateUrl: './transfer-verification-table.component.html',
  styleUrls: ['./transfer-verification-table.component.scss']
})
export class TransferVerificationTableComponent implements OnInit {

  @Output() callFunctionEvent = new EventEmitter();

  @ViewChild(PlotFileViewComponent) plotFileView: any;

  cmbMarkTo: string = '';

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

  pageFields: TransferInboxInterface = {
    newTransferProcessId: '0',
    spType: '',
    userid: '',
    receivedUserId: '',
    createdBy: '',
    transferId: '',
  }

  pageFieldsCheckList: ProceedCheckListInterface = {
    newProcessedChecklistId: '0',
    spType: '',
    userId: '',
    checklistid: '',
    transferId: '',
    referenceUserId: '',
    checkListRemarks: '',
    isChecked: '',
    isFileRequired: '',
    isExempted: '',
    exempted: '0',
    filePath: '',
    fileEdoc: '',
    fileEdocExtension: '',
  }

  formFields: MyFormField[] = [
    {
      value: this.pageFields.newTransferProcessId,
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
      value: this.pageFields.userid,
      msg: 'select mark to',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.receivedUserId,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.createdBy,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.transferId,
      msg: 'select transferId',
      type: 'label',
      required: true,
    },
  ];

  formFieldsCheckList: MyFormField[] = [
    {
      value: this.pageFieldsCheckList.newProcessedChecklistId,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFieldsCheckList.spType,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFieldsCheckList.userId,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFieldsCheckList.checklistid,
      msg: 'checkList',
      type: '',
      required: true,
    },
    {
      value: this.pageFieldsCheckList.transferId,
      msg: 'transferID',
      type: '',
      required: true,
    },
    {
      value: this.pageFieldsCheckList.referenceUserId,
      msg: '',
      type: 'label',
      required: false,
    },
    {
      value: this.pageFieldsCheckList.checkListRemarks,
      msg: '',
      type: 'label',
      required: false,
    },
    {
      value: this.pageFieldsCheckList.isChecked,
      msg: '',
      type: 'label',
      required: false,
    },
    {
      value: this.pageFieldsCheckList.isFileRequired,
      msg: '',
      type: 'label',
      required: false,
    },
    {
      value: this.pageFieldsCheckList.isExempted,
      msg: '',
      type: 'label',
      required: false,
    },
    {
      value: this.pageFieldsCheckList.exempted,
      msg: '',
      type: 'label',
      required: false,
    },
    {
      value: this.pageFieldsCheckList.filePath,
      msg: '',
      type: 'label',
      required: false,
    },
    {
      value: this.pageFieldsCheckList.fileEdoc,
      msg: '',
      type: 'label',
      required: false,
    },
    {
      value: this.pageFieldsCheckList.fileEdocExtension,
      msg: '',
      type: 'label',
      required: false,
    },
  ];

  error: any;
  modalType: string = '';
  selectedFile: File | undefined;

  verifyTable: any = [];
  userList: any = [];
  modalWinodwList: any = [];

  constructor(  
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.dataService
    .getHttp('user-api/User/getUserDesignation', '')
    .subscribe(
      (response: any) => {
        this.userList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onFileSelected(event: any) {
    if (event.target.files[0].type == 'application/pdf') {
      this.selectedFile = <File>event.target.files[0];
      let reader = new FileReader();

      reader.onloadend = (e) => {
        this.formFieldsCheckList[12].value = reader.result;

        var splitFile = this.formFieldsCheckList[12].value.split(',')[1];
        this.formFieldsCheckList[12].value = splitFile;
        this.formFieldsCheckList[11].value = 'D:/logix/SocietyProject/Society/libs/ui/src/lib/assets/images/proceedCheckList';
        this.formFieldsCheckList[13].value = 'pdf';
      };

      reader.readAsDataURL(this.selectedFile);
    } else {
      this.valid.apiErrorResponse('Please Select PDF File');

      this.formFieldsCheckList[12].value = '';
      this.formFieldsCheckList[12].value = undefined;
      this.formFieldsCheckList[13].value = null;
      this.selectedFile = undefined;
    }
  }

  getProcessCheckList(item: any){
    this.dataService.getHttp('society-api/TransferInbox/getProcessCheckList?transferID=' + item, '').subscribe((response: any) => {
      this.verifyTable = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  saveCheckList(item: any, obj: any){
    var isChecked = 0;
    if(item == true){
      isChecked = 1;
    }else{
      this.valid.apiErrorResponse('already checked');
      return;
    }
    
    this.formFieldsCheckList[0].value = obj.processedChecklistId;
    this.formFieldsCheckList[2].value = this.globalService.getUserId().toString();
    this.formFieldsCheckList[3].value = obj.checkListId;
    this.formFieldsCheckList[4].value = obj.transferId;
    this.formFieldsCheckList[5].value = obj.referenceUserID;
    this.formFieldsCheckList[6].value = obj.checkListRemarks;
    this.formFieldsCheckList[7].value = isChecked;
    this.formFieldsCheckList[8].value = obj.isFileRequired;
    this.formFieldsCheckList[9].value = obj.isExempted.toString();

    if(obj.isFileRequired == 1 && obj.isExempted == 1){
      if(this.formFieldsCheckList[11].value == ''){
        this.valid.apiErrorResponse('please select file');
        return;
      }
    }


    this.dataService
      .savetHttp(
        this.pageFieldsCheckList,
        this.formFieldsCheckList,
        'society-api/TransferInbox/saveProceedChecklist'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            this.valid.apiInfoResponse('record added successfully');
            this.getProcessCheckList(obj.transferId); 
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

  proceed(){
    
    var count = 0;
    for(var i = 0; i < this.verifyTable.length; i++){
      if(this.verifyTable[i].isChecked == 1){
        count++;
      }
    }

    if(this.verifyTable.length == 0){
      this.valid.apiErrorResponse('no item selected to proceed');
      return;
    }else if(count < this.verifyTable.length){
      this.valid.apiErrorResponse('please check all data');
      return;
    }

    this.formFields[0].value = 0;
    this.formFields[3].value = this.globalService.getUserId().toString();
    this.formFields[4].value = this.globalService.getUserId().toString();

    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'society-api/TransferInbox/saveTransferInbox'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            this.valid.apiInfoResponse('record added successfully');
            this.callFunctionEvent.emit();
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
    this.verifyTable = [];

    this.formFields = this.valid.resetFormFields(this.formFields);

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
}
