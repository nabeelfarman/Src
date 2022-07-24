import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@society/shared/services/data';

@Component({
  selector: 'society-sub-group-table',
  templateUrl: './sub-group-table.component.html',
  styleUrls: ['./sub-group-table.component.scss']
})
export class SubGroupTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  tableData: any = [];
  
  constructor(
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) { }

  ngOnInit(): void {
    this.getSubGroup();
  }

  getSubGroup(){
    this.dataService.getHttp('fmis-api/SubGroup/getSubGroup', '').subscribe((response: any) => {
      this.tableData = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  edit(item: any, num: any){
    this.eventEmitter.emit({item, num});
  }

}
