import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropertysuccessPage } from './propertysuccess.page';

const routes: Routes = [
  {
    path: '',
    component: PropertysuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertysuccessPageRoutingModule {}
