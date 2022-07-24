import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import {
  MemberPlotFileInterface,
  MyFormField,
} from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { throwIfEmpty } from 'rxjs/operators';
import { environment } from 'apps/society/src/environments/environment';
import { MemberPlotFileTableComponent } from './member-plot-file-table/member-plot-file-table.component';
import { MembershipGroupComponent } from './membership-group/membership-group.component';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'society-member-plot-file',
  templateUrl: './member-plot-file.component.html',
  styleUrls: ['./member-plot-file.component.scss'],
})
export class MemberPlotFileComponent implements OnInit {
  @ViewChild(MemberPlotFileTableComponent) memberTable: any;
  @ViewChild(MembershipGroupComponent) memberGroup: any;

  txtMembershipSearch: string = '';
  lblCategory: string = '';
  lblNature: string = '';
  lblType: string = '';
  lblMemberGroupID = 0;

  pageFields: MemberPlotFileInterface = {
    newMemberfileGroupID: '0',
    spType: '',
    userid: '',
    Date: '',
    newMemberProfileId: '0',
    acqTypeID: '0',
    paymentPlanId: '0',
    plotFileId: '',
    applicationEDocPath: '',
    applicationEDoc: '',
    applicationEdocExtenstion: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.newMemberfileGroupID,
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
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.Date,
      msg: 'select Date',
      type: 'date',
      required: true,
    },
    {
      value: this.pageFields.newMemberProfileId,
      msg: 'select member name',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.acqTypeID,
      msg: 'select acquisition type',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.paymentPlanId,
      msg: 'select payment plan',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.plotFileId,
      msg: 'enter plot File',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.applicationEDocPath,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.applicationEDoc,
      msg: 'select membership document',
      type: 'File',
      required: false,
    },
    {
      value: this.pageFields.applicationEdocExtenstion,
      msg: '',
      type: 'textbox',
      required: false,
    },
  ];

  // fileURL =
  //   'D:/logix/SocietyProject/Society/libs/ui/src/lib/assets/images/memberFile';
  editMode = false;
  selectedFile: File | undefined;

  tempMemPlotList: any = [];
  tempMemPlotXmlList: any = [];
  plotList: any = [];
  acquisitionList: any = [];
  paymentDetailList: any = [];
  paymentList: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Member Plot File');
    this.formFields[2].value = this.globalService.getUserId().toString();

    this.getMemberFileXml();
    this.getPlotFile();
    this.getAcquisitionType();
  }

  getAcquisitionType() {
    this.dataService
      .getHttp('society-api/MemberPlotFile/getAcquisitionType', '')
      .subscribe(
        (response: any) => {
          this.acquisitionList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getMemberPlotFile(item: any) {
    this.dataService
      .getHttp(
        'society-api/MemberPlotFile/getMemberPlotFile?memberID=' +
          parseInt(item.plotFileID) +
          '&page=memberFile',
        ''
      )
      .subscribe(
        (response: any) => {
          this.tempMemPlotList = response;
          if (response.length > 0) {
            this.memberGroup.itemList = [];
            for (var i = 0; i < response.length; i++) {
              if (item.date == response[i].date) {
                this.lblMemberGroupID = response[i].memberFileGroupId;

                this.memberGroup.itemList.push({
                  memberFileGroupID: response[i].memberFileGroupId,
                  memberID: response[i].memberProfileId,
                  memberName: response[i].memberName,
                  sdwName: response[i].sdWofName,
                  cnic: response[i].memberCNIC,
                  DOB: response[i].memberDOB,
                  address: response[i].presentAddress,
                });
              }
            }

            this.memberGroup.itemList.push({
              memberFileGroupID: '0',
              memberID: '0',
              memberName: '',
              sdwName: '',
              cnic: '',
              DOB: '',
              address: '',
            });
          }
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

  getMemberFileXml() {
    this.dataService
      .getHttp('society-api/MemberPlotFile/getMemberFileXml', '')
      .subscribe(
        (response: any) => {
          this.tempMemPlotXmlList = response;

          if (
            this.txtMembershipSearch != '' &&
            this.txtMembershipSearch != undefined
          ) {
            this.memberTable.tableData = [];
            this.memberTable.tableData = this.tempMemPlotXmlList.filter(
              (m: { fileNo: any }) =>
                m.fileNo == parseInt(this.txtMembershipSearch)
            );
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  setPaymentPlanInfo(item: any) {
    this.dataService
      .getHttp(
        'society-api/PaymentPlan/getPaymentPlanDetail?paymentPlanID=' + item,
        ''
      )
      .subscribe(
        (response: any) => {
          this.paymentDetailList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  searchMembership() {
    this.lblCategory = '';
    this.lblNature = '';
    this.lblType = '';
    this.memberTable.tableData = [];
    this.formFields[6].value = '';
    this.formFields = this.valid.resetFormFields(this.formFields);
    this.formFields[0].value = '';
    this.memberGroup.itemList = [];
    this.memberGroup.itemList.push({
      memberFileGroupID: '0',
      memberID: '0',
      memberName: '',
      sdwName: '',
      cnic: '',
      DOB: '',
      address: '',
    });

    if (
      this.txtMembershipSearch == '' ||
      this.txtMembershipSearch == undefined
    ) {
      this.valid.apiErrorResponse('please enter membership no');
    } else {
      this.memberTable.tableData = this.tempMemPlotXmlList
        .filter(
          (m: { fileNo: any }) => m.fileNo == parseInt(this.txtMembershipSearch)
        )
        .reverse();

      var item = this.plotList.filter(
        (x: { fileNo: any }) => x.fileNo == parseInt(this.txtMembershipSearch)
      );

      console.log(item);
      // this.formFields[6].value = item[0].paymentPlanId;
      this.formFields[7].value = item[0].plotFileId;

      this.lblCategory = item[0].plotCategoryTitle;
      this.lblNature = item[0].plotNatureTitle;
      this.lblType = item[0].plotTypeTitle;

      // payment plans
      this.paymentList = [];
      // console.log(item);
      this.dataService
        .getHttp(
          'society-api/PaymentPlan/getPaymentPlans?plotCategoryID=' +
            item[0].plotCategoryId +
            '&plotNatureID=' +
            item[0].plotNatureId +
            '&plotTypeID=' +
            item[0].plotTypeId,
          ''
        )
        .subscribe(
          (response: any) => {
            this.paymentList = response;
          },
          (error: any) => {
            console.log(error);
          }
        );

        this.editMode = false;

        this.dataService
        .getHttp(
          'society-api/MemberPlotFile/getMemberEDoc?plotFileID=' +
            item[0].plotFileId,
          ''
        )
        .subscribe(
          (response: any) => {
            console.log(response);
            if(response.length > 0){
              this.editMode = true;
              this.formFields[9].value = response[0].applicationEDoc.toString();
            }
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  onFileSelected(event: any) {
    this.editMode = false;

    if (event.target.files[0].type == 'application/pdf') {
      this.selectedFile = <File>event.target.files[0];
      let reader = new FileReader();

      reader.onloadend = (e) => {
        this.formFields[8].value = reader.result;

        var splitFile = this.formFields[8].value.split(',')[1];
        this.formFields[8].value = splitFile;
        this.formFields[9].value = environment.imageUrl + 'memberPlotFile';
        this.formFields[10].value = 'pdf';
      };

      reader.readAsDataURL(this.selectedFile);
    } else {
      this.valid.apiErrorResponse('Please Select PDF File');

      this.formFields[8].value = '';
      this.formFields[8].value = undefined;
      // this.filePicker = undefined;
      this.formFields[9].value = null;
      this.formFields[10].value = null;
      this.selectedFile = undefined;
    }
  }

  openPDFFile() {
    var item = 'http://157.90.101.251:9000/assets/ui/memberPlotFile/';
    // alert(this.formFields[30].value)
    // window.open(item + this.formFields[30].value + '.pdf');
    var div = document.getElementById('div1');
    div.innerHTML =
      '<iframe style="width:100%;height:100%;" frameborder="0" src="' +
      item +
      this.formFields[9].value +
      '.pdf' +
      '" />';
  }

  saveMemberPlotFile(item: any, obj: any) {
    this.formFields[0].value = item.item.memberFileGroupID;
    this.formFields[4].value = item.item.memberID;

    if (this.memberTable.tableData.length > 0) {
      var val = this.memberTable.tableData.length - 1;
      if (this.formFields[3].value == '') {
        this.valid.apiErrorResponse('select Date');
        return;
      } else if (
        this.formFields[3].value <
        new Date(this.memberTable.tableData[val].date)
      ) {
        this.valid.apiErrorResponse('invalid Date');
        return;
      }
      var count = 0;
      for (var i = 0; i < this.memberTable.tableData.length; i++) {
        if (this.memberTable.tableData[i].acquisitiontypeid == 1) {
          count = 1;
          i = this.memberTable.tableData.length + 1;
        }
      }

      if (count == 1) {
        if (this.formFields[5].value == 1) {
          this.valid.apiErrorResponse('first purchase not allowed');
          return;
        }
      }
    }

    if(this.formFields[9].value == ''){
      this.valid.apiInfoResponse('select membership document');
      return;
    }
    if (obj.type == 'save') {
      this.dataService
        .savetHttp(
          this.pageFields,
          this.formFields,
          'society-api/MemberPlotFile/saveMemberPlotFile'
        )
        .subscribe(
          (response: any[]) => {
            console.log(response);
            if (response[0].includes('Success') == true) {
              if (this.formFields[0].value > 0) {
                this.valid.apiInfoResponse('record saved successfully');
              } else {
                this.valid.apiInfoResponse('record saved successfully');
              }
              this.reset();
              this.getMemberFileXml();
              this.getMemberPlotFile(this.formFields[7].value);
            } else {
              this.valid.apiErrorResponse(response[0]);
            }
          },
          (error: any) => {
            this.error = error;
            this.valid.apiErrorResponse(this.error);
          }
        );
    } else {
      if (this.formFields[0].value == '0') {
        this.valid.apiErrorResponse('no item selected');
        return;
      }

      this.dataService
        .deleteHttp(
          this.pageFields,
          this.formFields,
          'society-api/MemberPlotFile/saveMemberPlotFile'
        )
        .subscribe(
          (response: any[]) => {
            if (response[0].includes('Success') == true) {
              this.valid.apiInfoResponse('Record deleted successfully');
              this.reset();
              this.getMemberFileXml();
              this.getMemberPlotFile(this.formFields[7].value);
            } else {
              this.valid.apiErrorResponse(response[0]);
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
    this.txtMembershipSearch = '';
    this.memberTable.tableData = [];

    this.lblCategory = '';
    this.lblNature = '';
    this.lblType = '';
    this.formFields[0].value = '';
    this.formFields[9].value = '';
    this.formFields[10].value = '';
    this.formFields[8].value = '';

    this.memberGroup.itemList = [];
    this.memberGroup.itemList.push({
      memberFileGroupID: '0',
      memberID: '0',
      memberName: '',
      sdwName: '',
      cnic: '',
      DOB: '',
      address: '',
    });

    this.editMode = false;

    this.paymentDetailList = [];
  }

  edit(item: any) {
    this.getMemberPlotFile(item);
    this.formFields[5].value = item.acquisitiontypeid;
    this.formFields[3].value = new Date(item.date);
  }

  getMember(){
    this.memberGroup.getMemberProfile();
  }
}
