import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private authenticated: Observable<boolean>;
  private userId: string;

  constructor(private fb: AngularFireAuth) {
    this.authenticated = new Observable<boolean>((obs) => {
      fb.auth.onAuthStateChanged((u) => {
        if (u) {
          this.userId = u.uid;
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