import { Component, OnInit } from '@angular/core';
import { SharedServicesDataModule } from '@society/shared/services/data';

@Component({
  selector: 'society-installment-voucher-table',
  templateUrl: './installment-voucher-table.component.html',
  styleUrls: ['./installment-voucher-table.component.scss']
})
export class InstallmentVoucherTableComponent implements OnInit {

  tblSearch: any = '';

  tableData: any = [];

  constructor(
    private dataService: SharedServicesDataModule,
    ) { }

  ngOnInit(): void {
    this.getSavedInstallment();
  }

  getSavedInstallment(){
    this.dataService.getHttp('core-api/GetSavedInstallmentDetail', '').subscribe((response: any) => {
      this.tableData = response;
    }, (error: any) => {
      console.log(error);
    });
  }

}
