import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import * as firebase from 'firebase';
import { HomePage } from '../../pages/home/home';
import { InformationProvider } from '../../providers/information/information';

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  text: string;
  showComp = true;
 
  constructor(public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams, private infoProvider: InformationProvider) {
    console.log('Hello PopoverComponent Component');
    this.text = 'Hello World';
  }

profile(){
  this.navCtrl.push('ProfilePage');
}

logout(){
  firebase.auth().signOut().then(() => {
    console.log('User logged out');
    this.infoProvider.getUser(null);
    this.navCtrl.push(HomePage);
  }).catch((error)=> {
  });
}


close() {
  this.viewCtrl.dismiss();
}
}
