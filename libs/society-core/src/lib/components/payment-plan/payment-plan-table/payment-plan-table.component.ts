import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { PaymentPlanForListInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';

@Component({
  selector: 'society-payment-plan-table',
  templateUrl: './payment-plan-table.component.html',
  styleUrls: ['./payment-plan-table.component.scss']
})
export class PaymentPlanTableComponent implements OnInit {
  
  @Output() eventEmitter = new EventEmitter();

  tableData: PaymentPlanForListInterface[] | undefined;

  constructor(
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
    ) {}

  ngOnInit(): void {
  }

  edit(item: any, num: any){
    this.eventEmitter.emit({item, num});
  }

}
