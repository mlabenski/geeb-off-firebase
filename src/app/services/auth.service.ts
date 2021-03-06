import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authenticated: Observable<boolean>;
  userId: string;
  numOfGeebs: number;

  constructor(public fb: AngularFireAuth) {
    this.authenticated = new Observable<boolean>((obs) => {
      fb.auth.onAuthStateChanged((u) => {
        if (u) {
          this.userId = u.uid;
          this.numOfGeebs = 0;
          obs.next(true);
        } else {
          this.userId = '';
          obs.next(false);
        }
      });
    });
  }


  signInWithEmail(email: string, pass: string) {
    return this.fb.auth.signInWithEmailAndPassword(email, pass);
  }

  registerWithEmail(email: string, pass: string) {
    return this.fb.auth.createUserWithEmailAndPassword(email, pass);
  }

  signOut() {
    this.fb.auth.signOut();
  }

  isAuthenticated(): Observable<boolean> {
    return this.authenticated;
  }

  getUserId(): string {
    return this.userId;
  }
}