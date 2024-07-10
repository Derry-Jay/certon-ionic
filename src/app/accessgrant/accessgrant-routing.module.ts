import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccessgrantPage } from './accessgrant.page';

const routes: Routes = [
  {
    path: '',
    component: AccessgrantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccessgrantPageRoutingModule {}
