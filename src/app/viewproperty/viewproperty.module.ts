import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewpropertyPageRoutingModule } from './viewproperty-routing.module';

import { ViewpropertyPage } from './viewproperty.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewpropertyPageRoutingModule
  ],
  declarations: [ViewpropertyPage]
})
export class ViewpropertyPageModule {}
