import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MydcumentsPageRoutingModule } from './mydcuments-routing.module';

import { MydcumentsPage } from './mydcuments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MydcumentsPageRoutingModule
  ],
  declarations: [MydcumentsPage]
})
export class MydcumentsPageModule {}
