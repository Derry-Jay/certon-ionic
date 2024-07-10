import { Component } from '@angular/core';
import { NavController, Platform,AlertController } from '@ionic/angular';
import { AuthService } from './provider/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [AuthService]
})
export class AppComponent {
 /* public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {} */

 public selectedIndex = 0;
 public appPages = [
   {
     title: 'Home',
     component: 'welcome',
     icon: 'home'
   },
   {
     title: 'About',
     component: 'about',
     icon: 'information'
   },
   {
     title: 'Welcome Screen',
     component: 'welcomeslide',
     icon: 'information-circle'
   },
   {
     title: 'FAQs',
     component: 'help',
     icon: 'help'
   },
   {
     title: 'Logout',
     component: '',
     icon: 'log-out'
   }
 ];

 // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

 constructor(
   private platform: Platform,
   //private splashScreen: SplashScreen,
  // private statusBar: StatusBar,
   private navCtrl : NavController,
   private authService : AuthService,
   private alertCtrl:AlertController
 ) {
   this.initializeApp();
 }

 initializeApp() {
   console.log("appcom");
   this.platform.ready().then(() => {
   //  this.statusBar.styleDefault();
  //   this.splashScreen.hide();
     // this.navCtrl.navigateRoot("login");
     var slides = localStorage.getItem("slides");
     console.log(slides);
     if(slides !=null){
       if (!localStorage.getItem('isloggedin')) {
         this.navCtrl.navigateRoot("login");
       } else {
         this.navCtrl.navigateRoot('welcome');
       }
     }else{
       this.navCtrl.navigateRoot('welcomeslide');
     }
   });
 }

 ngOnInit() {
   const path = window.location.pathname.split('folder/')[1];
   if (path !== undefined) {
     this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
   }
 }

 openPage(page) {
   console.log(page.component);
if(page.component == "buyDocument"){
    this.buydocument();
   }
   else if (page.component) {
     this.navCtrl.navigateRoot(page.component);
   }
   else {
     // Since the component is null, this is the logout option
     // ...
    this.internetAlert(page);
     
   }
 }
 buydocument(){
  var data = {
    // "deviceid": localStorage.getItem('deviceId'),
    "deviceid": "c1ZK_s2A_VM:APA91bE_HsvdVkVpF3462x0NOxKIja0eKqmdaDFrO1iLs93lS3BG5CiQprE82FItZjpQVgCTQlm3Zfy9i0QLSywLlePgSeIHMVzIlV9ZU_1J9yLwwQU_HPFJ8ZWQ4bmArQ6kKV3tjA9W",
  }
  var res;
  var redirecturl;
  this.authService.postData(data, 'tokengeneration').then((result) => {
    res = result;
    redirecturl = res.redirect;
    window.open(redirecturl,'_system', 'location=yes');

    // const options: InAppBrowserOptions  = {
    //   zoom: 'no',
    //   location: 'no',
    //   toolbar: 'no',
    //   hideurlbar: "yes"
    // };
  //   const browser = this.iab.create(redirecturl,'_self','hideurlbar=yes');
  //   browser.on('loadstop').subscribe(event => {
  //     browser.insertCSS({ code: "body{color: red;" });
  //  });
  });
}
async internetAlert(page) {
  const alert = await this.alertCtrl.create({
    header: 'Confirm!',
    message: 'Are You Sure Want to Logout ? ',
       buttons: [
         {
           text: 'Cancel',
           role: 'cancel',
           cssClass: 'secondary',
           handler: () => {
             this.navCtrl.navigateRoot(page.component);   
           }
         }, {
           text: 'OK',
           handler: () => {
             localStorage.removeItem("userId");
             localStorage.removeItem("api_token");
             localStorage.removeItem("firstname");
             localStorage.removeItem("username");
             localStorage.removeItem("typeid");
             localStorage.removeItem("isloggedin");
             localStorage.removeItem("deviceId");
             localStorage.removeItem("userData");
             this.navCtrl.navigateRoot("login");
           }
         }
       ]
  });

  await alert.present();
}

}
