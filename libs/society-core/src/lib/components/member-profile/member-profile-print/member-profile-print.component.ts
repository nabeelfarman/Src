import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'society-member-profile-print',
  templateUrl: './member-profile-print.component.html',
  styleUrls: ['./member-profile-print.component.scss']
})
export class MemberProfilePrintComponent implements OnInit {

  lblPMemberName: string = '';
  lblPSDWName: string = '';
  lblPCNIC: string = '';
  lblPMobile: string = '';
  lblPAddress: string = '';
  lblPMembershipDate: string = '';
  lblPMembershipNo: string = '';
  lblPCategory: string = '';
  lblPNature: string = '';
  lblPType: string = '';
  lblPPaymentPlan: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
