import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'society-membership-payments-detail',
  templateUrl: './membership-payments-detail.component.html',
  styleUrls: ['./membership-payments-detail.component.scss']
})
export class MembershipPaymentsDetailComponent implements OnInit {

  tableData: any = [];
  constructor() { }

  ngOnInit(): void {
  }

}
