import { Component, OnInit } from '@angular/core';
import { NavController, NavParams,LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../provider/auth.service';
import { MynavService } from '../mynav.service';

@Component({
  selector: 'app-requestaccess',
  templateUrl: './requestaccess.page.html',
  styleUrls: ['./requestaccess.page.scss'],
  providers: [NavParams]
})
export class RequestaccessPage implements OnInit {

  userData:any;
  prop_id:any;
  prop_user_id:any;
  firstname:any;
  address:any
  responseData:any;
  lastname:any;
  companyname:any;
  loader:any;

  constructor(public navCtrl: NavController, public authService : AuthService, 
    public navParams: NavParams, private alertCtrl:AlertController,private navservice:MynavService,
    private loadingCtrl :LoadingController) { }

  ngOnInit() {

    this.prop_id = this.navservice.propertyId;;
  	this.prop_user_id = this.navservice.proeprtyUserId;
    this.address = this.navservice.address;
    this.firstname = this.navservice.firstname;
    this.companyname = localStorage.getItem('companyname');
    this.lastname = localStorage.getItem("lastname");
  }

  /*async presentLoading(){
    const loader = await this.loadingCtrl.create({
      message:'Please wait...'
    });

    await loader.present();
  }*/

  async SuccessAlert(data) {
    const alert = await this.alertCtrl.create({
      message: data,
      buttons: ['OK']
    });
    await alert.present();
  }
  
  async alertmessagee(data) {
    const alert = await this.alertCtrl.create({
      message: data,
      buttons: ['OK']
    });
    await alert.present();
  }

    //Asking request for property
    requestaccess(){
      this.userData = {'prop_id':this.prop_id,'user_id':localStorage.getItem("userId"),
      'prop_user_id':this.prop_user_id};
      console.log(this.userData);
      //this.presentLoading();
      this.authService.postData(this.userData,'request_access').then((result) => {
        //this.loadingCtrl.dismiss();
        this.responseData = result;
        console.log(this.responseData);
        if(this.responseData.success){
          this.SuccessAlert(this.responseData.message);
          /*let alertmessage = this.alertCtrl.create({
            header:'Success!',
            message:this.responseData.message,
            buttons:['Ok']
          }).then(alertmessage =>alertmessage.present());*/
          // alert(this.responseData.message);
          this.navCtrl.navigateForward('welcome');
        }else{
          /*let alertmessage = this.alertCtrl.create({
            header:'Failed!',
            message:this.responseData.message,
            buttons:['Ok']
          }).then(alertmess =>alertmess.present());*/
		  this.alertmessagee(this.responseData.message);
          
          // alert(this.responseData.message);
        }
      });
    }

}
