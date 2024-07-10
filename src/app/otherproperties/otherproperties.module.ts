import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherpropertiesPageRoutingModule } from './otherproperties-routing.module';

import { OtherpropertiesPage } from './otherproperties.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherpropertiesPageRoutingModule
  ],
  declarations: [OtherpropertiesPage]
})
export class OtherpropertiesPageModule {}
