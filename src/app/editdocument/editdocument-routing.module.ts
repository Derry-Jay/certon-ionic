import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditdocumentPage } from './editdocument.page';

const routes: Routes = [
  {
    path: '',
    component: EditdocumentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditdocumentPageRoutingModule {}
