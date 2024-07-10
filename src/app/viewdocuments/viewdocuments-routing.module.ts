import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewdocumentsPage } from './viewdocuments.page';

const routes: Routes = [
  {
    path: '',
    component: ViewdocumentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewdocumentsPageRoutingModule {}
