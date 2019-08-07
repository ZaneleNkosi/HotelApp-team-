import { Popover3Component } from './../../components/popover3/popover3';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Slides, AlertController, LoadingController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
import { InformationProvider } from '../../providers/information/information';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  db = firebase.firestore();
  rooms = []
  @ViewChild('slider') slider: Slides;
  room;
  page = 0;
  displayProfile = {};
  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams, private infoProvider: InformationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
    this.getRooms()
    this.getProfile()

  }

  selectedTab(index) {
    this.slider.slideTo(index);
  }

  presentPopover(myEvent) {
    const popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent
    });
  }

  gotoProfile(){
    this.navCtrl.push('ProfilePage')
  }

  getRooms() {
    this.db.collection('hotel').doc('aDJnBKRlpH482p3HwMlM').collection('rooms').get().then(room => {
      room.forEach(doc => {
        this.rooms.push(doc.data());
      })
      console.log(this.rooms);
    })
  }

  gotoroom(val) {
    this.room = val;
    this.navCtrl.push('ViewPage', val);
    console.log(val);
  }

  getProfile() {
    let users = this.db.collection('User Profiles');

    let load = this.loadingCtrl.create({
      content: 'Loading'
    });
    load.present();
    // ...query the profile that contains the uid of the currently logged in user...
    console.log('Profile User: ', this.infoProvider.returnUser());
    let query = users.where("uid", "==", this.infoProvider.returnUser().uid);
    query.get().then(querySnapshot => {
      // ...log the results if the document exists...
      if (querySnapshot.empty !== true) {
        console.log('Got data', querySnapshot);
        querySnapshot.forEach(doc => {
          this.displayProfile = doc.data();

          console.log('Profile Document: ', this.displayProfile)
        })
      } else {
        console.log('No data');
      }
      // dismiss the loading
      load.dismiss();
    }).catch(err => {
      // catch any errors that occur with the query.
      console.log("Query Results: ", err);
      // dismiss the loading
      load.dismiss();
    })

  }
  logout(){
    this.navCtrl.push(Popover3Component)
  }
}
