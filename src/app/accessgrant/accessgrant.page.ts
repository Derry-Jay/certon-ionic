import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { NotiService } from '../noti.service';
import { MynavService } from '../mynav.service';

@Component({
  selector: 'app-accessgrant',
  templateUrl: './accessgrant.page.html',
  styleUrls: ['./accessgrant.page.scss'],
  providers: [NavParams]
})
export class AccessgrantPage implements OnInit {
  username : any;
  address : any;
  expire_date:any;
  access_forever:any;
  uuid:any;
  datt:any;
  datee:any;
  created:any;
  from:any;
  diffInMs:any;
  ndatee:any;
  diffInDays:any;
  period:any;
  linkhide:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private navservcie:NotiService,private navservice:MynavService) { }

  ngOnInit() {
    this.username = this.navservcie.username;
  	this.address = this.navservcie.address;
    this.uuid = this.navservcie.uuid;
    this.created = this.navservcie.createdat;
  	this.access_forever = this.navservcie.accessForever;
    this.expire_date = this.navservcie.expireDate;
    console.log("exp",this.expire_date);
    //alert(this.expire_date);

    this.datt = this.expire_date.slice(0, 10);
    this.from = this.created.slice(0, 10);
    console.log("exp",this.expire_date);
    this.ndatee = this.datt.split("/").reverse().join("-");
    

      var datee = new Date(this.from);
      var dd = String(datee.getDate()).padStart(2, '0');
			var mm = String(datee.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = datee.getFullYear() ;
      this.datee =  yyyy + '-' + mm + '-' + dd;

      //alert(this.datee);
      //alert(this.ndatee);

      var diffInMs   = <any>new Date(this.ndatee) - <any>new Date(this.datee);
      this.diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      //alert(this.from);
      //alert(this.diffInDays);

      if(this.diffInDays == '1'){
        this.period = '1 Day';
       }
       else if(this.diffInDays == '7')
       {
        this.period = '1 Week';
       }
       else if(this.diffInDays == '30'){
        this.period = '1 Month';
       }
       else{
        this.period = 'Forever';
        this.linkhide = 1;
       }

       var curdt =new Date().toISOString().substring(0, 10);
       //alert(curdt);
       var d1 = new Date(curdt);
       var d2 = new Date(this.ndatee);
       if(d2 > d1)
       {
         this.linkhide = 1;
       }

    if(this.expire_date == null){
      this.expire_date = "ever";
    }
  }

  gotomyproperties(propertyid){
    //alert(propertyid);
    this.navservice.uuid = propertyid;
    this.navservice.otherid = 1;
      this.navservice.othersecid = 1;
    this.navCtrl.navigateForward("viewproperty");
  	//this.navCtrl.navigateForward("tabcontroller");
  }

}
