import { Component, OnInit } from '@angular/core';
import { SharedServicesDataModule } from '@society/shared/services/data';

@Component({
  selector: 'society-map-plot-table',
  templateUrl: './map-plot-table.component.html',
  styleUrls: ['./map-plot-table.component.scss']
})
export class MapPlotTableComponent implements OnInit {

  tblSearch: any = '';
  
  tableData: any = [];

  constructor(
    private dataService: SharedServicesDataModule,
    ) { }

  ngOnInit(): void {
    this.getMapPlot();
  }

  getMapPlot(){
    this.dataService.getHttp('core-api/GetMappedPlot', '').subscribe((response: any) => {
      this.tableData = response;
    }, (error: any) => {
      console.log(error);
    });
  }

}
