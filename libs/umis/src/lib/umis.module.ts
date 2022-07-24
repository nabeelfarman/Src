import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';
import { MaterialModule } from '@society/material';
import { FormsModule } from '@angular/forms';
import { UmisBlocksModule } from '@society/umis-blocks';

export const umisRoutes: Route[] = [
  {path: 'roles', component: RolesComponent},
  {path: 'users', component: UsersComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(umisRoutes),
    MaterialModule,
    FormsModule,
    UmisBlocksModule

  ],
  declarations: [
    RolesComponent,
    UsersComponent
  ],
  exports:[
    RouterModule
  ]
})
export class UmisModule {}
