import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-member-profile-table',
  templateUrl: './member-profile-table.component.html',
  styleUrls: ['./member-profile-table.component.scss']
})
export class MemberProfileTableComponent implements OnInit {

  tblSearch: string = "";
  @Output() eventEmitter = new EventEmitter();
  @Output() printEventEmitter = new EventEmitter();

  tableData: any = [];
  
  constructor(private globalService: SharedServicesGlobalDataModule) { }

  ngOnInit(): void {
  }

  edit(item: any, num: any){
    this.eventEmitter.emit({item, num});
  }

  print(item: any){
    this.printEventEmitter.emit(item);
  }
}
