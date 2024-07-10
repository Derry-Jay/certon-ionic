import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { MynavService } from '../mynav.service';
@Component({
  selector: 'app-adddocsuccess',
  templateUrl: './adddocsuccess.page.html',
  styleUrls: ['./adddocsuccess.page.scss'],
  providers: [NavParams]
})
export class AdddocsuccessPage implements OnInit {

  address: any;
  doc_name: any;
  expire_date: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private navservice: MynavService) { }

  ngOnInit() {
    this.address = this.navservice.address;
    this.doc_name = this.navservice.doc_name;
    this.expire_date = this.navservice.expire_date;
  }

  backtohome() {
    this.navCtrl.navigateForward('welcome');
  }


}
