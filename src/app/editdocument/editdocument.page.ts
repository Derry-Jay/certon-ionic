import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from '@ionic/angular';
import { AuthService } from '../provider/auth.service';
import { MynavService } from '../mynav.service';
@Component({
  selector: 'app-editdocument',
  templateUrl: './editdocument.page.html',
  styleUrls: ['./editdocument.page.scss'],
  providers: [NavParams]
})
export class EditdocumentPage {

  userData:any;
  certificate_type = [];
  responseData:any;
  name:any;
  document_type:any;
  expire_date:any;
  doc_file:any;
  propdataa:any;
  document_name:any;
  documenttype:any;
  documentid:any;
  oldDocName:any;
  purchasedDate:any;
  doc_description:any;
  show_descr:boolean = false;
  purchaseyear :any;
  addyear:any;
  otherspid:any;
  otherspropid:any;
  mindate:any;

  descr_err:boolean = false;
  name_err:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public authService : AuthService, private alertCtrl : AlertController,private navService:MynavService) { 

  //ngOnInit() {
    this.documentid = this.navService.docid;
    this.otherspid = this.navService.otherid;
    this.otherspropid = this.navService.othersecid;
    this.userData = {"doc_id":this.navService.docid,"user_id":localStorage.getItem("userId")};
    //loads particular document type
  	this.authService.getData('get_certificate_type').then((result) => {
      this.responseData = result;
      if(this.responseData.success){
        this.getdocument(this.userData);
        for(var i=0;i< parseInt(this.responseData.get_certificate_types.length); i++){
          this.certificate_type.push(this.responseData.get_certificate_types[i]);
        }
        console.log(this.certificate_type);
      }
    });
  }
  getdocument(userData)
  {
    //loads particular document data
  	this.authService.postData(this.userData,'get_document').then((result) => {
      this.responseData = result;
      
      if(this.responseData.success){
        this.name = this.responseData.docData[0].name;
        this.document_type = this.responseData.docData[0].document_type;
        this.doc_file = this.responseData.docData[0].doc_file;
        this.expire_date = this.responseData.docData[0].actualexpire_date;
        this.oldDocName = this.name
        this.documenttype = this.responseData.docData[0].type;
        this.document_name = this.name;
        this.purchasedDate = this.expire_date;
        this.doc_description = this.responseData.docData[0].description;
        this.purchaseyear = this.expire_date.substring(0,4);
        this.mindate = this.responseData.docData[0].purchased_date;
      }
    });
   
  }


  checkvalidation(){
    if(this.document_name == ""){
      this.name_err = true;
    }else{
      this.name_err = false;
    }

  }
  //Update Document
  updatedocument(){
    //debugger;
   this.checkvalidation();
  //  ,"doc_description":this.doc_description
    this.userData = {"name":this.document_name,"type":this.documenttype,
    "expire_date":this.purchasedDate,"doc_id":this.documentid};
    // if (this.userData.name == "") {
    //   this.userData.name = this.oldDocName;
    // }
    console.log(this.userData);
    // && this.descr_err == false
    if(this.name_err ==false){
      this.authService.postData(this.userData,'update_document').then((result) => {
        this.responseData = result;
        if(this.responseData.success){
          // let alertmessage = this.alertCtrl.create({
          //   title:'Success!',
          //   message:this.responseData.message,
          //   buttons:['Ok']
          // });
          // alertmessage.present();
          this.successAlert(this.responseData.message);
          if(localStorage.getItem("typeid") == "2") {
            this.navCtrl.navigateForward("myproperties");
          } else {
            if(this.otherspid == 1)
            {
            this.navCtrl.navigateForward("tabcontroller/otherproperties");
            }
            else
            {
              this.navCtrl.navigateForward("tabcontroller/myproperties");
            }
          }
          
        }
        else{
          
        }
      });
    } 
  }

  async successAlert(data) {
    const alert = await this.alertCtrl.create({
      header: 'Success!',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }

  addoneyear(pdate,pyear)
  {
    //alert(pdate);
    if(pyear < 2031)
    {
		var datee = new Date(pdate);
    var dd = String(datee.getDate()).padStart(2, '0');
		var mm = String(datee.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = datee.getFullYear() + 1;
    this.purchasedDate = yyyy + '/' + mm + '/' + dd;
    this.purchaseyear = yyyy;
    }
    else
    {
      var datee = new Date(pdate);
      var dd = String(datee.getDate()).padStart(2, '0');
      var mm = String(datee.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = datee.getFullYear() + 0;
      this.purchasedDate = yyyy + '/' + mm + '/' + dd;
      this.purchaseyear = yyyy;
    }
    
			
  }

  addfiveyear(pdate,pyear)
  {
    //alert(pdate);
		this.addyear = +pyear + +5;
    //alert(this.addyear);
    if(this.addyear <= 2031)
    {
		var datee = new Date(pdate);
    var dd = String(datee.getDate()).padStart(2, '0');
			var mm = String(datee.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = datee.getFullYear() + 5;
      this.purchasedDate = yyyy + '/' + mm + '/' + dd;
      this.purchaseyear = yyyy;
    }
    else
    {
      var datee = new Date(pdate);
      var dd = String(datee.getDate()).padStart(2, '0');
			var mm = String(datee.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = datee.getFullYear() + 0;
      this.purchasedDate = yyyy + '/' + mm + '/' + dd;
      this.purchaseyear = yyyy;
    }
			
  }
 

}
