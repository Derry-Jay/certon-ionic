import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdddocsuccessPage } from './adddocsuccess.page';

const routes: Routes = [
  {
    path: '',
    component: AdddocsuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdddocsuccessPageRoutingModule {}
