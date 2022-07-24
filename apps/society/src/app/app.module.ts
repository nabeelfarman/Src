import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'angular-highcharts';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { Route, RouterModule } from '@angular/router';
import { AuthModule, authRoutes } from '@society/auth';
import { TopSideNavComponent } from './layouts/top-side-nav/top-side-nav.component';
import { MaterialModule } from '@society/material';
import { LayoutsModule } from '@society/layouts';
import { PayrollModule } from '@society/payroll';
import { SharedServicesAuthModule } from '@society/shared/services/auth';
import { AuthGuard } from '@society/shared/helpers/guards';
import { SharedHelpersFieldValidationsModule } from '@society/shared/helpers/field-validations';
import { SharedHelpersJwtInterceptorModule } from '@society/shared/helpers/jwt-interceptor';
import { SharedServicesGlobalDataModule } from '@society/shared/services/global-data';
import { SharedHelpersLoadingInterceptor } from '@society/shared/helpers/interceptors';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from '../../../../libs/auth/src/lib/home/home.component';

// import { UmisModule, umisRoutes } from '@society/umis';
// import { CompanyModule, companyRoutes} from "@society/company";
import { SharedServicesDataModule } from '@society/shared/services/data';
import { webPartRoutes } from '@society/web-part';

export const appRoutes: Route[] = [
  { path: 'auth', children: authRoutes },
  { path: 'web', children: webPartRoutes },
  {
    path: 'home',
    component: TopSideNavComponent,
    children: [{ path: '', component: HomeComponent }],
    canActivate: [AuthGuard],
  },
  {
    path: 'umis',
    component: TopSideNavComponent,
    loadChildren: () => import('@society/umis').then((m) => m.UmisModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'cmis',
    component: TopSideNavComponent,
    loadChildren: () => import('@society/company').then((m) => m.CompanyModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'core',
    component: TopSideNavComponent,
    loadChildren: () =>
      import('@society/society-core').then((m) => m.SocietyCoreModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'fmis',
    component: TopSideNavComponent,
    loadChildren: () => import('@society/fmis').then((m) => m.FmisModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'payroll',
    component: TopSideNavComponent,
    loadChildren: () => import('@society/payroll').then((m) => m.PayrollModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'land',
    component: TopSideNavComponent,
    loadChildren: () => import('@society/land').then((m) => m.LandModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'inventory',
    component: TopSideNavComponent,
    loadChildren: () =>
      import('@society/inventory').then((m) => m.InventoryModule),
    canLoad: [AuthGuard],
  },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  declarations: [AppComponent, TopSideNavComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabled' }),
    AuthModule,
    MaterialModule,
    ChartModule,
    LayoutsModule,
    PayrollModule,
    // UmisModule,
    // CompanyModule,
    SharedServicesAuthModule,
    SharedServicesDataModule,
    SharedHelpersJwtInterceptorModule,
    SharedHelpersFieldValidationsModule,
    SharedServicesGlobalDataModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SharedHelpersJwtInterceptorModule,
      multi: true,
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: InterceptorService,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
