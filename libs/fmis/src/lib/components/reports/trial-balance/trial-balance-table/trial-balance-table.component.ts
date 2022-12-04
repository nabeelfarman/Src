import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'society-trial-balance-table',
  templateUrl: './trial-balance-table.component.html',
  styleUrls: ['./trial-balance-table.component.scss']
})
export class TrialBalanceTableComponent implements OnInit {

  tableData: any = [];

  lblDebit: any = 0;
  lblCredit: any = 0;
  lblODebit: any = 0;
  lblOCredit: any = 0;
  lblCDebit: any = 0;
  lblCCredit: any = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
