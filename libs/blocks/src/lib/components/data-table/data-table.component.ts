import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'society-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnChanges {

  @Input() tableData: any;
  @Input() colData: any;
  @Input() tablePermission: any;

  dataLength: number | undefined;
  constructor() { }

  ngOnChanges(): void {
    this.dataLength = this.tableData.length - 1;
  }

}
