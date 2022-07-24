import {
  ANALYZE_FOR_ENTRY_COMPONENTS,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MyFormField,
  RoleInterface,
  UserCreationInterface,
} from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { UsersTableComponent } from 'libs/umis-blocks/src/lib/users-table/users-table.component';

@Component({
  selector: 'society-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild(UsersTableComponent) userTable: any;

  pageFields: UserCreationInterface = {
    newUserId: '0',
    spType: '',
    loginID: '',
    name: '',
    loginname: '',
    hashpassword: '',
    cnfrmPassword: '',
    roleID: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.newUserId,
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
      value: this.pageFields.loginID,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.name,
      msg: 'enter full name',
      type: 'name',
      required: true,
    },
    {
      value: this.pageFields.loginname,
      msg: 'enter email',
      type: 'email',
      required: true,
    },
    {
      value: this.pageFields.hashpassword,
      msg: 'enter password',
      type: 'password',
      required: false,
    },
    {
      value: this.pageFields.cnfrmPassword,
      msg: 'enter confirm password',
      type: 'password',
      required: false,
    },
    {
      value: this.pageFields.roleID,
      msg: 'select role',
      type: 'selectbox',
      required: true,
    },
  ];

  rolesList: any = [];
  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.getRole();

    this.globalService.setHeaderTitle('Application Users');
    this.formFields[2].value = this.globalService.getUserId().toString();
  }

  getRole() {
    this.dataService
      .getHttp('user-api/UserRole/getRoles', '')
      .subscribe((response: any) => {
        this.rolesList = response;
      });
  }

  saveUser() {
    if (
      this.formFields[5].value != this.formFields[6].value &&
      this.formFields[6].value != undefined &&
      this.formFields[5].value != undefined
    ) {
      this.valid.apiInfoResponse('Password not match');
    } else {
      this.dataService
        .savetHttp(
          this.pageFields,
          this.formFields,
          'user-api/UserCreation/saveUserCreation'
        )
        .subscribe(
          (response: any[]) => {
            if(response[0].includes('Success') == true){
              if (this.formFields[0].value > 0) {
                this.valid.apiInfoResponse('user updated successfully');
              } else {
                this.valid.apiInfoResponse('user added successfully');
              }
              this.userTable.getUsers();
              this.reset();
            }else{
              this.valid.apiErrorResponse(response[0])
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
    this.formFields[0].value = '0';
    this.formFields[5].value = '';
    this.formFields[6].value = '';

  }

  edit(item: any, obj: any) {
    this.formFields[3].value = item.item.empName;
    this.formFields[4].value = item.item.loginName;
    this.formFields[7].value = item.item.roleId;
    this.formFields[0].value = item.item.userID;
    this.formFields[5].value = 'test@123';
    this.formFields[6].value = 'test@123';

    if (obj.num == '2') {
      this.dataService
        .deleteHttp(
          this.pageFields,
          this.formFields,
          'user-api/UserCreation/saveUserCreation'
        )
        .subscribe(
          (response: any[]) => {
            this.valid.apiInfoResponse('Record deleted successfully');
            this.userTable.getUsers();
            this.reset();
          },
          (error: any) => {
            this.error = error;
            this.valid.apiErrorResponse(this.error);
          }
        );
    }
  }
}
