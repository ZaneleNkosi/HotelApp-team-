import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {
  update(arg0: { firstName: string; lastName: string; }): Promise<any> {
    throw new Error("Method not implemented.");
  }
  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;


  constructor(public http: HttpClient) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
      this.currentUser = user;
      this.userProfile = firebase.firestore().doc(`/userProfile/${user.uid}`);
      }
      });
  }
  getUserProfile(): firebase.firestore.DocumentReference {
    return this.userProfile;
    }
    addProfile(firstName: string): Promise<any> {
      return this.userProfile.set({ firstName});
      }
    updateName(firstName: string): Promise<any> {
      return this.userProfile.update({ firstName});
      }
      updateDOB(birthDate: string): Promise<any> {
        return this.userProfile.update({ birthDate });
        }
        updateEmail(newEmail: string, password: string): Promise<any> {
          const credential: firebase.auth.AuthCredential =
          firebase.auth.EmailAuthProvider.credential(
          this.currentUser.email,
          password
          );
          return this.currentUser
          .reauthenticateWithCredential(credential)
          .then(() => {
          this.currentUser.updateEmail(newEmail).then(() => {
          this.userProfile.update({ email: newEmail });
          });
          })
          .catch(error => {
          console.error(error);
          });
          }
          updatePassword(newPassword: string, oldPassword: string): Promise<any> {
            const credential: firebase.auth.AuthCredential =
            firebase.auth.EmailAuthProvider.credential(
            this.currentUser.email,
            oldPassword
            );
            return this.currentUser
            .reauthenticateWithCredential(credential)
            .then(() => {
            this.currentUser.updatePassword(newPassword).then(() => {
            console.log('Password Changed');
            });
            })
            .catch(error => {
            console.error(error);
            });
            }
            
}