import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { ListPage } from '../../pages/list/list';
import { BookingPage } from '../booking/booking';
import * as firebase from 'firebase';
import { InformationProvider } from '../../providers/information/information';

@IonicPage()
@Component({
  selector: 'page-view',
  templateUrl: 'view.html',
})
export class ViewPage {
suite = {
  Price: ''
};

db = firebase.firestore();
users

review = {
  message: "",
}
  constructor(public viewCtrl: ViewController, private infoProvider: InformationProvider,  private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPage');
    console.log(this.navParams.data);
    this.suite = this.navParams.data;
    this.users = this.infoProvider.user.uid;
  }

  gotolist() {
    this.navCtrl.push(ListPage);
  }

  gotobooking(){
    this.navCtrl.push(BookingPage, this.navParams.data);
  }

  createmessage(){
  let load = this.loadingCtrl.create({
    content: 'Loading'
  });
  load.present();

  this.db.collection("hotel").doc('aDJnBKRlpH482p3HwMlM').collection("rooms").doc(this.navParams.data.Name).set(this.review).then(() => {
   
    });
    load.dismiss();
}



}
