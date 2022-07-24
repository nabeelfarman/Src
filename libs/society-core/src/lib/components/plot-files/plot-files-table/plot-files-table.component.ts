import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@society/shared/services/data';

@Component({
  selector: 'society-plot-files-table',
  templateUrl: './plot-files-table.component.html',
  styleUrls: ['./plot-files-table.component.scss']
})
export class PlotFilesTableComponent implements OnInit {
  
  @Output() eventEmitter = new EventEmitter();

  tableData: any = [];

  constructor(
    private dataService: SharedServicesDataModule,
  ) { }

  ngOnInit(): void {
    this.getPlotFile();
  }
  
  getPlotFile(){
    this.dataService.getHttp('society-api/PlotFile/getPlotFile', '').subscribe((response: any) => {
      this.tableData = response.reverse();
    }, (error: any) => {
      console.log(error);
    });
  }

  edit(item: any, num: any){
    this.eventEmitter.emit({item, num});
  }

}
