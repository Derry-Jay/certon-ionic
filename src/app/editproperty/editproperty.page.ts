import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../provider/auth.service';
import { MynavService } from '../mynav.service';

@Component({
  selector: 'app-editproperty',
  templateUrl: './editproperty.page.html',
  styleUrls: ['./editproperty.page.scss'],
  providers: [NavParams]
})
export class EditpropertyPage  {

 
  
  username : any;
  userData : any;
  responseData : any;
  propdata = [];
  otherpropDetails = [];
  postcode : any;
  locations=[];
  propertyid=[];
  relationship:any;
  first_name:any;
  last_name : any;
  password :any;
  addressErr:any;
  phone :any;
  email:any;
  purchasedDate:any;
  property_type = [];
  propertytype:any;
  location:any;
  loader:any;
  uuid:any;
  oldPostCode:any;
  otherpid:any;
  otherpidd:any;
  typeid:any;
  fullAddress :any;
  credentialsForm: FormGroup;
  PURE_EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  PHONE_REGEXP = /^0[23489]{1}(\-)?[^0\D]{1}\d{6}$/;
  submitAttempt: boolean = false;
  paramter1 = this.navParams.get('uuid');
  
  mindate:any;
  maxdate:any;
  sixmonbkdate:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, 
    public authService : AuthService, public formBuilder: FormBuilder, private alertCtrl:AlertController,private navService : MynavService) {
    this.typeid = localStorage.getItem("typeid");
    this.otherpid = this.navService.otherid;
    this.otherpidd = this.navService.othersecid;
    
    this.credentialsForm = this.formBuilder.group({
      first_name: ['', Validators.compose([Validators.required])],
      last_name: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.pattern(this.PHONE_REGEXP),Validators.required])],
      email: ['', Validators.compose([Validators.pattern(this.PURE_EMAIL_REGEXP),Validators.required])],
      password: ['', Validators.compose([Validators.pattern(this.PASSWORD_REGEXP),Validators.required])]});
      this.userData = {"user_id":localStorage.getItem("userId"),"puuid":this.navService.uuid};  
    //loads proeprty types
    this.authService.getData('get_property_type').then((result) => {
      this.responseData = result;
      if(this.responseData.success){
        this.getproperties(this.userData);
        for(var i=0;i< parseInt(this.responseData.get_property_types.length); i++){
          this.property_type.push(this.responseData.get_property_types[i]);
        }
      }
    });

     
   

  }

getproperties(userData)
{
  this.presentLoading();
  this.authService.postData(this.userData, 'get_properties').then((result) => {
    this.loadingCtrl.dismiss();
    this.responseData = result;
    if (this.responseData.success) {
      //console.log(this.responseData);
      if (this.responseData.propdata.length > 0) {
        //my Property
        for (var i = 0; i < this.responseData.propdata.length; i++) {
          this.propdata.push(this.responseData.propdata[i]);
        }
        this.uuid = this.propdata[0].uuid;
        this.postcode = this.propdata[0].postcode;
        this.purchasedDate = this.propdata[0].actualdate;
        this.mindate = this.propdata[0].actualdate;
        //console.log("as",this.mindate)
        if(this.mindate > this.sixmonbkdate){
          this.mindate = this.sixmonbkdate;
        }
       if(this.mindate == "" || this.mindate == null){
         this.mindate = this.sixmonbkdate;
       }
        this.propertytype = this.propdata[0].type;
        this.oldPostCode = this.propdata[0].postcode;
        this.fullAddress = this.propdata[0].full_address;
      }
      else {
        //Other Property
        this.propdata = [];
        for (var i = 0; i < this.responseData.otherpropDetails.length; i++) {
          this.otherpropDetails.push(this.responseData.otherpropDetails[i]);
        }
        this.uuid = this.otherpropDetails[0].uuid;
        this.postcode = this.otherpropDetails[0].postcode;
        this.purchasedDate = this.otherpropDetails[0].actualdate;
        this.mindate = this.otherpropDetails[0].actualdate;
        if(this.mindate > this.sixmonbkdate){
          this.mindate = this.sixmonbkdate;
        }
        if(this.mindate == "" || this.mindate == null){
          this.mindate = this.sixmonbkdate;
        }
        this.propertytype = this.otherpropDetails[0].type;
        this.oldPostCode = this.otherpropDetails[0].postcode;
        this.fullAddress = this.otherpropDetails[0].full_address;
        
      }
      this.getpostcodelookup();
    }
    else {
      this.propdata = [];
      this.otherpropDetails = [];
    }
  });
}

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditpropertyPage');
  }

  //check location validation
  chkErr(){
    this.addressErr = false;
  }

  //update all property
  updateproperty() {

    this.userData = {
      "user_id":localStorage.getItem("userId"),
      "postcode": this.postcode,
      "property_type": this.propertytype,
      "address": this.location,
      "puuid": this.navService.uuid,
      "purchased_date": this.purchasedDate
    };
    if (this.userData.postcode == "") {
      this.userData.postcode = this.oldPostCode;
    }
    if (this.userData.address == undefined) {
      this.addressErr = true;
    } else {
      //console.log(this.userData);
      this.presentLoading()
      this.authService.postData(this.userData, 'update_property').then((result) => {
        this.loadingCtrl.dismiss();
        this.responseData = result;
        if (this.responseData.success) {
          this.successalert(this.responseData.message);
         
          if (this.typeid == "4") {
            this.navCtrl.navigateForward("tabcontroller");
          } 
          else if (this.typeid == "2") {
            this.navCtrl.navigateForward("myproperties");
          } else {
           
            if(this.otherpid == 1)
           {
            this.navCtrl.navigateForward("tabcontroller/otherproperties");
           }
           else
           {
            this.navCtrl.navigateForward("tabcontroller/myproperties");
           }
          }
        }
        else {
          this.failed(this.responseData.message);
        }
      });
    }
  }

  async successalert(data) {
    const alert = await this.alertCtrl.create({
      header: 'Success !',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }

  async failed(data) {
    const alert = await this.alertCtrl.create({
      header: 'Failed !',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }

  //loads location based on postcode lookup
  getpostcodelookup(){
    this.userData = {"postcode":this.postcode}
    this.presentLoading();
    this.authService.postData(this.userData,'postcode_lookup').then((result) => {
      this.loadingCtrl.dismiss();
      this.locations=[];
      this.responseData = result;
      if(this.responseData.success){
        for(var i=0;i< parseInt(this.responseData.lookupresponse.addresses.length); i++){
          this.locations.push(this.responseData.lookupresponse.addresses[i]);
        }
      }
      if(this.propdata.length > 0){
        var findAddress = this.propdata[0].address.split(',');
      }
      else{
        var findAddress = this.otherpropDetails[0].address.split(',');
      }
      findAddress = findAddress[0];
      var matchAdrsIndex;
      for (var i = 0; i < this.locations.length; i++) {
        var b = this.locations[i].search(findAddress);
        if (b >= 0) {
          var name1 = this.locations[i].split(' ');
          var name2 = findAddress.split(' ');
          var name3 = name1[0] +" "+name1[1];
          var nam3 =  name3.split(',');
          var name4 = name2[0]+" "+name2[1];
         
          if(nam3[0] == name4){
            matchAdrsIndex = i;
          }
         
        }
      }
      this.location = this.locations[matchAdrsIndex];
      if(this.location == undefined || this.location == ""){
        this.locations.push(this.fullAddress);
        this.location =this.fullAddress;
      }
    });
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      // duration: 2000
    });
    await loading.present();
  }
}
