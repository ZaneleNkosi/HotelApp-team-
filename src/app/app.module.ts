import { EditPage } from './../pages/edit/edit';
import { ResetComponent } from './../components/reset/reset';
import { ResetpasswordPage } from './../pages/resetpassword/resetpassword';
import { RegisterPage } from './../pages/register/register';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { BookingPage } from '../pages/booking/booking';
import { PaymentPage } from '../pages/payment/payment';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FIREBASE_INFO } from './firebase.info';
import { PopoverComponent } from '../components/popover/popover';
import { Popover3Component } from '../components/popover3/popover3';
import { Popover4Component } from '../components/popover4/popover4';
import { InformationProvider } from '../providers/information/information';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Camera } from "@ionic-native/camera";
import { AuthProvider } from '../providers/auth/auth';
import { ProfileProvider } from '../providers/profile/profile';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    BookingPage,
    PaymentPage,
    ResetpasswordPage,
    RegisterPage,
    LoginPage,
    EditPage,
    PopoverComponent,
    Popover3Component,
    Popover4Component,
    ResetComponent
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(FIREBASE_INFO),
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    BookingPage,
    PaymentPage,
    EditPage,
    PopoverComponent,
    Popover3Component,
    Popover4Component,
    ResetComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    InformationProvider,
    Camera,
    AuthProvider,
    ProfileProvider
  ]
})
export class AppModule { }
