import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

export const sharedEnvironmentsRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
})
export class SharedEnvironmentsModule {}
