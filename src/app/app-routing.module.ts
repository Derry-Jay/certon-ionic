import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then(m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'welcomeslide',
    loadChildren: () => import('./welcomeslide/welcomeslide.module').then(m => m.WelcomeslidePageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then(m => m.ForgotpasswordPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./help/help.module').then(m => m.HelpPageModule)
  },
  {
    path: 'myprofile',
    loadChildren: () => import('./myprofile/myprofile.module').then(m => m.MyprofilePageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./editprofile/editprofile.module').then(m => m.EditprofilePageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then(m => m.NotificationPageModule)
  },
  {
    path: 'notificationdetails',
    loadChildren: () => import('./notificationdetails/notificationdetails.module').then(m => m.NotificationdetailsPageModule)
  },
  {
    path: 'approverequest',
    loadChildren: () => import('./approverequest/approverequest.module').then(m => m.ApproverequestPageModule)
  },
  {
    path: 'accessgrant',
    loadChildren: () => import('./accessgrant/accessgrant.module').then(m => m.AccessgrantPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then(m => m.NotificationPageModule)
  },
  {
    path: 'otherproperties',
    loadChildren: () => import('./otherproperties/otherproperties.module').then( m => m.OtherpropertiesPageModule)
  },
  {
    path: 'myproperties',
    loadChildren: () => import('./myproperties/myproperties.module').then( m => m.MypropertiesPageModule)
  },
  {
    path: 'viewproperty',
    loadChildren: () => import('./viewproperty/viewproperty.module').then( m => m.ViewpropertyPageModule)
  },
  {
    path: 'editproperty',
    loadChildren: () => import('./editproperty/editproperty.module').then( m => m.EditpropertyPageModule)
  },
  {
    path: 'tabcontroller',
    loadChildren: () => import('./tabcontroller/tabcontroller.module').then( m => m.TabcontrollerPageModule)
  },
  {
    path: 'viewdocuments',
    loadChildren: () => import('./viewdocuments/viewdocuments.module').then( m => m.ViewdocumentsPageModule)
  },
  {
    path: 'editdocument',
    loadChildren: () => import('./editdocument/editdocument.module').then( m => m.EditdocumentPageModule)
  },
  {
    path: 'mydcuments',
    loadChildren: () => import('./mydcuments/mydcuments.module').then( m => m.MydcumentsPageModule)
  },
  {
    path: 'adddocument',
    loadChildren: () => import('./adddocument/adddocument.module').then( m => m.AdddocumentPageModule)
  },
  {
    path: 'adddocsuccess',
    loadChildren: () => import('./adddocsuccess/adddocsuccess.module').then( m => m.AdddocsuccessPageModule)
  },  {
    path: 'scancode',
    loadChildren: () => import('./scancode/scancode.module').then( m => m.ScancodePageModule)
  },
  {
    path: 'propertysuccess',
    loadChildren: () => import('./propertysuccess/propertysuccess.module').then( m => m.PropertysuccessPageModule)
  },
  {
    path: 'requestaccess',
    loadChildren: () => import('./requestaccess/requestaccess.module').then( m => m.RequestaccessPageModule)
  },

 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
