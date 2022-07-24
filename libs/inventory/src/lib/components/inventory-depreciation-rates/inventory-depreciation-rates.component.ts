import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { DepreciationRateInterface, MyFormField } from '@society/shared/interface';
import { InventoryDepreciationRatesTableComponent } from './inventory-depreciation-rates-table/inventory-depreciation-rates-table.component';

@Component({
  selector: 'society-inventory-depreciation-rates',
  templateUrl: './inventory-depreciation-rates.component.html',
  styleUrls: ['./inventory-depreciation-rates.component.scss'],
})
export class InventoryDepreciationRatesComponent implements OnInit {
    
  @ViewChild(InventoryDepreciationRatesTableComponent) depRateTable: any;

  pageFields: DepreciationRateInterface = {
    newAssetCatID: '0',
    spType: '',
    userid: '',
    accountsCatID: '',
    assetCatDescription: '',
    assetCatCode: '',
    depreciationRuleId: '',
    BaseRate: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.newAssetCatID,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.spType,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.userid,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.accountsCatID,
      msg: 'select account category',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.assetCatDescription,
      msg: 'enter asset category name',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.assetCatCode,
      msg: 'enter asset category code',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.depreciationRuleId,
      msg: 'select depreciation rule',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.BaseRate,
      msg: 'enter base rate',
      type: 'textbox',
      required: true,
    },
  ];

  accountCategoryList: any = [];
  
  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Asset Item Categories');
    this.formFields[2].value = this.globalService.getUserId().toString();

    this.getAccountCategory();

  }
    
  getAccountCategory() {
    this.dataService.getHttp('inventory-api/AssetCategory/getAccountCategory', '').subscribe(
      (response: any) => {
        this.accountCategoryList = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  save() {
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'inventory-api/AssetCategory/saveAssetCategory'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            if(this.formFields[0].value > 0)
            {
              this.valid.apiInfoResponse('Record updated successfully');
            }else{
              this.valid.apiInfoResponse('Record added successfully');
            }
            this.depRateTable.getAssetCategory();
            this.reset();
          }else{
            this.valid.apiErrorResponse(response.toString());
          }
        },
        (error: any) => {
          this.error = error;
          this.valid.apiErrorResponse(this.error);
        }
      );
  }

  reset() {
    this.formFields = this.valid.resetFormFields(this.formFields);

    this.formFields[0].value = '0';
  }

  edit(item: any){

    this.formFields[0].value = item.assetCatID;
    this.formFields[3].value = item.accountsCatID;
    this.formFields[4].value = item.assetCatDescription;
    this.formFields[5].value = item.assetCatCode;
    this.formFields[6].value = item.depreciationRuleID.toString();
    // this.formFields[7].value = item.mobileNo1;

  }

}
