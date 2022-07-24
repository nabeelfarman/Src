import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '@society/material';
import { FormsModule } from '@angular/forms';

export const authRoutes: Route[] = [
  {path: '**', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    LoginComponent,
    // HomeComponent
  ],
})
export class AuthModule {}
