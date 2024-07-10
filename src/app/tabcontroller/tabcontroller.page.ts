import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MypropertiesPage } from '../myproperties/myproperties.page';
import { OtherpropertiesPage } from '../otherproperties/otherproperties.page';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-tabcontroller',
  templateUrl: './tabcontroller.page.html',
  styleUrls: ['./tabcontroller.page.scss'],
})
export class TabcontrollerPage implements OnInit {

  
  
  constructor(public navCtrl: NavController) {
  }

   

  //loads before view loaded
  ionViewDidEnter() {
    console.log("tabs")
  }
  ngOnInit() {
  }

}
