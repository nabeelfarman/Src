import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MaterialModule } from '@society/material';
import { TextMaskModule } from 'angular2-text-mask';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { LandAcquisitionComponent } from './components/land-acquisition/land-acquisition.component';
import { LandAcquisitionTableComponent } from './components/land-acquisition/land-acquisition-table/land-acquisition-table.component';
import { LandAcquisitionPaymentsComponent } from './components/land-acquisition-payments/land-acquisition-payments.component';
import { LandAcquisitionPaymentsTableComponent } from './components/land-acquisition-payments/land-acquisition-payments-table/land-acquisition-payments-table.component';
import { LandAcquisitionPaymentsDetailComponent } from './components/land-acquisition-payments/land-acquisition-payments-detail/land-acquisition-payments-detail.component';
import { LandPlotingComponent } from './components/land-ploting/land-ploting.component';
import { LandPlotingTableComponent } from './components/land-ploting/land-ploting-table/land-ploting-table.component';
import { SocietyAreaBlockComponent } from './components/society-area-block/society-area-block.component';
import { SocietyAreaBlockTableComponent } from './components/society-area-block/society-area-block-table/society-area-block-table.component';
import { LandOwnerInfoComponent } from './components/land-owner-info/land-owner-info.component';
import { LandOwnerInfoTableComponent } from './components/land-owner-info/land-owner-info-table/land-owner-info-table.component';
import { LandDashboardComponent } from './components/land-dashboard/land-dashboard.component';
import { ChartModule } from 'angular-highcharts';
import { LandAcquisitionDetailComponent } from './components/land-acquisition-detail/land-acquisition-detail.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

export const landRoutes: Route[] = [
  { path: 'landAcq', component: LandAcquisitionComponent },
  { path: 'landAcqPay', component: LandAcquisitionPaymentsComponent },
  { path: 'landPlot', component: LandPlotingComponent },
  { path: 'societyBlock', component: SocietyAreaBlockComponent },
  { path: 'landOwner', component: LandOwnerInfoComponent },
  { path: 'dashboard', component: LandDashboardComponent },
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(landRoutes),
    MaterialModule,
    PerfectScrollbarModule,
    TextMaskModule,
    ChartModule,
  ],
  declarations: [
    LandAcquisitionComponent,
    LandAcquisitionTableComponent,
    LandAcquisitionPaymentsComponent,
    LandAcquisitionPaymentsTableComponent,
    LandAcquisitionPaymentsDetailComponent,
    LandPlotingComponent,
    LandPlotingTableComponent,
    SocietyAreaBlockComponent,
    SocietyAreaBlockTableComponent,
    LandOwnerInfoComponent,
    LandOwnerInfoTableComponent,
    LandDashboardComponent,
    LandAcquisitionDetailComponent,
  ],
  exports: [
    LandAcquisitionTableComponent,
    LandAcquisitionPaymentsTableComponent,
    LandAcquisitionPaymentsDetailComponent,
    LandPlotingTableComponent,
    SocietyAreaBlockTableComponent,
    LandOwnerInfoTableComponent,
    LandAcquisitionDetailComponent,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class LandModule {}
