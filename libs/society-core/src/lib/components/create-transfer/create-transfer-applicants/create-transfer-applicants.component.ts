import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'society-create-transfer-applicants',
  templateUrl: './create-transfer-applicants.component.html',
  styleUrls: ['./create-transfer-applicants.component.scss']
})
export class CreateTransferApplicantsComponent implements OnInit {

  @Output() eventEmitterApplicant = new EventEmitter();

  tableData: any = [];
  
  constructor() { }

  ngOnInit(): void {
  }

  editApplicant(item: any, num: any){
    this.eventEmitterApplicant.emit({item, num});
  }

}
