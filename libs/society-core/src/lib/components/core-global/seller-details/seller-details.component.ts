import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'society-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.scss'],
})
export class SellerDetailsComponent implements OnInit {
  @Output() sellerEventEmitter = new EventEmitter();
  @Output() modalValEmitter = new EventEmitter();

  sellerTableData: any = [];

  constructor() {}

  ngOnInit(): void {}

  sendInfo(item: any) {
    this.sellerEventEmitter.emit(item);
  }

  modalValConfig(val: number) {
    this.modalValEmitter.emit(val);
  }
}
