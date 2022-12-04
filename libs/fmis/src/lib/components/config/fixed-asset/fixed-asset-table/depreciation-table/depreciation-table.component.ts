import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'society-depreciation-table',
  templateUrl: './depreciation-table.component.html',
  styleUrls: ['./depreciation-table.component.scss']
})
export class DepreciationTableComponent implements OnInit {

  tableData: any = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
