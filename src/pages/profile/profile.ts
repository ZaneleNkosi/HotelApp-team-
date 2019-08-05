import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Profile } from '../../model/profile';
import * as firebase from 'firebase';
import { ListPage } from '../../pages/list/list';
import { InformationProvider } from '../../providers/information/information';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  data = []
  db = firebase.firestore();
  text: string;

  uid;

  test: Profile = {
    uid: null,
    bio: null,
    fullname: null,
    phone: null,
    email: null,
    image: null
  };

  showComp = true;
  users
  displayProfile = {};
  displayBooking = {};
  favourite;

  constructor(private infoProvider: InformationProvider,  public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {

    this.uid = firebase.auth().onAuthStateChanged(res => {
      this.uid = res.uid;
      this.retrieveData()
      this.retrieveBooking()
      this.favourite = this.infoProvider.favourite
      console.log('dataprovider', this.users)
    })
    this.favourite = this.navParams.data
    console.log('Favourite Room', this.infoProvider.favourite);
  }

  retrieveData() {

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

  gotolist() {
    this.navCtrl.push(ListPage);
  }

  gotoBookings() {
    this.navCtrl.push('ModalPage');
  }

  async deleteProfile() {
    this.db.collection("Bookings").doc(this.infoProvider.returnUser().uid).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });
  }

  updateProfile() {
    this.db.collection("User Profiles").doc(this.infoProvider.returnUser().uid).delete().then(() => {
      console.log("Document successfully updated!");
    }).catch(function (error) {
      console.error("Error removing document: ", error);
    });

  }

  retrieveBooking() {

    let users = this.db.collection('bookings');

    let load = this.loadingCtrl.create({
      content: 'Loading'
    });
    load.present();
    // ...query the Booking that contains the uid of the currently logged in user...
    console.log('User Bookings: ', this.infoProvider.returnUser());
    let query = users.where("uid", "==", this.infoProvider.returnUser().uid);
    query.get().then(querySnapshot => {
      // ...log the results if the document exists...
      if (querySnapshot.empty !== true) {
        console.log('Got data', querySnapshot);
        querySnapshot.forEach(doc => {
          this.displayBooking = doc.data();
          console.log('Booking Document: ', this.displayBooking)
        })
      } else {
        console.log('No Booking data');
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


}

