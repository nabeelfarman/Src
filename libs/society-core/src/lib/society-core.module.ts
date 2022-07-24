import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@society/material';
import { RouterModule, Route } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxCurrencyModule } from 'ngx-currency';

import { PlotCategoryComponent } from './components/config/plot-category/plot-category.component';
import { PlotCategoryTableComponent } from './components/config/plot-category/plot-category-table/plot-category-table.component';
import { PlotTypeComponent } from './components/config/plot-type/plot-type.component';
import { PlotTypeTableComponent } from './components/config/plot-type/plot-type-table/plot-type-table.component';
import { PlotPaymentNaturesComponent } from './components/config/plot-payment-natures/plot-payment-natures.component';
import { PlotPaymentNaturesTableComponent } from './components/config/plot-payment-natures/plot-payment-natures-table/plot-payment-natures-table.component';
import { PlotNaturesComponent } from './components/config/plot-natures/plot-natures.component';
import { PlotNaturesTableComponent } from './components/config/plot-natures/plot-natures-table/plot-natures-table.component';
import { PlotsComponent } from './components/plots/plots.component';
import { PlotsTableComponent } from './components/plots/plots-table/plots-table.component';
import { PaymentPlanComponent } from './components/payment-plan/payment-plan.component';
import { PaymentPlanTableComponent } from './components/payment-plan/payment-plan-table/payment-plan-table.component';
import { PaymentPlanDetailTableComponent } from './components/payment-plan/payment-plan-detail-table/payment-plan-detail-table.component';
import { MemberProfileComponent } from './components/member-profile/member-profile.component';
import { BlocksModule } from '@society/blocks';
import { MemberProfileTableComponent } from './components/member-profile/member-profile-table/member-profile-table.component';
import { MemberPlotFileComponent } from './components/member-plot-file/member-plot-file.component';
import { PlotFilesComponent } from './components/plot-files/plot-files.component';
import { PlotFilesTableComponent } from './components/plot-files/plot-files-table/plot-files-table.component';
import { MembershipGroupComponent } from './components/member-plot-file/membership-group/membership-group.component';
import { ApplicantProfileComponent } from './components/applicant-profile/applicant-profile.component';
import { TextMaskModule } from 'angular2-text-mask';
import { ChecklistComponent } from './components/config/checklist/checklist.component';
import { ChecklistTableComponent } from './components/config/checklist/checklist-table/checklist-table.component';
import { MemberPlotFileTableComponent } from './components/member-plot-file/member-plot-file-table/member-plot-file-table.component';
import { CreateTransferComponent } from './components/create-transfer/create-transfer.component';
import { MembershipPaymentsDetailComponent } from './components/create-transfer/membership-payments-detail/membership-payments-detail.component';
import { CreateTransferApplicantsComponent } from './components/create-transfer/create-transfer-applicants/create-transfer-applicants.component';
import { CreateTransferTableComponent } from './components/create-transfer/create-transfer-table/create-transfer-table.component';
import { TransferVerificationComponent } from './components/transfer-verification/transfer-verification.component';
import { InboxTableComponent } from './components/transfer-verification/inbox-table/inbox-table.component';
import { TransferVerificationTableComponent } from './components/transfer-verification/transfer-verification-table/transfer-verification-table.component';
import { ApplicantViewComponent } from './components/core-global/applicant-view/applicant-view.component';
import { PlotFileViewComponent } from './components/core-global/plot-file-view/plot-file-view.component';
import { InpersonVerificationComponent } from './components/inperson-verification/inperson-verification.component';

//  web cam image
import { WebcamModule } from 'ngx-webcam';
import { FileTransferComponent } from './components/file-transfer/file-transfer.component';
import { SellerDetailsComponent } from './components/core-global/seller-details/seller-details.component';
import { BuyerDetailsComponent } from './components/core-global/buyer-details/buyer-details.component';
import { FileTransferTableComponent } from './components/file-transfer/file-transfer-table/file-transfer-table.component';
import { FileTransferCareofComponent } from './components/file-transfer/file-transfer-careof/file-transfer-careof.component';
import { InpersonVerificationTableComponent } from './components/inperson-verification/inperson-verification-table/inperson-verification-table.component';
import { PlotFilePaymentsComponent } from './components/plot-file-payments/plot-file-payments.component';
import { ImportPlotFilePaymentTableComponent } from './components/plot-file-payments/import-plot-file-payment-table/import-plot-file-payment-table.component';
import { CoreDashboardComponent } from './components/core-dashboard/core-dashboard.component';
import { ChartModule } from 'angular-highcharts';
import { PaymentNatureSummaryTableComponent } from './components/core-dashboard/payment-nature-summary-table/payment-nature-summary-table.component';
import { SentTableComponent } from './components/transfer-verification/sent-table/sent-table.component';
import { SentTransferVerificationTableComponent } from './components/transfer-verification/sent-transfer-verification-table/sent-transfer-verification-table.component';
import { TransferLetterComponent } from './components/reports/transfer-letter/transfer-letter.component';
import { MembershipPaymentsReportComponent } from './components/reports/membership-payments-report/membership-payments-report.component';
import { SavedPlotFilePaymentTableComponent } from './components/plot-file-payments/saved-plot-file-payment-table/saved-plot-file-payment-table.component';

