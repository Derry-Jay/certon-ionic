import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditdocumentPageRoutingModule } from './editdocument-routing.module';

import { EditdocumentPage } from './editdocument.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditdocumentPageRoutingModule
  ],
  declarations: [EditdocumentPage]
})
export class EditdocumentPageModule {}
