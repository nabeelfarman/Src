import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedServicesDataModule } from '@society/shared/services/data';

@Component({
  selector: 'society-checklist-table',
  templateUrl: './checklist-table.component.html',
  styleUrls: ['./checklist-table.component.scss']
})
export class ChecklistTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  tableData: any = [];
  
  constructor(
    private dataService: SharedServicesDataModule,
  ) { }

  ngOnInit(): void {
    this.getCheckList();
  }

  getCheckList(){
    this.dataService.getHttp('society-api/CheckList/getCheckList', '').subscribe((response: any) => {
      this.tableData = response.reverse();
    }, (error: any) => {
      console.log(error);
    });
  }
  
  edit(item: any, num: any){
    this.eventEmitter.emit({item, num});
  }

}
