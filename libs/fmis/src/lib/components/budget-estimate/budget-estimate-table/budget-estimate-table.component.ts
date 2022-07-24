import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@society/shared/services/data';

@Component({
  selector: 'society-budget-estimate-table',
  templateUrl: './budget-estimate-table.component.html',
  styleUrls: ['./budget-estimate-table.component.scss']
})
export class BudgetEstimateTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  tableData: any = [];
  
  constructor(
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) { }

  ngOnInit(): void {
    this.getBudgeteEstimateSummary();
  }

  getBudgeteEstimateSummary(){
    this.dataService.getHttp('fmis-api/Budget/getBudgeteEstimateSummary', '').subscribe((response: any) => {
      this.tableData = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  edit(item: any, num: any){
    this.eventEmitter.emit({item, num});
  }

}
