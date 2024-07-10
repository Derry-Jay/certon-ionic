import { Component, OnInit } from '@angular/core';
import { NavController, NavParams,LoadingController} from '@ionic/angular';
import { MynavService } from '../mynav.service';
import { AuthService } from '../provider/auth.service';

@Component({
  selector: 'app-viewproperty',
  templateUrl: './viewproperty.page.html',
  styleUrls: ['./viewproperty.page.scss'],
  providers: [NavParams]
})
export class ViewpropertyPage implements OnInit {

  propdata =[];
  userData:any;
  responseData:any;
  datecreated:any;
  docData = [];
  propertytype:any;
  address1:any;
  id:any;
  propertyid:any;
  AddrdwnArw: any = false;
  AddrupArw: any = false;
  citydwnArw: any = false;
  cityupArw: any = false;
  document_available:any;
  doc_id:any;
  userid:any;
  deviceid:any;
  otherprop:any;
  otherpropid:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private navservice:MynavService, private authService:AuthService,public loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.propertyid = this.navservice.uuid;
    this.otherprop = this.navservice.otherid;
    this.otherpropid = this.navservice.othersecid;
    console.log(this.propertyid);
    this.userData = {"puuid":this.navservice.uuid,"user_id":localStorage.getItem("userId")};
    this.presentLoading();
    this.authService.postData(this.userData, 'get_properties').then((result) => {
      this.responseData = result;
      this.loadingCtrl.dismiss();
      if (this.responseData.propdata.length > 0) {
        this.id = this.responseData.propdata[0].id;
        this.datecreated = this.responseData.propdata[0].date;
        this.propertytype = this.responseData.propdata[0].property_type_name;
        this.address1 = this.responseData.propdata[0].show_address;
        this.document_available = this.responseData.availableDocsCount;
        this.doc_id = this.responseData.to_be_added_document;
      } else {
        this.id = this.responseData.otherpropDetails[0].id;
        this.datecreated = this.responseData.otherpropDetails[0].date;
        this.propertytype = this.responseData.otherpropDetails[0].property_type_name;
        this.address1 = this.responseData.otherpropDetails[0].show_address;
        this.document_available = this.responseData.availableDocsCount;
        this.doc_id = this.responseData.to_be_added_document;
      }
    });

    //Getting details of particular Documents
    this.authService.postData(this.userData,'get_documents').then((result) => {
      this.responseData = result;
      if(this.responseData.success){
      	for(var  i=0; i<this.responseData.docData.length;i++){
            this.docData.push(this.responseData.docData[i]);
        }
        //console.log(this.docData);
      }
    });
  }

    //Sorting Documents in Ascending Order
    sorting(val) {
      console.log(val)
      this.adresArw(val);
      if(val == 1){
        this.docData.sort(function (a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
      }
      else{
        this.docData.sort(function (a, b) {
          var textA = a.document_type.toUpperCase();
          var textB = b.document_type.toUpperCase();
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
      }
    }
  
    //Adding colors in Ascending sorting button
    adresArw(val) {
      if (val == 1) {
        this.AddrdwnArw = true;
        this.AddrupArw = false;
        this.citydwnArw = false;
        this.cityupArw = false;
      } else {
        this.citydwnArw = true;
        this.cityupArw = false;
        this.AddrdwnArw = false;
        this.AddrupArw = false;
      }
    }
  
    //Sorting Documents in Descending order
    reverse(val) {
      this.cityArw(val);
      if(val == 1){
        this.docData.sort(function (a, b) {
          var textA = a.name.toUpperCase();
          var textB = b.name.toUpperCase();
          return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
        });
      }
      else{
        this.docData.sort(function (a, b) {
          var textA = a.document_type.toUpperCase();
          var textB = b.document_type.toUpperCase();
          return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
        });
      }
    }
    //Adding colors in Descending sorting button
    cityArw(val) {
      if (val == 1) {
        this.AddrupArw = true;
        this.AddrdwnArw = false;
        this.citydwnArw = false;
        this.cityupArw = false;
      }
      else {
        this.citydwnArw = false;
        this.cityupArw = true;
        this.AddrdwnArw = false;
        this.AddrupArw = false;
      }
    }
  
    //calls after view loaded
    ionViewDidLoad() {
      console.log('ionViewDidLoad ViewpropertyPage');
      this.userData = JSON.parse(localStorage.getItem("userData"));
      this.deviceid = localStorage.getItem("deviceId");
      this.userid=this.userData.id;
      console.log(this.userData,this.deviceid);   
    }
  
    //opens edit property page
    editproperty(){
      this.navservice.uuid = this.propertyid;
      this.navservice.otherid = this.otherprop;
      this.navservice.othersecid = this.otherpropid;
      this.navCtrl.navigateForward("editproperty");
    }
  
    //opens View Document page
    viewdocument(documentid){
      this.navservice.docid = documentid;
      this.navservice.otherid = this.otherprop;
      this.navservice.othersecid = this.otherpropid;
      this.navCtrl.navigateForward("viewdocuments");
    }
  
    //opens add Document page
    adddocument(){
      this.navservice.propertyId = this.id;
      this.navservice.docid = this.doc_id;
      this.navCtrl.navigateForward("adddocument");
    }

    async presentLoading() {
      const loading = await this.loadingCtrl.create({
        message: 'Please wait...',
        // duration: 2000
      });
      await loading.present();
    }

}
