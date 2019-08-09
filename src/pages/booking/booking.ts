import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import * as firebase from 'firebase';
import { Booking } from '../../model/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { InformationProvider } from '../../providers/information/information';
import { FormGroup, Validators, FormBuilder,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { EmailValidator } from '../../Validators/email';

@IonicPage()
@Component({

  selector: 'page-booking',
  templateUrl: 'booking.html',

})

export class BookingPage {
  db = firebase.firestore();
  ref = firebase.database().ref('bookings/');
  public loginForm: FormGroup; 
  public loading: Loading
  
  bookings =
    {
      name: "",
      email: "",
      phone: '',
      date1: "",
      date2: "",
      adults: 0,
      children: 0,
      roomName: "",
      nodays: 0,
      amount: 0,
      uid: ''
    };

  booking = {} as Booking;
  data = []
  price;
  suites;
  users;
  roomDetails = {}
  displayProfile = {}
  bookingForm: FormGroup;
  constructor(
    private loadingCtrl: LoadingController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private infoProvider: InformationProvider,
    formBuilder: FormBuilder,
    private FormsModule: FormsModule,
    private ReactiveFormsModule: ReactiveFormsModule,) {
      
      this.bookingForm = formBuilder.group({ 
    email: [ '', Validators.compose([Validators.required, EmailValidator.isValid]) ], 
    name: [ '', Validators.compose([Validators.required])], 
    tel: [ '', Validators.compose([Validators.required,Validators.minLength(10), Validators.maxLength(10)]) ], 
    date: [ '', Validators.compose([Validators.required]) ], 
    number: [ '', Validators.compose([Validators.required]) ], 
    roomName: [ '', Validators.compose([Validators.required])], 
   
}); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
    console.log('Price#: ', this.navParams.data.Price);
    console.log('Name: ', this.navParams.data.Name);

    this.price = this.navParams.data.Price;
    this.roomDetails = this.navParams.data;
    this.bookings.roomName = this.navParams.data.Name;
    console.log('Booking Room details: ', this.roomDetails);

    this.suites = this.infoProvider.suites
    this.users = this.infoProvider.user.uid;
    this.bookings.uid = this.infoProvider.user.uid;
    this.retrieveData();
  }

  createBooking() {

    let users = this.db.collection('User Profiles');

    let load = this.loadingCtrl.create({
      content: 'Loading'
    });
    load.present();
    let date = new Date();
    let start = new Date(this.bookings.date1);
    let end = new Date(this.bookings.date2);

    const days = 1000 * 60 * 60 * 24;
    const diff = end.valueOf() - start.valueOf();
    this.bookings.nodays = Math.floor(diff / days);

    if (this.bookings.adults > 2) {
      this.bookings.amount = this.bookings.nodays * this.price * this.bookings.adults
    } else
      this.bookings.amount = this.bookings.nodays * this.price

    // this.afAuth.authState.take(1).subscribe(auth => {
    //   this.afDatabase.object(`bookings/${auth.uid}`).set(this.bookings)
    //     .then(() => this.navCtrl.push('ModalPage'))
    // })
    this.db.collection('bookings').doc(this.bookings.roomName + this.infoProvider.returnUser().uid).set(this.bookings).then(() => {
      this.navCtrl.push('ModalPage')
      load.dismiss();
    });
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
          this.bookings.name = doc.data().firstname;
          this.bookings.email = doc.data().email;
          this.bookings.phone = doc.data().phone;


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

}
