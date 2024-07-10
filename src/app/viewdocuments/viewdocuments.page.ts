import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform,LoadingController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AuthService } from '../provider/auth.service';
import { MynavService } from '../mynav.service';

@Component({
  selector: 'app-viewdocuments',
  templateUrl: './viewdocuments.page.html',
  styleUrls: ['./viewdocuments.page.scss'],
  providers: [NavParams]
})
export class ViewdocumentsPage implements OnInit {


  docData: any;
  docDataa =[];
  documentid: any;
  name: any;
  document_type: any;
  doc_file: any;
  userData: any;
  responseData: any;
  filename: any;
  doc_file_type: any;
  doc_url: any;
  device: any;
  expire_date: any;
  doc_description: any;
  user_id:any;
  logged_user_id:any;
  show_docdescr: boolean = false;
  otherprop:any;
  otherpropid:any;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams,
    private iab: InAppBrowser, public authService: AuthService, private navService: MynavService,public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.device = 'android';
      }
      if (this.platform.is('ios')) {
        this.device = 'ios';
      }
    });

    this.documentid = this.navService.docid;
    this.otherprop = this.navService.otherid;
    this.otherpropid = this.navService.othersecid;
    this.userData = { "doc_id": this.navService.docid, "user_id": localStorage.getItem("userId") };

    //get particular documents details
    this.presentLoading();
    this.authService.postData(this.userData, 'get_document').then((result) => {
      this.responseData = result;
      this.loadingCtrl.dismiss(); 
      console.log(result);
      if (this.responseData.success) {
        this.doc_url = this.responseData.doc_url;
        //this.filename = this.responseData.docData[0].filename;
        this.docData = this.responseData.docData[0].property_address;
        this.name = this.responseData.docData[0].name;
        this.document_type = this.responseData.docData[0].document_type;
        this.doc_file = this.responseData.docData[0].doc_file;
        this.expire_date = this.responseData.docData[0].expire_date;
        this.doc_description = this.responseData.docData[0].description;
        this.user_id = this.responseData.docData[0].user_id;
        this.logged_user_id = localStorage.getItem("userId");
        // if(this.doc_description !="" && this.doc_description !=undefined){
        //   this.show_docdescr = true;
        // }else{
        //   this.show_docdescr = false;
        // }
        
      
        this.doc_file_type = this.responseData.docData[0].doc_file_extn.toLowerCase();
      }
    });
  }

  editdocument() {
    this.navCtrl.navigateForward("editdocument");
  }

  //opens document in browser based on device
  showdoc(file) {
    if (this.device == 'android') {
      if (this.doc_file_type == 'pdf') {
        const browser = this.iab.create('http://docs.google.com/gview?embedded=true&url=' + this.doc_url + '' + file, 'location=yes,hardwareback=yes');
      }
      else {
        const browser = this.iab.create(this.doc_url + '' + file);
      }
    }
    else {
      const browser = this.iab.create(this.doc_url + '' + file);
    }
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      // duration: 2000
    });
    await loading.present();
  }


}
