import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@society/shared/services/data';

@Component({
  selector: 'society-main-group-table',
  templateUrl: './main-group-table.component.html',
  styleUrls: ['./main-group-table.component.scss']
})
export class MainGroupTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  tableData: any = [];
  
  constructor(
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) { }

  ngOnInit(): void {
    this.getMainGroup();
  }

  getMainGroup(){
    this.dataService.getHttp('fmis-api/MainGroup/getMainGroup', '').subscribe((response: any) => {
      this.tableData = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  edit(item: any, num: any){
    this.eventEmitter.emit({item, num});
  }

}
