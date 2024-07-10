import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, LoadingController,Platform } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { AuthService } from '../provider/auth.service';
import { MynavService } from '../mynav.service';
import { File } from '@ionic-native/file/ngx';
@Component({
  selector: 'app-adddocument',
  templateUrl: './adddocument.page.html',
  styleUrls: ['./adddocument.page.scss'],
  providers: [NavParams, Camera, File,ImagePicker]
})
export class AdddocumentPage  {

  responseData: any;
  certificate_type = [];
  //propdata = [];
  userData: any;
  fd: any;
  Data: any;
  loader: any;
  filename: any;
  propertyid: any;
  doc_id: any;
  docnam: any = false;
  docType: any = false;
  docDate: any = false;
  docDescription: any;
  document_name: any;
  documenttype: any;
  purchasedDate: any;
  description: Boolean = false;
  showButton: Boolean = false;
  docDescr: Boolean = false;
  lastImage: string = null;
  camimg: boolean = true;
  hide: boolean = true;
  datee:any;
  public myImgUrl: string = "assets/imgs/AGZa2fQRQOHYnLWHg0aZ_logo.png";
  multipleimage: any = [];
  constructor(public navCtrl: NavController, public camera: Camera, public navParams: NavParams,
    public loadingCtrl: LoadingController, public authService: AuthService , private imagePicker: ImagePicker,private file: File,
    private alertCtrl : AlertController,private actionsheet: ActionSheetController,private navservice: MynavService,private platform: Platform) {
      this.propertyid = this.navservice.propertyId;
      this.doc_id = this.navservice.docid;
    this.datee =new Date().toISOString().substring(0, 10);
    console.log(this.datee);

    // this.docDescription = {data: moment ().format(), value: ''};


    //creating loader
    /*this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });*/
    this.imagePicker.requestReadPermission();
    //Loads certificate type
    this.authService.getData('get_certificate_type').then((result) => {
      this.responseData = result;
      console.log(this.responseData);
      if (this.responseData.success) {
        for (var i = 0; i < parseInt(this.responseData.get_certificate_types.length); i++) {
          this.certificate_type.push(this.responseData.get_certificate_types[i]);
        }
      }
    });


    // this.userData = { "user_id": localStorage.getItem("userId") };
    // this.authService.postData(this.userData, 'get_properties').then((result) => {
    //   this.responseData = result;
    //   console.log(this.responseData);
    //   if (this.responseData.success) {
    //     for (var i = 0; i < this.responseData.propdata.length; i++) {
    //       this.propdata.push(this.responseData.propdata[i]);
    //     }

    //   }
    //   else {
    //     alert("Incorrect Username or Password!");
    //   }
    // });

    //this.takePicture();
  //  this.imagechooseDialog();
  this.presentActionSheet();

  }

