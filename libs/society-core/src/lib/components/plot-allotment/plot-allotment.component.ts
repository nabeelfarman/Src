import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { MyFormField, PlotAllotmentInterface } from '@society/shared/interface';
import { SharedServicesDataModule } from '@society/shared/services/data';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { PlotAllotmentTableComponent } from './plot-allotment-table/plot-allotment-table.component';

@Component({
  selector: 'society-plot-allotment',
  templateUrl: './plot-allotment.component.html',
  styleUrls: ['./plot-allotment.component.scss']
})
export class PlotAllotmentComponent implements OnInit {

  @ViewChild(PlotAllotmentTableComponent) plotAllotmentTable: any;

  lblMemberName: any = '';
  lblFatherName: any = '';
  lblCNIC: any = '';
  lblAddress: any = '';

  pageFields: PlotAllotmentInterface = {
    NewplotID: '0',
    spType: '',
    plotFileId: '',
    userId: '',
    block: '',
    streetNo: '',
    plotNo: '',
  };

  formFields: MyFormField[] = [
    {
      value: this.pageFields.NewplotID,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.spType,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.userId,
      msg: '',
      type: 'hidden',
      required: false,
    },
    {
      value: this.pageFields.plotFileId,
      msg: 'select membership no',
      type: 'selectBox',
      required: true,
    },
    {
      value: this.pageFields.block,
      msg: 'enter block',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.streetNo,
      msg: 'enter street no',
      type: 'textBox',
      required: false,
    },
    {
      value: this.pageFields.plotNo,
      msg: 'select block',
      type: 'textBox',
      required: false,
    },
  ];

  error: any;

  constructor(
    private dataService: SharedServicesDataModule,
    private globalService: SharedServicesGlobalDataModule,
    private valid: SharedHelpersFieldValidationsModule
  ) { }

  ngOnInit(): void {
    this.globalService.setHeaderTitle('Plot Allotment');
    // this.formFields[2].value = this.globalService.getUserId().toString();

  }

}
