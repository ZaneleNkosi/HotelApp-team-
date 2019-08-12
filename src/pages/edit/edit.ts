import { ProfileProvider } from './../../providers/profile/profile';
import { Component } from '@angular/core';
import { Alert, AlertController, IonicPage, NavController, NavParams } from "ionic-angular"; 
import { AuthProvider } from "../../providers/auth/auth"; 
import firebase from 'firebase';
import { Profile } from '../../model/profile';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage {
  public userProfile: any; 
  public birthDate: string;
  db = firebase.firestore();
  storage = firebase.storage().ref();
  profile = {} as Profile;
  data = [];
  uid;
  showComp = true;
  profileImage: string;
  firstName?: string;
  users
 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController, 
    public authProvider: AuthProvider, 
    public profileProvider: ProfileProvider 
    ) {
  }

  ionViewDidLoad() {
  
}
  updateName(): void { 
      let alert: Alert = this.alertCtrl.create({ 
      message: "Your first name & last name", 
      inputs: [ { 
        name: "firstName", placeholder: "Your first name", 
      }], 
    buttons: [ { 
      text: "Cancel" 
    }, { 
      text: "Save", 
      handler: data => { 
        this.profileProvider.updateName(data.firstname); 
      } 
    } 
  ] 
}); 
alert.present(); 
  }

  updateEmail(): void { 
    let alert: Alert = this.alertCtrl.create({ 
      inputs: [{ 
        name: 'newEmail', placeholder: 'Your new email' }, 
        { 
          name: 'password', 
          placeholder: 'Your password', 
          type: 'password' 
        }], buttons: [ { 
          text: 'Cancel' 
        }, { 
          text: 'Save', 
          handler: data => { 
            this.profileProvider .updateEmail(data.newEmail, data.password) .then(() => { 
              console.log('Email Changed Successfully'); 
            }) .catch(error => { 
              console.log('ERROR: ' + error.message); 
            }); 
          }}] 
        }); alert.present(); 
      } 
      updatePassword(): void { 
        let alert: Alert = this.alertCtrl.create({ 
          inputs: [{ 
            name: 'newPassword', 
            placeholder: 'New password', 
            type: 'password' 
          }, { 
            name: 'oldPassword', 
            placeholder: 'Old password', 
            type: 'password' 
          }], buttons: [{ 
            text: 'Cancel' }, { 
              text: 'Save', handler: data => { 
                this.profileProvider.updatePassword( data.newPassword, data.oldPassword ); 
              } 
            } 
          ] 
        }); alert.present();
      }

      updateBio(): void { 
        let alert: Alert = this.alertCtrl.create({ 
          inputs: [{ 
            name: 'newPassword', 
            placeholder: 'New password', 
            type: 'password' 
          }, { 
            name: 'oldPassword', 
            placeholder: 'Old password', 
            type: 'password' 
          }], buttons: [{ 
            text: 'Cancel' }, { 
              text: 'Save', handler: data => { 
                this.profileProvider.updatePassword( data.newPassword, data.oldPassword ); 
              } 
            } 
          ] 
        }); alert.present();
      }
      updatePhone(): void { 
        let alert: Alert = this.alertCtrl.create({ 
          inputs: [{ 
            name: 'newPassword', 
            placeholder: 'New password', 
            type: 'password' 
          }, { 
            name: 'oldPassword', 
            placeholder: 'Old password', 
            type: 'password' 
          }], buttons: [{ 
            text: 'Cancel' }, { 
              text: 'Save', handler: data => { 
                this.profileProvider.updatePassword( data.newPassword, data.oldPassword ); 
              } 
            } 
          ] 
        }); alert.present();
      }
     
        
      
        
}
