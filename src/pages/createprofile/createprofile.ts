import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,  PopoverController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Profile } from '../../model/profile';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireDatabase } from 'angularfire2/database';
import { InformationProvider } from '../../providers/information/information';


/**
 * Generated class for the CreateprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createprofile',
  templateUrl: 'createprofile.html',
})
export class CreateprofilePage {

  
  db = firebase.firestore();
  storage = firebase.storage().ref();
  profile = {} as Profile;
  data = [];
  uid;
  showComp = true;
  profileImage: string;
  users

  constructor(public loadingCtrl: LoadingController, private infoProvider: InformationProvider, public popoverCtrl: PopoverController, private afDatabase: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateprofilePage');
    firebase.auth().onAuthStateChanged(res => {
      this.uid = res.uid;
        this.users = this.infoProvider.user.uid;
        this.profile.uid = this.infoProvider.user.uid;
        console.log('profile popover2',  this.infoProvider.user)
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

  createProfile() {
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

        this.db.collection("User Profiles").doc(this.users).set(this.profile).then(() => {
          load.dismiss();
          this.navCtrl.push('ProfilePage');
         
        });
      })
    })
  }
    
  viewProfile() {
    this.navCtrl.push('ProfilePage');
  }

  showProfile() {
    this.showComp = !this.showComp;
  }

}
