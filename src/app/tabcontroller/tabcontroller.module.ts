import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabcontrollerPageRoutingModule } from './tabcontroller-routing.module';

import { TabcontrollerPage } from './tabcontroller.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabcontrollerPageRoutingModule
  ],
  declarations: [TabcontrollerPage]
})
export class TabcontrollerPageModule {}
