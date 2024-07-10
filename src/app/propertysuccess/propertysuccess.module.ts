import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PropertysuccessPageRoutingModule } from './propertysuccess-routing.module';

import { PropertysuccessPage } from './propertysuccess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PropertysuccessPageRoutingModule
  ],
  declarations: [PropertysuccessPage]
})
export class PropertysuccessPageModule {}
