import { Component, OnInit } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-transfer-plot-table',
  templateUrl: './transfer-plot-table.component.html',
  styleUrls: ['./transfer-plot-table.component.scss']
})
export class TransferPlotTableComponent implements OnInit {

  tblSearch: any = '';
  tableData: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {}


}
