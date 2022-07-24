import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { MaterialModule } from '@society/material';
import { TextMaskModule } from 'angular2-text-mask';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { CmisBlocksModule } from '@society/cmis-blocks';
import { BlocksModule } from '@society/blocks';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { BranchComponent } from './components/branch/branch.component';
import { DepartmentComponent } from './components/department/department.component';
import { SectionComponent } from './components/section/section.component';
import { NewBranchComponent } from './components/new-branch/new-branch.component';
import { NewDepartmentComponent } from './components/new-department/new-department.component';
import { NewSectionComponent } from './components/new-section/new-section.component';
import { NewSectionTableComponent } from './components/new-section/new-section-table/new-section-table.component';
import { NewDepartmentTableComponent } from './components/new-department/new-department-table/new-department-table.component';
import { NewBranchTableComponent } from './components/new-branch/new-branch-table/new-branch-table.component';

export const companyRoutes: Route[] = [
  { path: 'companyProfile', component: CompanyProfileComponent },
  { path: 'branch', component: NewBranchComponent },
  { path: 'department', component: NewDepartmentComponent },
  { path: 'section', component: NewSectionComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(companyRoutes),
    MaterialModule,
    BlocksModule,
    FormsModule,
    CmisBlocksModule,
    TextMaskModule,
    Ng2SearchPipeModule
  ],
  declarations: [
    CompanyProfileComponent,
    SectionComponent,
    DepartmentComponent,
    BranchComponent,
    NewBranchComponent,
    NewDepartmentComponent,
    NewSectionComponent,
    NewSectionTableComponent,
    NewDepartmentTableComponent,
    NewBranchTableComponent,
  ],
  exports:[
    NewSectionTableComponent,
    NewDepartmentTableComponent,
    NewBranchTableComponent,
  ],
})
export class CompanyModule {}
