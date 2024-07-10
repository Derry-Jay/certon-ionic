import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import 'rxjs/add/operator/map';
import { AlertController, NavController } from '@ionic/angular';

@Injectable()
export class AuthService {
  env: any;
  apiUrl: any;
  constructor(public http: HttpClient, private alertCtrl: AlertController, public navCtrl: NavController) {
    //Url path selection
    this.env = 'live';
    console.log(this.env);
    if (this.env == 'staging') {
      this.apiUrl = 'https://staging-certon.cyb.co.uk/api/';
    }
    else if (this.env == 'live') {
      this.apiUrl = 'https://hub.certon.co.uk/api/';
    }
    else if (this.env == 'local') {
      this.apiUrl = 'http://10.91.44.105/certon/web/api/';
      // this.apiUrl = 'http://localhost/certon_live/web/api/';
    }
    console.log(this.apiUrl);
  }

  getDataNourl(url) {
    var chkOnlne = window.navigator.onLine;
    if (chkOnlne) {
      return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        });
        this.http.get(url, { headers: headers })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            //reject(err);
            /*let alertmessage = this.alertCtrl.create({
              header:'Oops!',
              message:"Something Went Wrong",
              buttons:['Ok']
            });*/
            //alertmessage.present();
            // alert("something Went Wrong");
            this.oopsAlert();
          });
      });
    } else {
      /* let alertmessage = this.alertCtrl.create({
         header:'No Internet',
         message:"Check Your Internet Connection",
         buttons:['Ok']
       });*/
      // alertmessage.present();
      // alert("Check Your Internet Connection");
      this.internetAlert();
    }
  }

  getData(type) {
    var chkOnlne = window.navigator.onLine;
    if (chkOnlne) {
      return new Promise((resolve, reject) => {

        let headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        });

        this.http.get(this.apiUrl + type, { headers: headers })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            //reject(err);
            /* let alertmessage = this.alertCtrl.create({
               header:'Oops!',
               message:"Something Went Wrong",
               buttons:['Ok']
             });*/
            // alertmessage.present();
            // alert("something Went Wrong");
            this.oopsAlert();
          });
      });
    } else {
      /* let alertmessage = this.alertCtrl.create({
         header:'No Internet',
         message:"Check Your Internet Connection",
         buttons:['Ok']
       });*/
      // alertmessage.present();
      // alert("Check Your Internet Connection");
      this.internetAlert();
    }
  }

  postFormData(credentials, type) {
    var chkOnlne = window.navigator.onLine;
    if (chkOnlne) {
      return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        });

        let body = '';


        headers = new HttpHeaders({
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        });
        body = credentials;

        this.http.post(this.apiUrl + type, body, { headers: headers })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            //reject(err);
            /* let alertmessage = this.alertCtrl.create({
               header:'Oops!',
               message:"Something Went Wrong",
               buttons:['Ok']
             });*/
            //alertmessage.present();
            // alert("something Went Wrong");
            //this.oopsAlert();
          });
      });
    } else {
      /* let alertmessage = this.alertCtrl.create({
         header:'No Internet',
         message:"Check Your Internet Connection",
         buttons:['Ok']
       });*/
      //alertmessage.present();
      // alert("check Your Internet Connection");
      this.internetAlert();
    }

  }


  postData(credentials, type) {
    var chkOnlne = window.navigator.onLine;
    if (chkOnlne) {
      return new Promise((resolve, reject) => {
        let headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        });

        let body = '';


        headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        });
        if (type == "login") {
          body = credentials;
        } else {
          //   credentials.userid = localStorage.getItem("userId");
          //  credentials.api_token = localStorage.getItem("api_token");
          body = credentials;
        }
        //console.log(body);


        this.http.post(this.apiUrl + type, body, { headers: headers })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            console.log(err);
            // resolve(err);
            /* let alertmessage = this.alertCtrl.create({
               header:'Oops!',
               message:"Something Went Wrong",
               buttons:['Ok']
             });*/
            // alertmessage.present();
            this.oopsAlert();
            //this.SuccessAlert();
            this.navCtrl.navigateForward('welcome');
          });
      });
    } else {
      /*let alertmessage = this.alertCtrl.create({
        header:'No Internet',
        message:"Check Your Internet Connection",
        buttons:['Ok']
      });*/
      // alertmessage.present();
      this.internetAlert();
    }

  }

  async SuccessAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Success!',
      message: 'Property access request sent to property owner!',
      buttons: ['OK']
    });
    await alert.present();
  }

  async oopsAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Oops!',
      message: 'Something Went Wrong .',
      buttons: ['OK']
    });

    await alert.present();
  }

  async internetAlert() {
    const alert = await this.alertCtrl.create({
      header: 'No Internet',
      message: 'Check Your Internet Connection.',
      buttons: ['OK']
    });

    await alert.present();
  }

}

