import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(public auth: AuthService, public router: Router) { }

  ngOnInit() {
  }

  signInWithEmail() {
    this.auth.signInWithEmail(this.email, this.password)
      .then(u => this.router.navigate(["dashboard"]))
      .catch(err => console.log(err));
  }

  register() {
    this.router.navigate(["register"])
  }

}