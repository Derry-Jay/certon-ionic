import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
@Component({
  selector: 'app-welcomeslide',
  templateUrl: './welcomeslide.page.html',
  styleUrls: ['./welcomeslide.page.scss'],
})
export class WelcomeslidePage implements OnInit {

  @ViewChild('IonSlides', { static: false }) slides: IonSlides;

  constructor(public navCtrl: NavController,) { }

  ngOnInit() {
  }

  nextslide(slides) {
    slides.slideNext();
  }

  closeslide() {
    localStorage.setItem("slides", "shownslides");
    if (!localStorage.getItem('isloggedin')) {
      this.navCtrl.navigateRoot("login");
    } else {
      this.navCtrl.navigateRoot('welcome');
    }
  }


}
