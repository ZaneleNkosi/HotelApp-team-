import { ProfileProvider } from './../../providers/profile/profile';
import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, NavController, NavParams } from "ionic-angular"; 
import { AuthProvider } from "../../providers/auth/auth"; 
import * as firebase from 'firebase';
import { Profile } from '../../model/profile';
import { InformationProvider } from '../../providers/information/information';
import { ProfilePage } from '../profile/profile';

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
    ) {}

  ionViewDidLoad() {
    this.db.collection('User Profiles').where('uid', '==', this.infoProv.returnUser().uid).get().then(snapshot => {
      snapshot.forEach(doc => {
        this.userProfile = doc.data();
      })
      console.log(this.userProfile);
      
      
    })
}

UpdatePro(userprofile){
console.log(userprofile);
  this.db.collection("User Profiles").doc(this.authProvider.getuser()).update(userprofile).then((ref) => {
   
    console.log("This is the ref =",ref)

  this.navCtrl.push(ProfilePage)
})}

}
