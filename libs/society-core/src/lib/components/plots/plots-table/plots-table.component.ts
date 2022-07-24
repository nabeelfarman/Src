import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { PlotsForListInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';

@Component({
  selector: 'society-plots-table',
  templateUrl: './plots-table.component.html',
  styleUrls: ['./plots-table.component.scss']
})
export class PlotsTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  tableData: PlotsForListInterface[] | undefined;
  
  constructor(
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) { }

  ngOnInit(): void {
    this.getPlots()
  }
  
  getPlots(){
    this.dataService.getHttp('society-api/Plots/getPlots', '').subscribe((response: any) => {
      this.tableData = response;
      console.log(response)
    }, (error: any) => {
      console.log(error);
    });
  }
  
  edit(item: any, num: any){
    this.eventEmitter.emit({item, num});
  }

}
