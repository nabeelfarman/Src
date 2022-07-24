import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import {
  CareOffInterface,
  InPersonInterface,
  MyFormField,
} from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { PinModalComponent } from 'libs/blocks/src/lib/components/pin-modal/pin-modal.component';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { empty, Observable, Subject } from 'rxjs';
import { InpersonVerificationTableComponent } from './inperson-verification-table/inperson-verification-table.component';

declare var $: any;

@Component({
  selector: 'society-inperson-verification',
  templateUrl: './inperson-verification.component.html',
  styleUrls: ['./inperson-verification.component.scss'],
})
export class InpersonVerificationComponent implements OnInit {
  @Output() callFunctionEmitter = new EventEmitter();

  @ViewChild(InpersonVerificationTableComponent) inPersonTable: any;
  @ViewChild(PinModalComponent) pinModal: any;

  rdbVerify: any;
  rdbExempt: any;
  mode: any;
  selectedFile: File | undefined;
  coStatus = false;

  cmbPresentCountry: string = '';
  cmbCOCountry: string = '';
  cmbPermanentCountry: string = '';
  image: string = '';
  imageCareOff: string = '';

  pageFields: InPersonInterface = {
    newInpersonId: '0',
    spType: '',
    userid: '',
    plotFileId: '',
    memberProfileId: '',
    memberName: '',
    sDWofName: '',
    memberCNIC: '',
    memberDOB: '',
    mobileNo1: '',
    email: '',
    presentAddress: '',
    presentAddresscityId: '',
    permanentAddress: '',
    permanentAddresscityId: '',
    memberPicturePath: '',
    memberPicture: '',
    memberPictureExtension: '',
    fingerPrint1: '',
    fingerPrint2: '',
    memberType: '',
    newinPersonCareofId: '0',
    transferId: '0',
    inpersonDate: '',
    memberMode: '',
  };

