import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditpropertyPage } from './editproperty.page';

const routes: Routes = [
  {
    path: '',
    component: EditpropertyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditpropertyPageRoutingModule {}
