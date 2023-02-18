import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'society-balance-sheet-table',
  templateUrl: './balance-sheet-table.component.html',
  styleUrls: ['./balance-sheet-table.component.scss'],
})
export class BalanceSheetTableComponent implements OnInit {
  lblCurrentYear: any = '';
  lblOldYear: any = '';

  lblONonCurAssetTotal: any = 0;
  lblNNonCurAssetTotal: any = 0;
  lblOCurAssetTotal: any = 0;
  lblNCurAssetTotal: any = 0;
  lblOAssetTotal: any = 0;
  lblNAssetTotal: any = 0;
  lblOTotalLiability: any = 0;
  lblNTotalLiability: any = 0;

  nonCurAssetList: any = [];
  curAssetList: any = [];
  shareCapList: any = [];
  nonCurliabilityList: any = [];
  curLiabilityList: any = [];

  constructor() {}

  ngOnInit(): void {}
}
