import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MaterialModule } from '@society/material';
import { TextMaskModule } from 'angular2-text-mask';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { EmployeeProfileComponent } from './components/employee-profile/employee-profile.component';
import { EmployeeProfileTableComponent } from './components/employee-profile/employee-profile-table/employee-profile-table.component';
import { AllowDeductionComponent } from './components/allow-deduction/allow-deduction.component';
import { AllowDeductionTableComponent } from './components/allow-deduction/allow-deduction-table/allow-deduction-table.component';
import { AllowDeductionRulesComponent } from './components/allow-deduction-rules/allow-deduction-rules.component';
import { BpsOnlyComponent } from './components/allow-deduction-rules/bps-only/bps-only.component';
import { BpsDesignationComponent } from './components/allow-deduction-rules/bps-designation/bps-designation.component';
import { PayRangeComponent } from './components/allow-deduction-rules/pay-range/pay-range.component';
import { PaySlabsComponent } from './components/allow-deduction-rules/pay-slabs/pay-slabs.component';
import { DesginationBpsComponent } from './components/config/desgination-bps/desgination-bps.component';
import { DesignationBpsTableComponent } from './components/config/desgination-bps/designation-bps-table/designation-bps-table.component';
import { PayFixationComponent } from './components/pay-fixation/pay-fixation.component';
import { EmployeeInfoSearchableComponent } from './components/shared/employee-info-searchable/employee-info-searchable.component';
import { PayAllowancesTableComponent } from './components/shared/pay-allowances-table/pay-allowances-table.component';
import { PayDeductionsTableComponent } from './components/shared/pay-deductions-table/pay-deductions-table.component';
import { PayLoansTableComponent } from './components/shared/pay-loans-table/pay-loans-table.component';
import { PaySummaryComponent } from './components/shared/pay-summary/pay-summary.component';
import { PayrollTransactionsComponent } from './components/payroll-transactions/payroll-transactions.component';
import { PayrollTransactionsEntryComponent } from './components/payroll-transactions/payroll-transactions-entry/payroll-transactions-entry.component';
import { PayrollRegisterComponent } from './components/payroll-register/payroll-register.component';
import { PayRegisterEmployeeListComponent } from './components/payroll-register/pay-register-employee-list/pay-register-employee-list.component';
import { SavedPayrollTableComponent } from './components/payroll-register/saved-payroll-table/saved-payroll-table.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CompanyCalendarComponent } from './components/company-calendar/company-calendar.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { PayrollDashboardComponent } from './components/payroll-dashboard/payroll-dashboard.component';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as more from 'highcharts/highcharts-more.src';
import * as exporting from 'highcharts/modules/exporting.src';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

export const payrollRoutes: Route[] = [
  {
    path: 'empProfile',
    component: EmployeeProfileComponent,
  },
  {
    path: 'allowDed',
    component: AllowDeductionComponent,
  },
  {
    path: 'allowDedRule',
    component: AllowDeductionRulesComponent,
  },
  {
    path: 'desigBPS',
    component: DesginationBpsComponent,
  },
  {
    path: 'fixation',
    component: PayFixationComponent,
  },
  {
    path: 'payTrans',
    component: PayrollTransactionsComponent,
  },
  {
    path: 'payReg',
    component: PayrollRegisterComponent,
  },
  {
    path: 'timeCalen',
    component: CompanyCalendarComponent,
  },
  { path: 'hrmDash', component: PayrollDashboardComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(payrollRoutes),
    FormsModule,
    MaterialModule,
    PerfectScrollbarModule,
    TextMaskModule,
    Ng2SearchPipeModule,
    NgxMaterialTimepickerModule,
    ChartModule,
  ],

  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    { provide: HIGHCHARTS_MODULES, useFactory: () => [more, exporting] },
  ],
  declarations: [
    EmployeeProfileComponent,
    EmployeeProfileTableComponent,
    AllowDeductionComponent,
    AllowDeductionTableComponent,
    AllowDeductionRulesComponent,
    BpsOnlyComponent,
    BpsDesignationComponent,
    PayRangeComponent,
    PaySlabsComponent,
    DesginationBpsComponent,
    DesignationBpsTableComponent,
    PayFixationComponent,
    EmployeeInfoSearchableComponent,
    PayAllowancesTableComponent,
    PayDeductionsTableComponent,
    PayLoansTableComponent,
    PaySummaryComponent,
    PayrollTransactionsComponent,
    PayrollTransactionsEntryComponent,
    PayrollRegisterComponent,
    PayRegisterEmployeeListComponent,
    SavedPayrollTableComponent,
    CompanyCalendarComponent,
    PayrollDashboardComponent,
  ],
  exports: [
    EmployeeProfileTableComponent,
    AllowDeductionTableComponent,
    BpsOnlyComponent,
    BpsDesignationComponent,
    PayRangeComponent,
    PaySlabsComponent,
    DesignationBpsTableComponent,
    EmployeeInfoSearchableComponent,
    PayAllowancesTableComponent,
    PayDeductionsTableComponent,
    PayLoansTableComponent,
    PaySummaryComponent,
    PayrollTransactionsEntryComponent,
    PayRegisterEmployeeListComponent,
    SavedPayrollTableComponent,
  ],
})
export class PayrollModule {}
