import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccessgrantPageRoutingModule } from './accessgrant-routing.module';

import { AccessgrantPage } from './accessgrant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccessgrantPageRoutingModule
  ],
  declarations: [AccessgrantPage]
})
export class AccessgrantPageModule {}
