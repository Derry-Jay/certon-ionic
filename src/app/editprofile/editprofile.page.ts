import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../provider/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
  providers: [NavParams]
})
export class EditprofilePage  {

  username: any;
  userData: any;
  sectorlist = [];
  selectLi:boolean = false;
  loader:any;
  responseData: any;
  seletor_name = [];
  keys=[];
  num:any;
  selected_sector =[];
  sector_list = ['Select','Electrical','Compliance','Gas Safe','Construction','FENSA','Other'];
  showcompany = false;
  psdErr:any = false;
  locations=[];
  address:any;
  adrs:boolean = false;
  pstcode:boolean = false;

  chkSmthng:boolean = false;
  Data = { "phonenumber": "", "password": "", "email": "", "name": "", "lastname": "", "confirmpassword": "", 
  "usertype": "", "companyname": "", "companyphone": "",
  "postcode":'', "location":'',
  "companyregno": "" };
  signupform: FormGroup;	

  Electrical:any;
  Compliance:any;
  gas:any;
  Construction:any;
  fensa:any;
  othr:any;

  strongRegex:any;
  mediumRegex:any;
  passwordStrength:any;
  fullAddress :any;

  charerr:any;
  digiterr:any;
  uppercaseerr:any;
  specialcharerr:any
  showtik:boolean;
  showex:boolean;
  cnfmPsd:any =false;
  cnfmPsdok:any = false;
  psder:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder, public authService: AuthService,private alertCtrl: AlertController) {
    
      // creates loader
  	/*this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });*/
    
    this.userData = JSON.parse(localStorage.getItem("userData"));
    console.log(this.userData)
  	this.Data.name = this.userData.first_name;
  	this.Data.lastname = this.userData.last_name;
  	this.Data.email = this.userData.email;
    this.Data.phonenumber = this.userData.contact_no;
    this.Data.postcode = this.userData.cont_postcode;
    this.address = this.userData.cont_addr1;

    //merging address
    this.fullAddress = this.userData.cont_addr1 +"," + this.userData.cont_town +"," + this.userData.cont_county;
    console.log(this.fullAddress);

    //gets company details based on installer account
  	if(localStorage.getItem("typeid") == '1'){
  		this.showcompany = true;
  		this.Data.companyname = this.userData.companyname;
  		this.Data.companyphone = this.userData.companytel;
      this.Data.companyregno = this.userData.companyregno;

      this.selected_sector = this.userData.sectors.split(",");
  	
	  	console.log(this.selected_sector);
	  	for(var i=0;i<this.selected_sector.length;i++){
	  		var name =  this.sector_list[this.selected_sector[i]];
        this.seletor_name.push(name);
	  		this.sectorlist.push(this.selected_sector[i]);
      }

      for(var i=0;i<this.selected_sector.length;i++){
        if(this.selected_sector[i] == "1"){
          this.Electrical = true;
        }
        if(this.selected_sector[i] == "2"){
          this.Compliance = true;
        }
        if(this.selected_sector[i] == "3"){
          this.gas = true;
        }
        if(this.selected_sector[i] == "4"){
          this.Construction = true;
        }
        if(this.selected_sector[i] == "5"){
          this.fensa = true;
        }
        if(this.selected_sector[i] == "6"){
          this.othr = true;
        }
        
      }        

      this.keys = Object.keys(this.sector_list);
  	}
  	else{
  		this.showcompany = false;
    } 
    this.getpostcodelookup();

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad EditprofilePage');
  }

  //Adding validations based on account holder
  ngOnInit() {
    let PHONE_REGEXP = /(^(\+?\-? *[0-9]+)([,0-9 ]*)([0-9 ])*$)|(^ *$)/;
    let EMAILPATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(localStorage.getItem("typeid") == '1'){
	    this.signupform = new FormGroup({
	      phonenumber: new FormControl('', [Validators.required, Validators.maxLength(12),Validators.minLength(10), Validators.pattern(PHONE_REGEXP)]),
	      password: new FormControl('', [ Validators.minLength(10), Validators.maxLength(12)]),
	      confirmpassword: new FormControl('', [Validators.minLength(10), Validators.maxLength(12)]),
	      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(30)]),
	      lastname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(30)]),
        postcode: new FormControl(''),
        location: new FormControl(''),
        email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
	      companyname: new FormControl('', [Validators.required , Validators.maxLength(30),Validators.minLength(4)]),
	      companyphone: new FormControl('', [Validators.required , Validators.maxLength(30),Validators.minLength(4)]),
	      companyregno: new FormControl(''),
	    });
    }
    else{
    	//alert("works")
    	this.signupform = new FormGroup({
        phonenumber: new FormControl('', [Validators.required, Validators.maxLength(12), Validators.maxLength(12),Validators.minLength(10),
          Validators.pattern(PHONE_REGEXP)]),
	      password: new FormControl('', [ Validators.minLength(10), Validators.maxLength(12)]),
	      confirmpassword: new FormControl('', [Validators.minLength(10), Validators.maxLength(12)]),
	      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(30)]),
	      lastname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(30)]),
        email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
        postcode: new FormControl(''),
        location : new FormControl('')
	    });
    }

    //adding styles for password strength
    this.passwordStrength = {
      "float": "left",
      "width": "1%",
      "height": "2px",
      "margin-top": "5px",
      "margin-bottom": "10px",
      "margin-left": "15px",
      "-webkit-transition": "width 2s", /* For Safari 3.1 to 6.0 */
      "transition": "width 2s"
    };
    this.strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
	this.mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
  }

  //check password match
  chkPsd(){
    this.psder = true;

    if(this.Data.confirmpassword.length >= 10){
      //if(this.Data.password != this.Data.confirmpassword){
        this.psdErr = false;
      /*}else{
        this.psdErr = false;
      }*/
    }
    
    if(this.Data.confirmpassword.length >= 10){
      //if(this.signupform.value.password != this.Data.confirmpassword){
        this.cnfmPsd = false;
        this.cnfmPsdok = true;
      /*}else{
        this.cnfmPsd = false;
        this.cnfmPsdok = true;
      }*/
    }

    //password strength
    // if(this.Data.password == ''){
    //   this.passwordStrength["background-color"] = "white";
    //   this.passwordStrength["width"] = "1%";
    // }else if(this.strongRegex.test(this.Data.password))
    // {
    //   this.passwordStrength["background-color"] = "green";
    //   this.passwordStrength["width"] = "94%";
    // }
    // else if(this.mediumRegex.test(this.Data.password))
    // {
    //   this.passwordStrength["background-color"] = "orange";
    //   this.passwordStrength["width"] = "60%";
    // }else{
    //   this.passwordStrength["background-color"] = "red";
    //   this.passwordStrength["width"] = "25%";
    // }

    var p = this.signupform.value.password;
    var errors;
    if (p.length < 10) {
      this.charerr = "Your password must be at least 10 characters";
    }else{
      this.charerr = "";
    }
    if (p.search(/[0-9]/) < 0) {
      this.digiterr = "Your password must contain at least one digit.";
    }else{
      this.digiterr = "";
    }
    if (p.search(/[A-Z]/) < 0) {
      this.uppercaseerr = "Your password must contain Uppercase.";
    }else{
      this.uppercaseerr = "";
    }
    /*if (p.search(/[!@#$%^&+=]/) < 0) {
      this.specialcharerr = "Your password must contain Special Character (e.g. ! ? %)."
    }else{
      this.specialcharerr = "";
    }*/
    if(this.charerr =="" && this.digiterr =="" && this.uppercaseerr =="" ){
      this.showtik = true;
      this.psder = false;
      this.showex = false;
    }else{
      this.showex = true;
      this.showtik = false;
      this.showex = true;
    }
  }



  //select sectors
  selectlist(sector) {
    //this.sectorlist = [];
    var index = this.sectorlist.indexOf(sector);
    if(index == -1){
      this.sectorlist.push(sector);
    }else{
      if(sector == "1"){
        this.Electrical = false;
      }
      if(sector == "2"){
        this.Compliance = false;
      }
      if(sector == "3"){
        this.gas = false;
      }
      if(sector == "4"){
        this.Construction = false;
      }
      if(sector == "5"){
        this.fensa = false;
      }
      if(sector == "6"){
        this.othr = false;
      }
      this.sectorlist.splice(index, 1);
    }
      if (this.sectorlist.length == 0) {
        this.selectLi = true;
      } else {
        this.selectLi = false;
      }
    
  }

  //changing profile data and save
  updateprofile(){
    if(this.Data.location == "" || this.Data.postcode == ""){
      this.chkSmthng = true;
    }
    this.chkadrs();
    console.log(this.Data);

  	if(localStorage.getItem("typeid") == "2"){
      //homeowner
      this.userData = { "user_id":localStorage.getItem("userId"),"email": this.Data.email, 
      "password": this.Data.password, "last_name": this.Data.lastname, "first_name": this.Data.name, 
      "contact_no": this.Data.phonenumber, "usertype": "1"  , "contact_postcode":this.Data.postcode , 
    "contact_address":this.Data.location};
  	}
  	else{
      //installer
  		this.userData = { "user_id":localStorage.getItem("userId"),
	      "email": this.Data.email, "password": this.Data.password,  "last_name": this.Data.lastname,
        "first_name": this.Data.name, "contact_no": this.Data.phonenumber, "usertype": "2",
        "contact_postcode":this.Data.postcode , "contact_address":this.Data.location,
	      "companyname": this.Data.companyname, "companytel": this.Data.companyphone,
        "companyregno": this.Data.companyregno, "sectors": this.sectorlist
	    };
    }
    //check validations
    if (this.selectLi == false && this.adrs == false && this.pstcode == false) {
      this.presentLoading();
      console.log(this.userData)

      this.authService.postData(this.userData, 'update_user_profile').then((result) => {
        //this.loader.dismiss();
        this.loadingCtrl.dismiss();
        this.responseData = result;
        if (this.responseData.success) {
          this.successAlert(this.responseData.message);
          // alert(this.responseData.message);
          console.log(this.responseData);
          localStorage.removeItem("userData");
          localStorage.setItem("userData", JSON.stringify(this.responseData.usersData));
          this.navCtrl.navigateForward('myprofile');
        }
        else {
          for (var key in this.responseData.errors) {
            //console.log("Key: " + key); 
            // console.log("Value: " + this.responseData.errors[key]);
            alert(this.responseData.errors[key]);
          }
          this.navCtrl.navigateForward('myprofile');
        }
      });
    }
  }

  //show address error
  adrschk(){
    this.adrs = false;
  }

  //checking address field
  chkadrs(){
    console.log(this.Data)
    if(this.chkSmthng == true){
      if(this.Data.location == ""){
        this.adrs = true;
      }else{
        this.adrs = false;
      }
      if(this.Data.postcode == ""){
        this.pstcode = true;
      }else{
        this.pstcode = false;
      }
    }
    
  }

  //loads location based on postcode
  getpostcodelookup(){
    //this.loader.present();
    this.presentLoading();
    this.locations=[];
    this.userData = {"postcode":this.Data.postcode}
    this.authService.postData(this.userData,'postcode_lookup').then((result) => {
      this.responseData = result;
      if(this.responseData.success){
        for(var i=0;i< parseInt(this.responseData.lookupresponse.addresses.length); i++){
          this.locations.push(this.responseData.lookupresponse.addresses[i]);
        }
        console.log(this.locations);
      }
       var findAddress = this.address;
       if(findAddress !=""){
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
       this.Data.location = this.locations[matchAdrsIndex];
       }
       console.log(this.Data);
       if(this.Data.postcode !=""){
       if(this.Data.location == undefined || this.Data.location == ""){
        this.locations.push(this.fullAddress);
         this.Data.location = this.fullAddress;
       }
      }
      //this.loader.dismiss();
      this.loadingCtrl.dismiss();
    });
  }

  async successAlert(data) {
    const alert = await this.alertCtrl.create({
      header: 'Success!',
      message: data,
      buttons: ['OK']
    });
   
    await alert.present();
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
     //duration: 2000
    });
    await loading.present();
  }

}
