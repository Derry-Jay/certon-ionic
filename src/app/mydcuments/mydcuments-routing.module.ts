import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MydcumentsPage } from './mydcuments.page';

const routes: Routes = [
  {
    path: '',
    component: MydcumentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MydcumentsPageRoutingModule {}
