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
  name: "",
  message: "",
  roomName:""
}
displayProfile = {};

  constructor(public viewCtrl: ViewController, private infoProvider: InformationProvider,  private loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewPage');
    console.log(this.navParams.data);
    this.suite = this.navParams.data;
    // this.users = this.infoProvider.user.uid;
    // this.retrieveProfile()
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
  this.db.collection('reviews').doc(this.review.name + this.infoProvider.returnUser().uid).set(this.review).then(() => {

    load.dismiss();
  });
    load.dismiss();

}

// retrieveProfile() {

 
//   let users = this.db.collection('User Profiles');

//   let load = this.loadingCtrl.create({
//     content: 'Loading'
//   });
//   load.present();
//   // ...query the profile that contains the uid of the currently logged in user...
//   console.log('Profile User: ', this.infoProvider.returnUser());
//   let query = users.where("uid", "==", this.infoProvider.returnUser().uid);
//   query.get().then(querySnapshot => {
//     // ...log the results if the document exists...
//     if (querySnapshot.empty !== true) {
//       console.log('Got data', querySnapshot);
//       querySnapshot.forEach(doc => {
//         this.displayProfile = doc.data();

//         console.log('Profile Document: ', this.displayProfile)
//       })
//     } else {
//       console.log('No data');
//     }
//     // dismiss the loading
//     load.dismiss();
//   }).catch(err => {
//     // catch any errors that occur with the query.
//     console.log("Query Results: ", err);
//     // dismiss the loading
//     load.dismiss();
//   })
// }





}
