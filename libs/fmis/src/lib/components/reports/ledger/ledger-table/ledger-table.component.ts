import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'society-ledger-table',
  templateUrl: './ledger-table.component.html',
  styleUrls: ['./ledger-table.component.scss']
})
export class LedgerTableComponent implements OnInit {

  tableData: any = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
