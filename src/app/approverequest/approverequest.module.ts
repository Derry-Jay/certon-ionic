import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApproverequestPageRoutingModule } from './approverequest-routing.module';

import { ApproverequestPage } from './approverequest.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApproverequestPageRoutingModule
  ],
  declarations: [ApproverequestPage]
})
export class ApproverequestPageModule {}
