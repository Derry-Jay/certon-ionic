import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MypropertiesPageRoutingModule } from './myproperties-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MypropertiesPage } from './myproperties.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MypropertiesPageRoutingModule
  ],
  declarations: [MypropertiesPage]
})
export class MypropertiesPageModule {}