import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SearchPipe } from '@society/shared/interface';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { PlotAllotmentComponent } from './components/plot-allotment/plot-allotment.component';
import { PlotAllotmentTableComponent } from './components/plot-allotment/plot-allotment-table/plot-allotment-table.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

export const societyCoreRoutes: Route[] = [
  { path: 'plotCategory', component: PlotCategoryComponent },
  { path: 'plotTypes', component: PlotTypeComponent },
  { path: 'plotPaymentNatures', component: PlotPaymentNaturesComponent },
  { path: 'plotNatures', component: PlotNaturesComponent },
  { path: 'plot', component: PlotsComponent },
  { path: 'paymentPlan', component: PaymentPlanComponent },
  { path: 'memberProfile', component: MemberProfileComponent },
  { path: 'memberPlotFile', component: MemberPlotFileComponent },
  { path: 'plotFiles', component: PlotFilesComponent },
  { path: 'applicantProfile', component: ApplicantProfileComponent },
  { path: 'checkList', component: ChecklistComponent },
  { path: 'createTrans', component: CreateTransferComponent },
  { path: 'transVerification', component: TransferVerificationComponent },
  { path: 'inpersonVerification', component: InpersonVerificationComponent },
  { path: 'fileTransfer', component: FileTransferComponent },
  { path: 'plotFilePayment', component: PlotFilePaymentsComponent },
  { path: 'coreDashboard', component: CoreDashboardComponent },
  {
    path: 'membershipPaymentRpt',
    component: MembershipPaymentsReportComponent,
  },
  {
    path: 'plotAllotment',
    component: PlotAllotmentComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(societyCoreRoutes),
    MaterialModule,
    FormsModule,
    BlocksModule,
    TextMaskModule,
    WebcamModule,
    ChartModule,
    Ng2SearchPipeModule,
    NgxCurrencyModule,
    PerfectScrollbarModule,
    NgxMatSelectSearchModule,
  ],
  declarations: [
    PlotCategoryComponent,
    PlotCategoryTableComponent,
    PlotTypeComponent,
    PlotTypeTableComponent,
    PlotPaymentNaturesComponent,
    PlotPaymentNaturesTableComponent,
    PlotNaturesComponent,
    PlotNaturesTableComponent,
    PlotsComponent,
    PlotsTableComponent,
    PaymentPlanComponent,
    PaymentPlanTableComponent,
    PaymentPlanDetailTableComponent,
    MemberProfileComponent,
    MemberProfileTableComponent,
    MemberPlotFileComponent,
    PlotFilesComponent,
    PlotFilesTableComponent,
    MembershipGroupComponent,
    ApplicantProfileComponent,
    ChecklistComponent,
    ChecklistTableComponent,
    MemberPlotFileTableComponent,
    CreateTransferComponent,
    MembershipPaymentsDetailComponent,
    CreateTransferApplicantsComponent,
    CreateTransferTableComponent,
    TransferVerificationComponent,
    InboxTableComponent,
    TransferVerificationTableComponent,
    ApplicantViewComponent,
    PlotFileViewComponent,
    InpersonVerificationComponent,
    FileTransferComponent,
    SellerDetailsComponent,
    BuyerDetailsComponent,
    FileTransferTableComponent,
    FileTransferCareofComponent,
    InpersonVerificationTableComponent,
    PlotFilePaymentsComponent,
    PlotFilePaymentsComponent,
    ImportPlotFilePaymentTableComponent,
    CoreDashboardComponent,
    PaymentNatureSummaryTableComponent,
    SentTableComponent,
    SentTransferVerificationTableComponent,
    TransferLetterComponent,
    MembershipPaymentsReportComponent,
    SavedPlotFilePaymentTableComponent,
    SearchPipe,
    PlotAllotmentComponent,
    PlotAllotmentTableComponent,
  ],
  exports: [
    PlotCategoryTableComponent,
    PlotTypeTableComponent,
    PlotPaymentNaturesTableComponent,
    PlotNaturesTableComponent,
    PlotsTableComponent,
    PaymentPlanTableComponent,
    PaymentPlanDetailTableComponent,
    MemberProfileTableComponent,
    PlotFilesTableComponent,
    MembershipGroupComponent,
    ChecklistTableComponent,
    MembershipPaymentsDetailComponent,
    CreateTransferApplicantsComponent,
    CreateTransferTableComponent,
    InboxTableComponent,
    TransferVerificationTableComponent,
    PlotFileViewComponent,
    ApplicantViewComponent,
    InpersonVerificationComponent,
    FileTransferTableComponent,
    SellerDetailsComponent,
    BuyerDetailsComponent,
    InpersonVerificationTableComponent,
    ImportPlotFilePaymentTableComponent,
    PaymentNatureSummaryTableComponent,
    SentTableComponent,
    SentTransferVerificationTableComponent,
    TransferLetterComponent,
    SavedPlotFilePaymentTableComponent,
    PlotAllotmentTableComponent,
    ApplicantProfileComponent
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class SocietyCoreModule {}
