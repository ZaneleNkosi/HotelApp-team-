import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { FIREBASE_INFO } from '../app/firebase.info';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { InformationProvider } from '../providers/information/information';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  user;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private infoProv: InformationProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.SessionLoad()

    });

    firebase.initializeApp(FIREBASE_INFO);
  }

  SessionLoad() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = HomePage;
      } else {
        this.infoProv.getUser(user);
        this.rootPage = ListPage;
        console.log('app components logged in: ', user)
      }
    })
  }
}

