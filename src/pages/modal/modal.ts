import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { PaymentPage } from '../../pages/payment/payment';
import { InformationProvider } from '../../providers/information/information';
import { BookingPage } from '../booking/booking';
import { ListPage } from '../list/list';
@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  bookings =
    {
      uid: "",
      name: "",
      email: "",
      phone: '',
      date1: "",
      date2: "",
      adults: 0,
      children: 0,
      roomType: "",
      nodays: 0,
      amount: 0
    }

  data = [];
  data2 = [];
  uid;
  treatment;
  reservation;
  roomname;
  suites;
  db = firebase.firestore();
  users
  displayBooking = {};

  constructor(public loadingCtrl: LoadingController, private infoProvider: InformationProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    firebase.auth().onAuthStateChanged(res => {
      this.uid = res.uid;
      this.retrieveData()
      
      this.treatment = this.infoProvider.treatments
      this.reservation = this.infoProvider.reservation

    })

    this.treatment = this.navParams.data
    console.log(this.treatment);
    console.log('Query: ', this.infoProvider.user);
    this.reservation = this.navParams.data
    console.log(this.reservation)
  }

  retrieveData() {

    let users = this.db.collection('bookings');
    
    let load = this.loadingCtrl.create({
      content: 'Loading'
    });
    load.present();
    
    
        // ...query the Booking that contains the uid of the currently logged in user...
        let query = users.where("uid", "==", this.infoProvider.returnUser().uid);
        query.get().then(querySnapshot => {
          // ...log the results if the document exists...
          if (querySnapshot.empty !== true){
            console.log('Got data', querySnapshot);
            querySnapshot.forEach(doc => {
              this.displayBooking = doc.data();
      
              console.log('Booking Document: ', this.displayBooking)
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

  gotoPayment() {
    this.navCtrl.push(PaymentPage);
  }


  async deleteBooking() {

    const confirm = this.alertCtrl.create({
      title: 'Warning',
      message: 'Are you sure you want to cancel your booking?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.db.collection("bookings").doc(this.infoProvider.returnUser().uid).delete().then(() => {
              this.navCtrl.push(ListPage)
              console.log("Document successfully deleted!");
            }).catch(function (error) {
              console.error("Error removing document: ", error);
            });
          }
        }
      ]
    });
    confirm.present();


  }
}
