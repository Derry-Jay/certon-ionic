import { Component, OnInit } from '@angular/core';
import {  NavController, NavParams,LoadingController } from '@ionic/angular';
import { AuthService } from '../provider/auth.service';
@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
  providers: [NavParams]
})
export class HelpPage  {

  responseData:any;
  questionAns:any =[];
  lastId:any;

  constructor(public navCtrl: NavController, public navParams: NavParams , private authService:AuthService,public loadingCtrl: LoadingController) {

    //loads all mobile questions
    this.presentLoading();
    this.authService.getData('mobilequestion').then((result) => {
      this.responseData = result;
      this.loadingCtrl.dismiss();
      if(this.responseData.success){
        console.log(this.responseData);
        for(var i=0;i<this.responseData.mobilequestion.length;i++){
          this.questionAns.push(this.responseData.mobilequestion[i]);
          this.questionAns[i].no = i+1;
        }
        console.log(this.questionAns);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      // duration: 2000
    });
    await loading.present();
  }
}
