import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeslidePage } from './welcomeslide.page';

const routes: Routes = [
  {
    path: '',
    component: WelcomeslidePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeslidePageRoutingModule {}
