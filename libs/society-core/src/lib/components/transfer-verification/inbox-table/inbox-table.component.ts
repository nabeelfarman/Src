import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'society-inbox-table',
  templateUrl: './inbox-table.component.html',
  styleUrls: ['./inbox-table.component.scss']
})
export class InboxTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  tblSearch:string = '';
  
  tableData: any = [];

  constructor() { }

  ngOnInit(): void {
  }

  getInboxData(item: any){
    this.eventEmitter.emit(item);
  }
}
