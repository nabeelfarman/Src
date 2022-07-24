import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-inventory-depreciation-rates-table',
  templateUrl: './inventory-depreciation-rates-table.component.html',
  styleUrls: ['./inventory-depreciation-rates-table.component.scss']
})
export class InventoryDepreciationRatesTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  tableData: any = [];
  
  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.getAssetCategory()
  }

  getAssetCategory(){
    this.dataService.getHttp('inventory-api/AssetCategory/getAssetCategory', '').subscribe((response: any) => {
      this.tableData = response.reverse();
    }, (error: any) => {
      console.log(error);
    });
  }
      
  edit(item: any){
    this.eventEmitter.emit(item);
  }

  delete(item: any){
    var pageFields = {
      newAssetCatID: '0',
      spType: '',
      userId: '',
    };

    var formFields: MyFormField[] = [
      {
        value: pageFields.newAssetCatID,
        msg: '',
        type: 'hidden',
        required: false,
      },
      {
        value: pageFields.spType,
        msg: '',
        type: 'hidden',
        required: false,
      },
      {
        value: pageFields.userId,
        msg: '',
        type: 'hidden',
        required: false,
      },
    ];

    formFields[0].value = item.assetCatID;
    formFields[2].value = this.globalService.getUserId().toString();

    this.dataService
      .deleteHttp(
        pageFields,
        formFields,
        'inventory-api/AssetCategory/saveAssetCategory'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            this.valid.apiInfoResponse('Record deleted successfully');
            this.getAssetCategory();
          }else{
            this.valid.apiErrorResponse(response[0]);
          }
          
        },
        (error: any) => {
          this.error = error;
          this.valid.apiErrorResponse(this.error);
        }
      );
  }

}
