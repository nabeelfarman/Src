import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersTableComponent } from './users-table/users-table.component';
import { RolesTableComponent } from './roles-table/roles-table.component';
import { MaterialModule } from '@society/material';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  declarations: [
    UsersTableComponent,
    RolesTableComponent
  ],
  exports: [
    UsersTableComponent,
    RolesTableComponent
  ]
})
export class UmisBlocksModule {}
