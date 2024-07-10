import { Component, OnInit } from '@angular/core';
import { NavController,NavParams,LoadingController, IonApp} from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../provider/auth.service';
import { MynavService } from '../mynav.service';

@Component({
  selector: 'app-myproperties',
  templateUrl: './myproperties.page.html',
  styleUrls: ['./myproperties.page.scss'],
  providers: [NavParams]
})
export class MypropertiesPage implements OnInit {

  username: any;
  userData: any;
  responseData: any;
  propdata = [];
  propertyid = [];
  property_type = [];
  typeid: any;
  loader: any;

  classname:any;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    //private app: IonApp,
    public authService:AuthService,
    private navservice:MynavService) { }

  ngOnInit() {
    this.presentLoading();
    this.username = localStorage.getItem("username");
    this.userData = { user_id: localStorage.getItem("userId") };
    this.typeid = localStorage.getItem("typeid");
    
    if(this.typeid == 2)
    {
      this.classname = 'myproperty';
    }
    else{
      this.classname = 'otherproperty';
    }

    //loads account holder's property
    this.authService.postData(this.userData, "get_properties").then(result => {
      this.responseData = result;
      this.loadingCtrl.dismiss();
      if (this.responseData.success) {
        console.log(this.responseData);
        if (this.responseData.propdata.length > 0) {
          for (var i = 0; i < this.responseData.propdata.length; i++) {
            this.propdata.push(this.responseData.propdata[i]);
          }
        } else {
          this.propdata = [];
        }
      } else {
        this.propdata = [];
      }
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
      }
    });
  }

  viewproperty(propertyid) {
    // this.app.getRootNav().push(ViewpropertyPage, { uuid: propertyid });
    this.navservice.uuid = propertyid;
    this.navservice.otherid = 0;
    this.navservice.othersecid = 0;
    this.navCtrl.navigateForward("viewproperty");
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      // duration: 2000
    });
    await loading.present();
  }

}
