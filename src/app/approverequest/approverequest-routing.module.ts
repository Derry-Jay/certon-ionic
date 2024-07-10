import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApproverequestPage } from './approverequest.page';

const routes: Routes = [
  {
    path: '',
    component: ApproverequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApproverequestPageRoutingModule {}
