import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, VoucherTableInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

declare var $: any;

@Component({
  selector: 'society-voucher-entry-table',
  templateUrl: './voucher-entry-table.component.html',
  styleUrls: ['./voucher-entry-table.component.scss']
})
export class VoucherEntryTableComponent implements OnInit {

  @Output() eventEmitter = new EventEmitter();

  searchHead: any = '';
  searchParty: any = '';

  lblTransaction: string = '';
  lblDebit: any = 0;
  lblCredit: any = 0;

  cmbAccHead: any = '';
  cmbPartyTo: any = '';
  txtDebit: any = 0;
  txtCredit: any = 0;

  pageFields: VoucherTableInterface = {
    bankId: '',
    spType: '',
    userId: '',
    coaId: '',
    partyId: '',
    debit: '',
    credit: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.bankId,
      msg: 'select bank',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.spType,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.userId,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.coaId,
      msg: 'select account head',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.partyId,
      msg: 'select party',
      type: 'selectbox',
      required: true,
    },
    {
      value: this.pageFields.debit,
      msg: 'enter debit',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.credit,
      msg: 'enter credit',
      type: 'textBox',
      required: false,
    }
  ];

  coaList: any = [];
  partyList: any = [];

  tableData: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    this.formFields[2].value = this.globalService.getUserId().toString();
  }

  save(){
    // alert(this.txtCredit)
    if(this.cmbAccHead == ''){
      this.valid.apiErrorResponse("select account head");return;
    }else if(this.cmbPartyTo == ''){
      this.valid.apiErrorResponse("select party to");return;
    }else if(this.txtDebit == 0 && this.txtCredit == 0){
      this.valid.apiErrorResponse("enter debit or credit amount");return;
    }else if(this.txtDebit != 0 && this.txtCredit != 0){
      this.valid.apiErrorResponse("one amount must be zero");return;
    }else{
      var partyData = this.partyList.filter((x: { partyID: any }) => x.partyID == this.cmbPartyTo);
      var coaData = this.coaList.filter((x: { coaID: any }) => x.coaID == this.cmbAccHead)
      
      for(var i = 0; i < this.tableData.length; i++){
        if(this.tableData[i].COAID == this.cmbAccHead){
          this.valid.apiInfoResponse('accound head already exist.');return;
        }
      }
      this.tableData.push({
        COAID: this.cmbAccHead,
        accHead: coaData[0].coaTitle,
        PartyID: this.cmbPartyTo,
        partyName: partyData[0].partyName,
        Debit: this.txtDebit,
        Credit: this.txtCredit,
      });

      this.eventEmitter.emit(this.tableData.length);

      this.lblDebit = parseInt(this.lblDebit) + parseInt(this.txtDebit);
      this.lblCredit = parseInt(this.lblCredit) + parseInt(this.txtCredit);

      this.cmbAccHead = '';
      this.cmbPartyTo = '';
      this.txtCredit = 0;
      this.txtDebit = 0;
    }
  }

  remove(index: any){
    
    this.lblDebit -= this.tableData[index].Debit;
    this.lblCredit -= this.tableData[index].Credit;
    
    this.tableData.splice(index, 1);

    this.eventEmitter.emit(this.tableData.length);
  }

  openModal(){

    if(
      this.formFields[3].value == '' ||
      this.formFields[4].value == '' ||
      (this.formFields[5].value == '' &&
      this.formFields[6].value == '')){
        this.valid.apiErrorResponse("enter row data");return;
      }else{
        $("#taxModal").modal("show");
      }
    // data-bs-toggle="modal"
    // data-bs-target="#taxModal"
  }
  reset(){
    // this.formFields = this.valid.resetFormFields(this.formFields);
  }
}
