import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'society-bank-balance-summary',
  templateUrl: './bank-balance-summary.component.html',
  styleUrls: ['./bank-balance-summary.component.scss']
})
export class BankBalanceSummaryComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  lblDebit: any = 0;
  lblODebit: any = 0;
  lblCDebit: any = 0;

  tableData: any = [];
  constructor() { }

  ngOnInit(): void {
  }

  showDetail(item: any){
    this.eventEmitter.emit(item);
  }
}
