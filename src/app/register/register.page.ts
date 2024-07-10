import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../provider/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [NavParams]
})
export class RegisterPage implements OnInit {
  username: any;
  userData: any;
  sectorlist = [];
  responseData: any;
  Data = {
    "phonenumber": "", "password": "", "email": "", "name": "", "lastname": "", "address": "", "postcode": '',
    "confirmpassword": "", "usertype": "", "companyname": "", "companyphone": "", "companyregno": ""
  };
  signupform: FormGroup;
  PURE_EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  PASSWORD_REGEXP = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/);
  loader: any;
  cpyName: any = false;
  cpyPh: any = false;
  cpyReg: any = false;
  selectLi: any = false;
  chkbx: any = true;
  cnfmPsd: any = false;
  cnfmPsdok: any = false;
  strongRegex: any;
  mediumRegex: any;
  passwordStrength: any;

  propertyid = [];
  postcode: any;
  locations: any = [];

  showtik: boolean;
  showex: boolean;
  emptypwd: boolean = true;
  charerr: any;
  digiterr: any;
  uppercaseerr: any;
  specialcharerr: any
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder, public authService: AuthService, private alertCtrl: AlertController) {

    //creating loader
    /*this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });*/

  }

  //loads when component loaded
  ngOnInit() {
    let PHONE_REGEXP = /(^(\+?\-? *[0-9]+)([,0-9 ]*)([0-9 ])*$)|(^ *$)/;
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signupform = new FormGroup({
      phonenumber: new FormControl('', [Validators.required, Validators.pattern(PHONE_REGEXP), Validators.minLength(10), Validators.maxLength(12)]),
      password: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]),
      confirmpassword: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(12)]),
      name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(30)]),
      address: new FormControl('', [Validators.required, Validators.minLength(1)]),
      postcode: new FormControl('', [Validators.required, Validators.minLength(1)]),
      lastname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      usertype: new FormControl('', [Validators.required]),
    });

    //adding styles for password strenth
    this.passwordStrength = {
      "float": "left",
      "width": "1%",
      "height": "2px",
      "margin-top": "-8px",
      "-webkit-transition": "width 2s", /* For Safari 3.1 to 6.0 */
      "transition": "width 2s"
    };
    this.strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    this.mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
  }

  //enable account creation check box based on validations
  openChkBx() {
    if ((this.signupform.value.phonenumber && this.signupform.value.name 
      && this.signupform.value.lastname && this.signupform.value.email && this.signupform.value.postcode) != "" &&
      this.signupform.value.password.length >= 10 && this.signupform.value.confirmpassword.length >= 10) {
      this.chkbx = false;
    } else {
      this.chkbx = true;
    }

    // if (errors.length > 0) {
    //     alert(errors.join("\n"));
    //     return false;
    // }

  }
  chkonlypwd() {
    this.emptypwd = false;
    if (this.signupform.value.confirmpassword.length >= 10) {
     // if (this.signupform.value.password != this.signupform.value.password) {
        this.cnfmPsd = false;
        this.cnfmPsdok = true;
      //} else {
       // this.cnfmPsd = false;
       // this.cnfmPsdok = true;
      //}
    }

    //Password Sttrength
    // if(this.signupform.value.password == ''){
    //   this.passwordStrength["background-color"] = "white";
    //   this.passwordStrength["width"] = "1%";
    // }else if(this.strongRegex.test(this.signupform.value.password))
    // {
    //   this.passwordStrength["background-color"] = "green";
    //   this.passwordStrength["width"] = "97%";
    // }
    // else if(this.mediumRegex.test(this.signupform.value.password))
    // {
    //   this.passwordStrength["background-color"] = "orange";
    //   this.passwordStrength["width"] = "60%";
    // }else{
    //   this.passwordStrength["background-color"] = "red";
    //   this.passwordStrength["width"] = "25%";
    // }

    var p = this.signupform.value.password;
    if (p.length < 10) {
      this.charerr = "Your password must be at least 10 characters";
    } else {
      this.charerr = "";
    }
    if (p.search(/[0-9]/) < 0) {
      this.digiterr = "Your password must contain at least one digit.";
    } else {
      this.digiterr = "";
    }
    if (p.search(/[A-Z]/) < 0) {
      this.uppercaseerr = "Your password must contain Uppercase.";
    } else {
      this.uppercaseerr = "";
    }
    /*if (p.search(/[!@#$%^&+=]/) < 0) {
      console.log(p.search(/[!@#$%^&+=]/));
      this.specialcharerr = "Your password must contain Special Character (e.g. ! ? %)."
    } else {
      this.specialcharerr = "";
    }*/
    if (this.charerr == "" && this.digiterr == "" && this.uppercaseerr == "" ) {
      this.showtik = true;
      this.showex = false;
    } else {
      this.showtik = false;
      this.showex = true;
    }
    this.openChkBx();
  }

  //loads locations based on postcode
  getpostcodelookup() {
    this.locations = [];
    // document.querySelector(".choose-location").classList.remove("hide");
    this.userData = { postcode: this.Data.postcode };
    console.log(this.userData)
    //this.loader.present();
    this.authService
      .postData(this.userData, "postcode_lookup")
      .then(result => {
        //this.loader.dismiss();
        this.responseData = result;
        if (this.responseData.success) {
          for (var i = 0; i < parseInt(this.responseData.lookupresponse.addresses.length); i++) {
            this.locations.push(
              this.responseData.lookupresponse.addresses[i]
            );
          }
          console.log(this.locations);
        } else {
        }
      });
  }

  //calls after view loaded
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  //enables register button based on checkbox selection
  showextra(value) {
    console.log(value);
    if (value == 1) {
      console.log(this.signupform);

    }
    else {
      document.querySelector("#normalform").classList.add("hide");
      document.querySelector("#companysection").classList.remove('hide');
    }

  }

  //select selectors
  selectlist(sector) {
    console.log(this.sectorlist);
    this.sectorlist.push(sector);
    this.selectLi = false;
  }

  //register for homeowner
  signup() {
    this.userData = { "email": this.Data.email, "password": this.Data.password, "last_name": this.Data.lastname,
     "first_name": this.Data.name, "contact_no": this.Data.phonenumber, "contact_postcode":this.Data.postcode,
       "contact_address":this.Data.address, "usertype": "1" };
       console.log(this.userData);
    //this.loader.present();
    this.authService.postData(this.userData, 'signup').then((result) => {
      //this.loader.dismiss();
      this.responseData = result;
      if (this.responseData.success) {
       /* let alertmessage = this.alertCtrl.create({
          title:'Success!',
          message:this.responseData.message,
          buttons:['Ok']
        });
        alertmessage.present();*/
        // alert(this.responseData.message);
        this.successalert();
        this.navCtrl.navigateForward('login');
      }
      else {
        for (var key in this.responseData.errors) {
          console.log("Key: " + key);
          console.log("Value: " + this.responseData.errors[key]);
          alert(this.responseData.errors[key]);
        }
      }
    });
  }

  //checking validations for company fields
  copyName(event) {
    console.log(event)
    if (event == "a") {
      if (this.Data.companyname.length > 3) {
        this.cpyName = false;
      } else {
        this.cpyName = true;
      }
    }
    if (event == "b") {
      if (this.Data.companyphone.length > 9) {
        this.cpyPh = false;
      } else {
        this.cpyPh = true;
      }
    }
    if (event == "c") {
      if (this.Data.companyregno.length > 3) {
        this.cpyReg = false;
      } else {
        this.cpyReg = true;
      }
    }
  }

  //register button for company
  completesignup() {
    this.userData = {
      "email": this.Data.email, "password": this.Data.password, "last_name": this.Data.lastname,
      "first_name": this.Data.name, "contact_no": this.Data.phonenumber, "usertype": "2",
      "companyname": this.Data.companyname, "companytel": this.Data.companyphone,
      "contact_postcode": this.Data.postcode, "contact_address": this.Data.address,
      "companyregno": this.Data.companyregno, "sectors": this.sectorlist
    };
    console.log(this.userData)
    console.log(this.sectorlist.length)
    this.chkErr();

    if (this.cpyName == false && this.cpyPh == false && this.selectLi == false) {
      //this.loader.present();

      this.authService.postData(this.userData, 'signup').then((result) => {
        //this.loader.dismiss();
        this.responseData = result;
        if (this.responseData.success) {
          /* let alertmessage = this.alertCtrl.create({
             title:'Success!',
             message:this.responseData.message,
             buttons:['Ok']
           });
           alertmessage.present();*/
          // alert(this.responseData.message);
          this.successalert();
          this.navCtrl.navigateForward('login');
        }
        else {
          for (var key in this.responseData.errors) {
            console.log("Key: " + key);
            console.log("Value: " + this.responseData.errors[key]);
            alert(this.responseData.errors[key]);
          }
          this.navCtrl.navigateForward('login');
        }
      });
    }
  }
  //check validations
  chkErr() {
    if (this.Data.companyname.length < 4) {
      this.cpyName = true;
    } else {
      this.cpyName = false;
    }
    if (this.Data.companyphone.length < 10) {
      this.cpyPh = true;
    } else {
      this.cpyPh = false;
    }
    if (this.sectorlist.length < 1) {
      this.selectLi = true;
    } else {
      this.selectLi = false;
    }
  }
  async successalert(){
    const alert = await this.alertCtrl.create({
      header:'Success!',
      message:this.responseData.message,
      buttons:['Ok']
    });
    await alert.present();
  }

}
