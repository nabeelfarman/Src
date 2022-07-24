import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'society-pay-register-employee-list',
  templateUrl: './pay-register-employee-list.component.html',
  styleUrls: ['./pay-register-employee-list.component.scss'],
})
export class PayRegisterEmployeeListComponent implements OnInit {
  constructor() {}

  employeesList = [
    {
      empId: '1',
      empName: 'Haroon Qadeer',
      designation: 'Accountant',
      cnic: '61101-3281264-5',
    },
    {
      empId: '2',
      empName: 'Imran Ejaz',
      designation: 'GM',
      cnic: '37405-3281264-5',
    },
    {
      empId: '3',
      empName: 'Nabeel Ahmed',
      designation: 'Developer',
      cnic: '61101-3281264-5',
    },
    {
      empId: '4',
      empName: 'Jahazaib Jamal',
      designation: 'Deputy Director',
      cnic: '61101-3281264-5',
    },
  ];

  ngOnInit(): void {}
}
