import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }
  loginUser(email: string, password: string): Promise<any> { 
    return firebase.auth().signInWithEmailAndPassword(email, password);
   
  }
  signupUser(email: string, password: string): Promise<any> { 
    return firebase .auth() .createUserWithEmailAndPassword(email, password) .then(newUser => { 
      firebase .database() .ref(`/userProfile/${newUser.user}/email`) .set(email); }) .catch(error => { 
        console.error(error); throw new Error(error); 
      }); 
    }

  resetPassword(email:string): Promise<void> { 
    return firebase.auth().sendPasswordResetEmail(email); 
  }

  user;
  getuser()
  {
   this.user =firebase.auth().currentUser.uid ;
   return this.user;
  }

  logoutUser(): Promise<void> { 
    
    const userId: string = firebase.auth().currentUser.uid; firebase .database() .ref(`/userProfile/${userId}`) .off(); 
    return firebase.auth().signOut(); 
  }

}
