import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { PlotTypeForListInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';

@Component({
  selector: 'society-plot-type-table',
  templateUrl: './plot-type-table.component.html',
  styleUrls: ['./plot-type-table.component.scss']
})
export class PlotTypeTableComponent implements OnInit {
  
  @Output() eventEmitter = new EventEmitter();

  tableData: PlotTypeForListInterface[] | undefined;
  
  constructor(
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) { }

  ngOnInit(): void {
    this.getPlotType();
  }

  getPlotType(){
    this.dataService.getHttp('society-api/PlotType/getPlotType', '').subscribe((response: any) => {
      this.tableData = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  edit(item: any, num: any){
    this.eventEmitter.emit({item, num});
  }

}
