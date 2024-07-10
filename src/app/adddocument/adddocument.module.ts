import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdddocumentPageRoutingModule } from './adddocument-routing.module';

import { AdddocumentPage } from './adddocument.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdddocumentPageRoutingModule
  ],
  declarations: [AdddocumentPage]
})
export class AdddocumentPageModule {}
