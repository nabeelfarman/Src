import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'society-cash-book-summary-print',
  templateUrl: './cash-book-summary-print.component.html',
  styleUrls: ['./cash-book-summary-print.component.scss']
})
export class CashBookSummaryPrintComponent implements OnInit {

  lblDebit: any = 0;
  lblODebit: any = 0;
  lblCDebit: any = 0;

  tableData: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
