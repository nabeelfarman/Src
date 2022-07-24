import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MaterialModule } from '@society/material';
import { TextMaskModule } from 'angular2-text-mask';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { VendorProfileComponent } from './components/vendor-profile/vendor-profile.component';
import { FmisModule } from '@society/fmis';
import { InventoryPurchaseComponent } from './components/inventory-purchase/inventory-purchase.component';
import { InventoryPurchaseTableComponent } from './components/inventory-purchase/inventory-purchase-table/inventory-purchase-table.component';
import { InventoryPurchaseItemTableComponent } from './components/inventory-purchase/inventory-purchase-item-table/inventory-purchase-item-table.component';
import { InventoryEntryComponent } from './components/inventory-entry/inventory-entry.component';
import { InventoryEntryTableComponent } from './components/inventory-entry/inventory-entry-table/inventory-entry-table.component';
import { InventoryHandingTakingComponent } from './components/inventory-handing-taking/inventory-handing-taking.component';
import { InventoryHandingTakingTableComponent } from './components/inventory-handing-taking/inventory-handing-taking-table/inventory-handing-taking-table.component';
import { InventoryHandingTakingModalComponent } from './components/inventory-handing-taking/inventory-handing-taking-modal/inventory-handing-taking-modal.component';
import { InventoryHandingTakingItemListComponent } from './components/inventory-handing-taking/inventory-handing-taking-item-list/inventory-handing-taking-item-list.component';
import { InventoryLocationsComponent } from './components/inventory-locations/inventory-locations.component';
import { InventoryLocationsTableComponent } from './components/inventory-locations/inventory-locations-table/inventory-locations-table.component';
import { InventoryDepreciationRatesComponent } from './components/inventory-depreciation-rates/inventory-depreciation-rates.component';
import { InventoryDepreciationRatesTableComponent } from './components/inventory-depreciation-rates/inventory-depreciation-rates-table/inventory-depreciation-rates-table.component';
import { InventoryRevaluationComponent } from './components/inventory-revaluation/inventory-revaluation.component';
import { InventoryRevaluationTableComponent } from './components/inventory-revaluation/inventory-revaluation-table/inventory-revaluation-table.component';
import { InventoryItemProfileComponent } from './components/inventory-item-profile/inventory-item-profile.component';
import { InventoryRevaluationHistoryComponent } from './components/inventory-revaluation/inventory-revaluation-history/inventory-revaluation-history.component';
import { InventoryDashboardComponent } from './components/inventory-dashboard/inventory-dashboard.component';
import { ChartModule } from 'angular-highcharts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

export const inventoryRoutes: Route[] = [
  { path: 'vendor', component: VendorProfileComponent },
  { path: 'inventPur', component: InventoryPurchaseComponent },
  { path: 'inventEntry', component: InventoryEntryComponent },
  { path: 'handTak', component: InventoryHandingTakingComponent },
  { path: 'loc', component: InventoryLocationsComponent },
  { path: 'depRate', component: InventoryDepreciationRatesComponent },
  { path: 'revalue', component: InventoryRevaluationComponent },
  { path: 'itemProfile', component: InventoryItemProfileComponent },
  { path: 'inventoryDashboard', component: InventoryDashboardComponent },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(inventoryRoutes),
    MaterialModule,
    PerfectScrollbarModule,
    TextMaskModule,
    FmisModule,
    ChartModule,
    Ng2SearchPipeModule
  ],
  declarations: [
    VendorProfileComponent,
    InventoryPurchaseComponent,
    InventoryPurchaseTableComponent,
    InventoryPurchaseItemTableComponent,
    InventoryEntryComponent,
    InventoryEntryTableComponent,
    InventoryHandingTakingComponent,
    InventoryHandingTakingTableComponent,
    InventoryHandingTakingModalComponent,
    InventoryHandingTakingItemListComponent,
    InventoryLocationsComponent,
    InventoryLocationsTableComponent,
    InventoryDepreciationRatesComponent,
    InventoryDepreciationRatesTableComponent,
    InventoryRevaluationComponent,
    InventoryRevaluationTableComponent,
    InventoryItemProfileComponent,
    InventoryRevaluationHistoryComponent,
    InventoryDashboardComponent,
  ],
  exports: [
    InventoryPurchaseTableComponent,
    InventoryPurchaseItemTableComponent,
    InventoryEntryTableComponent,
    InventoryHandingTakingTableComponent,
    InventoryHandingTakingModalComponent,
    InventoryHandingTakingItemListComponent,
    InventoryLocationsTableComponent,
    InventoryDepreciationRatesTableComponent,
    InventoryRevaluationTableComponent,
    InventoryRevaluationHistoryComponent,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class InventoryModule {}
