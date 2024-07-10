import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestaccessPage } from './requestaccess.page';

const routes: Routes = [
  {
    path: '',
    component: RequestaccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestaccessPageRoutingModule {}
