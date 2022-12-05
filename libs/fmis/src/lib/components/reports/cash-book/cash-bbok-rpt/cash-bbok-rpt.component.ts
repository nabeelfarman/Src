import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'society-cash-bbok-rpt',
  templateUrl: './cash-bbok-rpt.component.html',
  styleUrls: ['./cash-bbok-rpt.component.scss']
})
export class CashBbokRptComponent implements OnInit {

  lblDebit: any = 0;
  lblCredit: any = 0;

  tableData: any = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
