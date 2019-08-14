import { ProfileProvider } from './../../providers/profile/profile';
import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, NavController, NavParams, LoadingController } from "ionic-angular"; 
import { AuthProvider } from "../../providers/auth/auth"; 
import * as firebase from 'firebase';
import { Profile } from '../../model/profile';
import { InformationProvider } from '../../providers/information/information';
import { ProfilePage } from '../profile/profile';
import { Camera, CameraOptions } from '@ionic-native/camera';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  public birthDate: string;
  db = firebase.firestore();
  storage = firebase.storage().ref();
  profile = {} as Profile;
  data = [];
  uid;
  showComp = true;
  profileImage: string;
  firstName?: string;
  
 userProfile = {};
 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController, 
    public authProvider: AuthProvider, 
    public profileProvider: ProfileProvider ,
    private infoProv: InformationProvider
    ) {
      
    }

  ionViewDidLoad() {
    this.db.collection('User Profiles').where('uid', '==', this.infoProv.returnUser().uid).get().then(snapshot => {
      snapshot.forEach(doc => {
        this.userProfile = doc.data();
      })
      console.log(this.userProfile);
      
      
    })
}

cancel(){
  this.navCtrl.push(ProfilePage);
}

async selectImage() {
  const option: CameraOptions = {
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    quality: 100
  }
  await this.camera.getPicture(option).then(res => {
    console.log('popover2', res);

    let base64image = `data:image/jpeg;base64,${res}`;
    this.profileImage = base64image;
  })
}

UpdatePro(userprofile){
  let users = this.db.collection('User Profiles');

  let load = this.loadingCtrl.create({
    content: 'Loading'
  });

  load.present();
    const images = this.storage.child(this.profile.bio + '.jpg')
    let upload = images.putString(this.profileImage, 'data_url');

    upload.on('state_changed', snapshot => {
      let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('popover2 Picture',progress);

    }, err => {

    }, () => {
      upload.snapshot.ref.getDownloadURL().then(downURL => {
        console.log('File available at: ', downURL);
        this.profile.image = downURL

console.log(userprofile);
  this.db.collection("User Profiles").doc(this.authProvider.getuser()).update(userprofile).then((ref) => {
    load.dismiss();
    console.log("This is the ref =",ref)

  this.navCtrl.push(ProfilePage)
});
})

    })
  }
}
