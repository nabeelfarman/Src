import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-plot-allotment-table',
  templateUrl: './plot-allotment-table.component.html',
  styleUrls: ['./plot-allotment-table.component.scss']
})
export class PlotAllotmentTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  tableData: any = [];

  constructor() {}

  ngOnInit(): void {
    
  }

  edit(item: any){
    this.eventEmitter.emit(item);
  }

}
