import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdddocsuccessPageRoutingModule } from './adddocsuccess-routing.module';

import { AdddocsuccessPage } from './adddocsuccess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdddocsuccessPageRoutingModule
  ],
  declarations: [AdddocsuccessPage]
})
export class AdddocsuccessPageModule {}
