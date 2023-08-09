import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'society-party-ledger-table',
  templateUrl: './party-ledger-table.component.html',
  styleUrls: ['./party-ledger-table.component.scss'],
})
export class PartyLedgerTableComponent implements OnInit {
  tableData: any = [];
  constructor() {}

  ngOnInit(): void {}
}
