import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'society-member-plot-file-table',
  templateUrl: './member-plot-file-table.component.html',
  styleUrls: ['./member-plot-file-table.component.scss']
})
export class MemberPlotFileTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  tableData: any = [];
  
  constructor() { }

  ngOnInit(): void {
  }

  edit(item: any){
    this.eventEmitter.emit(item);
  }

}
