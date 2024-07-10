import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Downloader, DownloadRequest, NotificationVisibility } from '@ionic-native/downloader/ngx';
import { AuthService } from '../provider/auth.service';

@Component({
  selector: 'app-mydcuments',
  templateUrl: './mydcuments.page.html',
  styleUrls: ['./mydcuments.page.scss'],
  providers: [NavParams, Downloader]
})
export class MydcumentsPage implements OnInit {

  userData: any;
  username: any;
  doc_url: any;
  responseData: any;
  doc_file_type: any;
  propdata = [];
  device: any;
  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams,
    private iab: InAppBrowser, public authService: AuthService, private downloader: Downloader) {
    platform.ready().then(() => {
      if (this.platform.is('android')) {
        this.device = 'android';
      }
      if (this.platform.is('ios')) {
        this.device = 'ios';
      }
    });
  }

  ngOnInit() {
    this.username = localStorage.getItem("username");
    this.userData = { "user_id": localStorage.getItem("userId") };

    //loads account holder's all decuments
    this.authService.postData(this.userData, 'get_documents').then((result) => {
      this.responseData = result;
      if (this.responseData.success) {
        if (this.responseData.docData.length > 0) {
          this.doc_url = this.responseData.doc_url;
          for (var i = 0; i < this.responseData.docData.length; i++) {
            this.propdata.push(this.responseData.docData[i]);
          }
        }
        else {
          this.propdata = [];
        }
      }
      else {
        this.propdata = [];
      }
    });
  }

  downloadfile(filename, filetype, docname) {
    filetype = filetype.toLowerCase();
    console.log(filetype);

    var request: DownloadRequest = {
      uri: this.doc_url + '' + filename,
      title: 'MyDownload',
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
        dirType: 'Downloads',
        subPath: docname
      }
    };

    if (this.device == 'android') {
      this.downloader.download(request)
        .then((location: string) => alert('File downloaded at:' + location)
        )
        .catch((error: any) => console.error(error));
    }
    else {
      const browser = this.iab.create(this.doc_url + '' + filename);
    }
  }
  Viewfile(filename, filetype, docname) {
    filetype = filetype.toLowerCase();
    if (this.device == 'android') {
      const options: InAppBrowserOptions = {
        zoom: 'no',
        location: 'no',
        toolbar: 'no',
        hideurlbar: "yes"
      };
      if (filetype == 'pdf') {
        const browser = this.iab.create('http://docs.google.com/gview?embedded=true&url=' +
          this.doc_url + '' + filename, 'location=yes,hardwareback=yes,hideurlbar=yes');
      }
      else {
        const browser = this.iab.create(this.doc_url + '' + filename, '_self', 'hideurlbar=yes');
        // const browser = this.iab.create(this.doc_url+''+filename,'hideurlbar=yes');
      }
    }
    else {
      const browser = this.iab.create(this.doc_url + '' + filename, '_self', 'hideurlbar=yes');
    }
  }



}
