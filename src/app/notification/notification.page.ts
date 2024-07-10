import { Component, OnInit } from '@angular/core';
import { NavController,LoadingController,NavParams, AlertController } from '@ionic/angular';
import { AuthService } from '../provider/auth.service';
import { MynavService } from '../mynav.service';
import { NotiService } from '../noti.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
  providers: [NavParams]
})
export class NotificationPage implements OnInit {

  readData = [];
  unreadData = [];
  userData: any;
  responseData: any;
  notiId: any;
  loader: any;
  deleteArray: any = [];
  sltAll: any;
  toggleButton: boolean = false;
  showDelete: boolean = false;
  showChkbox: boolean = false;
  constructor(public navCtrl: NavController, public authService: AuthService, public navParams: NavParams,
    private loadingCtrl: LoadingController , private alertCtrl : AlertController, private notifiService:NotiService,private navservice:MynavService) {

  
    //this.userData = { 'user_id': localStorage.getItem("userId") };
    //this.loadNotification();
  }
  ngOnInit() {
    this.userData = { 'user_id': localStorage.getItem("userId") };
    this.loadNotification();
  }
  
  //loads both read and unread data
  loadNotification() {
    this.presentLoading();
    this.authService.postData(this.userData, 'notifications').then((result) => {
      this.responseData = result;
      this.loadingCtrl.dismiss();
      console.log(this.responseData);
      if (this.responseData.success) {
        var localData = JSON.parse(localStorage.getItem("userData"));
        localData.notification_count = this.responseData.notification_count;
        console.log(localData);
        localStorage.removeItem("userData");
        localStorage.setItem("userData", JSON.stringify(localData));
        console.log(JSON.parse(localStorage.getItem("userData")));
        this.unreadData = [];
        this.readData = [];
        for (var i = 0; i < this.responseData.data.length; i++) {
          if (this.responseData.data[i].read_status == 0) {
            //unread data
            this.unreadData.push(this.responseData.data[i]);
          } else {
              //read data
              this.readData.push(this.responseData.data[i]);
          }
        }
        console.log(this.unreadData)
      } 
      //opens notifictaion check box after some time
      setTimeout(() => {
        this.showChkbox = true;
      }, 300);
    });
  }
  readAccessRequest(req_acc_id,not_type,message,msg){
    var reqdata = {
      req_acc_id :req_acc_id
    }
    var accessREq;
    var accessed_name;
    console.log(reqdata);
    if(not_type != '2' && not_type != '4'){
      this.authService.postData(reqdata, 'get_readmessage_details').then((result) => {
        this.responseData = result;
        console.log(this.responseData.requestAccess.access);
        accessREq = this.responseData.requestAccess.access;
        accessed_name = this.responseData.usersData.name;
    
        // let alert = this.alertCtrl.create({
        //   header: 'Request '+ accessREq,
        //   message: "You have already "+ accessREq +" access for this property to "+ accessed_name,
        //   buttons: [
        //     {
        //       text: 'Ok',
        //       cssClass:"okbtn",
        //     }
        //   ],
        //   backdropDismiss:true,
        // });
        // alert.present();
        this.successalert(accessREq,accessed_name)
      });
    }else if(not_type ==4){
      this.msgalert(msg);
    }
    else{
      // let alert = this.alertCtrl.create({
      //   header: "Notification",
      //   message: message,
      //   buttons: [
      //     {
      //       text: 'Ok',
      //       cssClass:"okbtn",
      //     }
      //   ],
      //   backdropDismiss:true,
      // });
      this.notification(message);
      // alert.present();
    }
  }

  async successalert(accreq,name) {
    const alert = await this.alertCtrl.create({
      header: 'Request '+ accreq,
      message: "You have already "+ accreq +" access for this property to "+ name,
      buttons: [
        {
          text: 'OK',
          cssClass:"okbtn",
        }
      ],
      backdropDismiss:true,
    });

    await alert.present();
  }

  async notification(msg) {
    const alert = await this.alertCtrl.create({
      header: "Notification",
      message: msg,
      buttons: [
        {
          text: 'OK',
          cssClass:"okbtn",
        }
      ],
      backdropDismiss:true,
    });

    await alert.present();
  }

