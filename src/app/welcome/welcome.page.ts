import { Component} from '@angular/core';
import { NavController,NavParams,MenuController, ModalController,LoadingController ,Platform} from '@ionic/angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { AuthService } from '../provider/auth.service';
import { Device } from '@ionic-native/device/ngx';
import { Badge } from '@ionic-native/badge/ngx';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  providers: [NavParams]
})
export class WelcomePage  {

 
  username: any;
  typeid: any;
  companyname: any;
  responseData: any;
  userData: any;
  notificationCount: any;
  loader: any;
  first_name:any;
  last_name:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ModalController,
    private menu: MenuController,
    private push: Push,
    private loadingCtrl: LoadingController,
    private authService: AuthService, 
    private platform: Platform, 
    private device: Device,
    private badge: Badge
  ) {
    this.menu.enable(true);
    this.username = localStorage.getItem("username");
    this.userData = JSON.parse(localStorage.getItem("userData"));
    this.first_name = this.userData.first_name;
    this.last_name = this.userData.last_name;
    this.companyname = this.userData.companyname;
    this.typeid = localStorage.getItem("typeid");
    this.loader = this.loadingCtrl.create({
      message: "Please wait...",
    });
    this.loadData();
    this.getNotificationCount();

    //detect app from background
    platform.ready().then(() => {
      console.log(this.platform.platforms());
      if (platform.is('cordova')) {
        this.platform.resume.subscribe(() => {
          this.getNotificationCount();
        });
      }
    });
  }

  

  getNotificationCount() {
    this.userData = { 'user_id': localStorage.getItem("userId") };
    this.authService.postData(this.userData, 'get_notification_count').then((result) => {
      this.responseData = result;
      this.notificationCount = this.responseData.count;
    });
  }

  loadData() {
    
    //Permission for Push notifictaion    
       this.push.hasPermission()
      .then((res: any) => {
        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }
      });

    //Disabling swipe to go previous page    
    this.menu.swipeGesture(false);

    //Generating Push Notifictaion    
     const options: PushOptions = {
      android: {
        senderID: '894280733558',
        icon: 'pushicon',
        sound: "true",
        iconColor: "#ED8B00"
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    }
 
     const pushObject: PushObject = this.push.init(options);

    //Called when Opened Push Notfication    
    pushObject.on('notification').subscribe((notification: any) => {
      console.log('Received a notification', notification);
      this.navCtrl.navigateRoot("notification");
    });

    //Identify device Details
    pushObject.on('registration').subscribe((registration: any) => {
      localStorage.setItem("deviceId",registration.registrationId);
      console.log('device token -> ' + registration.registrationId);

      let deviceType = "IOS";
      if(this.platform.is("ios"))
      {
        let deviceType = "IOS";
      }
    
     let linkDevice = {
        registId: registration.registrationId,
        device:deviceType,
        userid: localStorage.getItem("userId"),
        platform: this.device.platform,
        version: this.device.version,
        model: this.device.model
      };
    
      this.authService.postData(linkDevice, 'linkdevice').then((result) => {
        console.log("linkResponse" + result)
      });
      
    });
    
    //when error in receiving push notifictaion    
    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }

  //Called Afer loading view
  //Called Afer loading view
  ionViewDidLoad() {
    console.log(localStorage.getItem("typeid"));
    if (localStorage.getItem("typeid") == '2') {
      document.getElementById("username").classList.remove('hide');
    }
    else if (localStorage.getItem("typeid") == "1") {
      document.getElementById("consumer").classList.remove('hide');
    }
    else {
      this.navCtrl.navigateRoot('login');
    }
    console.log('ionViewDidLoad WelcomePage');
  }

  //Open Scan code page
  gotoscancode() {
    this.navCtrl.navigateForward("scancode");
  }

  //Open Documents page
  gotomydocuments() {
    this.navCtrl.navigateForward("mydcuments");
  }

  //Open Notfications page  
  gotonotifications() {
    this.navCtrl.navigateForward("notification");
  }

  //Open My Profile page
  gotomyprofile() {
    this.navCtrl.navigateForward("myprofile");
  }

  //Open properties page based on account(Homeowner / Installer)  
  gotomyproperties() {
    if (this.typeid == "2") {
      this.navCtrl.navigateForward('myproperties');
    } else {
      this.navCtrl.navigateForward('tabcontroller');
    }
  }

  
}
