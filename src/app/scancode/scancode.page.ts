import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NavController, NavParams, Platform, AlertController, LoadingController } from '@ionic/angular';
import { WelcomePage } from '../welcome/welcome.page';
import { MynavService } from '../mynav.service';
import { AuthService } from '../provider/auth.service';
//import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
//import { RequestaccessPage } from '../requestaccess/requestaccess';
import { ViewpropertyPage } from '../viewproperty/viewproperty.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { PropertysuccessPage } from '../propertysuccess/propertysuccess.page';
import { OtherpropertiesPage } from '../otherproperties/otherproperties.page';
import { AdddocumentPage } from '../adddocument/adddocument.page';

@Component({
  selector: 'app-scancode',
  templateUrl: './scancode.page.html',
  styleUrls: ['./scancode.page.scss'],
  providers: [NavParams, InAppBrowser, BarcodeScanner]
})
export class ScancodePage implements OnInit {

  userData: any;
  responseData: any;
  prop_user_id: any;
  prop_id: any;
  propaddress: any;
  property_id: any;
  loader: any;
  prop_uuid: any;
  nopropertymessage: any;
  screenHeight = 0;
  //add property
  relationship: any;
  postcode: any;
  propertyid = [];
  location: any;
  locations = [];
  propertytype: any;
  purchasedDate: any;
  property_type = [];
  password: any;
  confirmPsd: any;
  last_name: any;
  phone: any;
  email: any;
  first_name: any;
  typeid: any;
  pstlerr: any = false;
  locerr: any = false;
  properr: any = false;
  daterr: any = false;
  psdErr: any = false;
  myPage: any;
  propname: any;
  shwpsdErr: boolean = false;
  strongRegex: any;
  mediumRegex: any;
  passwordStrength: any;
  datee: any;
  credentialsForm: FormGroup;

