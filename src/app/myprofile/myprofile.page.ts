import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
  providers: [NavParams]
})
export class MyprofilePage {

  firstname:any;
  lastname:any;
  email:any;
  contact_number:any;
  companyname:any;
  companyregno:any;
  seletor_name = [];
  selectors:any;
  selected_sector:any;
  sector_list = ['Select','Electrical','Compliance','Gas Safe','Construction','FENSA','Other'];
  userData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.userData = JSON.parse(localStorage.getItem("userData"));
    console.log(this.userData);
    
    //loads data based on installer
    if(localStorage.getItem("typeid") == '1'){
    	this.selected_sector = this.userData.sectors.split(",");
    	
    	for(var i=0;i<this.selected_sector.length;i++){
    		var name =  this.sector_list[this.selected_sector[i]];
    		this.seletor_name.push(name);
    	}

    	this.selectors = this.seletor_name.join(',');
    }
  }

  //calls after view loaded
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyprofilePage');
  }

  //opens edit profile page
  editprofile()
  {
  	this.navCtrl.navigateForward('editprofile');
  }
}
