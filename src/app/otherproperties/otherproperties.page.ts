import { Component, OnInit } from '@angular/core';
import { NavController,NavParams,LoadingController } from "@ionic/angular";
import { AuthService } from '../provider/auth.service';
import { MynavService } from '../mynav.service';

@Component({
  selector: 'app-otherproperties',
  templateUrl: './otherproperties.page.html',
  styleUrls: ['./otherproperties.page.scss'],
  providers: [NavParams]
})
export class OtherpropertiesPage implements OnInit {
  username: any;
  userData: any;
  responseData: any;
  otherpropDetails = [];
  propertyid = [];
  property_type = [];
  typeid: any;
  otherpropid:any;
  otherpropidd:any;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public authService: AuthService,
    private navservice:MynavService) { }

  ngOnInit() {
    this.presentLoading();
    this.username = localStorage.getItem("username");
    this.userData = { user_id: localStorage.getItem("userId") };
    this.typeid = localStorage.getItem("typeid");
    this.otherpropid = 1;
    this.otherpropidd = 1;

    //Loads all properties
    this.authService.postData(this.userData, "get_properties").then(result => {
      this.responseData = result;
      this.loadingCtrl.dismiss();
      console.log(this.responseData);
      if (this.responseData.success) {
        if (this.responseData.otherpropDetails.length > 0) {
          for (var i = 0; i < this.responseData.otherpropDetails.length; i++) {
            this.otherpropDetails.push(this.responseData.otherpropDetails[i]);
          }
        } else {
          this.otherpropDetails = [];
        }
      } else {
        this.otherpropDetails = [];
      }
      console.log(this.otherpropDetails)
    });

    //loads property types
    this.authService.getData("get_property_type").then(result => {
      this.responseData = result;
      if (this.responseData.success) {
        for (
          var i = 0;
          i < parseInt(this.responseData.get_property_types.length);
          i++
        ) {
          this.property_type.push(this.responseData.get_property_types[i]);
        }
        console.log(this.property_type);
      }
    });
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      // duration: 2000
    });
    await loading.present();
  }

  viewproperty(propertyid) {
    this.navservice.uuid = propertyid;
    this.navservice.otherid = this.otherpropid;
    this.navservice.othersecid = this.otherpropidd;
    this.navCtrl.navigateForward("viewproperty");
    // this.navCtrl.push(ViewpropertyPage, { uuid: propertyid });
  }

}