  charerr: any;
  digiterr: any;
  uppercaseerr: any;
  specialcharerr: any;
  showtik: any;
  showex: any;
  pswder: boolean = false;
  //Validations expressions
  PURE_EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  PASSWORD_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  PHONE_REGEXP = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public authService: AuthService, private barcodeScanner: BarcodeScanner, private iab: InAppBrowser,
    private platform: Platform, public formBuilder: FormBuilder, public alertCtrl: AlertController,
    private navService: MynavService) { }

  ngOnInit() {
    this.platform.ready().then((readySource) => {
      this.screenHeight = this.platform.height() - 430;
    });

    this.typeid = localStorage.getItem("typeid");

    //Adding validations for required fields
    this.credentialsForm = this.formBuilder.group({
      first_name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      last_name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      phone: ['', Validators.compose([Validators.minLength(10), Validators.required])],
      email: ['', Validators.compose([Validators.pattern(this.PURE_EMAIL_REGEXP), Validators.required])],
      password: ['', Validators.compose([Validators.pattern(this.PASSWORD_REGEXP), Validators.required])],
      confirmPsd: ['', Validators.compose([Validators.pattern(this.PASSWORD_REGEXP), Validators.required])]
    });

    //password strength styles
    this.passwordStrength = {
      "float": "left",
      "width": "1%",
      "height": "2px",
      "margin-top": "-27px",
      "margin-left": "17px",
      "-webkit-transition": "width 2s", /* For Safari 3.1 to 6.0 */
      "transition": "width 2s"
    };
    this.strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    this.mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

    //getting property types
    this.authService.getData('get_property_type').then((result) => {
      this.responseData = result;
      if (this.responseData.success) {
        for (var i = 0; i < parseInt(this.responseData.get_property_types.length); i++) {
          this.property_type.push(this.responseData.get_property_types[i]);
        }
      }
    });
    this.nopropertymessage = '';
    this.property_id = '';
    this.scancode();
    
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      // duration: 2000
    });
    await loading.present();
  }

  psdDesign() {
    // if(this.password == ''){
    //   this.passwordStrength["background-color"] = "white";
    //   this.passwordStrength["width"] = "1%";
    // }else if(this.strongRegex.test(this.password))
    // {
    //   this.passwordStrength["background-color"] = "green";
    //   this.passwordStrength["width"] = "95%";
    // }
    // else if(this.mediumRegex.test(this.password))
    // {
    //   this.passwordStrength["background-color"] = "orange";
    //   this.passwordStrength["width"] = "60%";
    // }else{
    //   this.passwordStrength["background-color"] = "red";
    //   this.passwordStrength["width"] = "25%";
    // }
    this.pswder = true;
    var p = this.password;
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
   /* if (p.search(/[!@#$%^&+=]/) < 0) {
      this.specialcharerr = "Your password must contain Special Character (e.g. ! ? %)."
    } else {
      this.specialcharerr = "";
    }*/
    if (this.charerr == "" && this.digiterr == "" && this.uppercaseerr == "" ) {
      this.showtik = true;
      this.showex = false;
      this.pswder = false;
    } else {
      this.showtik = false;
      this.pswder = true;
      this.showex = true;
    }
  }

  //opens request access page
  requestaccess() {
    this.navService.userid = localStorage.getItem("userId");
    this.navService.proeprtyUserId = this.prop_user_id;
    this.navService.propertyId = this.prop_id;
    this.navService.address = this.propaddress;
    this.navService.firstname = localStorage.getItem("firstname");
    this.navCtrl.navigateForward("requestaccess");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScancodePage');
    let elem = <HTMLElement>document.getElementById("screenHeight");
    elem.style.minHeight = this.screenHeight + "px";
  }

  //opens view property pagea
  viewproperty() {
    this.navService.uuid = this.prop_uuid;
    this.navCtrl.navigateForward("viewproperty");
  }

  //scans code using original device
  scancode() {
    //const options: BarcodeScannerOptions = {};
    let BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: false,
      showTorchButton: false,
      formats: 'QR_CODE',
    };

    if (this.platform.is('android')) {

      Object.assign(BarcodeScannerOptions, { torchOn: false, prompt: 'Place a QRcode inside the scan area', resultDisplayDuration: 500, orientation: 'portrait' });
    }

    // start scanning
    const scanSub = this.barcodeScanner.scan(BarcodeScannerOptions).then(barcodeData => {
      console.log('Barcode data', barcodeData.text);

      this.userData = { "scancode": barcodeData.text, "user_id": localStorage.getItem("userId") };
      this.property_id = this.userData.scancode;
      if (barcodeData.text != '') {
        this.authService.postData(this.userData, 'scan_properties').then((result) => {

          this.responseData = result;
          console.log(this.responseData);
          if (localStorage.getItem("typeid") == '1') {
            if (this.responseData.success) {
              //  this.propaddress = this.responseData.propdata.address1 + " " + this.responseData.propdata.address2;
              this.propaddress = this.responseData.propdata.full_address;
              this.prop_user_id = this.responseData.propdata.user_id;
              this.prop_id = this.responseData.propdata.id;
              this.prop_uuid = this.responseData.propdata.uuid;
              if (this.responseData.propertOwned == '1') {
                document.querySelector(".ownproperty").classList.remove("hide");
                document.querySelector(".property_holder").classList.add("hide");
                document.querySelector(".otherpropertyrequest").classList.add("hide");
              }
              else if (this.responseData.propertOwned == '0' && this.responseData.propertyAccess == '1') {
                document.querySelector(".otherpropertyrequest").classList.remove("hide");
                document.querySelector(".otherproperty").classList.add("hide");
                document.querySelector(".property_holder").classList.add("hide");
              }
              else if (this.responseData.propertOwned == '0' && this.responseData.propertyAccess == '0') {
                document.querySelector(".otherproperty").classList.remove("hide");
                document.querySelector(".property_holder").classList.add("hide");
                document.querySelector(".otherpropertyrequest").classList.add("hide");
              }
            }
            else {
              this.nopropertymessage = this.responseData.message;
              this.noexistproeprtyAlertOne();


              //  if(confirm("No existing property found, would you like to add one?"))
              //  {
              //    document.querySelector(".noproperty").classList.remove("hide");
              //    document.querySelector(".property_holder").classList.add("hide");
              //    document.querySelector(".otherpropertyrequest").classList.add("hide");
              //  }
            }
          }
          else {
            if (this.responseData.success) {
              //  this.propaddress = this.responseData.propdata.address1 + " " + this.responseData.propdata.address2;
              this.propaddress = this.responseData.propdata.full_address;
              this.prop_user_id = this.responseData.propdata.user_id;
              this.prop_id = this.responseData.propdata.id;
              this.prop_uuid = this.responseData.propdata.uuid;
              if (this.responseData.propertOwned == '1') {
                document.querySelector(".ownproperty").classList.remove("hide");
                document.querySelector(".property_holder").classList.add("hide");
              }
              else if (this.responseData.propertOwned == '0') {
                document.querySelector(".notownedproperty").classList.remove("hide");
                document.querySelector(".property_holder").classList.add("hide");
              }
            }
            else {
              this.nopropertymessage = this.responseData.message;
              if (this.responseData.message == "This Property is not in CertOn!") {
                this.noexistproeprtyAlertTwo();
                //  if(confirm("No existing property found, would you like to add one?"))
                //  {
                //    document.querySelector(".noproperty").classList.remove("hide");
                //    document.querySelector(".property_holder").classList.add("hide");
                //  }
              }
              else {
                this.alertmessage(this.responseData.message);

              }
            }
          }

        });
      }
      else {
        this.navCtrl.navigateForward('welcome');
      }

    }).catch(err => {
      console.log('Error', err);
    });


  }


  //to scan using system
  samplescancode() {
    this.userData = { "scancode": "P10006748", "user_id": localStorage.getItem("userId") };
    this.property_id = this.userData.scancode;
    this.authService.postData(this.userData, 'scan_properties').then((result) => {
      //this.loader.dismiss();
      this.responseData = result;
      console.log(this.responseData);
      console.log(localStorage.getItem("typeid"));
      if (localStorage.getItem("typeid") == '1') {
        if (this.responseData.success) {
          this.propaddress = this.responseData.propdata.full_address;
          this.prop_user_id = this.responseData.propdata.user_id;
          this.prop_id = this.responseData.propdata.id;
          this.prop_uuid = this.responseData.propdata.uuid;
          if (this.responseData.propertOwned == '1') {
            document.querySelector(".ownproperty").classList.remove("hide");
            document.querySelector(".property_holder").classList.add("hide");
            document.querySelector(".otherpropertyrequest").classList.add("hide");
          }
          else if (this.responseData.propertOwned == '0' && this.responseData.propertyAccess == '1') {
            document.querySelector(".otherpropertyrequest").classList.remove("hide");
            document.querySelector(".otherproperty").classList.add("hide");
            document.querySelector(".property_holder").classList.add("hide");
          }
          else if (this.responseData.propertOwned == '0' && this.responseData.propertyAccess == '0') {
            document.querySelector(".otherproperty").classList.remove("hide");
            document.querySelector(".property_holder").classList.add("hide");
            document.querySelector(".otherpropertyrequest").classList.add("hide");
          }
        }
        else {
          this.nopropertymessage = this.responseData.message;
          this.noexistproeprtyAlertOne();
          // let alertmsg = this.alertCtrl.create({
          //   title: 'Confirm!',
          //   message: 'No existing property found, would you like to add one?',
          //   buttons: [
          //     {
          //       text: 'Cancel',
          //       role: 'cancel',
          //       cssClass: 'secondary',
          //     }, {
          //       text: 'Ok',
          //       handler: () => {
          //         document.querySelector(".noproperty").classList.remove("hide");
          //         document.querySelector(".property_holder").classList.add("hide");
          //         document.querySelector(".otherpropertyrequest").classList.add("hide");
          //       }
          //     }
          //   ]
          // });

          // alertmsg.present();
          // if(confirm("No existing property found, would you like to add one?"))
          // {
          //   document.querySelector(".noproperty").classList.remove("hide");
          //   document.querySelector(".property_holder").classList.add("hide");
          //   document.querySelector(".otherpropertyrequest").classList.add("hide");
          // }
        }
      }
      else {
        if (this.responseData.success) {
          this.propaddress = this.responseData.propdata.full_address;
          this.prop_user_id = this.responseData.propdata.user_id;
          this.prop_id = this.responseData.propdata.id;
          this.prop_uuid = this.responseData.propdata.uuid;
          if (this.responseData.propertOwned == '1') {
            document.querySelector(".ownproperty").classList.remove("hide");
            document.querySelector(".property_holder").classList.add("hide");
          }
          else if (this.responseData.propertOwned == '0') {
            document.querySelector(".notownedproperty").classList.remove("hide");
            document.querySelector(".property_holder").classList.add("hide");
          }
        }
        else {
          this.nopropertymessage = this.responseData.message;
          if (this.responseData.message == "This Property is not in CertOn!") {
            this.noexistproeprtyAlertTwo();
            // let alertmsg = this.alertCtrl.create({
            //   title: 'Confirm!',
            //   message: 'No existing property found, would you like to add one?',
            //   buttons: [
            //     {
            //       text: 'Cancel',
            //       role: 'cancel',
            //       cssClass: 'secondary',
            //     }, {
            //       text: 'Ok',
            //       handler: () => {
            //         document.querySelector(".noproperty").classList.remove("hide");
            //         document.querySelector(".property_holder").classList.add("hide");
            //       }
            //     }
            //   ]
            // });

            // alertmsg.present();
            // if(confirm("No existing property found, would you like to add one?"))
            // {
            //   document.querySelector(".noproperty").classList.remove("hide");
            //   document.querySelector(".property_holder").classList.add("hide");
            // }
          }
          else {
            this.alertmessage(this.responseData.message);
            // let alertmessage = this.alertCtrl.create({
            //   message:this.responseData.message,
            //   buttons:['Ok']
            // });
            // alertmessage.present();
            // alert(this.responseData.message);
          }


        }
      }

    });
  }

  async noexistproeprtyAlertOne() {
    const alertmsg = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'No existing property found, would you like to add one?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'OK',
          handler: () => {
            document.querySelector(".noproperty").classList.remove("hide");
            document.querySelector(".property_holder").classList.add("hide");
            document.querySelector(".otherpropertyrequest").classList.add("hide");
          }
        }
      ]
    });
    await alertmsg.present();
  }

  async noexistproeprtyAlertTwo() {
    const alertmsg = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'No existing property found, would you like to add one?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'OK',
          handler: () => {
            document.querySelector(".noproperty").classList.remove("hide");
            document.querySelector(".property_holder").classList.add("hide");
          }
        }
      ]
    });
    await alertmsg.present();
  }

  async alertmessage(data) {
    const alert = await this.alertCtrl.create({
      message: data,
      buttons: ['OK']
    });
    await alert.present();
  }

  async SuccessAlert(data) {
    const alert = await this.alertCtrl.create({
      header: 'Success!',
      message: data,
      buttons: ['OK']
    });
    await alert.present();
  }

  //checks password match
  checkpassword() {
    if (this.confirmPsd.length >= 10) {
      //if (this.confirmPsd != this.password) {
        this.psdErr = false;
        this.shwpsdErr = true;
      //} else {
        //this.shwpsdErr = true;
        //this.psdErr = false;
      //}
    }

  }

  //opens customer details to add property
  Showcustomercontainer() {
    var letrs = ["a", "b", "c"];
    for (var i = 0; i < letrs.length; i++) {
      var t = letrs[i]
      this.chkErr(t);
    }
    if ((this.pstlerr || this.properr || this.locerr) != true) {
      document.querySelector(".add_property").classList.add("hide");
      // document.querySelector(".noproperty").classList.add("hide");
      document.querySelector(".add-doc-form").classList.remove("hide");
      document.querySelector("#link-form1").classList.add("hide");
    }

  }

  //select location
  selectProperty() {
    this.propertyid.push(this.relationship);
  }

  //add property to another customer
  addproperty() {
    if (this.psdErr == false) {
      this.userData = {
        "user_id": localStorage.getItem("userId"),
        "postcode": this.postcode, "password": this.password, "last_name": this.last_name,
        "phone": this.phone, "email": this.email, "property_type": this.propertytype, "address": this.location,
        "qrcode": this.property_id, "purchased_date": this.purchasedDate, "first_name": this.first_name
      };

      //this.loader.present();
      this.authService.postData(this.userData, 'add_property').then((result) => {
        //this.loader.dismiss();
        this.responseData = result;
        if (this.responseData.success) {

          for (var i = 0; i < this.property_type.length; i++) {
            if (this.property_type[i].id == this.propertytype) {
              this.propname = this.property_type[i].name;
            }
          }
          this.SuccessAlert(this.responseData.message);
          // let alertmessage = this.alertCtrl.create({
          //   title:'Success!',
          //   message:this.responseData.message,
          //   buttons:['Ok']
          // });
          // alertmessage.present();
          // alert(this.responseData.message);
          this.userData.myPage = 2;
          this.userData.propname = this.propname;
          this.navService.uuid = this.userData;
          this.navCtrl.navigateForward("propertysuccess");
        }
        else {
          this.alertmessage(this.responseData.message);
          // let alertmessage = this.alertCtrl.create({
          //   message:this.responseData.message,
          //   buttons:['Ok']
          // });
          // alertmessage.present();
          // alert(this.responseData.message);
        }
      });
    }
  }

  //Checking validation error
  chkErr(val) {
    if (val == "a") {
      if (this.postcode == "" || this.postcode == undefined) {
        this.pstlerr = true;
      } else {
        this.pstlerr = false;
      }
    }
    if (val == "b") {
      if (this.location == "" || this.location == undefined) {
        this.locerr = true;
      }
      else {
        this.locerr = false;
      }
    }
    if (val == "c") {
      if (this.propertytype == "" || this.propertytype == undefined) {
        this.properr = true;
      }
      else {
        this.properr = false;
      }
    }
  }

  //save For myself
  addcustomerproperty() {
    var ppId;
    this.userData = {
      "user_id": localStorage.getItem("userId"),
      "postcode": this.postcode,
      "qrcode": this.property_id,
      "property_type": this.propertytype,
      "address": this.location,
      "purchased_date": this.purchasedDate
    };
    var letrs = ["a", "b", "c"];
    for (var i = 0; i < letrs.length; i++) {
      var t = letrs[i]
      this.chkErr(t);
    }
    if ((this.pstlerr || this.properr || this.locerr) != true) {
      //this.loader.present();
      this.authService.postData(this.userData, 'addcustomerproperty').then((result) => {
        //this.loader.dismiss();
        this.responseData = result;
        ppId = this.responseData.property_id;
        console.log(this.responseData)
        if (this.responseData.success) {
          this.SuccessAlert(this.responseData.message);
          // let alertmessage = this.alertCtrl.create({
          //   title:'Success!',
          //   message:this.responseData.message,
          //   buttons:['Ok']
          // });
          // alertmessage.present();
          // alert(this.responseData.message);
          for (var i = 0; i < this.property_type.length; i++) {
            if (this.property_type[i].id == this.propertytype) {
              this.propname = this.property_type[i].name;
            }
          }

          this.userData.myPage = 1;
          this.userData.propname = this.propname;
          this.navService.uuid = this.userData;
          this.navCtrl.navigateForward("propertysuccess");
          //  this.navCtrl.push(WelcomePage);
        }
        else {

          //alert(this.responseData.message);

          let alertmsg = this.alertCtrl.create({
            header: 'Confirm!',
            message: this.responseData.message,
            buttons: [
              {
                text: 'Cancel',
                role: 'cancel',
                cssClass: 'secondary',
              }, {
                text: 'OK',
                handler: () => {
                  var data = {
                    "user_id": localStorage.getItem("userId"),
                    "property_id": ppId,
                    "qrcode": this.property_id
                  }
                  console.log(data);
                  var resData;
                  this.authService.postData(data, 'updatepropertyqrcode').then((result) => {
                    resData = result;
                    console.log(result);
                    if (resData.success) {
                      this.SuccessAlert(resData.message);
                      // let alertmessage = this.alertCtrl.create({
                      //   title:'Success!',
                      //   message:resData.message,
                      //   buttons:['Ok']
                      // });
                      // alertmessage.present();
                      // alert(resData.message);
                      this.navCtrl.navigateForward("welcome");
                    }
                  })
                }
              }
            ]
          }).then(alert => alert.present());

          // if(confirm(this.responseData.message))
          // {
          //   var data = {
          //     "user_id" : localStorage.getItem("userId") ,
          //     "property_id" :ppId,
          //     "qrcode":this.property_id
          //   }
          //   console.log(data);
          //   var resData;
          //    this.authService.postData(data, 'updatepropertyqrcode').then((result) => {
          //      resData = result;
          //      console.log(result);
          //      if(resData.success){
          //       let alertmessage = this.alertCtrl.create({
          //         message:resData.message,
          //         buttons:['Ok']
          //       });
          //       alertmessage.present();
          //         // alert(resData.message);
          //         this.navCtrl.push(WelcomePage);
          //      }
          //    })
          //   //document.querySelector(".noproperty").classList.remove("hide");
          //   //document.querySelector(".property_holder").classList.add("hide");
          // }else{
          //   //this.navCtrl.push(WelcomePage);
          // }
        }
      });
    }
  }

  //loads location based on postcode
  getpostcodelookup() {
    this.locations = [];
    this.location = '';
    if (this.postcode != "") {
      //document.querySelector(".choose-location").classList.remove("hide");
      this.userData = { "postcode": this.postcode }
      this.authService.postData(this.userData, 'postcode_lookup').then((result) => {
        this.responseData = result;
        if (this.responseData.success) {
          for (var i = 0; i < parseInt(this.responseData.lookupresponse.addresses.length); i++) {
            this.locations.push(this.responseData.lookupresponse.addresses[i]);
          }
        }
      });
    }
    else {
      var data = "Please enter postcode";
      this.alertmessage(data);
      // let alertmessage = this.alertCtrl.create({
      //   message:"Please enter postcode",
      //   buttons:['Ok']
      // });
      // alertmessage.present();
    }
  }
}
