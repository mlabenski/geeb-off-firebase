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
  private email: string;
  private password: string;
  private verifyPassword: string;

  constructor(private auth: AuthService, private db: AngularFireDatabase, private router: Router) { }

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