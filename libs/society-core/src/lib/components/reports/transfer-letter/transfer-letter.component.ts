import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-transfer-letter',
  templateUrl: './transfer-letter.component.html',
  styleUrls: ['./transfer-letter.component.scss'],
})
export class TransferLetterComponent implements OnInit {
  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {}

  testPrint(printSection: string) {
    this.global.printData(printSection);
  }
}
