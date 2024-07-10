import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestaccessPageRoutingModule } from './requestaccess-routing.module';

import { RequestaccessPage } from './requestaccess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestaccessPageRoutingModule
  ],
  declarations: [RequestaccessPage]
})
export class RequestaccessPageModule {}
