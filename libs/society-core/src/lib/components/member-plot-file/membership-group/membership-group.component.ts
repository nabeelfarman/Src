import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';

@Component({
  selector: 'society-membership-group',
  templateUrl: './membership-group.component.html',
  styleUrls: ['./membership-group.component.scss']
})
export class MembershipGroupComponent implements OnInit {

  @Output() eventEmitterGroup = new EventEmitter();

  searchMember: string = "";
  itemList: any = [];
  memberList: any = [];

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) {}

  ngOnInit(): void {
    
    this.itemList.push({
      memberFileGroupID: '0',
      memberID: '0',
      memberName: '',
      sdwName: '',
      cnic: '',
      DOB: '',
      address: '',
    });

    this.getMemberProfile();
  }

  getMemberProfile() {
    this.dataService.getHttp('society-api/MemberPlotFile/getMemberApplicant', '').subscribe((response: any) => {
      this.memberList = response;
    }, (error: any) => {
      console.log(error);
    });
  }

  setMemberInfo(memberID: any){
    var item = this.memberList.filter(
      (k: {memberProfileId: any}) => k.memberProfileId == parseInt(memberID));
      for(var i =0; i < this.itemList.length; i++){
        if(this.itemList[i].memberName == ""){
          this.itemList[i].memberName = item[0].memberName;
          this.itemList[i].sdwName = item[0].sdWofName;
          this.itemList[i].cnic = item[0].memberCNIC;
          this.itemList[i].DOB = item[0].memberDOB;
          this.itemList[i].address = item[0].presentAddress;
          this.itemList[i].memberFileGroupID = '0';
          
          i = this.itemList.length + 1;
        }
      }
  }

  saveMemberPlotFile(item: any, type: any){
    this.eventEmitterGroup.emit({item, type});
  }
}