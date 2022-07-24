import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'society-cheque-book',
  templateUrl: './cheque-book.component.html',
  styleUrls: ['./cheque-book.component.scss'],
})
export class ChequeBookComponent implements OnInit {
  splChr = [
    { spl: 'A' },
    { spl: 'B' },
    { spl: 'C' },
    { spl: 'D' },
    { spl: 'E' },
    { spl: 'F' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
