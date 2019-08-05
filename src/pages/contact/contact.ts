import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { InformationProvider } from '../../providers/information/information';
import * as firebase from 'firebase';
import { ListPage } from '../list/list';
/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  db = firebase.firestore();
  ref = firebase.database().ref('bookings/');

  contact ={
    name: "",
    email: "",
    phone: "",
    message: "",
  }

  users
  data = []
  constructor(public alertCtrl: AlertController, private loadingCtrl: LoadingController, private infoProvider: InformationProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  this.users = this.infoProvider.user.uid;

  }

  createmessage()
{
  
  let load = this.loadingCtrl.create({
    content: 'Loading'
  });
  load.present();

  this.db.collection("messages").doc(this.users).set(this.contact).then(() => {
    const confirm = this.alertCtrl.create({
      title: 'Confirmed',
      message: 'Message Received',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.push(ListPage)
            console.log('ListPage: Ok clicked');
          }
        }
      ]
    });
    confirm.present();
    load.dismiss();
  });
}
}
