import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../provider/auth.service';
import { NotiService } from '../noti.service';

@Component({
  selector: 'app-notificationdetails',
  templateUrl: './notificationdetails.page.html',
  styleUrls: ['./notificationdetails.page.scss'],
  providers: [NavParams]
})
export class NotificationdetailsPage  {

  notifidetails:any;
  first_name:any;
  last_name:any;
  company:any;
  address:any;
  userData:any;
  responseData:any;
  select_list:any;
  notification_id:any;
  duraError:boolean = false;
  req_id:any;
  loader:any;
  constructor(public navCtrl: NavController, public authService : AuthService, public navParams: NavParams,
    private loadingCtrl : LoadingController, private alertCtrl:AlertController,private navservice:NotiService) {
  	//this.req_id = this.navParams.get('req_id');
    this.req_id = this.navservice.reqId;
    this.notification_id = this.navservice.notificationId;
    //this.notification_id = this.navParams.get('notification_id');
    this.userData = {'req_acc_id':this.req_id};
    console.log(this.userData);
    //loads person asks for access request
  	this.authService.postData(this.userData,'read_request').then((result) => {
  		this.responseData = result;
      console.log(this.responseData);
  		if(this.responseData.success){
  		  this.first_name = this.responseData.usersData.first_name;
  		  this.last_name = this.responseData.usersData.last_name;
  		  this.address = this.responseData.propData.full_address;
  		  this.company = this.responseData.usersData.companyname;
  		}
    });

    //creating loader
   /* this.loader = this.loadingCtrl.create({
      content:"Please wait"
    })*/
  }

  //gives access to particular property
  update_request_access(status){
    this.userData = {'req_acc_id':this.req_id,'allowed_duration':this.select_list,"status":status,
    "user_id":localStorage.getItem('userId'),"notification_id":this.notification_id};
    console.log(this.userData);
    if(this.userData.allowed_duration == undefined && this.userData.status == 1){
      this.duraError = true;
      return false;
    }
    //this.loader.present();
  	this.authService.postData(this.userData,'update_request_access').then((result) => {
      //this.loader.dismiss();
       this.responseData = result;
       console.log(this.responseData);
       if(this.responseData.success){
        let alertmessage = this.alertCtrl.create({
          header:'Success!',
          message:this.responseData.data,
          buttons:['OK']
        }).then(alertmessage =>alertmessage.present());
          // alert(this.responseData.data);
          if(status != "2"){
            this.navservice.firstname = this.first_name;
              this.navservice.lastname = this.last_name;
              this.navservice.address = this.address;
              this.navservice.company = this.company;
              this.navservice.period = this.select_list;
            this.navCtrl.navigateRoot('approverequest');
          }else{
            this.navCtrl.navigateRoot('notification');
          }
          
       }else{
         //alert("no response")
       }
  	});
  }

  //selects duration
  selectlist(sector) {
    this.duraError = false;
    this.select_list = sector;
    console.log(this.select_list);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationdetailsPage');
  }
}
