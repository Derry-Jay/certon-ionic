import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MypropertiesPage } from './myproperties.page';

const routes: Routes = [
  {
    path: '',
    component: MypropertiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MypropertiesPageRoutingModule {}
