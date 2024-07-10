import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomeslidePageRoutingModule } from './welcomeslide-routing.module';

import { WelcomeslidePage } from './welcomeslide.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomeslidePageRoutingModule
  ],
  declarations: [WelcomeslidePage]
})
export class WelcomeslidePageModule {}
