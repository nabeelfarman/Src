import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';

@Component({
  selector: 'society-roles-table',
  templateUrl: './roles-table.component.html',
  styleUrls: ['./roles-table.component.scss']
})
export class RolesTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  tableData: any = [];

  constructor(
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
    ) {}

  ngOnInit(): void {
    this.getRole();
  }
  
  getRole(){
    this.dataService.getHttp('user-api/UserRole/getRoles', '').subscribe((response: any) => {
      this.tableData = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  edit(item: any){
    this.eventEmitter.emit(item);
  }

}
