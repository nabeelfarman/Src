import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  RoleInterface,
  RoleMenuInterface,
  RoleModuleInterface,
  MyFormField,
} from '@society/shared/interface';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { RolesTableComponent } from 'libs/umis-blocks/src/lib/roles-table/roles-table.component';

@Component({
  selector: 'society-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent implements OnInit {
  // @ViewChild('selectedMenuItems') selectedMenuItems!: ElementRef;
  @ViewChild(RolesTableComponent) roleTable: any;

  pageFields: RoleInterface = {
    newRoleId: '0',
    spType: '',
    userId: '',
    roleTitle: '',
    roleDescription: '',
    json: [],
  };
  formFields: MyFormField[] = [
    {
      value: this.pageFields.newRoleId,
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
      value: this.pageFields.roleTitle,
      msg: 'enter role title',
      type: 'name',
      required: true,
    },
    {
      value: this.pageFields.roleDescription,
      msg: 'enter role description',
      type: 'textBox',
      required: true,
    },
    {
      value: this.pageFields.json,
      msg: 'select module',
      type: 'textbox',
      required: true,
    },
  ];

  selectedModule: any = [];

  cmbModule: string | undefined;
  selectedModuleList: any[] = [];

  menuList: RoleMenuInterface[] = [];
  tempMenuList: any = [];
  menuOptList: any = [];
  tempModuleList: RoleModuleInterface[] = [];
  moduleList: any = [];
  roleList: any = [];

  tabIndex = 0;
  error: any;

  constructor(
    private global: SharedServicesGlobalDataModule,
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}
  ngOnInit() {
    this.formFields[2].value = this.global.getUserId().toString();

    this.global.setHeaderTitle('Application Roles');
    this.getAppModule();
    this.getRoleOption();
    this.getApplicationMenu();
  }

  getAppModule() {
    this.dataService.getHttp('user-api/UserRole/getAppModule', '').subscribe(
      (response: any) => {
        this.selectedModule = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getTotalRole(item: any) {
    var roleField = {
      roleId: '',
    };

    var roleData: MyFormField[] = [
      {
        value: roleField.roleId,
        msg: 'select role ID',
        type: 'label',
        required: false,
      },
    ];

    roleData[0].value = item;

    this.dataService
      .receivedtHttp(roleField, roleData, 'user-api/UserRole/getTotalRole')
      .subscribe(
        (response: any) => {
          console.log(response)

          this.tempMenuList = JSON.parse(response);
          this.moduleList = this.tempMenuList;
          console.log(this.moduleList);
        },
        (error: any) => {
          this.error = error;
          this.valid.apiErrorResponse(this.error);
        }
      );
  }

  getRoleOption() {
    this.dataService.getHttp('user-api/UserRole/getRoleOption', '').subscribe(
      (response: any) => {
        this.menuOptList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getApplicationMenu() {
    this.dataService
      .getHttp('user-api/UserRole/getApplicationMenu', '')
      .subscribe(
        (response: any) => {
          this.moduleList = response;
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  setMenuData(moduleId: string) {
    this.menuList = this.moduleList.filter(
      (m: { applicationModuleId: any }) => m.applicationModuleId == moduleId
    );
  }

  addToSelectedModulesList(
    itemList: any,
    read: any,
    write: any,
    del: any,
    all: any
  ) {
    if (all == true) {
      read = true;
      write = true;
      del = true;
    }

    if (
      this.tempModuleList.filter(
        (m) => m.applicationModuleId == itemList.applicationModuleId
      ).length == 0
    ) {
      this.selectedModuleList = [];

      this.selectedModuleList.push({
        menuId: itemList.menuId,
        menuTitle: itemList.menuTitle,
        read: read,
        write: write,
        delete: del,
        all: all,
      });

      this.tempModuleList.push({
        applicationModuleId: itemList.applicationModuleId,
        applicationModuleTitle: itemList.applicationModuleTitle,
        tempMenuList: this.selectedModuleList,
      });
    } else {
      var index = this.tempModuleList.findIndex(
        (m) => m.applicationModuleId == itemList.applicationModuleId
      );
      if (
        this.tempModuleList[index].tempMenuList.filter(
          (m) => m.menuId == itemList.menuId
        ).length == 0
      ) {
        this.tempModuleList[index].tempMenuList.push({
          applicationModuleId: itemList.applicationModuleId,
          applicationModuleTitle: itemList.applicationModuleTitle,
          menuId: itemList.menuId,
          menuTitle: itemList.menuTitle,
          read: read,
          write: write,
          delete: del,
          all: all,
        });
      } else {
        var childIndex = this.tempModuleList[index].tempMenuList.findIndex(
          (m) => m.menuId == itemList.menuId
        );

        this.tempModuleList[index].tempMenuList[childIndex].read = read;
        this.tempModuleList[index].tempMenuList[childIndex].write = write;
        this.tempModuleList[index].tempMenuList[childIndex].delete = del;
        this.tempModuleList[index].tempMenuList[childIndex].all = all;
      }
    }
  }

  removeItems(item: any) {}

  saveRole() {
    this.formFields[5].value = JSON.stringify(this.tempModuleList);

    if(this.formFields[5].value =='[]'){
      this.valid.apiErrorResponse('select menu items');return;
    }
    this.dataService
      .savetHttp(this.pageFields, this.formFields, 'user-api/UserRole/saveRole')
      .subscribe(
        (response: any[]) => {

          if(response[0].includes('Success') == true){
            if (this.formFields[0].value > 0) {
              this.valid.apiInfoResponse('Role updated successfully');
            } else {
              this.valid.apiInfoResponse('Role created successfully');
            }
            this.roleTable.getRole();
            this.getRoleOption();
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

  edit(item: any) {
    this.cmbModule = '';
    this.tempModuleList = [];
    this.selectedModuleList = [];
    this.menuList = [];

    this.getTotalRole(item.roleId);

    this.formFields = this.valid.resetFormFields(this.formFields);

    this.formFields[3].value = item.roleTitle;
    this.formFields[4].value = item.roleDescription;
    this.formFields[0].value = item.roleId;

    // this.moduleList = this.tempMenuList.filter(
    //   (b: { roleId: any }) => b.roleId == item.roleId
    // );

    
    var tempList = this.menuOptList.filter(
      (a: { roleId: any }) => a.roleId == item.roleId
    );

    // console.log(tempList)
    var found = false;
    for (var i = 0; i < tempList.length; i++) {
      if (this.tempModuleList.length == 0) {
        for (var j = 0; j < tempList.length; j++) {
          if (
            tempList[i].applicationModuleId == tempList[j].applicationModuleId
          ) {
            this.selectedModuleList.push({
              menuId: tempList[j].menuId,
              menuTitle: tempList[j].menuTitle,
              read: tempList[j].read,
              write: tempList[j].write,
              delete: tempList[j].delete,
            });
          }
        }
        this.tempModuleList.push({
          applicationModuleId: tempList[i].applicationModuleId,
          applicationModuleTitle: tempList[i].applicationModuleTitle,
          tempMenuList: this.selectedModuleList,
        });
      } else {
        found = false;
        for (var j = 0; j < this.tempModuleList.length; j++) {
          if (
            tempList[i].applicationModuleId ==
            this.tempModuleList[j].applicationModuleId
          ) {
            found = true;
            j = this.tempModuleList.length + 1;
          }
        }
        if (found == false) {
          this.selectedModuleList = [];
          for (var j = 0; j < tempList.length; j++) {
            if (
              tempList[i].applicationModuleId == tempList[j].applicationModuleId
            ) {
              this.selectedModuleList.push({
                menuId: tempList[j].menuId,
                menuTitle: tempList[j].menuTitle,
                read: tempList[j].read,
                write: tempList[j].write,
                delete: tempList[j].delete,
              });
            }
          }
          this.tempModuleList.push({
            applicationModuleId: tempList[i].applicationModuleId,
            applicationModuleTitle: tempList[i].applicationModuleTitle,
            tempMenuList: this.selectedModuleList,
          });
        }
      }
      this.tabIndex = 0;
    }
  }

  reset() {
    this.getApplicationMenu();
    this.cmbModule = '';
    this.tempModuleList = [];
    this.selectedModuleList = [];
    this.menuList = [];
    this.formFields = this.valid.resetFormFields(this.formFields);
    this.formFields[0].value = '0';
  }

  changeTabHeader(tabNum: any) {
    this.tabIndex = tabNum;
  }
}
