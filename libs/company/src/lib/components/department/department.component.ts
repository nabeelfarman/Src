import { Component, OnInit } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  tableData: any[] | undefined;

  permission = "011";
  colData = [
    {
      field: 'deptTitle',
      header: 'Department Title',
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

  constructor(private global: SharedServicesGlobalDataModule) {}

  ngOnInit(): void {
    this.global.setHeaderTitle('Department');

    this.tableData = [
      {
        deptTitle: 'Finance',
        editMode: false
      },
      {
        deptTitle: 'Finance',
        editMode: false
      },
      {
        deptTitle: 'IT',
        editMode: false
      }
    ];
  }

}
