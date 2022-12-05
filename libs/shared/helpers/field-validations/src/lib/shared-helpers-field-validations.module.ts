import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Route } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

// app elements
import { MyFormField } from '@society/shared/interface';

export const sharedHelpersFieldValidationsRoutes: Route[] = [];

@NgModule({
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
    }),
  ],
  providers: [DatePipe],
})
export class SharedHelpersFieldValidationsModule {
  private found!: boolean;

  constructor(private toastr: ToastrService, private datePipe: DatePipe) {}

  showToastr() {
    this.toastr.success('Yahoo ho gaya kaam!');
  }

  validateToastr(validate: MyFormField[]): boolean {
    this.found = true;

    for (let i = 0; i < validate.length && this.found == true; i++) {
      if (
        (validate[i].value == '' ||
          validate[i].value == undefined ||
          validate[i].value == '0' ||
          validate[i].value == null) &&
        validate[i].required == true
      ) {
        if (validate[i].type == 'name') {
          this.found = this.validateName(validate[i].value, validate[i].msg);
        } else if (validate[i].type == 'email') {
          this.found = this.validateEmail(validate[i].value, validate[i].msg);
        } else if (validate[i].type == 'ntn') {
          this.found = this.validateNTN(validate[i].value, validate[i].msg);
        } else if (validate[i].type == 'mobile') {
          this.found = this.validateMobile(validate[i].value, validate[i].msg);
        } else if (validate[i].type == 'phone') {
          this.found = this.validatePhone(validate[i].value, validate[i].msg);
        } else if (validate[i].type == 'cnic') {
          this.found = this.validateCNIC(validate[i].value, validate[i].msg);
        } else if (validate[i].type == 'password') {
          this.found = this.validPasswordStrength(
            validate[i].value,
            validate[i].msg
          );
        } else {
          this.toastr.info(validate[i].msg);
          this.found = false;
        }
      } else {
        if (validate[i].type == 'name' && validate[i].value.length != 0) {
          this.found = this.validateName(validate[i].value, validate[i].msg);
        } else if (
          validate[i].type == 'email' &&
          validate[i].value.length != 0
        ) {
          this.found = this.validateEmail(validate[i].value, validate[i].msg);
        } else if (validate[i].type == 'ntn' && validate[i].value.length != 0) {
          this.found = this.validateNTN(validate[i].value, validate[i].msg);
        } else if (
          validate[i].type == 'mobile' &&
          validate[i].value.length != 0
        ) {
          this.found = this.validateMobile(validate[i].value, validate[i].msg);
        } else if (
          validate[i].type == 'phone' &&
          validate[i].value.length != 0
        ) {
          this.found = this.validatePhone(validate[i].value, validate[i].msg);
        } else if (
          validate[i].type == 'cnic' &&
          validate[i].value.length != 0
        ) {
          this.found = this.validateCNIC(validate[i].value, validate[i].msg);
        } else if (
          validate[i].type == 'password' &&
          validate[i].value.length != 0
        ) {
          this.found = this.validPasswordStrength(
            validate[i].value,
            validate[i].msg
          );
        }
      }
    }

    return this.found;
  }
  // api response send error msg rather than data
  apiErrorResponse(errorMsg: string) {
    this.toastr.error(errorMsg);
  }

  apiSuccessResponse(msg: string) {
    this.toastr.success(msg);
  }

  apiInfoResponse(msg: string) {
    this.toastr.info(msg);
  }

  resetFormFields(formFields: MyFormField[]): MyFormField[] {
    for (let i = 0; i < formFields.length; i++) {
      if (formFields[i].required == true) {
        formFields[i].value = '';
      }
    }
    return formFields;
  }

  // //web service response split
  splitResponse(response: string): string {
    return response.split('|||')[1];
  }

  // // changeDateFormat
  // fields value validations and formatting
  dateFormat(date?: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd').toString();
  }

  validateName(nameStr: string, msg: string): boolean {
    // var regEx = /^[a-z][a-z\s]*$/;
    var regEx = /^[A-Za-z ]+$/;
    if (nameStr.match(regEx)) {
      return true;
    } else {
      this.showMsg(msg, 'invalid');
      return false;
    }
  }

  validateEmail(email: string, msg: string): boolean {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email)) {
      this.showMsg(msg, 'invalid');
      return false;
    } else {
      return true;
    }
  }

  validateNTN(ntn: string, msg: string): boolean {
    if (ntn.length == 9) {
      return true;
    } else {
      this.showMsg(msg, 'invalid');
      return false;
    }
  }

  validateMobile(mobile: string, msg: string): boolean {
    if (mobile.length == 12 && !this.validateMaskFieldCharacter(mobile)) {
      return true;
    } else {
      this.showMsg(msg, 'invalid');
      return false;
    }
  }

  validatePhone(phone: string, msg: string): boolean {
    if (phone.length == 11 && !this.validateMaskFieldCharacter(phone)) {
      return true;
    } else {
      this.showMsg(msg, 'invalid');
      return false;
    }
  }

  validateCNIC(cnic: string, msg: string): boolean {
    if (cnic.length == 15 && !this.validateMaskFieldCharacter(cnic)) {
      return true;
    } else {
      this.showMsg(msg, 'invalid');
      return false;
    }
  }

  validPasswordStrength(password: string, msg: string): boolean {
    var letterNumber = /^[0-9a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;

    if (password.length > 7) {
      if (password.match(letterNumber)) {
        return true;
      } else {
        this.showMsg(msg, 'alphabets, special character and digit allowed in ');
        return false;
      }
    } else {
      this.showMsg(msg, 'minimum 8 characters in ');
      return false;
    }
  }
  showMsg(msg: string, rep: string) {
    this.toastr.info(msg.replace('enter', rep));
  }

  validateMaskFieldCharacter(val: string): boolean {
    // alert(val);
    // alert(val.includes('_'));
    return val.includes('_');
  }
}
