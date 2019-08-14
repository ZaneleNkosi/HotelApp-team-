import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, PopoverController } from 'ionic-angular';
import * as firebase from 'firebase';
import { Popover3Component} from '../../components/popover3/popover3';
import { Popover4Component} from '../../components/popover4/popover4';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('slider') slider: Slides;
  page = 0;

  db = firebase.firestore();
  constructor(public popoverCtrl: PopoverController,public navCtrl: NavController) { 
  }

  selectedTab(index){
    this.slider.slideTo(index);
  }

 gotoLogin(){
   this.navCtrl.push('LoginPage');
 }

 gotoRegister(){
  this.navCtrl.push('RegisterPage');
 }

//  async presentPopover(myEvent) {
//   const popover = await this.popoverCtrl.create(Popover3Component);
//   popover.present({
//     ev: myEvent 
//   });
// }

// presentPopover4(myEvent) {
//   const popover = this.popoverCtrl.create(Popover4Component);
//   popover.present({
//     ev: myEvent 
//   });
// }

}
