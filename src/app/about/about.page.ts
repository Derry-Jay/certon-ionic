import { Component, OnInit } from '@angular/core';
import {  NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  providers: [NavParams]
})
export class AboutPage  {

  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutappPage');
  }

}
