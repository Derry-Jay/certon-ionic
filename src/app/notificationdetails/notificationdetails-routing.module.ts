import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationdetailsPage } from './notificationdetails.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationdetailsPageRoutingModule {}
