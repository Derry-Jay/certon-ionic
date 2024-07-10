import { Component, OnInit } from '@angular/core';
import { NavController,MenuController,NavParams, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../provider/auth.service';
import { LoginPage} from '../login/login.page';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
  providers: [NavParams]
})
export class ForgotpasswordPage implements OnInit {

  ForgotpasswordForm: FormGroup;
  submitted: any = false;
  email:any;
  responseData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, 
    public authService: AuthService , private alertCtrl : AlertController) {
  }

  //loads when view loaded
  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }

  //loads when component loaded
  ngOnInit() {
    this.ForgotpasswordForm = this.formBuilder.group({
      email : ['', Validators.required]   
    });
  }

  get f() { return this.ForgotpasswordForm.controls; }

  //chenage password for particular email address
  submitform(){
  	this.submitted = true;
    if (this.ForgotpasswordForm.valid) {
    	this.authService.postData(this.ForgotpasswordForm.value, 'password/create').then((result) => {
    		this.responseData = result;
    		if(this.responseData.success){
         /* let alertmessage = this.alertCtrl.create({
            title:'Success!',
            message:this.responseData.message,
            buttons:['Ok']
          });
          alertmessage.present();*/
    			// alert(this.responseData.message);
          this.alertmessage(this.responseData.message);
    			// alert(this.responseData.message);
    			this.navCtrl.navigateForward('login');
    		}
        
    		else{
         /* let alertmessage = this.alertCtrl.create({
            title:'Failed!',
            message:this.responseData.message,
            buttons:['Ok']
          });
          alertmessage.present();*/
    			// alert(this.responseData.message);
          this.alertmessagefail(this.responseData.message);
    		}
  		});
    }
  	
  }
  async alertmessage(data) {
    const alert = await this.alertCtrl.create({
      header: 'Success',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertmessagefail(msg) {
    const alert = await this.alertCtrl.create({
      header: 'Success',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
  
}
