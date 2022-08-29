import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MemberProfileInterface, MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { environment } from 'apps/society/src/environments/environment';
import { ImageUploadingComponent } from 'libs/blocks/src/lib/components/image-uploading/image-uploading.component';
import { MemberProfileTableComponent } from './member-profile-table/member-profile-table.component';

@Component({
  selector: 'society-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss'],
})
export class MemberProfileComponent implements OnInit {
  @ViewChild(MemberProfileTableComponent) memberTable: any;
  @ViewChild(ImageUploadingComponent) imageUpload: any;

  txtMembershipSearch: string = '';
  cmbPresentCountry: string = '';
  cmbPermanentCountry: string = '';
  lblCategory: string = '';
  lblNature: string = '';
  lblType: string = '';
  rdbMember: string = '1';
  rdbCnic: string = '2';

  searchMembership: string = '';
  searchPresentCity: string = '';
  searchPermanentCity: string = '';

  
  lblPMemberName: string = '';
  lblPSDWName: string = '';
  lblPCNIC: string = '';
  lblPMobile: string = '';
  lblPAddress: string = '';
  lblPMembershipDate: string = '';
  lblPMembershipNo: string = '';
  lblPCategory: string = '';
  lblPNature: string = '';
  lblPType: string = '';
  lblPPaymentPlan: string = '';

