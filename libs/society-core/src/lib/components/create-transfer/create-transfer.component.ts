import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper, MatStepperPrevious } from '@angular/material/stepper';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, TransferApplicantInterface, TransferInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { CreateTransferApplicantsComponent } from './create-transfer-applicants/create-transfer-applicants.component';
import { CreateTransferTableComponent } from './create-transfer-table/create-transfer-table.component';

@Component({
  selector: 'society-create-transfer',
  templateUrl: './create-transfer.component.html',
  styleUrls: ['./create-transfer.component.scss']
})
export class CreateTransferComponent implements OnInit {

  @ViewChild(CreateTransferTableComponent) transferTable: any;
  @ViewChild(CreateTransferApplicantsComponent) applicantTable: any;

  lblCategory: string = '';
  lblNature: string = '';
  lblType: string = '';

  lblMembershipNo: string = '';
  lblTransferDate: string = '';
  
  lblSDWName: string = '';
  lblAppCNIC: string = '';
  lblAPPDOB: string = '';
  lblAPPAddress: string = '';

  tabIndex = 0;

  pageFieldsTransfer: TransferInterface = {
    newTransferID: '0',
    spType: '',
    userId: '',
    date: '',
    plotFileId: '',
    refernceUserid: '',
    referenceDesignationid: '',
  };

  pageFieldsApplicant: TransferApplicantInterface = {
    newTransferDetailID: '0',
    spType: '',
    userId: '',
    transferId: '',
    memberProfileId: '',
  };

  formFieldsTransfer: MyFormField[] = [
    {
      value: this.pageFieldsTransfer.newTransferID,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFieldsTransfer.spType,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFieldsTransfer.userId,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFieldsTransfer.date,
      msg: 'select date',
      type: 'date',
      required: true,
    },
    {
      value: this.pageFieldsTransfer.plotFileId,
      msg: 'select membership no',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFieldsTransfer.refernceUserid,
      msg: 'select mark to',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFieldsTransfer.referenceDesignationid,
      msg: 'select mark to',
      type: 'selectbox',
      required: true,
    },
  ];

  formFieldsApplicant: MyFormField[] = [
    {
      value: this.pageFieldsApplicant.newTransferDetailID,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFieldsApplicant.spType,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFieldsApplicant.userId,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFieldsApplicant.transferId,
      msg: 'select transfer',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFieldsApplicant.memberProfileId,
      msg: 'select applicant',
      type: 'selectbox',
      required: true,
    },
  ];

  error: any;
  @ViewChild('stepper') myStepper: MatStepper;
  
  applicantList:any = [];
  userList:any = [];
  plotList:any = [];
  
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Create Transfer');

    this.formFieldsTransfer[2].value = this.globalService.getUserId().toString();
    this.formFieldsApplicant[2].value = this.globalService.getUserId().toString();

    this.getUser();
    this.getTransfer();
    this.getPlotFile();
    this.getApplicantProfile();
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

