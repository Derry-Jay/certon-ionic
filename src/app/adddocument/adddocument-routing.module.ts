import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdddocumentPage } from './adddocument.page';

const routes: Routes = [
  {
    path: '',
    component: AdddocumentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdddocumentPageRoutingModule {}
