import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fireAuth: AngularFireAuth
  ) {
  }

  register(user: User){
    return this.fireAuth.createUserWithEmailAndPassword(user.email, user.password);
  }

  login(email: string, password: string){
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  logout(){
    return this.fireAuth.signOut();
  }

  authState(){
    return this.fireAuth.authState
  }
}
