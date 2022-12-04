import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MainGroupComponent } from './components/config/main-group/main-group.component';
import { MaterialModule } from '@society/material';
import { BlocksModule } from '@society/blocks';
import { MainGroupTableComponent } from './components/config/main-group/main-group-table/main-group-table.component';
import { SubGroupComponent } from './components/config/sub-group/sub-group.component';
import { SubGroupTableComponent } from './components/config/sub-group/sub-group-table/sub-group-table.component';
import { BugetHeadComponent } from './components/config/buget-head/buget-head.component';
import { BudgetHeadTableComponent } from './components/config/budget-head/budget-head-table/budget-head-table.component';
import { ChartOfAccountComponent } from './components/chart-of-account/chart-of-account.component';
import { ChartOfAccountTableComponent } from './components/chart-of-account/chart-of-account-table/chart-of-account-table.component';
import { TaxSectionComponent } from './components/tax-section/tax-section.component';
import { TaxSectionTableComponent } from './components/tax-section/tax-section-table/tax-section-table.component';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BudgetEstimateComponent } from './components/budget-estimate/budget-estimate.component';
import { BudgetEstimateTableComponent } from './components/budget-estimate/budget-estimate-table/budget-estimate-table.component';
import { VoucherEntryComponent } from './components/voucher-entry/voucher-entry.component';
import { VoucherEntryTableComponent } from './components/voucher-entry/voucher-entry-table/voucher-entry-table.component';
import { VoucherEntryBreakupComponent } from './components/voucher-entry/voucher-entry-breakup/voucher-entry-breakup.component';
import { TransactionTaxInfoComponent } from './components/voucher-entry/transaction-tax-info/transaction-tax-info.component';
import { SavedVoucherTableComponent } from './components/voucher-entry/saved-voucher-table/saved-voucher-table.component';
import { LedgerComponent } from './components/reports/ledger/ledger.component';
import { LedgerTableComponent } from './components/reports/ledger/ledger-table/ledger-table.component';
import { TrialBalanceComponent } from './components/reports/trial-balance/trial-balance.component';
import { TrialBalanceTableComponent } from './components/reports/trial-balance/trial-balance-table/trial-balance-table.component';
import { CashBookComponent } from './components/reports/cash-book/cash-book.component';
import { BankBalanceSummaryComponent } from './components/reports/cash-book/bank-balance-summary/bank-balance-summary.component';
import { CashBbokRptComponent } from './components/reports/cash-book/cash-bbok-rpt/cash-bbok-rpt.component';
import { VoucherPaymentSupervisionComponent } from './components/voucher-payment-supervision/voucher-payment-supervision.component';
import { VoucherPaymentsComponent } from './components/voucher-payment-supervision/voucher-payments/voucher-payments.component';
import { VoucherPaymentsListComponent } from './components/voucher-payment-supervision/voucher-payments-list/voucher-payments-list.component';
import { ChequeBookComponent } from './components/voucher-payment-supervision/cheque-book/cheque-book.component';
import { FmisSchedulesComponent } from './components/fmis-schedules/fmis-schedules.component';
import { FmisScheduleTableComponent } from './components/fmis-schedules/fmis-schedule-table/fmis-schedule-table.component';
import { IncomeStatementComponent } from './components/income-statement/income-statement.component';
import { IncomeStatementTableComponent } from './components/income-statement/income-statement-table/income-statement-table.component';
import { BalanceSheetComponent } from './components/balance-sheet/balance-sheet.component';
import { BalanceSheetTableComponent } from './components/balance-sheet/balance-sheet-table/balance-sheet-table.component';
import { CashFlowComponent } from './components/cash-flow/cash-flow.component';
import { CashFlowTableComponent } from './components/cash-flow/cash-flow-table/cash-flow-table.component';
import { BankReconciliationComponent } from './components/bank-reconciliation/bank-reconciliation.component';
import { ReconciliationCashBookTableComponent } from './components/reconciliation-cash-book-table/reconciliation-cash-book-table.component';
import { ReconciliationBankStatementTableComponent } from './components/reconciliation-bank-statement-table/reconciliation-bank-statement-table.component';
import { BankReconciliationTableComponent } from './components/bank-reconciliation/bank-reconciliation-table/bank-reconciliation-table.component';
import { ReceiptSupervisionComponent } from './components/voucher-payment-supervision/receipt-supervision/receipt-supervision.component';
import { TaxYearRatesComponent } from './components/tax-year-rates/tax-year-rates.component';
import { TaxYearRatesTableComponent } from './components/tax-year-rates/tax-year-rates-table/tax-year-rates-table.component';
import { BankInfoComponent } from './components/bank-info/bank-info.component';
import { BankInfoTableComponent } from './components/bank-info/bank-info-table/bank-info-table.component';
import { ExternalPartiesComponent } from './components/external-parties/external-parties.component';
import { ExternalPartiesTableComponent } from './components/external-parties/external-parties-table/external-parties-table.component';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { VoucherSupervisionComponent } from './components/voucher-supervision/voucher-supervision.component';
import { VoucherEntryViewComponent } from './components/voucher-supervision/voucher-entry-view/voucher-entry-view.component';
import { FmisDashboardComponent } from './components/fmis-dashboard/fmis-dashboard.component';
import { ChartModule } from 'angular-highcharts';

