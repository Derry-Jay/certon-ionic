import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewpropertyPage } from './viewproperty.page';

const routes: Routes = [
  {
    path: '',
    component: ViewpropertyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewpropertyPageRoutingModule {}
