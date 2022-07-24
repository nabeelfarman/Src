import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { SectionInterface, MyFormField } from '@society/shared/interface'
import { DataBranchComponent } from '@society/blocks';
@Component({
  selector: 'society-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  //accessing child
  @ViewChild(DataBranchComponent) branches: any;

  pageFields: SectionInterface | undefined;

  tableData: any[] | undefined;
  deptList: any[] | undefined;


  //lists
  formFields: MyFormField[] = [];
  permission = "011";
  colData = [
    {
      field: 'sectTitle',
      header: 'Section Title',
      headerAlign: 'text-left',
      fieldAlign: 'text-left',
      fieldHidden: false,
      fieldType: '',
    },
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

  constructor(private global: SharedServicesGlobalDataModule) { }

  ngOnInit(): void {


    // this.pageFields = {
    //   sectId: '0',
    //   spType: '',
    //   userId: '',
    //   companyId: '',
    //   deptId: '',
    //   sectName: '',
    // };

    // this.formFields = [
    //   {
    //     value: this.pageFields.sectId,
    //     msg: '',
    //     type: 'label',
    //     required: false,
    //   },
    //   {
    //     value: this.pageFields.spType,
    //     msg: '',
    //     type: 'hidden',
    //     required: false,
    //   },
    //   {
    //     value: this.pageFields.userId,
    //     msg: '',
    //     type: 'hidden',
    //     required: false,
    //   },
    //   {
    //     value: this.pageFields.companyId,
    //     msg: 'select company',
    //     type: 'selectbox',
    //     required: true,
    //   },
    //   {
    //     value: this.pageFields.deptId,
    //     msg: 'select department',
    //     type: 'label',
    //     required: true,
    //   },
    //   {
    //     value: this.pageFields.sectName,
    //     msg: 'enter section',
    //     type: 'textbox',
    //     required: true,
    //   },
    // ];

    alert(this.formFields[3].value);

    this.global.setHeaderTitle('Section');

    this.deptList = [
      {
        deptCd: 1,
        deptName: 'Finance'
      },
      {
        deptCd: 2,
        deptName: 'IT'
      },
      {
        deptCd: 3,
        deptName: 'Establishment'
      },
    ];

    this.tableData = [
      {
        sectTitle: 'Accounts',
        deptTitle: 'Finance',
        editMode: false
      },
      {
        sectTitle: 'Payroll',
        deptTitle: 'Finance',
        editMode: false
      },
      {
        sectTitle: 'Server',
        deptTitle: 'IT',
        editMode: false
      }
    ];
  }

  saveBranches(){
    console.log(this.branches.locationList)
  }
}