// import { SearchPipe } from '@society/shared/interface';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedInterfaceModule } from '@society/shared/interface';

import { SocietyCoreModule } from '@society/society-core';
import { CustomerBalanceSheetComponent } from './components/reports/customer-balance-sheet/customer-balance-sheet.component';
import { InstallmentVoucherComponent } from './components/installment-voucher/installment-voucher.component';
import { InstallmentVoucherTableComponent } from './components/installment-voucher/installment-voucher-table/installment-voucher-table.component';
import { InstallmentVoucherReportComponent } from './components/installment-voucher/installment-voucher-report/installment-voucher-report.component';
import { InstallmentVoucherPrintComponent } from './components/voucher-entry/installment-voucher-print/installment-voucher-print.component';
import { FixedAssetComponent } from './components/config/fixed-asset/fixed-asset.component';
import { VendorComponent } from './components/config/vendor/vendor.component';
import { FixedAssetTableComponent } from './components/config/fixed-asset/fixed-asset-table/fixed-asset-table.component';
import { VendorTableComponent } from './components/config/vendor/vendor-table/vendor-table.component';
import { DepreciationTableComponent } from './components/config/fixed-asset/fixed-asset-table/depreciation-table/depreciation-table.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

export const fmisRoutes: Route[] = [
  { path: 'mainGroup', component: MainGroupComponent },
  { path: 'subGroup', component: SubGroupComponent },
  { path: 'budgetHead', component: BugetHeadComponent },
  { path: 'coa', component: ChartOfAccountComponent },
  { path: 'taxSec', component: TaxSectionComponent },
  { path: 'budgetEst', component: BudgetEstimateComponent },
  { path: 'voucher', component: VoucherEntryComponent },
  { path: 'ledgerRpt', component: LedgerComponent },
  { path: 'trialRpt', component: TrialBalanceComponent },
  { path: 'cashBookRpt', component: CashBookComponent },
  { path: 'paySup', component: VoucherPaymentSupervisionComponent },
  // { path: 'sch', component: FmisSchedulesComponent },
  { path: 'instvouch', component: InstallmentVoucherComponent },
  { path: 'incStat', component: IncomeStatementComponent },
  { path: 'balSheet', component: BalanceSheetComponent },
  { path: 'cashFlow', component: CashFlowComponent },
  { path: 'bankRecon', component: BankReconciliationComponent },
  { path: 'taxYearRate', component: TaxYearRatesComponent },
  { path: 'bankInfo', component: BankInfoComponent },
  { path: 'parties', component: ExternalPartiesComponent },
  { path: 'sup', component: VoucherSupervisionComponent },
  { path: 'dashboard', component: FmisDashboardComponent },
  { path: 'rptbalancesheet', component: CustomerBalanceSheetComponent },
  { path: 'fixedasset', component: FixedAssetComponent },
  { path: 'vendor', component: VendorComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(fmisRoutes),
    FormsModule,
    MaterialModule,
    BlocksModule,
    PerfectScrollbarModule,
    TextMaskModule,
    NgxMatSelectSearchModule,
    ChartModule,
    SocietyCoreModule,
    SharedInterfaceModule,
    Ng2SearchPipeModule
  ],
  declarations: [
    MainGroupComponent,
    MainGroupTableComponent,
    SubGroupComponent,
    SubGroupTableComponent,
    BugetHeadComponent,
    BudgetHeadTableComponent,
    ChartOfAccountComponent,
    ChartOfAccountTableComponent,
    TaxSectionComponent,
    TaxSectionTableComponent,
    BudgetEstimateComponent,
    BudgetEstimateTableComponent,
    VoucherEntryComponent,
    VoucherEntryTableComponent,
    VoucherEntryBreakupComponent,
    TransactionTaxInfoComponent,
    SavedVoucherTableComponent,
    LedgerComponent,
    LedgerTableComponent,
    TrialBalanceComponent,
    TrialBalanceTableComponent,
    CashBookComponent,
    BankBalanceSummaryComponent,
    CashBbokRptComponent,
    VoucherPaymentSupervisionComponent,
    VoucherPaymentsComponent,
    VoucherPaymentsListComponent,
    ChequeBookComponent,
    FmisSchedulesComponent,
    FmisScheduleTableComponent,
    IncomeStatementComponent,
    IncomeStatementTableComponent,
    BalanceSheetComponent,
    BalanceSheetTableComponent,
    CashFlowComponent,
    CashFlowTableComponent,
    BankReconciliationComponent,
    ReconciliationCashBookTableComponent,
    ReconciliationBankStatementTableComponent,
    BankReconciliationTableComponent,
    ReceiptSupervisionComponent,
    TaxYearRatesComponent,
    TaxYearRatesTableComponent,
    BankInfoComponent,
    BankInfoTableComponent,
    ExternalPartiesComponent,
    ExternalPartiesTableComponent,
    VoucherSupervisionComponent,
    VoucherEntryViewComponent,
    FmisDashboardComponent,
    CustomerBalanceSheetComponent,
    InstallmentVoucherComponent,
    InstallmentVoucherTableComponent,
    InstallmentVoucherReportComponent,
    InstallmentVoucherPrintComponent,
    FixedAssetComponent,
    VendorComponent,
    FixedAssetTableComponent,
    VendorTableComponent,
    DepreciationTableComponent,
    // SearchPipe
  ],
  exports: [
    MainGroupTableComponent,
    SubGroupTableComponent,
    BudgetHeadTableComponent,
    ChartOfAccountTableComponent,
    TaxSectionTableComponent,
    BudgetEstimateTableComponent,
    VoucherEntryTableComponent,
    VoucherEntryBreakupComponent,
    TransactionTaxInfoComponent,
    SavedVoucherTableComponent,
    LedgerTableComponent,
    TrialBalanceTableComponent,
    BankBalanceSummaryComponent,
    CashBbokRptComponent,
    VoucherPaymentsComponent,
    VoucherPaymentsListComponent,
    ChequeBookComponent,
    FmisScheduleTableComponent,
    IncomeStatementTableComponent,
    BalanceSheetTableComponent,
    CashFlowTableComponent,
    ReconciliationCashBookTableComponent,
    ReconciliationBankStatementTableComponent,
    BankReconciliationTableComponent,
    ReceiptSupervisionComponent,
    TaxYearRatesTableComponent,
    BankInfoTableComponent,
    ExternalPartiesComponent,
    ExternalPartiesTableComponent,
    VoucherEntryViewComponent,
    InstallmentVoucherTableComponent,
    InstallmentVoucherReportComponent,
    InstallmentVoucherPrintComponent,
    FixedAssetTableComponent,
    VendorTableComponent,
    DepreciationTableComponent
    // SearchPipe
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class FmisModule {}
