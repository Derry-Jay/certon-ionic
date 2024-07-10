import { Component, OnInit } from '@angular/core';
import { NavController,NavParams, Platform,AlertController,LoadingController} from '@ionic/angular';
import { WelcomePage } from '../welcome/welcome.page';
import { MynavService } from '../mynav.service';
import { AuthService } from '../provider/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-propertysuccess',
  templateUrl: './propertysuccess.page.html',
  styleUrls: ['./propertysuccess.page.scss'],
  providers: [NavParams,DatePipe]
})
export class PropertysuccessPage implements OnInit {

  //constructor() { }

  typeid: any;
  address: any;
  proptypename: any;
  userData: any;
  responseData: any;
  datepurchased: any;
  firstname: any;
  lastname: any;
  email:any;
  arraylen: any;
  my_page:any;
  data:any;
  //@ViewChild('navbar') navBar: Navbar;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService,
    private platform : Platform,private navservice:MynavService,private datePipe: DatePipe) {
    this.typeid = localStorage.getItem("typeid");
    this.data = this.navservice.uuid;
    this.my_page = this.data.myPage;

    //displays page based on adding property
    if(this.data.myPage == 2){
      this.firstname = this.data.first_name;
      this.lastname = this.data.last_name;
      this.address = this.data.address;
      this.proptypename = this.data.propname;
      this.datepurchased = this.datePipe.transform(this.data.purchased_date,"dd/MM/yyyy HH:mm:ss");
      this.email = this.data.email;
    }else{
      this.address = this.data.address;
      this.proptypename = this.data.propname;
      this.datepurchased = this.datePipe.transform(this.data.purchased_date,"dd/MM/yyyy HH:mm:ss");
    }

    this.userData = { user_id: localStorage.getItem("userId") };
    this.platform.ready().then(() => {
      document.addEventListener('backbutton', () => {
       if (this.navCtrl.pop) {
         this.navCtrl.navigateRoot('welcome')
         return;
       }
      //  this.navCtrl.pop()
     }, false);
      });

  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad PropertysuccessPage');
  }

  //opens property page
  gotoProprtyPage() {
    this.navCtrl.navigateRoot('welcome');
  }

  // ionViewDidEnter() {
  //   this.navBar.backButtonClick = () => {
  //     this.navCtrl.setRoot(WelcomePage);
  //   };

  // }


  ngOnInit() {
  }

}



