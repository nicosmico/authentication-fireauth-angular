import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private firestore: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) {
  }

  saveUser(user: User){
    return this.fireAuth.currentUser.then(currentUser => {
      currentUser?.updateProfile({
        displayName: user.username,
        // photoURL: user.photoUrl
      });
      this.firestore.collection('users').doc(user.email).set({
        username: user.username,
        phone: user.phone,
        email: user.email
      });
    }).catch(error => console.log("Error al guardar el usuario", error));
  }

  getUser(email: string){
    return this.firestore.collection('users').doc(email).get().pipe(
      map(user => user.data())
    );
  }
}
