import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { InPersonActiveInterface, MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-inperson-verification-table',
  templateUrl: './inperson-verification-table.component.html',
  styleUrls: ['./inperson-verification-table.component.scss']
})
export class InpersonVerificationTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  rdbType: any;
  tblSearch: string = '';

  pageFields: InPersonActiveInterface = {
    newInpersonId: '0',
    spType: '',
    userid: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.newInpersonId,
      msg: '',
      type: 'hidden',
      required: true,
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
  ];

  error: any;
  tableData: any = [];
  
  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule,
  ) { }

  ngOnInit(): void {
    this.formFields[2].value = this.globalService.getUserId().toString();

  }

  typeChange(item: any){
    if(item == 1){
      this.getInPersonActive();
    }
    else{
      this.getInPersonNotActive();
    }
  }

  getInPersonNotActive(){
    this.dataService.getHttp('society-api/InPerson/getInPersonNotAct', '').subscribe(
      (response: any) => {
        this.tableData = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getInPersonActive(){
    this.dataService.getHttp('society-api/InPerson/getInPerson', '').subscribe(
      (response: any) => {
        this.tableData = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  edit(item: any, num: any){
    this.eventEmitter.emit({item, num});
  }

  activeInPerson(item: any){

    this.formFields[0].value = item.inPersonID.toString();
    this.formFields[1].value  = 'act';

    this.dataService
    .deleteHttp(
      this.pageFields,
      this.formFields,
      'society-api/InPerson/saveInPerson'
    )
    .subscribe(
      (response: any[]) => {
        if(response[0].includes('Success') == true){
          this.valid.apiInfoResponse('Record activated successfully');
          this.getInPersonNotActive();
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
