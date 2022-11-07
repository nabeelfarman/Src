import { Component, OnInit } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-file-ownership-table',
  templateUrl: './file-ownership-table.component.html',
  styleUrls: ['./file-ownership-table.component.scss']
})
export class FileOwnershipTableComponent implements OnInit {

  tblSearch: any = '';
  tableData: any = [];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
  ) {}

  ngOnInit(): void {
    this.getFileOwnerDetail();
  }

  getFileOwnerDetail() {
    this.dataService.getHttp('core-api/getfileownerdetail', '').subscribe(
      (response: any) => {
        this.tableData = response;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
