import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'society-member-profile-table',
  templateUrl: './member-profile-table.component.html',
  styleUrls: ['./member-profile-table.component.scss']
})
export class MemberProfileTableComponent implements OnInit {

  tblSearch: string = "";
  @Output() eventEmitter = new EventEmitter();

  tableData: any = [];
  
  constructor() { }

  ngOnInit(): void {
  }

  edit(item: any, num: any){
    this.eventEmitter.emit({item, num});
  }

}