  pageFieldsCareOff: CareOffInterface = {
    newInpersonCareOfId: '0',
    spType: '',
    userid: '',
    memberName: '',
    SDWofName: '',
    memberCNIC: '',
    mobileNo1: '',
    email: '',
    presentAddress: '',
    presentAddresscityId: '',
    permanentAddress: '',
    // permanentAddresscityId: '',
    memberPicturePath: '',
    memberPicture: '',
    memberPictureExtension: '',
    fingerPrint1: '',
    attorneyPath: '',
    attorney: '',
    attorneyExtension: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.newInpersonId,
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
      msg: 'select membership no',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.memberProfileId,
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
      value: this.pageFields.sDWofName,
      msg: 'enter SDW Name',
      type: 'name',
      required: false,
    },
    {
      value: this.pageFields.memberCNIC,
      msg: 'enter member cnic',
      type: 'cnic',
      required: true,
    },
    {
      value: this.pageFields.memberDOB,
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
      value: this.pageFields.email,
      msg: 'enter email',
      type: 'email',
      required: false,
    },
    {
      value: this.pageFields.presentAddress,
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
      value: this.pageFields.memberPicturePath,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.memberPicture,
      msg: 'please take picture',
      type: 'File',
      required: true,
    },
    {
      value: this.pageFields.memberPictureExtension,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.fingerPrint1,
      msg: 'enter finger print1',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.fingerPrint2,
      msg: 'enter finger print2',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.memberType,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.newinPersonCareofId,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.transferId,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.inpersonDate,
      msg: 'select in-person date',
      type: 'datetime',
      required: true,
    },
    {
      value: this.pageFields.memberMode,
      msg: '',
      type: '',
      required: false,
    },
  ];

  formFieldsCareOff: MyFormField[] = [
    {
      value: this.pageFieldsCareOff.newInpersonCareOfId,
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
      value: this.pageFieldsCareOff.memberName,
      msg: 'enter member name',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFieldsCareOff.SDWofName,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFieldsCareOff.memberCNIC,
      msg: 'enter member cnic',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFieldsCareOff.mobileNo1,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFieldsCareOff.email,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFieldsCareOff.presentAddress,
      msg: 'enter address',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFieldsCareOff.presentAddresscityId,
      msg: 'select present address city',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFieldsCareOff.permanentAddress,
      msg: '',
      type: '',
      required: false,
    },
    // {
    //   value: this.pageFieldsCareOff.permanentAddresscityId,
    //   msg: 'select permanent address city',
    //   type: '',
    //   required: false,
    // },
    {
      value: this.pageFieldsCareOff.memberPicturePath,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFieldsCareOff.memberPicture,
      msg: 'please take picture',
      type: 'File',
      required: true,
    },
    {
      value: this.pageFieldsCareOff.memberPictureExtension,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFieldsCareOff.fingerPrint1,
      msg: 'enter finger print1',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFieldsCareOff.attorneyPath,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFieldsCareOff.attorney,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFieldsCareOff.attorneyExtension,
      msg: '',
      type: '',
      required: false,
    },
  ];

  // declaration
  showWebcam: boolean = true;
  videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  errors: WebcamInitError[] = [];
  public webcamImage: WebcamImage = null;
  public webcamImageCO: WebcamImage = null;
  private trigger: Subject<void> = new Subject<void>();
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();

  error: any;
  result: any;
  tabIndex = 0;

  plotList: any = [];
  memberList: any = [];
  countryList: any = [];
  presentCityList: any = [];
  permanentCityList: any = [];
  tempCityList: any = [];
  coCityList: any = [];

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  cnicMask = this.globalService.cnicMask();
  mobileMask = this.globalService.mobileMask();

  ngOnInit(): void {
    this.globalService.setHeaderTitle('In-Person Verification');
    this.formFields[2].value = this.globalService.getUserId().toString();
    this.formFieldsCareOff[2].value = this.globalService.getUserId().toString();

    this.getCountry();
    this.getCity();
  }

  getInPerson() {
    this.dataService.getHttp('society-api/InPerson/getInPerson', '').subscribe(
      (response: any) => {
        // this.inPersonTable.tableData = response;
        // console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getCareOff(item: any) {
    this.dataService
      .getHttp('society-api/InPerson/getInPersonCareOff?inPersonId=' + item, '')
      .subscribe(
        (response: any) => {
          if (response.length > 0) {
            var country = this.tempCityList.filter(
              (j: { cityID: any }) =>
                (j.cityID = response[0].careOfpresentAddressCityId)
            );
            if (country.length > 0) {
              this.cmbCOCountry = country[0].countryId;
              this.getCOCity(this.cmbCOCountry);
            }
            this.formFieldsCareOff[0].value = response[0].inPersonCareOfId;
            this.formFieldsCareOff[3].value = response[0].careOfName;
            this.formFieldsCareOff[4].value = response[0].careOfSDWOfName;
            this.formFieldsCareOff[5].value = response[0].careOfCNIC;
            this.formFieldsCareOff[6].value = response[0].careOfmobileNo1;
            this.formFieldsCareOff[7].value = response[0].careOfEmail;
            this.formFieldsCareOff[8].value = response[0].careOfpresentAddress;
            this.formFieldsCareOff[9].value =
              response[0].careOfpresentAddressCityId;
            this.formFieldsCareOff[10].value =
              response[0].careOfpermanentAddress;
            this.formFieldsCareOff[14].value = response[0].careOffingerPrint1;

            var imagePath = 'assets/ui/inPersonPictures/';
            if (response[0].careOfpicture != '') {
              this.formFieldsCareOff[12].value = response[0].careOfpicture;
              this.formFieldsCareOff[11].value =
                imagePath + response[0].inPersonId + '.png';
            }
          }
        },
        (error: any) => {
          console.log(error);
        }
      );
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

  getCOCity(item: any) {
    this.dataService
      .getHttp('company-api/Company/getCity?countryId=' + item, '')
      .subscribe(
        (response: any) => {
          this.coCityList = response;
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

  getPlotFile(item: any) {
    this.memberList = [];
    this.plotList = [];
    this.formFields[3].value = '';
    this.formFields[4].value = '';
    this.formFields[5].value = '';
    this.formFields[6].value = '';
    this.formFields[7].value = '';
    this.formFields[8].value = '';
    this.formFields[9].value = '';
    this.formFields[10].value = '';
    this.formFields[11].value = '';
    this.formFields[12].value = '';
    this.formFields[13].value = '';
    this.formFields[14].value = '';
    this.formFields[20].value = '';

    if (item == 1) {
      this.dataService
        .getHttp('society-api/InPerson/getActiveMemberPlotFile', '')
        .subscribe(
          (response: any) => {
            this.plotList = response;
          },
          (error: any) => {
            console.log(error);
          }
        );
    } else {
      this.dataService
        .getHttp('society-api/InPerson/getInPersonMemberPlotFile', '')
        .subscribe(
          (response: any) => {
            this.plotList = response;
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  membershipChange(item: any) {
    this.memberList = [];
    this.formFields[4].value = '';
    this.formFields[5].value = '';
    this.formFields[6].value = '';
    this.formFields[7].value = '';
    this.formFields[8].value = '';
    this.formFields[9].value = '';
    this.formFields[10].value = '';
    this.formFields[11].value = '';
    this.formFields[12].value = '';
    this.formFields[13].value = '';
    this.formFields[14].value = '';
    this.formFields[20].value = '';
    this.formFields[22].value = '';

    if (this.rdbVerify == 1) {
      setTimeout(
        () =>
          (this.memberList = this.plotList.filter(
            (x: { plotFileId: any }) => x.plotFileId == item
          )),
        300
      );
    } else {
      var data = this.plotList.filter(
        (x: { plotFileId: any }) => x.plotFileId == item
      );

      if (data.length > 0) this.formFields[22].value = data[0].transferId;

      this.dataService
        .getHttp(
          'society-api/InPerson/getTransferMemberProfile?plotID=' + item,
          ''
        )
        .subscribe(
          (response: any) => {
            this.memberList = response;
          },
          (error: any) => {
            console.log(error);
          }
        );
    }
  }

  memberChange(item: any) {
    var data = this.memberList.filter(
      (x: { memberProfileId: any }) => x.memberProfileId == item
    );

    if (this.rdbVerify == 1) {
      this.formFields[24].value = 'Seller';
    } else if (this.rdbVerify == 2) {
      this.formFields[24].value = data[0].mode;
    }

    var perCountry = this.tempCityList.filter(
      (j: { cityID: any }) => (j.cityID = data[0].permanentAddressCityID)
    );
    if (perCountry.length > 0) {
      this.cmbPermanentCountry = perCountry[0].countryId;
      this.getPermanentCity(this.cmbPermanentCountry);
    }

    var preCountry = this.tempCityList.filter(
      (l: { cityID: any }) => (l.cityID = data[0].presentAddressCityID)
    );
    if (preCountry.length > 0) {
      this.cmbPresentCountry = preCountry[0].countryId;
      this.getPresentCity(this.cmbPresentCountry);
    }

    this.formFields[5].value = data[0].memberName;
    this.formFields[6].value = data[0].sdWofName;
    this.formFields[7].value = data[0].memberCNIC;
    this.formFields[8].value = new Date(data[0].memberDOB);
    this.formFields[9].value = data[0].mobileNo1;
    this.formFields[10].value = data[0].email;
    this.formFields[11].value = data[0].presentAddress;
    this.formFields[12].value = data[0].presentAddressCityID;
    this.formFields[13].value = data[0].permanentAddress;
    this.formFields[14].value = data[0].permanentAddressCityID;
    this.formFields[20].value = 'Member';
  }

  handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;
  }

  handleImageCO(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImageCO = webcamImage;
  }

  triggerSnapshot(): void {
    this.trigger.next();
    this.image = 'take';
  }

  triggerSnapshotCO(): void {
    this.trigger.next();
    this.imageCareOff = 'take';
    this.image = 'take';
    // console.log(this.webcamImageCO.imageAsDataUrl);
  }

  toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  saveInPerson() {
    if (this.formFields[22].value == '') {
      this.formFields[22].value = '0';
    }

    this.formFields[18].value = '4AAQSkZJRgABAQAAAQABAAD';
    this.formFields[19].value = '4AAQSkZJRgABAQAAAQABAAD';

    if (this.formFields[21].value != 0) {
      this.formFields[17].value = 'png';

      this.formFields[16].value =
        'D:/logix/SocietyProject/Society/libs/ui/src/lib/assets/images/inPersonPictures';
    } else {
      if (this.image == 'take') {
        this.formFields[15].value = this.webcamImage.imageAsDataUrl.split(
          ','
        )[1];
        this.formFields[17].value = 'png';

        this.formFields[16].value =
          'D:/logix/SocietyProject/Society/libs/ui/src/lib/assets/images/inPersonPictures';
      } else {
        if (this.image == 'edit') {
          this.formFields[16].value = 'null';
          this.formFields[15].value = 'null';
          this.formFields[17].value = '';
        } else {
          this.formFields[16].value = '';
          this.formFields[15].value = '';
          this.formFields[17].value = '';
        }
      }
    }

    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'society-api/InPerson/saveInPerson'
      )
      .subscribe(
        (response: any[]) => {
          if (response[0].includes('Success') == true) {
            if (this.formFields[0].value > 0) {
              this.valid.apiInfoResponse('Record updated successfully');
            } else {
              this.valid.apiInfoResponse('Record saved successfully');
            }
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

  saveCareOff() {
    this.formFieldsCareOff[14].value = '4AAQSkZJRgABAQAAAQABAAD';

    if (this.imageCareOff == 'take') {
      this.formFieldsCareOff[11].value = this.webcamImageCO.imageAsDataUrl.split(
        ','
      )[1];
      this.formFieldsCareOff[13].value = 'png';

      this.formFieldsCareOff[12].value =
        'D:/logix/SocietyProject/Society/libs/ui/src/lib/assets/images/CareOffPictures';
    } else {
      if (this.image == 'edit') {
        this.formFieldsCareOff[11].value = 'null';
        this.formFieldsCareOff[12].value = 'null';
        this.formFieldsCareOff[13].value = '';
      } else {
        this.formFieldsCareOff[11].value = '';
        this.formFieldsCareOff[12].value = '';
        this.formFieldsCareOff[13].value = '';
      }
    }

    if (this.mode == 'Seller') {
      if (this.rdbExempt == undefined || this.rdbExempt == '') {
        this.valid.apiInfoResponse('please select exempt type');
        return;
      } else if (this.formFieldsCareOff[16].value == '') {
        this.valid.apiInfoResponse('please attach power of attorney');
        return;
      }

      this.formFieldsCareOff[17].value = 'pdf';
    }

    this.formFieldsCareOff;
    this.dataService
      .savetHttp(
        this.pageFieldsCareOff,
        this.formFieldsCareOff,
        'society-api/InPerson/saveInPersonCareOff'
      )
      .subscribe(
        (response: any[]) => {
          if (response[0].includes('Success') == true) {
            this.result = this.valid.splitResponse(response[0].toString());
            if (this.formFieldsCareOff[0].value > 0) {
              this.valid.apiInfoResponse('Record updated successfully');
            } else {
              this.valid.apiInfoResponse('Record saved successfully');
            }

            if (this.result != undefined || this.result != '') {
              this.formFields[21].value = this.result;
              this.formFields[15].value = this.webcamImageCO.imageAsDataUrl.split(
                ','
              )[1];
              $('#myModal').modal('hide');
            }
          } else {
            this.valid.apiErrorResponse(response[0]);
          }
          // this.resetCareOff();
        },
        (error: any) => {
          this.error = error;
          this.valid.apiErrorResponse(this.error);
        }
      );
  }

  deleteCareOff() {
    if (this.formFieldsCareOff[0].value == 0) {
      this.valid.apiErrorResponse('not item selected');
      return;
    }
    this.formFieldsCareOff[14].value = '4AAQSkZJRgABAQAAAQABAAD';

    if (this.imageCareOff == 'take') {
      this.formFieldsCareOff[11].value = this.webcamImageCO.imageAsDataUrl.split(
        ','
      )[1];
      this.formFieldsCareOff[13].value = 'png';

      this.formFieldsCareOff[12].value =
        'D:/logix/SocietyProject/Society/libs/ui/src/lib/assets/images/CareOffPictures';
    } else {
      if (this.image == 'edit') {
        this.formFieldsCareOff[11].value = 'null';
        this.formFieldsCareOff[12].value = 'null';
        this.formFieldsCareOff[13].value = '';
      } else {
        this.formFieldsCareOff[11].value = '';
        this.formFieldsCareOff[12].value = '';
        this.formFieldsCareOff[13].value = '';
      }
    }

    if (this.mode == 'Seller') {
      if (this.rdbExempt == undefined || this.rdbExempt == '') {
        this.valid.apiInfoResponse('please select exempt type');
        return;
      } else if (this.formFieldsCareOff[16].value == '') {
        this.valid.apiInfoResponse('please attach power of attorney');
        return;
      }

      this.formFieldsCareOff[17].value = 'pdf';
    }

    this.formFieldsCareOff;
    this.dataService
      .savetHttp(
        this.pageFieldsCareOff,
        this.formFieldsCareOff,
        'society-api/InPerson/saveInPersonCareOff'
      )
      .subscribe(
        (response: any[]) => {
          if (response[0].includes('Success') == true) {
            this.result = this.valid.splitResponse(response[0].toString());
            if (this.formFieldsCareOff[0].value > 0) {
              this.valid.apiInfoResponse('Record updated successfully');
            } else {
              this.valid.apiInfoResponse('Record saved successfully');
            }

            if (this.result != undefined || this.result != '') {
              this.formFields[21].value = this.result;
              this.formFields[15].value = this.webcamImageCO.imageAsDataUrl.split(
                ','
              )[1];
              $('#myModal').modal('hide');
            }
          } else {
            this.valid.apiErrorResponse(response[0]);
          }
          // this.resetCareOff();
        },
        (error: any) => {
          this.error = error;
          this.valid.apiErrorResponse(this.error);
        }
      );
  }

  reset() {
    this.image = '';
    this.imageCareOff = '';
    this.webcamImageCO = null;
    this.webcamImage = null;
    this.rdbVerify = 0;

    this.formFields = this.valid.resetFormFields(this.formFields);
    this.formFields[0].value = '0';
    this.formFields[6].value = '';
    this.formFields[8].value = '';
    this.formFields[9].value = '';
    this.formFields[10].value = '';

    this.formFieldsCareOff = this.valid.resetFormFields(this.formFieldsCareOff);
    this.formFieldsCareOff[0].value = '0';
    this.formFieldsCareOff[4].value = '';
    this.formFieldsCareOff[6].value = '';
    this.formFieldsCareOff[7].value = '';
    this.formFieldsCareOff[10].value = '';

    this.cmbCOCountry = '';
    this.cmbPermanentCountry = '';
    this.cmbPresentCountry = '';

    this.coCityList = [];
    this.presentCityList = [];
    this.permanentCityList = [];
    this.memberList = [];
    this.plotList = [];
  }

  edit(item: any, obj: any) {
    this.webcamImage = undefined;
    this.webcamImageCO = undefined;

    if (item.item.transferId == 0) {
      this.rdbVerify = '1';
    } else {
      this.rdbVerify = '2';
    }

    this.getPlotFile(this.rdbVerify);
    this.membershipChange(item.item.plotFileId);

    var perCountry = this.tempCityList.filter(
      (j: { cityID: any }) => (j.cityID = item.item.permanentAddressCityId)
    );
    if (perCountry.length > 0) {
      this.cmbPermanentCountry = perCountry[0].countryId;
      this.getPermanentCity(this.cmbPermanentCountry);
    }

    var preCountry = this.tempCityList.filter(
      (l: { cityID: any }) => (l.cityID = item.item.presentAddressCityID)
    );
    if (preCountry.length > 0) {
      this.cmbPresentCountry = preCountry[0].countryId;
      this.getPresentCity(this.cmbPresentCountry);
    }

    this.formFields[0].value = item.item.inPersonID;
    this.formFields[3].value = item.item.plotFileId;
    this.formFields[4].value = item.item.memberProfileId;

    this.formFields[5].value = item.item.memberName;
    this.formFields[20].value = 'MEMBER';
    this.formFields[6].value = item.item.sdWofName;
    this.formFields[7].value = item.item.memberCNIC;
    this.formFields[8].value = new Date(item.item.memberDOB);
    this.formFields[9].value = item.item.mobileNo1;
    this.formFields[10].value = item.item.email;
    this.formFields[11].value = item.item.presentAddress;
    this.formFields[12].value = item.item.presentAddressCityID;
    this.formFields[13].value = item.item.permanentAddress;
    this.formFields[14].value = item.item.permanentAddressCityId;
    this.formFields[18].value = item.item.fingerPrint1;
    this.formFields[19].value = item.item.fingerPrint2;
    this.formFields[22].value = item.item.transferId;

    var imagePath = 'assets/ui/inPersonPictures/';
    if (item.item.memberPicture != '') {
      this.image = 'edit';
      this.formFields[15].value = imagePath + item.item.inPersonID + '.png';
      this.formFields[16].value = item.item.inPersonID.toString();
    }

    this.getCareOff(item.item.inPersonID);

    if (obj.num == '1') {
      this.tabIndex = 0;
    } else {
      this.dataService
        .deleteHttp(
          this.pageFields,
          this.formFields,
          'society-api/InPerson/saveInPerson'
        )
        .subscribe(
          (response: any[]) => {
            if (response[0].includes('Success') == true) {
              this.valid.apiInfoResponse('Record deleted successfully');
              this.inPersonTable.getInPersonNotActive();
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

  checkMemberMode() {
    var data = this.memberList.filter(
      (x: { memberProfileId: any }) =>
        x.memberProfileId == this.formFields[4].value
    );

    this.mode = data[0].mode;

    $('#myModal').modal('show');
  }

  changeTabHeader(tabNum: any) {
    this.tabIndex = tabNum;
  }

  onFileSelected(event: any) {
    if (event.target.files[0].type == 'application/pdf') {
      this.selectedFile = <File>event.target.files[0];
      let reader = new FileReader();

      reader.onloadend = (e) => {
        this.formFieldsCareOff[15].value = reader.result;

        var splitFile = this.formFieldsCareOff[15].value.split(',')[1];
        this.formFieldsCareOff[15].value = splitFile;
        this.formFieldsCareOff[16].value =
          'D:/logix/SocietyProject/Society/libs/ui/src/lib/assets/images/Attorney';
      };

      reader.readAsDataURL(this.selectedFile);
    } else {
      this.valid.apiErrorResponse('Please Select PDF File');

      this.formFieldsCareOff[15].value = '';
      this.formFieldsCareOff[15].value = undefined;
      this.formFieldsCareOff[16].value = null;
      this.selectedFile = undefined;
    }
  }

  changeExemptStatus(item: any) {
    if (item == 1) {
      this.pinModal.openModal();
      this.coStatus = true;
    } else {
      this.coStatus = false;
    }
  }

  pinStatus(item: any) {
    if (item == 1) {
      this.coStatus = false;
    }
  }

  getInPersonDetail(item: any) {
    this.rdbVerify = '2';
    this.getPlotFile(this.rdbVerify);
    this.membershipChange(item.plotFileId);

    // console.log(item)
    setTimeout(() => this.setInPersonDetail(item), 200);
  }

  setInPersonDetail(item: any) {
    this.formFields[3].value = item.plotFileId;
    this.formFields[4].value = item.memberProfileId;

    var perCountry = this.tempCityList.filter(
      (j: { cityID: any }) => (j.cityID = item.permanentAddressCityId)
    );
    if (perCountry.length > 0) {
      this.cmbPermanentCountry = perCountry[0].countryId;
      this.getPermanentCity(this.cmbPermanentCountry);
    }

    var preCountry = this.tempCityList.filter(
      (l: { cityID: any }) => (l.cityID = item.presentAddressCityID)
    );
    if (preCountry.length > 0) {
      this.cmbPresentCountry = preCountry[0].countryId;
      this.getPresentCity(this.cmbPresentCountry);
    }

    this.formFields[5].value = item.memberName;
    // this.formFields[20].value = 'MEMBER';
    this.formFields[6].value = item.sdWofName;
    this.formFields[7].value = item.memberCNIC;
    this.formFields[8].value = new Date(item.memberDOB);
    this.formFields[9].value = item.mobileNo1;
    this.formFields[10].value = item.email;
    this.formFields[11].value = item.presentAddress;
    this.formFields[12].value = item.presentAddressCityID;
    this.formFields[13].value = item.permanentAddress;
    this.formFields[14].value = item.permanentAddressCityId;
    this.formFields[22].value = item.transferId;
    this.formFields[24].value = item.mode;
  }
}