  //reads unread data and give access
   //reads unread data and give access
   readrequest(req_id, req_status, username, expire_date, address, not_type, access_forever, notification_id,msg,uuid,created_at) {
    var userid = localStorage.getItem("userId");
    //alert(msg);
    console.log(req_id);
    this.notiId = {
      userid: userid,
      notificationid: notification_id
    }
    console.log(req_status);
   
    if (req_status != 1 && req_status != 2 && not_type != 2 && not_type !=4) {
      this.notifiService.reqId = req_id;
      this.notifiService.notificationId = notification_id;
      this.navCtrl.navigateForward("notificationdetails");
    }
    if (req_status == 1 || req_status == 2 || not_type == 2 && not_type !=4) {
      this.authService.postData(this.notiId, 'update_notification_status').then((result) => {
        console.log(result);
        this.responseData = result;
        var localData = JSON.parse(localStorage.getItem("userData"));
        localData.notification_count = this.responseData.notification_count;
        console.log(localData);
        localStorage.removeItem("userData");
        localStorage.setItem("userData", JSON.stringify(localData));
        console.log(JSON.parse(localStorage.getItem("userData")));
      })
    }
    //granting access
    if (req_status == 1) {
      this.notifiService.username = username;
      this.notifiService.accessForever = access_forever;
      this.notifiService.address = address;
      this.notifiService.uuid = uuid;
      this.notifiService.expireDate = expire_date;
      this.notifiService.createdat = created_at;
      this.notifiService.notificationId = notification_id;
      this.navservice.otherid = 1;
      this.navservice.othersecid = 1;
      this.navCtrl.navigateForward("accessgrant");
    }
    if(req_status==null && not_type == 4)
    {
      this.authService.postData(this.notiId, 'update_notification_status').then((result) => {
       // console.log('v'+result);
       // console.log(result);
        this.responseData = result;
        var localData = localStorage.getItem("userData");
       this.msgalert(msg);
      })
    }
  }

  //no of data to deleted
  clearNotifi(data) {
    var index = this.deleteArray.indexOf(data.notification_id);
    if (index > -1) {
      this.deleteArray.splice(index, 1);
    } else {
      this.deleteArray.push(data.notification_id);
    }
    if (this.deleteArray.length < 1) {
      this.showDelete = false;
    } else {
      this.showDelete = true;
    }
    console.log(this.deleteArray);
  }

  //delete all
  selectAll() {
    this.toggleButton = true;
    this.sltAll = true;
    this.deleteArray = [];
    for (var i = 0; i < this.readData.length; i++) {
      this.deleteArray.push(this.readData[i].notification_id)
    }
    console.log(this.deleteArray);
  }

  //unselect all
  unselectAll() {
    this.toggleButton = false;

    this.sltAll = false;
    this.deleteArray = [];

    console.log(this.deleteArray);
  }

  //delete selected Notification
  async deleteNotification() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Are you sure want to delete ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'OK',
          handler: () => {
            var userData = {
              "notification_ids": this.deleteArray
            }
            console.log(userData);
            this.authService.postData(userData, "delete_notifications").then((result) => {
              this.responseData = result;
              if (this.responseData.success) {
                
                this.succalert(this.responseData.message)
                this.loadNotification();
                //this.navCtrl.navigateRoot("welcome");
              }
            });
          }
        }
      ]
    });

    await alert.present();


    // if (confirm("Are you sure want to delete ?")) {
    //   var userData = {
    //     "notification_ids": this.deleteArray
    //   }
    //   console.log(userData);
    //   this.authService.postData(userData, "delete_notifications").then((result) => {
    //     this.responseData = result;
    //     if (this.responseData.success) {
    //       let alertmessage = this.alertCtrl.create({
    //         message:this.responseData.message,
    //         buttons:['Ok']
    //       });
    //       alertmessage.present();
    //       // alert(this.responseData.message);
    //       //this.loadNotification();
    //       this.nav.setRoot(NotificationPage);
    //     }
    //   });
    // }
  }

  async succalert(data) {
    const alert = await this.alertCtrl.create({
      header: 'Success !',
      message: data,
      buttons: ['OK']
    });
    await alert.present();
  }

  async msgalert(data) {
    const alert = await this.alertCtrl.create({
      header: 'Message !',
      message: data,
      buttons: [{
        text: 'OK',
        handler: () => {
          this.loadNotification();
        }}]
    });
    await alert.present();
  }

  //delete single notifictaion
  async singleDelete(data) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Are you sure want to delete ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'OK',
          handler: () => {
            this.deleteArray = [];
            this.deleteArray.push(data.notification_id);
            var userData = {
              "notification_ids": this.deleteArray
            }
            console.log(userData);
            this.authService.postData(userData, "delete_notifications").then((result) => {
              this.responseData = result;
              if (this.responseData.success) {
                this.succalert(this.responseData.message);
                //this.navCtrl.navigateRoot("welcome");
                this.loadNotification();
                //this.navCtrl.navigateForward("notification");
              }
            });
          }
        }
      ]
    });
    alert.present();

    // if (confirm("Are you sure want to delete ?")) {
    //   this.deleteArray = [];
    //   this.deleteArray.push(data.notification_id);
    //   var userData = {
    //     "notification_ids": this.deleteArray
    //   }
    //   console.log(userData);
    //   this.authService.postData(userData, "delete_notifications").then((result) => {
    //     this.responseData = result;
    //     if (this.responseData.success) {
    //       let alertmessage = this.alertCtrl.create({
    //         message:this.responseData.message,
    //         buttons:['Ok']
    //       });
    //       alertmessage.present();
    //       // alert(this.responseData.message);
    //       //this.loadNotification();
    //       this.nav.setRoot(NotificationPage);
    //     }
    //   });
    // }
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      // duration: 2000
    });
    await loading.present();
  }

}

