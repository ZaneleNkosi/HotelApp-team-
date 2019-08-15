import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ListPage } from '../list/list';


@IonicPage()
@Component({
  selector: 'page-confirmpayment',
  templateUrl: 'confirmpayment.html',
})
export class ConfirmpaymentPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,) {
  }

  ionViewDidLoad() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    }
  
  gotolist(){
    this.navCtrl.setRoot(ListPage);
  }
}
