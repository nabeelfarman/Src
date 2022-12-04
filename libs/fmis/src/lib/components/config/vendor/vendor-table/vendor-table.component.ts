import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import Swal from "sweetalert2/dist/sweetalert2.js";

@Component({
  selector: 'society-vendor-table',
  templateUrl: './vendor-table.component.html',
  styleUrls: ['./vendor-table.component.scss']
})
export class VendorTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  tblSearch: any = '';
  tableData: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.getParty();
  }

  getParty() {
    this.dataService.getHttp('core-api/GetVendor', '').subscribe(
      (response: any) => {
        this.tableData = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  edit(item: any){
    this.eventEmitter.emit(item);
  }

  delete(item: any){
    Swal.fire({
      title: "Do you want to delete record?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result: any) => {
      if (result.value) {
        var pageFields = {
          PartyID: '0',
          spType: '',
          UserID:''
        };
    
        var formFields: MyFormField[] = [
          {
            value: pageFields.PartyID,
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
            value: pageFields.UserID,
            msg: '',
            type: 'hidden',
            required: false,
          },
        ];
        
        formFields[0].value = item.partyID;
        formFields[1].value = "delete";
        formFields[2].value = this.globalService.getUserId().toString();
    
        this.dataService
          .deleteHttp(
            pageFields,
            formFields,
            'core-api/deleteparty'
          )
          .subscribe(
            (response: any) => {
              if(response.msg == "Data Deleted Successfully"){
                this.valid.apiInfoResponse('Record deleted successfully');
                this.getParty();
                // this.eventEmitterDelete.emit(item);
              }else{
                this.valid.apiErrorResponse(response.msg);
              }
              
            },
            (error: any) => {
              this.error = error;
              this.valid.apiErrorResponse(this.error);
            }
          );
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "", "error");
      }
    });
    
  }
}
