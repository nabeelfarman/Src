import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { PlotNatureForListInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';

@Component({
  selector: 'society-plot-natures-table',
  templateUrl: './plot-natures-table.component.html',
  styleUrls: ['./plot-natures-table.component.scss']
})
export class PlotNaturesTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  tableData: PlotNatureForListInterface[] | undefined;
  
  constructor(
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) { }

  ngOnInit(): void {
    this.getPlotNature();
  }

  getPlotNature(){
    this.dataService.getHttp('society-api/PlotNature/getPlotNature', '').subscribe((response: any) => {
      this.tableData = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  edit(item: any, num: any){
    this.eventEmitter.emit({item, num});
  }

}
