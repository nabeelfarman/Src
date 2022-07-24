import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@society/shared/services/data';

@Component({
  selector: 'society-create-transfer-table',
  templateUrl: './create-transfer-table.component.html',
  styleUrls: ['./create-transfer-table.component.scss']
})
export class CreateTransferTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  tableData: any = [];
  
  constructor() { }

  ngOnInit(): void {
  }
  
  edit(item: any, num: any){
    this.eventEmitter.emit({item, num});
  }

}
