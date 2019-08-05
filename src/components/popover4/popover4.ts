import { Component } from '@angular/core';
import { User } from '../../model/user';
import { NavController, NavParams, ToastController, ViewController, PopoverController  } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Popover3Component} from '../../components/popover3/popover3';


@Component({
  selector: 'popover4',
  templateUrl: 'popover4.html'
})
export class Popover4Component {

  user = {} as User;

  constructor(public popoverCtrl: PopoverController,public viewCtrl: ViewController, private toast: ToastController, public navCtrl: NavController, public navParams: NavParams, private fireAuth: AngularFireAuth) {
  }
  async register(user: User) {
    try {
      const info = await this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      if (info) {
        this.viewCtrl.dismiss();
        this.navCtrl.push('CreateprofilePage');
      }
    } catch (e) {
      this.toast.create({
        message: "All fields are required! Password MUST be at least 6 characters long.",
        duration: 4000,
        cssClass: "error"
      }).present();
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }

  presentPopover3(myEvent) {
    this.viewCtrl.dismiss();
    const popover = this.popoverCtrl.create(Popover3Component);
    popover.present({
      ev: myEvent 
    });
  }

  // createProfile(){
  // }

}
