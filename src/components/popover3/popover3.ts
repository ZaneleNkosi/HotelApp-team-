import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../../model/user';
import { NavController, NavParams, ToastController, ViewController, PopoverController  } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../../pages/home/home';
import { ListPage } from '../../pages/list/list';
import { Popover4Component} from '../../components/popover4/popover4';
import { InformationProvider } from '../../providers/information/information';

@Component({
  selector: 'popover3',
  templateUrl: 'popover3.html'
})
export class Popover3Component {
  user = {} as User;
  db = firebase.firestore();
  text: string;

  constructor(public popoverCtrl: PopoverController, public viewCtrl: ViewController, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams, private fireAuth: AngularFireAuth, private infoProv: InformationProvider) {
  }
  ionViewDidLoad(){
    this.login(this.user)
  }
  async login(user: User) {
 
       if (!this.user.email || !this.user.password) {
         
       } else {
          this.fireAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(res => {
        if (res) {
          console.log('Response from pop3: ', res);
          this.infoProv.getUser(res);
          this.viewCtrl.dismiss();
         this.navCtrl.push(ListPage);
         
      }
      }).catch( err => {
        this.toast.create({
        message: "Invalid Email or Password",
        duration: 3000,
        cssClass: "error"
      }).present();
      })
       }      
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }

  goHome() {
    this.navCtrl.push(HomePage);
  }

  close() {
    this.viewCtrl.dismiss();
  }

  presentPopover4(myEvent) {
    this.viewCtrl.dismiss();
    const popover = this.popoverCtrl.create(Popover4Component);
    popover.present({
      ev: myEvent 
    });
  }

}
