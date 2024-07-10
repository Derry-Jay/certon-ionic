import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform } from '@ionic/angular';
import { NotiService } from '../noti.service';

@Component({
  selector: 'app-approverequest',
  templateUrl: './approverequest.page.html',
  styleUrls: ['./approverequest.page.scss'],
  providers: [NavParams]
})
export class ApproverequestPage  {

  first_name:any;
  last_name:any;
  address:any;
  period:any;
  company:any;
  constructor(public navCtrl: NavController, public navParams: NavParams , private platform : Platform,private navservcie:NotiService) {
    this.first_name = this.navservcie.firstname;
    this.last_name = this.navservcie.lastname;
    this.address = this.navservcie.address;
    this.company = this.navservcie.company;

   //loads access granted properties period
   if(this.navservcie.period == '1'){
    this.period = '1 Day';
   }
   else if(this.navservcie.period == '7')
   {
    this.period = '1 Week';
   }
   else if(this.navservcie.period == '30'){
    this.period = '1 Month';
   }
   else{
    this.period = 'Forever';
   }

   /*this.platform.registerBackButtonAction(() => {
    this.navCtrl.navigateRoot('welcome');
  });*/
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApproverequestPage');
  }

  //loads home page
  backtohome(){
  	this.navCtrl.navigateForward('welcome');
  }

}
