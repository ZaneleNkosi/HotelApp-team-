import { ProfileProvider } from './../../providers/profile/profile';
import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, NavController, NavParams } from "ionic-angular"; 
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
    private infoProv: InformationProvider,
    public camera: Camera,
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
console.log(userprofile);
  this.db.collection("User Profiles").doc(this.authProvider.getuser()).update(userprofile).then((ref) => {
   
    console.log("This is the ref =",ref)

  this.navCtrl.push(ProfilePage)
})}

}
