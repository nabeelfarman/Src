import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { TrialBalanceTableComponent } from './trial-balance-table/trial-balance-table.component';

@Component({
  selector: 'society-trial-balance',
  templateUrl: './trial-balance.component.html',
  styleUrls: ['./trial-balance.component.scss'],
})
export class TrialBalanceComponent implements OnInit {
  
  @ViewChild(TrialBalanceTableComponent) trialTable: any;

  cmbYear: any = '';
  yearList: any = [];
  
  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}


  ngOnInit(): void {
    this.globalService.setHeaderTitle('Trial Balance Report');
    
    this.getDateYears();
  }
  
  getDateYears(){
    this.dataService.getHttp('core-api/GetDateYears', '').subscribe((response: any) => {
      this.yearList = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  showReport(){

    if(this.cmbYear == ''){
      this.valid.apiInfoResponse('select year');
      return;
    }else{
      this.dataService.getHttp('core-api/GetTrailBalanceRpt?Year=' + this.cmbYear, '').subscribe((response: any) => {
        this.trialTable.tableData = response;
        
        this.trialTable.lblDebit = 0;
        this.trialTable.lblCredit = 0;
        this.trialTable.lblODebit = 0;
        this.trialTable.lblOCredit = 0;
        this.trialTable.lblCDebit = 0;
        this.trialTable.lblCCredit = 0;

        for(var i = 0; i < response.length; i++){
          this.trialTable.lblDebit += response[i].debit;
          this.trialTable.lblCredit += response[i].credit;
          this.trialTable.lblODebit += response[i].oDebit;
          this.trialTable.lblOCredit += response[i].oCredit;
          this.trialTable.lblCDebit += response[i].cDebit;
          this.trialTable.lblCCredit += response[i].cCredit;

        }
      }, (error: any) => {
        console.log(error);
      });
    }
  }

  printData(){
    
    if(this.trialTable.tableData.length == 0){
      this.valid.apiInfoResponse("no data found");return;
    }else{
      setTimeout(() => this.globalService.printData('#print-summary'), 200);
    }
    
  }
}
