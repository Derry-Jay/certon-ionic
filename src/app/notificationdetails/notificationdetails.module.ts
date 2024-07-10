import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationdetailsPageRoutingModule } from './notificationdetails-routing.module';

import { NotificationdetailsPage } from './notificationdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationdetailsPageRoutingModule
  ],
  declarations: [NotificationdetailsPage]
})
export class NotificationdetailsPageModule {}
