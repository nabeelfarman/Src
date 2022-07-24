import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-society-area-block-table',
  templateUrl: './society-area-block-table.component.html',
  styleUrls: ['./society-area-block-table.component.scss']
})
export class SocietyAreaBlockTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  tableData: any = [];
  
  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.getSocietyBlock()
  }

  getSocietyBlock(){
    this.dataService.getHttp('land-api/SocietyBlock/getSocietyBlock', '').subscribe((response: any) => {
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
      newSocietyBlockId: '0',
      spType: '',
      userId: '',
    };

    var formFields: MyFormField[] = [
      {
        value: pageFields.newSocietyBlockId,
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

    formFields[0].value = item.societyBlockID;
    formFields[2].value = this.globalService.getUserId().toString();

    this.dataService
      .deleteHttp(
        pageFields,
        formFields,
        'land-api/SocietyBlock/saveSocietyBlock'
      )
      .subscribe(
        (response: any[]) => {
          if(response[0].includes('Success') == true){
            this.valid.apiInfoResponse('Record deleted successfully');
            this.getSocietyBlock();
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
