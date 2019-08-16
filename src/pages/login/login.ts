import { Component } from '@angular/core';
import { EmailValidator } from './../../Validators/email';
import * as firebase from 'firebase';
import { User } from '../../model/user';
import { AuthProvider } from '../../providers/auth/auth'
import { IonicPage, NavController, NavParams, ToastController, ViewController, PopoverController, AlertController, LoadingController, Loading, Alert  } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../../pages/home/home';

import { InformationProvider } from '../../providers/information/information';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetComponent } from '../../components/reset/reset';
import { ListPage } from '../list/list';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user = {} as User;
  db = firebase.firestore();
  text: string;
  public loginForm: FormGroup; 
  public loading: Loading
  constructor(public popoverCtrl: PopoverController, 
    public viewCtrl: ViewController, 
    private toast: ToastController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private fireAuth: AngularFireAuth, 
    private infoProv: InformationProvider, 
    public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController, 
    public authProvider: AuthProvider, 
    formBuilder: FormBuilder,
    private FormsModule: FormsModule,
    private ReactiveFormsModule: ReactiveFormsModule,) {
      this.loginForm = formBuilder.group({ 
        email: [ '', Validators.compose([Validators.required, EmailValidator.isValid]) ], 
        password: [ '', Validators.compose([Validators.required, Validators.minLength(6)]) 
    ] 
}); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(user: User) {
 
    if (!this.user.email || !this.user.password) {
      
    } else {
       this.fireAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(res => {
     if (res) {
       console.log('Response from pop3: ', res);
       this.infoProv.getUser(res);
       this.viewCtrl.dismiss();
      this.navCtrl.push('ListPage');
      
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



loginUser(): void { 
 if (!this.loginForm.valid) { 
   console.log( `Form is not valid yet, current value: ${this.loginForm.value}` 
   ); 
 } else { 
   const email = this.loginForm.value.email; 
   const password = this.loginForm.value.password; 
   this.authProvider.loginUser(email, password).then( authData => { 
     this.loading.dismiss().then(() => {
        this.navCtrl.setRoot(ListPage); 
       }); 
     }, error => { 
       this.loading.dismiss().then(() => {
          const alert: Alert = this.alertCtrl.create({ 
            message: error.message, buttons: [{ text: 'Ok', role: 'cancel' }] 
           }); 
           alert.present(); 
         }); 
       } 
       ); 
       this.loading = this.loadingCtrl.create(); 
       this.loading.present(); 
     } 
     
   }
   goToResetPassword():void { 
      this.navCtrl.push(ResetComponent); 
    }

    

}
