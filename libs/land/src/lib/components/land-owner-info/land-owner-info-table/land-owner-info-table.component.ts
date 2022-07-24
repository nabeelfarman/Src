import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-land-owner-info-table',
  templateUrl: './land-owner-info-table.component.html',
  styleUrls: ['./land-owner-info-table.component.scss']
})
export class LandOwnerInfoTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  tableData: any = [];
  
  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.getLandOwner()
  }

  getLandOwner(){
    this.dataService.getHttp('land-api/LandOwner/getLandOwner', '').subscribe((response: any) => {
      this.tableData = response;
      console.log(response)
    }, (error: any) => {
      console.log(error);
    });
  }
    
  edit(item: any){
    this.eventEmitter.emit(item);
  }

  delete(item: any){
    var pageFields = {
      newMemberProfileID: '0',
      spType: '',
      userId: '',
    };

    var formFields: MyFormField[] = [
      {
        value: pageFields.newMemberProfileID,
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

    formFields[0].value = item.memberProfileId;
    formFields[2].value = this.globalService.getUserId().toString();

    this.dataService
      .deleteHttp(
        pageFields,
        formFields,
        'land-api/LandOwner/saveLandOwner'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            this.valid.apiInfoResponse('Record deleted successfully');
            this.getLandOwner();
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
