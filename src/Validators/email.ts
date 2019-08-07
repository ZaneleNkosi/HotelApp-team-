import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Loading, NavController, AlertController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../providers/auth/auth';


export class EmailValidator {
    static isValid(control: FormControl) { 
        const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/ 
            .test( 
                control.value 
                ); 
                if (re) { 
                    return null; 
                } 
                return { 
                    invalidEmail: true 
                }; 
            }
            
    // goToSignup():void { 
    //     this.navCtrl.push('SignupPage'); 
    // } 
    // goToResetPassword():void { 
    //     this.navCtrl.push('ResetPasswordPage'); 
    // }
}
