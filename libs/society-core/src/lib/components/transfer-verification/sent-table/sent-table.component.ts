import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'society-sent-table',
  templateUrl: './sent-table.component.html',
  styleUrls: ['./sent-table.component.scss']
})
export class SentTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  sentTableData: any = [];

  constructor() { }

  ngOnInit(): void {
  }

  getSentData(item: any){
    this.eventEmitter.emit(item);
  }
}
