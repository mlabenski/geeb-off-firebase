import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public email: string;
  public password: string;
  public verifyPassword: string;

  constructor(public auth: AuthService, public db: AngularFireDatabase, public router: Router) { }

  ngOnInit() {
  }

  registerWithEmail() {
    if (this.password !== this.verifyPassword) {
      alert("Passwords do not match.");
    } else {
      this.auth.registerWithEmail(this.email, this.password)
        .then(u => {
          this.router.navigate(["dashboard"]);
        })
        .catch(e => console.log(e));
    }
  }

}