  pageFields: MemberProfileInterface = {
    newMemberProfileId: '0',
    spType: '',
    userid: '',
    plotFileId: '',
    paymentPlanID: '',
    acqTypeId: '',
    memberName: '',
    memberType: '',
    SDWofName: '',
    memberCNIC: '',
    Designation: '',
    BPS: '',
    memberDOB: '',
    phoneNo1: '',
    phoneNo2: '',
    mobileNo1: '',
    mobileNo2: '',
    Email: '',
    presendAddress: '',
    presentAddresscityId: '',
    permanentAddress: '',
    permanentAddresscityId: '0',
    memberRemarks: '',
    applicationDate: '',
    memberShipDate: '',
    memberShipNo: '',
    memberPicturePath: '',
    memberPicture: '',
    memberPictureExtension: '',
    applicationEDocPath: '',
    applicationEDoc: '',
    applicationEdocExtenstion: '',
    nextofKin: '',
    affectDate: '',
    referenceID: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.newMemberProfileId,
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
      value: this.pageFields.plotFileId,
      msg: 'select plot file',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.paymentPlanID,
      msg: 'select payment plan',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.acqTypeId,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.memberName,
      msg: 'enter member name',
      type: 'name',
      required: true,
    },
    {
      value: this.pageFields.memberType,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.SDWofName,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.memberCNIC,
      msg: 'enter member cnic',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.Designation,
      msg: 'enter member designation',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.BPS,
      msg: 'enter member bps',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.memberDOB,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.phoneNo1,
      msg: 'enter phone no',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.phoneNo2,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.mobileNo1,
      msg: 'enter mobile',
      type: 'mobile',
      required: false,
    },
    {
      value: this.pageFields.mobileNo2,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.Email,
      msg: 'enter email',
      type: 'email',
      required: false,
    },
    {
      value: this.pageFields.presendAddress,
      msg: 'enter address',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.presentAddresscityId,
      msg: 'select present address city',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.permanentAddress,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.permanentAddresscityId,
      msg: 'select permanent address city',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.memberRemarks,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.applicationDate,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.memberShipDate,
      msg: 'select membership date',
      type: 'date',
      required: true,
    },
    {
      value: this.pageFields.memberShipNo,
      msg: 'enter membership no',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.memberPicturePath,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.memberPicture,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.memberPictureExtension,
      msg: '',
      type: '',
      required: false,
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
      required: true,
    },
    {
      value: this.pageFields.applicationEdocExtenstion,
      msg: '',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.nextofKin,
      msg: '',
      type: 'textbox',
      required: false,
    },
    {
      value: this.pageFields.affectDate,
      msg: 'select affect date',
      type: 'date',
      required: true,
    },
    {
      value: this.pageFields.referenceID,
      msg: 'select reference',
      type: 'selectbox',
      required: false,
    },
  ];

  memberPic: any;
  editable: boolean = false;
  tabIndex = 0;
  editMode = false;
  selectedFile: File | undefined;

  fileURL =
    'D:/logix/SocietyProject/Society/libs/ui/src/lib/assets/images/memberFile';

  plotList: any = [];
  paymentList: any = [];
  paymentDetailList: any = [];
  countryList: any = [];
  presentCityList: any = [];
  permanentCityList: any = [];
  tempCityList: any = [];
  plotFileList: any = [];
  memberList: any = [];
  referenceList: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  cnicMask = this.globalService.cnicMask();
  cnicOldMask = this.globalService.cnicOldMask();
  mobileMask = this.globalService.mobileMask();
  phoneMask = this.globalService.phoneMask();
  bpsMask = this.globalService.bpsMask();

  ngOnInit(): void {
    this.globalService.setHeaderTitle("Member's Profile");
    // this.memberPic = 'http://i.pravatar.cc/500?img=7';
    this.memberPic = 'assets/ui/person.jpg';
    this.formFields[2].value = this.globalService.getUserId().toString();
    this.formFields[5].value = '1';
    this.formFields[7].value = 'Member';

    this.getMemberProfile();
    this.getPlotFile();
    // this.getPaymentPlans();
    this.getCountry();
    this.getCity();
    this.getReference();

    // default value of radio button
    this.rdbMember = '1';
    this.rdbCnic = '2';
  }

  getCountry() {
    this.dataService.getHttp('company-api/Company/getCountry', '').subscribe(
      (response: any) => {
        this.countryList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getReference() {
    this.dataService.getHttp('society-api/MemberProfile/getReference', '').subscribe(
      (response: any) => {
        this.referenceList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getCity() {
    this.dataService.getHttp('company-api/Company/getCity', '').subscribe(
      (response: any) => {
        this.tempCityList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getPresentCity(item: any) {
    this.dataService
      .getHttp('company-api/Company/getCity?countryId=' + item, '')
      .subscribe(
        (response: any) => {
          this.presentCityList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getPermanentCity(item: any) {
    this.dataService
      .getHttp('company-api/Company/getCity?countryId=' + item, '')
      .subscribe(
        (response: any) => {
          this.permanentCityList = response;
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
          item +
          '&page=member',
        ''
      )
      .subscribe(
        (response: any) => {
          this.plotFileList = response;
          // console.log(response)
          if (response.length > 0) {
            this.formFields[4].value = response[0].paymentPlanID;
            this.formFields[25].value = response[0].membershipNo.toString();

            this.setPaymentPlanInfo(this.formFields[4].value);
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  getPaymentPlans() {
    this.dataService
      .getHttp('society-api/PaymentPlan/getPaymentPlans', '')
      .subscribe(
        (response: any) => {
          this.paymentList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  setPaymentPlanInfo(item: any) {
    // if(this.formFields[33].value == ''){
    //   this.valid.apiInfoResponse('select affect date');
    //   this.formFields[4].value = '';
    //   return;
    // }
    this.dataService
      .getHttp(
        'society-api/PaymentPlan/getPaymentPlanDetail?paymentPlanID=' + item,
        ''
      )
      .subscribe(
        (response: any) => {
          this.paymentDetailList = response;
          // this.paymentDetailList = [];
          // var affectDate = new Date();
          // var tempDate = this.formFields[33].value;
          // for(var i = 0; i < response.length; i++){
          //   if(i > 0){
          //     if(response[0].durationID == 1){
          //       affectDate = new Date(tempDate.setMonth(tempDate.getMonth()+1))
          //     }else if(response[0].durationID == 2){
          //       affectDate = new Date(tempDate.setMonth(tempDate.getMonth()+3))
          //     }else{
          //       affectDate = new Date(tempDate.setMonth(tempDate.getMonth()+6))
          //     }
          //   }
          //   else{
          //     affectDate = this.formFields[33].value;
          //   }
          //   this.paymentDetailList.push({
          //     amount: response[i].amount,
          //     coaID: response[i].coaID,
          //     dueDate: affectDate,
          //     editMode: response[i].editMode,
          //     installmentID: response[i].installmentID,
          //     installmentTitle: response[i].installmentTitle,
          //     isDeleted: response[i].isDeleted,
          //     paymentNatureID: response[i].paymentNatureID,
          //     paymentNatureTitle: response[i].paymentNatureTitle,
          //     paymentPlanDetailId: response[i].paymentPlanDetailId,
          //     paymentPlanID: response[i].paymentPlanID
          //   })
          // }
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

  getMemberProfile() {
    this.dataService
      .getHttp('society-api/MemberProfile/getMemberProfile', '')
      .subscribe(
        (response: any) => {
          this.memberTable.tableData = response;
          this.memberList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  typeChange(item: any) {
    if (item == '1') {
      this.reset();
      this.formFields[1].value = '';
    } else {
      this.formFields[1].value = 'insert';
    }
  }
  
  typeChangeCnic(){
    this.formFields[9].value = '';
  }

  setCnicData() {
    if(this.rdbCnic == '1'){
      if(this.formFields[9].value.length == 3 || this.formFields[9].value.length == 6 )
      {
        this.formFields[9].value = this.formFields[9].value + '-';
      }
    }else{
      if(this.formFields[9].value.length == 5 || this.formFields[9].value.length == 13 )
      {
        this.formFields[9].value = this.formFields[9].value + '-';
      }
    }
  }

  memberChange(item: any) {
    var data = this.memberList.filter(
      (m: { memberProfileId: any }) => m.memberProfileId == item
    );

    var perCountry = this.tempCityList.filter(
      (j: { cityID: any }) => (j.cityID = data[0].permanentAddresscityId)
    );
    if (perCountry.length > 0) {
      this.cmbPermanentCountry = perCountry[0].countryId;
      this.getPermanentCity(this.cmbPermanentCountry);
    }

    var preCountry = this.tempCityList.filter(
      (l: { cityID: any }) => (l.cityID = data[0].presentAddresscityId)
    );
    if (preCountry.length > 0) {
      this.cmbPresentCountry = preCountry[0].countryId;
      this.getPresentCity(this.cmbPresentCountry);
    }

    if(data[0].memberCNIC.length == 13){
      this.rdbCnic = '1';
    }else{
      this.rdbCnic = '2';
    }
    // this.formFields[0].value = data[0].memberProfileId;
    this.formFields[5].value = '1';
    this.formFields[6].value = data[0].memberName;
    this.formFields[7].value = 'MEMBER';
    this.formFields[8].value = data[0].sdWofName;
    this.formFields[9].value = data[0].memberCNIC;
    this.formFields[10].value = data[0].designation;
    this.formFields[11].value = data[0].bps;
    this.formFields[12].value = data[0].memberDOB;
    this.formFields[15].value = data[0].mobileNo1;
    this.formFields[17].value = data[0].email;
    this.formFields[18].value = data[0].presentAddress;
    this.formFields[19].value = data[0].presentAddresscityId;
    this.formFields[20].value = data[0].permanentAddress;
    this.formFields[21].value = parseInt(data[0].permanentAddresscityId);
  }

  membershipChange(val: any) {
    this.lblCategory = '';
    this.lblNature = '';
    this.lblType = '';

    var item = this.plotList.filter(
      (x: { plotFileId: any }) => x.plotFileId == parseInt(val)
    );

    this.formFields[25].value = item[0].fileNo;
    this.lblCategory = item[0].plotCategoryTitle;
    this.lblNature = item[0].plotNatureTitle;
    this.lblType = item[0].plotTypeTitle;

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

      var memberData = this.memberTable.tableData.filter(
        (x: { plotfileId: any }) => x.plotfileId == parseInt(val)
      );

      if(memberData.length > 0){
        this.getMemberPlotFile(memberData[0].memberProfileId);
        var perCountry = this.tempCityList.filter(
          (j: { cityID: any }) => (j.cityID = memberData[0].permanentAddresscityId)
        );
        if (perCountry.length > 0) {
          this.cmbPermanentCountry = perCountry[0].countryId;
          this.getPermanentCity(this.cmbPermanentCountry);
        }
    
        var preCountry = this.tempCityList.filter(
          (l: { cityID: any }) => (l.cityID = memberData[0].presentAddresscityId)
        );
        if (preCountry.length > 0) {
          this.cmbPresentCountry = preCountry[0].countryId;
          this.getPresentCity(this.cmbPresentCountry);
        }
    
        if(memberData[0].memberCNIC.length == 13){
          this.rdbCnic = '1';
        }else{
          this.rdbCnic = '2';
        }
        this.formFields[0].value = memberData[0].memberProfileId;
        this.formFields[3].value = memberData[0].plotfileId;
        this.formFields[5].value = '1';
        this.formFields[6].value = memberData[0].memberName;
        this.formFields[7].value = 'MEMBER';
        this.formFields[8].value = memberData[0].sdWofName;
        this.formFields[9].value = memberData[0].memberCNIC;
        this.formFields[10].value = memberData[0].designation;
        this.formFields[11].value = memberData[0].bps;
        this.formFields[12].value = new Date(memberData[0].memberDOB);
        this.formFields[13].value = memberData[0].phoneNo1;
        this.formFields[14].value = memberData[0].phoneNo2;
        this.formFields[15].value = memberData[0].mobileNo1;
        this.formFields[16].value = memberData[0].mobileNo2;
        this.formFields[17].value = memberData[0].email;
        this.formFields[18].value = memberData[0].presentAddress;
        this.formFields[19].value = memberData[0].presentAddresscityId;
        this.formFields[20].value = memberData[0].permanentAddress;
        this.formFields[21].value = memberData[0].permanentAddresscityId;
        this.formFields[22].value = memberData[0].memberRemarks;
        this.formFields[23].value = memberData[0].applicationDate;
        this.formFields[24].value = new Date(memberData[0].memberShipDate);
    
        var imagePath = 'assets/ui/memberPictures/';
        if (memberData[0].memberPicture != '') {
          this.memberPic =
            environment.imageSavedPath +
            'memberPictures/' +
            memberData[0].memberProfileId +
            '.png';
        }
    
        if (memberData[0].applicationEDoc != '') {
          this.formFields[29].value = '';
          this.formFields[30].value = memberData[0].memberProfileId.toString();
        }
    
        // var data = this.plotList.filter(
        //   (x: { plotFileId: any }) =>
        //     x.plotFileId == parseInt(this.formFields[3].value)
        // );
    
        // if (data.length > 0) {
        //   this.lblCategory = data[0].plotCategoryTitle;
        //   this.lblNature = data[0].plotNatureTitle;
        //   this.lblType = data[0].plotTypeTitle;
        // }
      }
  
  }

  onFileSelected(event: any) {
    this.editMode = false;

    if (event.target.files[0].type == 'application/pdf') {
      this.selectedFile = <File>event.target.files[0];
      let reader = new FileReader();

      reader.onloadend = (e) => {
        this.formFields[29].value = reader.result;

        var splitFile = this.formFields[29].value.split(',')[1];
        this.formFields[29].value = splitFile;
        this.formFields[30].value = environment.imageUrl + 'memberFile';
      };

      reader.readAsDataURL(this.selectedFile);
    } else {
      this.valid.apiErrorResponse('Please Select PDF File');

      this.formFields[29].value = '';
      this.formFields[29].value = undefined;
      // this.filePicker = undefined;
      this.formFields[30].value = null;
      this.selectedFile = undefined;
    }
  }

  saveMemberProfile() {
    if (this.formFields[21].value == '') {
      this.formFields[21].value = '0';
    }
    if (this.formFields[10].value == '') {
      this.formFields[10].value = '0';
    }
    if (this.formFields[11].value == '') {
      this.formFields[11].value = '0';
    }
    if (this.formFields[34].value == '') {
      this.formFields[34].value = '0';
    }
    // alert(this.formFields[21].value);return
    this.formFields[26].value = this.imageUpload.image;
    this.formFields[28].value = this.imageUpload.imageExt;

    if (
      this.formFields[26].value != undefined &&
      this.formFields[26].value != ''
    ) {
      this.formFields[27].value = environment.imageUrl + 'memberPictures';
      // 'D:/logix/SocietyProject/Society/libs/ui/src/lib/assets/images/memberPictures';
    } else {
      this.formFields[26].value = '';
      this.formFields[27].value = '';
      this.formFields[28].value = '';
    }
    this.formFields[31].value = 'pdf';

    if(this.formFields[9].value == ''){
      this.valid.apiInfoResponse('enter cnic');
      return;
    } else {
      if(this.rdbCnic == '1'){
        if(this.formFields[9].value.length < 13){
          this.valid.apiInfoResponse("enter cnic");
          return;
        }
      }else{
        if(this.formFields[9].value.length < 15){
          this.valid.apiInfoResponse("enter cnic");
          return;
        }
      }
    }
    this.formFields;
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'society-api/MemberProfile/saveMemberProfile'
      )
      .subscribe(
        (response: any[]) => {
          console.log(response)
          if (response[0].includes('Success') == true) {
            if (this.formFields[0].value > 0) {
              this.valid.apiInfoResponse('Record updated successfully');
            } else {
              this.valid.apiInfoResponse('Record saved successfully');
            }
            this.getMemberProfile();
            this.reset();
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

  reset() {
    this.formFields = this.valid.resetFormFields(this.formFields);
    this.formFields[0].value = '0';
    this.formFields[8].value = '';
    this.formFields[9].value = '';
    this.formFields[12].value = '';
    this.formFields[15].value = '';
    this.formFields[17].value = '';
    this.formFields[20].value = '';
    this.formFields[21].value = '';
    this.formFields[32].value = '';
    this.rdbCnic = '2';
    // this.memberPic = 'http://i.pravatar.cc/500?img=7';
    this.memberPic = 'assets/ui/person.jpg';

    this.lblCategory = '';
    this.lblType = '';
    this.lblNature = '';
    this.cmbPermanentCountry = '';
    this.cmbPresentCountry = '';
    this.paymentDetailList = [];

    this.editMode = false;
  }

  openPDFFile() {
    var item = 'http://157.90.101.251:9000/assets/ui/memberFile/';
    // alert(this.formFields[30].value)
    // window.open(item + this.formFields[30].value + '.pdf');
    var div = document.getElementById('div1');
    div.innerHTML =
      '<iframe style="width:100%;height:100%;" frameborder="0" src="' +
      item +
      this.formFields[30].value +
      '.pdf' +
      '" />';
  }

  edit(item: any, obj: any) {
    this.editMode = true;

    // this.memberPic = 'http://i.pravatar.cc/500?img=7';
    this.memberPic = 'assets/ui/person.jpg';

    this.getMemberPlotFile(item.item.memberProfileId);
    var perCountry = this.tempCityList.filter(
      (j: { cityID: any }) => (j.cityID = item.item.permanentAddresscityId)
    );
    if (perCountry.length > 0) {
      this.cmbPermanentCountry = perCountry[0].countryId;
      this.getPermanentCity(this.cmbPermanentCountry);
    }

    var preCountry = this.tempCityList.filter(
      (l: { cityID: any }) => (l.cityID = item.item.presentAddresscityId)
    );
    if (preCountry.length > 0) {
      this.cmbPresentCountry = preCountry[0].countryId;
      this.getPresentCity(this.cmbPresentCountry);
    }

    if(item.item.memberCNIC.length == 13){
      this.rdbCnic = '1';
    }else{
      this.rdbCnic = '2';
    }
    this.formFields[0].value = item.item.memberProfileId;
    this.formFields[3].value = item.item.plotfileId;
    this.formFields[5].value = '1';
    this.formFields[6].value = item.item.memberName;
    this.formFields[7].value = 'MEMBER';
    this.formFields[8].value = item.item.sdWofName;
    this.formFields[9].value = item.item.memberCNIC;
    this.formFields[10].value = item.item.designation;
    this.formFields[11].value = item.item.bps;
    this.formFields[12].value = new Date(item.item.memberDOB);
    this.formFields[13].value = item.item.phoneNo1;
    this.formFields[14].value = item.item.phoneNo2;
    this.formFields[15].value = item.item.mobileNo1;
    this.formFields[16].value = item.item.mobileNo2;
    this.formFields[17].value = item.item.email;
    this.formFields[18].value = item.item.presentAddress;
    this.formFields[19].value = item.item.presentAddresscityId;
    this.formFields[20].value = item.item.permanentAddress;
    this.formFields[21].value = item.item.permanentAddresscityId;
    this.formFields[22].value = item.item.memberRemarks;
    this.formFields[23].value = item.item.applicationDate;
    this.formFields[24].value = new Date(item.item.memberShipDate);

    var imagePath = 'assets/ui/memberPictures/';
    if (item.item.memberPicture != '') {
      this.memberPic =
        environment.imageSavedPath +
        'memberPictures/' +
        item.item.memberProfileId +
        '.png';
    }

    if (item.item.applicationEDoc != '') {
      this.formFields[29].value = '';
      this.formFields[30].value = item.item.memberProfileId.toString();
    }

    var data = this.plotList.filter(
      (x: { plotFileId: any }) =>
        x.plotFileId == parseInt(this.formFields[3].value)
    );

    if (data.length > 0) {
      this.lblCategory = data[0].plotCategoryTitle;
      this.lblNature = data[0].plotNatureTitle;
      this.lblType = data[0].plotTypeTitle;
    }

    if (obj.num == '1') {
      this.tabIndex = 0;
    } else {
      this.dataService
        .deleteHttp(
          this.pageFields,
          this.formFields,
          'society-api/MemberProfile/saveMemberProfile'
        )
        .subscribe(
          (response: any[]) => {
            if (response[0].includes('Success') == true) {
              this.valid.apiInfoResponse('Record deleted successfully');
              this.getMemberProfile();
              this.reset();
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

  changeTabHeader(tabNum: any) {
    this.tabIndex = tabNum;
  }

  print(item: any){
    
    this.lblPMemberName = item.memberName;
    this.lblPSDWName = item.sdWofName;
    this.lblPCNIC = item.memberCNIC;
    this.lblPMobile = item.mobileNo1;
    this.lblPAddress = item.presentAddress;
    this.lblPMembershipDate = item.memberShipDate;
    this.lblPMembershipNo = item.fileNo;
    
    var data = this.plotList.filter(
      (x: { plotFileId: any }) =>
        x.plotFileId == parseInt(item.plotfileId)
    );

    if (data.length > 0) {
      this.lblPCategory = data[0].plotCategoryTitle;
      this.lblPNature = data[0].plotNatureTitle;
      this.lblPType = data[0].plotTypeTitle;
    }

    setTimeout(()=>this.globalService.printData('#print-member'), 200);

  }
}
