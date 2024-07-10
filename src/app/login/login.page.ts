import { Component, OnInit } from '@angular/core';
import { NavController,MenuController, AlertController } from '@ionic/angular';
import { AuthService } from '../provider/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  userData: any;
  responseData: any;
  username: any;
  password: any;
  submitted: any = false;
  registId :any;
  linkDevice:any;
  remchecked:boolean = false;

  constructor(
    public navCtrl: NavController,
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private menu: MenuController,
    private alertCtrl:AlertController
  ) {
   
  }

  //loads when entering component
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    if(localStorage.getItem('rememberme') == 'yes'){
      this.loginForm.patchValue({
        username:localStorage.getItem('usrnm'),
        password:localStorage.getItem('ped')
      })
      this.remchecked = true
    }
  }
  get f() { return this.loginForm.controls; }

  rememberme(e){
    const isChecked = e.detail.checked;
    console.log(isChecked);
    if(isChecked == true){
      localStorage.setItem('rememberme','yes');
    }else{
      localStorage.removeItem('rememberme');
    }
    
  }
  
  //sign onto account
  goToLink() {
    const chkOnlne = window.navigator.onLine;
    if(chkOnlne){
    this.submitted = true;
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      if(localStorage.getItem('rememberme') == 'yes'){
        localStorage.setItem('usrnm',this.loginForm.value.username);
        localStorage.setItem('ped',this.loginForm.value.password);
      }
      //sends login credentials and get response
      this.authService.postData(this.loginForm.value, 'login').then((result) => {
        this.responseData = result;
        console.log(this.responseData);
        console.log(this.responseData.statusText)
        if (this.responseData.success) {
          localStorage.setItem('api_token',this.responseData.api_token);
          localStorage.setItem('userData', JSON.stringify(this.responseData.user));
          localStorage.setItem('userId', this.responseData.user.id);
          localStorage.setItem('isloggedin', '1');
          localStorage.setItem('firstname', this.responseData.user.first_name);
          localStorage.setItem('lastname', this.responseData.user.last_name);
          localStorage.setItem('username', this.responseData.user.name);
          if (this.responseData.user.roleName === 'Installer') {
            localStorage.setItem('companyname', this.responseData.user.companyname);
            localStorage.setItem('typeid', '1');
          }
          else {
            localStorage.setItem('typeid', '2');
          }
          this.navCtrl.navigateRoot('welcome');
        } else {
          this.authAlert(this.responseData.message);
        }

      });
    }
  }else{
    this.internetAlert();
  }

  }

  //email address lowercase
  forceLower(strInput){
    strInput.target.value=strInput.target.value.toLowerCase();
  }

  //opens register page
  register() {
    this.navCtrl.navigateForward('register');
  }

  //opens forget password page
  forgotpassword() {
    this.navCtrl.navigateForward('forgotpassword');
  }

  async internetAlert() {
    const alert = await this.alertCtrl.create({
      header: 'No Internet',
      message: 'Check your internet Connection',
      buttons: ['OK']
    });

    await alert.present();
  }

  async authAlert(data) {
    const alert = await this.alertCtrl.create({
      header: 'Authentication Error',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  } 

}
