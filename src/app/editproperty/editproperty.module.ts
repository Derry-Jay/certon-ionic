import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditpropertyPageRoutingModule } from './editproperty-routing.module';

import { EditpropertyPage } from './editproperty.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditpropertyPageRoutingModule
  ],
  declarations: [EditpropertyPage]
})
export class EditpropertyPageModule {}
