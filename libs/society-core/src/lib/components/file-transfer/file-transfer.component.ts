import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, TransferInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { BuyerDetailsComponent } from '../core-global/buyer-details/buyer-details.component';
import { SellerDetailsComponent } from '../core-global/seller-details/seller-details.component';
import { InpersonVerificationComponent } from '../inperson-verification/inperson-verification.component';
import { FileTransferTableComponent } from './file-transfer-table/file-transfer-table.component';
import Swal from "sweetalert2";

@Component({
  selector: 'society-file-transfer',
  templateUrl: './file-transfer.component.html',
  styleUrls: ['./file-transfer.component.scss'],
})
export class FileTransferComponent implements OnInit {
  @ViewChild(SellerDetailsComponent) sellerData: any;
  @ViewChild(BuyerDetailsComponent) buyerData: any;
  @ViewChild(InpersonVerificationComponent) inPerson: any;
  @ViewChild(FileTransferTableComponent) fileTransferTable: any;

  pageFields: TransferInterface = {
    newTransferID: '0',
    spType: '',
    userId: '',
    plotFileId: '',
    date: '',
    refernceUserid: '0',
    referenceDesignationid: '0',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.newTransferID,
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
      value: this.pageFields.plotFileId,
      msg: 'select membership no',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.date,
      msg: 'select date',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.refernceUserid,
      msg: 'select mark to',
      type: 'selectbox',
      required: false,
    },
    {
      value: this.pageFields.referenceDesignationid,
      msg: '',
      type: 'hidden',
      required: false,
    },
  ];

  transferID = '';
  error: any;
  memberShipList: any = [];
  tempMemberList: any = [];
  modalVal: number = 0;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('file Transfer');
    this.formFields[2].value = this.globalService.getUserId().toString();

    this.getTransferInProcess();
  }

  getTransferInProcess() {
    this.dataService
      .getHttp('society-api/FileTransfer/getTransferInProcess', '')
      .subscribe(
        (response: any) => {
          this.memberShipList = response.filter(
            (x: { isCompleted: any }) => x.isCompleted == 0
          );
          this.fileTransferTable.tableData = response.filter(
            (x: { isCompleted: any }) => x.isCompleted == 1
          );
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getTransferMember(item: any) {
    this.sellerData.sellerTableData = [];
    this.buyerData.buyerTableData = [];

    this.dataService
      .getHttp(
        'society-api/FileTransfer/getTransferMember?transferID=' + item,
        ''
      )
      .subscribe(
        (response: any) => {
          this.tempMemberList = response;
          // console.log(response);
          if (response.length > 0) {
            for (var i = 0; i < response.length; i++) {
              var val = '';
              if (response[i].status == null) {
                val = '-1';
              } else {
                val = response[i].status.indexOf('Activate');
              }

              if (response[i].mode == 'Seller') {
                this.sellerData.sellerTableData.push({
                  email: response[i].email,
                  fileNo: response[i].fileNo,
                  isActivated: response[i].isActivated,
                  isDeleted: response[i].isDeleted,
                  iscompleted: response[i].iscompleted,
                  memberCNIC: response[i].memberCNIC,
                  memberDOB: response[i].memberDOB,
                  memberName: response[i].memberName,
                  memberProfileId: response[i].memberProfileId,
                  mobileNo1: response[i].mobileNo1,
                  mode: response[i].mode,
                  permanentAddress: response[i].permanentAddress,
                  permanentAddressCityID: response[i].permanentAddressCityID,
                  phoneNo1: response[i].phoneNo1,
                  plotFileId: response[i].plotFileId,
                  presentAddress: response[i].presentAddress,
                  presentAddressCityID: response[i].presentAddressCityID,
                  sdWofName: response[i].sdWofName,
                  status: response[i].status,
                  transferId: response[i].transferId,
                  activeStatus: val,
                });
              } else if (response[i].mode == 'Buyer') {
                this.buyerData.buyerTableData.push({
                  email: response[i].email,
                  fileNo: response[i].fileNo,
                  isActivated: response[i].isActivated,
                  isDeleted: response[i].isDeleted,
                  iscompleted: response[i].iscompleted,
                  memberCNIC: response[i].memberCNIC,
                  memberDOB: response[i].memberDOB,
                  memberName: response[i].memberName,
                  memberProfileId: response[i].memberProfileId,
                  mobileNo1: response[i].mobileNo1,
                  mode: response[i].mode,
                  permanentAddress: response[i].permanentAddress,
                  permanentAddressCityID: response[i].permanentAddressCityID,
                  phoneNo1: response[i].phoneNo1,
                  plotFileId: response[i].plotFileId,
                  presentAddress: response[i].presentAddress,
                  presentAddressCityID: response[i].presentAddressCityID,
                  sdWofName: response[i].sdWofName,
                  status: response[i].status,
                  transferId: response[i].transferId,
                  activeStatus: val,
                });
              }
            }
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getTransferSavedMember() {
    this.dataService
      .getHttp('society-api/FileTransfer/getTransferSavedMember', '')
      .subscribe(
        (response: any) => {
          // this.applicantList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  membershipChange(item: any) {
    var data = this.memberShipList.filter(
      (x: { transferId: any }) => x.transferId == item
    );

    this.formFields[3].value = data[0].plotFileId;
    this.getTransferMember(item);
  }

  saveCompleteTransfer() {
    if (this.tempMemberList.length > 0) {
      for (var i = 0; i < this.tempMemberList.length; i++) {
        if (this.tempMemberList[i].status == null) {
          this.valid.apiErrorResponse(
            'please complete ' +
              this.tempMemberList[i].mode +
              ' inperson verification'
          );
          return;
        } else if (this.tempMemberList[i].status.indexOf('Activate') == -1) {
          this.valid.apiErrorResponse(
            'please complete ' +
              this.tempMemberList[i].mode +
              ' inperson verification'
          );
          return;
        }
      }
    }

    this.formFields[1].value = 'Complete';

    if (this.formFields[3].value == ''){
      this.valid.apiInfoResponse(
        this.formFields[3].msg
      );
      return;
    }else if(this.formFields[4].value == ''){
      this.valid.apiInfoResponse(
        this.formFields[4].msg
      );
      return;
    }

    setTimeout(() => {
      Swal.fire({
          title: 'Do you want to transfer?',
          text: '',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
      }).then((result) => {
        if (result.value) {
          this.dataService
          .savetHttp(
            this.pageFields,
            this.formFields,
            'society-api/FileTransfer/saveTransferComplete'
          )
          .subscribe(
            (response: any[]) => {
              if(response[0].includes('Success') == true){
                this.valid.apiInfoResponse('Record added successfully');
                this.reset();
                this.getTransferInProcess();
              }else{
                this.valid.apiErrorResponse(response[0]);
              }
            },
            (error: any) => {
              this.error = error;
              this.valid.apiErrorResponse(this.error);
            }
          );
        }
      });
  }, 100);

  }

  reset() {
    this.sellerData.sellerTableData = [];
    this.buyerData.buyerTableData = [];
    this.formFields[0].value = '';
    this.formFields = this.valid.resetFormFields(this.formFields);
  }

  sendInfo(item: any) {
    // console.log(item)
    // this.modalVal = 1;
    this.transferID = item.transferId;
    this.inPerson.getInPersonDetail(item);
  }

  modalValConfig(val: number) {
    this.modalVal = val;
  }

  changeTransferMember(){
    // if(this.modalVal == 1){
      this.getTransferMember(this.transferID);
      this.transferID = '';
    // }
    
  }
}
