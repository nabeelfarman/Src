import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { UserForListInterface } from '@society/shared/interface';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';

@Component({
  selector: 'society-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {
  
  @Output() eventEmitter = new EventEmitter();

  dataLength: number | undefined;
  tableData: any = [];
  deptList: any[] | undefined;
  permission = "011";

  constructor(
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
    ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.dataService.getHttp('user-api/User/getAll', '').subscribe((response: any) => {
      this.tableData = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  edit(item: any, num: any){
    this.eventEmitter.emit({item, num});
  }

  // delete(item: any){
  //   // alert(item.userLoginId);return
  //   this.dataService.deleteRequest('user-api/UserCreation/deactiveUser' ,"userLoginId=" + item.userLoginId).subscribe((response: any) => {
  //     this.valid.apiInfoResponse('record delete successfully');
      
  //     this.getUsers();
  //   }, (error: any) => {
  //     console.log(error);
  //   });
  // }
}
