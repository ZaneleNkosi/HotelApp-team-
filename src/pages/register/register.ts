import { Component } from '@angular/core';
import { User } from '../../model/user';
import { IonicPage, NavController, NavParams, ToastController, ViewController, PopoverController, LoadingController, AlertController, Loading  } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../Validators/email';
import { CreateprofilePage } from '../createprofile/createprofile';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public signupForm: FormGroup; 
  public loading: Loading; 
  user = {} as User;

  constructor( public popoverCtrl: PopoverController,
    public viewCtrl: ViewController, 
    private toast: ToastController, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private fireAuth: AngularFireAuth,
    public authProvider: AuthProvider, 
    public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController, 
    formBuilder: FormBuilder ) {

      this.signupForm = formBuilder.group({ 
        email: [ "", 
        Validators.compose([Validators.required, EmailValidator.isValid])], 
        password: [ "", 
        Validators.compose([Validators.minLength(6), Validators.required])] 
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async register(user: User) {
    if(this.signupForm.valid) {
       this.fireAuth.auth.createUserWithEmailAndPassword(this.signupForm.get('email').value, this.signupForm.get('password').value).then((info) => {
        this.navCtrl.push(CreateprofilePage);
    }).catch((error) => {
      console.log('error: ',error);
    })
      
    }else {
      this.toast.create({
        message: "All fields are required! Password MUST be at least 6 characters long.",
        duration: 4000,
        cssClass: "error"
      }).present();
    }
    // this.navCtrl.setRoot(CreateprofilePage);
  }

  close() {
    this.viewCtrl.dismiss();
  }

  gotoLogin(){
    this.navCtrl.push('LoginPage')
  }

}
