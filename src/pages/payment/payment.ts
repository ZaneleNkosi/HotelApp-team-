import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, Loading } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ListPage } from '../list/list';
import { InformationProvider } from '../../providers/information/information';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule, Validator } from '@angular/forms';
import { EmailValidator } from '../../Validators/email';
/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  db = firebase.firestore();
  ref = firebase.database().ref('payments/');
  public credentialsForm: FormGroup; 
  public loading: Loading
  payments = {

    name: "",
    account: "",
    expiry: "",
    cvv: ""
  }
  users
  constructor(
    private infoProvider: InformationProvider, 
    public alertCtrl: AlertController, 
    private afDatabase: AngularFireDatabase, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private modal: ModalController, 
    private afAuth: AngularFireAuth,
    formBuilder: FormBuilder,
    private FormsModule: FormsModule,
    private ReactiveFormsModule: ReactiveFormsModule,
    ) {
      this.credentialsForm = formBuilder.group({ 
        account: [ '', Validators.compose([Validators.required, Validators.minLength(13), Validators.maxLength(13)]) ], 
        cvv: [ '', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(3)])], 
        name: [ '', Validators.compose([Validators.required])],
        expiry: [ '', Validators.compose([Validators.required]) 
      ]
});   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
    this.users = this.infoProvider.user.uid;
  }
  createPayment() {

    // const myModal = this.modal.create('ModalPage');
    // myModal.present();

    this.db.collection("payments").doc(this.users).set(this.payments).then(() => {
    this.navCtrl.push('ConfirmpaymentPage');
    })
  }

  showConfirm() {
    const confirm = this.alertCtrl.create({
      title: 'Confirmed',
      message: 'Your Booking has been Confirmed',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot(ListPage)
            console.log('Ok clicked');
          }
        }
      ]
    });
    confirm.present();
  }


}
