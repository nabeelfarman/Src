import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { PlotPaymentForListInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';

@Component({
  selector: 'society-plot-payment-natures-table',
  templateUrl: './plot-payment-natures-table.component.html',
  styleUrls: ['./plot-payment-natures-table.component.scss']
})
export class PlotPaymentNaturesTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  tableData: PlotPaymentForListInterface[] | undefined;
  
  constructor(
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) { }

  ngOnInit(): void {
    this.getPlotPayment()
  }
  
  getPlotPayment(){
    this.dataService.getHttp('society-api/PlotPayment/getPlotPayment', '').subscribe((response: any) => {
      this.tableData = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  edit(item: any, num: any){
    this.eventEmitter.emit({item, num});
  }

}
