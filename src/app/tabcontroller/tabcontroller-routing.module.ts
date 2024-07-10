import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MypropertiesPage } from '../myproperties/myproperties.page';
import { OtherpropertiesPage } from '../otherproperties/otherproperties.page';
import { TabcontrollerPage } from './tabcontroller.page';

const routes: Routes = [
  {
    path: '',
    component: TabcontrollerPage,
    children: [
          {
            path: 'myproperties',
            loadChildren: () => import('../myproperties/myproperties.module').then( m => m.MypropertiesPageModule)
          },
          {
            path: 'otherproperties',
            loadChildren: () => import('../otherproperties/otherproperties.module').then( m => m.OtherpropertiesPageModule)
          },
          {
            path: '',
            redirectTo: 'myproperties',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'myproperties',
        pathMatch: 'full'
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabcontrollerPageRoutingModule {}
