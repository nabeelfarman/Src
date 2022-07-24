import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { AssetEntryInterface, MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { InventoryEntryTableComponent } from './inventory-entry-table/inventory-entry-table.component';

@Component({
  selector: 'society-inventory-entry',
  templateUrl: './inventory-entry.component.html',
  styleUrls: ['./inventory-entry.component.scss'],
})
export class InventoryEntryComponent implements OnInit {

  @ViewChild(InventoryEntryTableComponent) inventoryTable: any;

  disableUsable = false;
  disableServiceable = false;
  disableCondemned = false;
  disableCustody = false;
  disableAssetCat = false;

  pageFields: AssetEntryInterface = {
    newAssetId: '0',
    spType: '',
    userid: '',
    memberProfileId: '',
    assetLocation: '',
    assetCatId: '',
    assetDescription: '',
    make: '',
    model: '',
    size: '',
    generation: '',
    processor: '',
    ram: '',
    driveType1: '',
    HD1: '',
    driveType2: '',
    HD2: '',
    serialNo: '',
    chasisNo: '',
    enGineNo: '',
    assetCondition: '',
    isUseable: '',
    isServiceable: '',
    iscondemned: '',
    ismIssing: '',
    purchaseDate: '',
    costAmount: '',
    remarks: '',
    qty: '',
    eDoc1: '',
    edocExtension: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.newAssetId,
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
      value: this.pageFields.memberProfileId,
      msg: 'select custodian',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.assetLocation,
      msg: 'enter asset location',
      type: 'textbox',
      required: true,
    },
    {
      value: this.pageFields.assetCatId,
      msg: 'select asset category',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.assetDescription,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.make,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.model,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.size,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.generation,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.processor,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.ram,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.driveType1,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.HD1,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.driveType2,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.HD2,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.serialNo,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.chasisNo,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.enGineNo,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.assetCondition,
      msg: 'select asset condition',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.isUseable,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.isServiceable,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.iscondemned,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.ismIssing,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.purchaseDate,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.costAmount,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.remarks,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.qty,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.eDoc1,
      msg: '',
      type: '',
      required: false,
    },
    {
      value: this.pageFields.edocExtension,
      msg: '',
      type: '',
      required: false,
    }
  ];

  custodyList: any = [];
  branchList: any = [];
  assetCategoryList: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Inventory Entry');
    this.formFields[2].value = this.globalService.getUserId().toString();

    this.getCustody();
    this.getAssetCategory();
    this.getBranchSection();
  }

  getCustody(){
    this.dataService.getHttp('inventory-api/AssetEntry/getCustodian', '').subscribe((response: any) => {
      this.custodyList = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  getBranchSection(){
    this.dataService.getHttp('company-api/Branch/getBranchSection', '').subscribe((response: any) => {
      this.branchList = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  getAssetCategory(){
    this.dataService.getHttp('inventory-api/AssetCategory/getAssetCategory', '').subscribe((response: any) => {
      this.assetCategoryList = response;
      // console.log(response)
    }, (error: any) => {
      console.log(error);
    });
  }

  setCondemned() {
    if (this.formFields[21].value) {
      this.disableCondemned = true;
      this.formFields[23].value = 0;
    } else if (!this.formFields[21].value) {
      this.disableCondemned = false;
    }
  }
  
  setMissingYes() {
    if (this.formFields[24].value) {
      this.disableUsable = true;
      this.formFields[21].value = 0;
      this.disableServiceable = true;
      this.formFields[22].value = 0;
      this.disableCondemned = true;
      this.formFields[23].value = 0;

      this.formFields[3].value = null;
      this.formFields[20].value = null;
      // this.disableChkCustody = true;
    } else if (!this.formFields[24].value) {
      this.disableUsable = false;
      this.disableServiceable = false;
      this.disableCondemned = false;
      // this.disableChkCustody = false;
    }
  }

  save() {
    this.formFields[28].value = 1;
    
    if(this.formFields[21].value == true){
      this.formFields[21].value = 1
    }else{
      this.formFields[21].value = 0
    }
    
    if(this.formFields[22].value == true){
      this.formFields[22].value = 1
    }else{
      this.formFields[22].value = 0
    }
    
    if(this.formFields[23].value == true){
      this.formFields[23].value = 1
    }else{
      this.formFields[23].value = 0
    }
    
    if(this.formFields[24].value == true){
      this.formFields[24].value = 1
    }else{
      this.formFields[24].value = 0
    }
    
    this.dataService
      .savetHttp(
        this.pageFields,
        this.formFields,
        'inventory-api/AssetEntry/saveAsset'
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
            this.inventoryTable.getAsset();
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
    // this.formFields[4].value = '';
    // this.formFields[6].value = '';
    // this.formFields[11].value = '';
    // this.formFields[12].value = '0';
  }

  edit(item: any){

    console.log(item)

    // this.formFields[0].value = item.memberProfileId;
    // this.formFields[3].value = item.memberName;
    // this.formFields[4].value = item.sdWofName;
    // this.formFields[5].value = item.memberCNIC;
    // this.formFields[7].value = item.mobileNo1;
    // this.formFields[8].value = item.email;
    // this.formFields[9].value = item.presentAddress;
    // this.formFields[10].value = item.presentAddresscityId;
    // this.formFields[11].value = item.permanentAddress;
    // this.formFields[12].value = item.permanentAddresscityId;
    // this.formFields[6].value = new Date(item.applicationDate);

  }

}
