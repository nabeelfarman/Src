import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@society/shared/services/data';

@Component({
  selector: 'society-saved-voucher-table',
  templateUrl: './saved-voucher-table.component.html',
  styleUrls: ['./saved-voucher-table.component.scss']
})
export class SavedVoucherTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  tableData: any = [];
  
  constructor(
    private dataService: SharedServicesDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) { }

  ngOnInit(): void {
    this.getUnpaidTransaction();
  }

  getUnpaidTransaction(){
    this.dataService.getHttp('fmis-api/VoucherPayment/getUnpaidTransaction', '').subscribe((response: any) => {
      this.tableData = response;
    }, (error: any) => {
      console.log(error);
    });
  }
  
  edit(item: any, num: any){
    this.eventEmitter.emit({item, num});
  }

}
