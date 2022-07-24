import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, VerifyPinInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

declare var $: any;

@Component({
  selector: 'society-pin-modal',
  templateUrl: './pin-modal.component.html',
  styleUrls: ['./pin-modal.component.scss']
})
export class PinModalComponent implements OnInit {

  @Output() pinEventEmitter = new EventEmitter();

  pageFields: VerifyPinInterface = {
    newUserId: '0',
    pinCode: '',
  }
  formFields: MyFormField[] = [
    {
      value: this.pageFields.newUserId,
      msg: '',
      type: 'label',
      required: true,
    },
    {
      value: this.pageFields.pinCode,
      msg: 'enter pin',
      type: 'textbox',
      required: true,
    },
  ]

  txtPin: any;
  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
  ) { }

  ngOnInit(): void {
  }

  verifyPin(){
    this.formFields[0].value = this.globalService.getUserId().toString();
    this.formFields[1].value = this.txtPin;

    console.log(this.formFields);
    this.dataService
    .pintHttp(
      this.pageFields,
      this.formFields,
      'user-api/User/verifyPin'
    )
    .subscribe(
      (response: any) => {
        
        if(response == 'Success'){
          $("#pinModal").modal("hide");
          this.pinStatus(1);
          this.valid.apiInfoResponse('User Verified');
        }else{
          this.valid.apiErrorResponse(response);
        }
        this.reset();
      },
      (error: any) => {
        this.error = error;
        this.valid.apiErrorResponse(this.error);
      }
    );

  }

  pinStatus(item: any){
    this.pinEventEmitter.emit(item);
  }

  reset(){
    this.txtPin = '';
  }

  openModal(){
    $("#pinModal").modal("show");
  }
  
}
