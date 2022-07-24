import { Component, OnInit } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, VoucherModalInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-transaction-tax-info',
  templateUrl: './transaction-tax-info.component.html',
  styleUrls: ['./transaction-tax-info.component.scss']
})
export class TransactionTaxInfoComponent implements OnInit {

  cmbTax: any = '';
  cmbSTax: any = '';
  lblNature:string = '';

  taxList: any = [];
  taxDetailList: any = [];

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.getTaxSection();
    // this.getTaxSectionDetail();
  }

  getTaxSection(){
    this.dataService.getHttp('fmis-api/TaxSection/getTaxSection', '').subscribe((response: any) => {
      this.taxList = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  onTaxChange(item: any){
    this.lblNature = '';

    var data = this.taxList.filter(
      (x: { taxId: any }) =>
        x.taxId == item
    );

    this.lblNature = data[0].taxDescription;
  }
  // getTaxSectionDetail(){
  //   this.dataService.getHttp('fmis-api/TaxSection/getTaxSectionDetail', '').subscribe((response: any) => {
  //     this.taxDetailList = response;
  //   }, (error: any) => {
  //     console.log(error);
  //   });
  // }

}
