import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewdocumentsPageRoutingModule } from './viewdocuments-routing.module';

import { ViewdocumentsPage } from './viewdocuments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewdocumentsPageRoutingModule
  ],
  declarations: [ViewdocumentsPage]
})
export class ViewdocumentsPageModule {}
