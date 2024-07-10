import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherpropertiesPage } from './otherproperties.page';

const routes: Routes = [
  {
    path: '',
    component: OtherpropertiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherpropertiesPageRoutingModule {}
