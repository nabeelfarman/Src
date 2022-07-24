import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'society-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {

  isWrite = false;

  tableData: any[] | undefined;

  permission = "011";
  colData = [
    {
      field: 'branchTitle',
      header: 'Branch Title',
      headerAlign: 'text-left',
      fieldAlign: 'text-left',
      fieldHidden: false,
      fieldType: '',
    },
    {
      field: 'editMode',
      header: 'Actions',
      headerAlign: 'text-right',
      fieldAlign: 'text-right',
      fieldHidden: true,
      fieldType: ''
    }
  ]
  
  clickEventSubscription: Subscription;

  constructor(private global: SharedServicesGlobalDataModule) {
    this.clickEventSubscription = this.global.getPermission().subscribe((data: any)=>{
      this.isWrite = data[0].write;
    })
  }

  ngOnInit(): void {
    this.global.setHeaderTitle('Branch Configuration');

    this.tableData = [
      {
        branchTitle: 'Islamabad',
        editMode: false
      },
      {
        branchTitle: 'Karachi',
        editMode: false
      },
      {
        branchTitle: 'Lahore',
        editMode: false
      }
    ];
  }

}
