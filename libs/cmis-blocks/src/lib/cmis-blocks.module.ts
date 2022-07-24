import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@society/material';

import { BranchTableComponent } from './branch-table/branch-table.component';
import { SectionTableComponent } from './section-table/section-table.component';
import { DepartmentTableComponent } from './department-table/department-table.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    BranchTableComponent,
    SectionTableComponent,
    DepartmentTableComponent
  ],
  exports: [
    BranchTableComponent,
    SectionTableComponent,
    DepartmentTableComponent
  ],
})
export class CmisBlocksModule {}
