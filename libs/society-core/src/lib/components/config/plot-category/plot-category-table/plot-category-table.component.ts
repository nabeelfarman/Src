import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { PlotCategoryForListInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';

@Component({
  selector: 'society-plot-category-table',
  templateUrl: './plot-category-table.component.html',
  styleUrls: ['./plot-category-table.component.scss']
})
export class PlotCategoryTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  tableData: PlotCategoryForListInterface[] | undefined;
  
  constructor(
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) { }

  ngOnInit(): void {
    this.getPlotCategory();
  }

  getPlotCategory(){
    this.dataService.getHttp('society-api/PlotCategory/getPlotCategory', '').subscribe((response: any) => {
      this.tableData = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  edit(item: any, num: any){
    this.eventEmitter.emit({item, num});
  }

}
