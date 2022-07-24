import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'society-buyer-details',
  templateUrl: './buyer-details.component.html',
  styleUrls: ['./buyer-details.component.scss'],
})
export class BuyerDetailsComponent implements OnInit {
  @Output() buyerEventEmitter = new EventEmitter();
  @Output() modalValEmitter = new EventEmitter();

  buyerTableData: any = [];

  constructor() {}

  ngOnInit(): void {}

  sendInfo(item: any) {
    this.buyerEventEmitter.emit(item);
  }

  modalValConfig(val: number) {
    this.modalValEmitter.emit(val);
  }
}