  async presentActionSheet() {
    this.hide = false;
    const actionSheet = await this.actionsheet.create({
      header: 'Select Image',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Open Camera',
        icon: 'camera',
        handler: () => {
          this.takePicture();
        }
      }, {
        text: 'Select From Gallery',
        icon: 'image',
        handler: () => {
          this.uploadimg();
        }
      },{
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          this.navCtrl.pop();
        }
      }]
    });
    await actionSheet.present();
  }

  uploadimg() {
    console.log("uploadimage");
    this.camimg = false;
    
    let getPicturesOptions = {
      maximumImagesCount: 10,
      outputType: 1,
      quality: 30
    };
    
    if(this.platform.is('ios'))
    {
        Object.assign(getPicturesOptions, {disable_popover: true});
    }
       
    this.imagePicker.getPictures(getPicturesOptions).then((results) => {
      console.log(results);
      if(results != '')
      {
      for (var i = 0; i < results.length; i++) {
        // console.log("b4",results[i]);
        let base64Image = 'data:image/jpeg;base64,' + results[i];
        this.myImgUrl = base64Image;
        //console.log("afterbase",base64Image);
        this.multipleimage.push(base64Image);
        //console.log("allimages",this.multipleimage);
      }
    }
    else{
      this.navCtrl.navigateForward('viewproperty');
    }
      //this.loader.present();
      this.hide = true;
      this.Data = { "file": this.multipleimage };
      this.authService.postData(this.Data, 'userImageupload').then((result) => {
        this.responseData = result;
        //this.loader.dismiss();
        if (this.responseData.success) {
          this.filename = this.responseData.filename;
          document.querySelector("#AdddocFieldSection").classList.remove("hide");
          //this.hide = false;
        }
      });
    },(err) => {
      alert('exit');
    });
   
  }

  // imagechooseDialog() {
  //   let alert = this.alertCtrl.create({
  //     header: 'Upload Document',
  //    // message: 'through',
  //     buttons: [
  //       {
  //         text: 'Open with Gallery',
  //         cssClass:"openGlry",
  //         handler: () => {
  //           this.openGallery()
  //         }
  //       },
  //       {
  //         text: 'Or',
  //         handler: () => {
  //           console.log('or');
  //         }
  //       },
  //       {
  //         text: 'Open Camera',
  //         cssClass:"openCam",
  //         handler: () => {
  //           this.takePicture();
  //         }
  //       }
  //     ],
  //     backdropDismiss:false,
  // });
  // alert.present();
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdddocumentPage');
  }

  //opens camera to select picture
  takePicture() {
    //this.showButton = false;
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.myImgUrl = base64Image;

      this.Data = { "file": base64Image };
      //this.loader.present();
      console.log(this.Data);
      this.authService.postData(this.Data, 'userImageupload').then((result) => {
        //this.loader.dismiss();
        this.responseData = result;
        console.log(this.responseData);
        if (this.responseData.success) {
          this.filename = this.responseData.filename;
          document.querySelector("#AdddocFieldSection").classList.remove("hide");
        }

      }, (err) => {

      });
    }, (err) => {
      this.navCtrl.pop();
    });

  }

  //opens gallery to select picture
  openGallery() {
    // this.showButton = false;
    var imageSrc;
    let options = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 30,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
      saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.myImgUrl = base64Image;

      this.Data = { "file": base64Image };
      //this.loader.present();
      console.log(this.Data);
      this.authService.postData(this.Data, 'userImageupload').then((result) => {
        //this.loader.dismiss();
        this.responseData = result;
        console.log(this.responseData);
        if (this.responseData.success) {
          this.filename = this.responseData.filename;
          document.querySelector("#AdddocFieldSection").classList.remove("hide");
        }

      }, (err) => {

      });
    }, (err) => {
      this.navCtrl.pop();
    });
  }

  OnResumeSelect(fileInput: any) {
    var file = fileInput.target.files[0];
    console.log(file);
    this.filename = file.name;
    this.fd = new FormData();


    // JUST APPEND EVERY OTHER DATA THAT YOU WANT IT TO COME WITH THE
    //CHOOSEN FILE, LIKE NAME,PH NO ETC
    this.fd.append("file", file);


    //BELOW IS THE CODE FOR SENDING THAT FILE TO YOUR CUSTOM SERVER

  }

  //check validations
  checkValid(alph: any) {
    console.log(alph)
    if (alph == "a") {
      if (this.document_name != "") {
        this.docnam = false;
      } else {
        this.docnam = true;
      }
    }
    if (alph == "b") {
      if (this.documenttype != "") {
        this.docType = false;
        // if(this.documenttype == "19"){
        //   this.description = true;
        // }else{
        //   this.description = false;
        // }
      } else {
        this.docType = true;
      }
    }
    if (alph == "c") {
      if (this.purchasedDate != "") {
        this.docDate = false;
      } else {
        this.docDate = true;
      }
    }
    // else{
    //   if (this.docDescription != "") {
    //     this.docDescr = false;
    //   } else {
    //     this.docDescr = true;
    //   }
    // }
  }
  validat(formvl) {
    if (formvl.name == "" || formvl.name == undefined) {
      this.docnam = true;
    } else {
      this.docnam = false;
    }
    if (formvl.type != undefined) {
      this.docType = false;
      // if(formvl.type == "19"){
      //   if(formvl.docDescription != undefined && formvl.docDescription != ""){
      //     this.docDescr = false;
      //   }else{
      //     this.docDescr = true;
      //   }
      // }
    } else {
      this.docType = true;
    }
    if (formvl.expire_date != undefined) {
      this.docDate = false;
    } else {
      this.docDate = true;
    }
  }

  //adding document
  submitdata(formValue: any) {
    this.validat(formValue);
    // && this.docDescr == false
    if (this.docDate == false && this.docType == false && this.docnam == false ) {
      //this.loader.present();
      //debugger;
      console.log(formValue);
      this.fd = new FormData();
      this.fd.append("name", formValue.name);
      this.fd.append("type", formValue.type);
      this.fd.append("expire_date", formValue.expire_date);
      this.fd.append("prop_id", this.propertyid);
      this.fd.append("doc_id", this.doc_id);
      this.fd.append("user_id", localStorage.getItem("userId"));
      this.fd.append("filename", formValue.filename);
      // this.fd.append("doc_description",this.docDescription);
      var xhr = new XMLHttpRequest();

      if (typeof (formValue.name) != "undefined" && typeof (formValue.filename) != "undefined") {
        xhr.open('POST', this.authService.apiUrl + 'add_certificate', true);

        xhr.onload = () => {
          if (xhr.status == 200) {
            //this.loader.dismiss();
            var resp = JSON.parse(xhr.response);
            console.log('Server got: ', resp);
            console.log('Server got: ', resp.message);

            if (resp.success) {
              let alert = this.alertCtrl.create({
                header:'Success!',
                message:'Document Added Successfully',
                buttons:['OK']
              }).then(alert =>alert.present());
              document.querySelector("#AdddocFieldSection").classList.add("hide");
              //this.hide = false;
              this.hide = true;
              //  this.navCtrl.push(AdddocsuccessPage, { "address": resp.propdata.address, "doc_name": resp.propdata.doc_name, "expiredate": resp.propdata.expire_date });
              this.navservice.address = resp.propdata.address;
              this.navservice.doc_name = resp.propdata.doc_name;
              this.navservice.expire_date = resp.propdata.expire_date;
              this.navCtrl.navigateForward("adddocsuccess");

            }
            else {
              let alert = this.alertCtrl.create({
                header:'Failed!',
                message:'Document may be invalid or cannot not be greater than 500 kilobytes',
                buttons:['OK']
              }).then(alert => alert.present());
              return false;
            }

          };
        }
        xhr.send(this.fd);
      }
      else {
        let alert = this.alertCtrl.create({
          message: 'Please fill up all the fields',
          buttons: ['OK']
        }).then(alert => alert.present());
        //this.loader.dismiss();
      }
    }
  }
  

}