  getTransfer(){
    this.dataService
    .getHttp('society-api/Transfer/getTransfer', '')
    .subscribe(
      (response: any) => {
        this.transferTable.tableData = response.reverse();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getApplicantTransfer(item: any){
    this.dataService
    .getHttp('society-api/Transfer/getTransferApplicant?transferID=' + item, '')
    .subscribe(
      (response: any) => {
        this.applicantTable.tableData = response.reverse();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getPlotFile() {
    this.dataService.getHttp('society-api/PlotFile/getPlotFile', '').subscribe(
      (response: any) => {
        this.plotList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getApplicantProfile(){
    this.dataService.getHttp('society-api/MemberProfile/getApplicantProfile', '').subscribe((response: any) => {
      this.applicantList = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  userChange(item: any){

    var obj = this.userList.filter(
      (x: { userID: any }) => x.userID == parseInt(item)
    );

    if(obj.length > 0){
      this.formFieldsTransfer[6].value = obj[0].designationID;
    }

  }

  membershipChange(item: any){

    var obj = this.plotList.filter(
      (x: { plotFileId: any }) => x.plotFileId == parseInt(item)
    );

            
    if(obj.length > 0){
      this.lblCategory = obj[0].plotCategoryTitle;
      this.lblNature = obj[0].plotNatureTitle;
      this.lblType = obj[0].plotTypeTitle;
    }

  }

  applicantChange(item: any){

    var obj = this.applicantList.filter(
      (x: { memberProfileId: any }) => x.memberProfileId == item);

    if(obj.length > 0){
      this.lblSDWName = obj[0].sdWofName;
      this.lblAppCNIC = obj[0].memberCNIC;
      this.lblAPPDOB = obj[0].memberDOB;
      this.lblAPPAddress = obj[0].presentAddress;
    }

  }

  saveTransfer(matStepper: MatStepper) {
    this.dataService
      .savetHttp(
        this.pageFieldsTransfer,
        this.formFieldsTransfer,
        'society-api/Transfer/saveTransfer'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            this.formFieldsApplicant[3].value = this.valid.splitResponse(response[0].toString());
          
            if(this.formFieldsTransfer[0].value > 0)
            {
              this.valid.apiInfoResponse('Record updated successfully');
            }else{
              this.valid.apiInfoResponse('Record added successfully');
            }
            this.getTransfer();
            this.getApplicantTransfer(this.formFieldsApplicant[3].value)
            matStepper.next();

            var obj = this.plotList.filter(
              (x: { plotFileId: any }) => x.plotFileId == parseInt(this.formFieldsTransfer[4].value)
            );
            this.lblMembershipNo = obj[0].fileNo;

            this.lblTransferDate = this.formFieldsTransfer[3].value;
            
            this.reset();
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

  saveApplicant() {
    this.dataService
      .savetHttp(
        this.pageFieldsApplicant,
        this.formFieldsApplicant,
        'society-api/Transfer/saveTransferApplicant'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            if(this.formFieldsApplicant[0].value > 0)
            {
              this.valid.apiInfoResponse('Record updated successfully');
            }else{
              this.valid.apiInfoResponse('Record added successfully');
            }
            this.getApplicantTransfer(this.formFieldsApplicant[3].value)
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

  reset() {
    this.formFieldsTransfer = this.valid.resetFormFields(this.formFieldsTransfer);
  }
  
  resetAll(matStepper: MatStepper){
    this.formFieldsTransfer = this.valid.resetFormFields(this.formFieldsTransfer);
    this.formFieldsApplicant = this.valid.resetFormFields(this.formFieldsApplicant);
    this.applicantTable.tableData = [];

    matStepper.previous();

    this.lblCategory = '';
    this.lblNature = '';
    this.lblType = '';

    this.lblMembershipNo = '';
    this.lblTransferDate = '';
    
    this.lblSDWName = '';
    this.lblAppCNIC = '';
    this.lblAPPDOB = '';
    this.lblAPPAddress = '';

  }

  editApplicant(item: any, obj: any){

    this.formFieldsApplicant[0].value = item.item.transferDetailID;
    this.formFieldsApplicant[3].value = item.item.transferID;
    this.formFieldsApplicant[4].value = item.item.memberProfileID_Buyer;
    
    this.lblMembershipNo = item.item.membershipNo;
    this.lblTransferDate = item.item.date;
    this.lblSDWName = item.item.SDWofName;
    this.lblAppCNIC = item.item.memberCNIC;
    this.lblAPPDOB = item.item.memberDOB;
    this.lblAPPAddress = item.item.presentAddress;

    if (obj.num == '2') {
      this.dataService
        .deleteHttp(
          this.pageFieldsApplicant,
          this.formFieldsApplicant,
          'society-api/Transfer/saveTransferApplicant'
        )
        .subscribe(
          (response: any[]) => {
            if(response[0].includes('Success') == true){
              this.valid.apiInfoResponse('Record deleted successfully');
              this.getApplicantTransfer(this.formFieldsApplicant[3].value);
            }else{
              this.valid.apiErrorResponse(response[0]);
            }
            // this.reset();
          },
          (error: any) => {
            this.error = error;
            this.valid.apiErrorResponse(this.error);
          }
        );
    }
  }

  edit(item: any, obj: any){
    
    this.myStepper.previous();

    this.formFieldsTransfer[0].value = item.item.transferId;
    this.formFieldsTransfer[3].value = new Date(item.item.date);
    this.formFieldsTransfer[4].value = item.item.plotFileId;
    this.formFieldsTransfer[5].value = item.item.referenceUserId;
    
    // this.lblMembershipNo = item.item.fileNo;

    var data = this.userList.filter((x: {userID: any}) => x.userID == item.item.referenceUserId);
    this.formFieldsTransfer[6].value = data[0].designationID;

    this.formFieldsApplicant[3].value = item.item.transferId;

    this.lblCategory = item.item.plotCategoryTitle;
    this.lblNature = item.item.plotNatureTitle;
    this.lblType = item.item.plotNatureTitle;
    
    this.getApplicantTransfer(item.item.transferId);

    if (obj.num == '1') {
      this.tabIndex = 0;
    } else {
      this.dataService
        .deleteHttp(
          this.pageFieldsTransfer,
          this.formFieldsTransfer,
          'society-api/Transfer/saveTransfer'
        )
        .subscribe(
          (response: any[]) => {
            if(response[0].includes('Success') == true){
              this.valid.apiInfoResponse('Record deleted successfully');
              this.getTransfer();
            }else{
              this.valid.apiErrorResponse(response[0]);
            }
            // this.reset();
          },
          (error: any) => {
            this.error = error;
            this.valid.apiErrorResponse(this.error);
          }
        );
    }
  }
  
  changeTabHeader(tabNum: any) {
    this.tabIndex = tabNum;
  }
}
