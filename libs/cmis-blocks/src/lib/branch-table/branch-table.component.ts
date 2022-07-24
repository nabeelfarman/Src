import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'society-branch-table',
  templateUrl: './branch-table.component.html',
  styleUrls: ['./branch-table.component.scss']
})
export class BranchTableComponent implements OnInit {
  tableData: any[] | undefined;

  isWrite = false;
  isDelete = false;

  clickEventSubscription: Subscription;

  constructor(private global: SharedServicesGlobalDataModule) { 
    this.clickEventSubscription = this.global.getPermission().subscribe((data: any)=>{
      console.log(data[0].write)
      console.log(data[0].delete)
      this.isWrite = data[0].write;
      this.isDelete = data[0].delete;
    })
  }

  ngOnInit(): void {
    this.tableData = [
      {
        srNo: '1',
        branchTitle: 'Islamabad',
        editMode: false
      },
      {
        srNo: '2',
        branchTitle: 'Karachi',
        editMode: false
      },
      {
        srNo: '3',
        branchTitle: 'Lahore',
        editMode: false
      },
    ];
  }

  sendData(){
    alert('ok')
  }

}
