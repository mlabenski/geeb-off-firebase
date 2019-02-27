import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private isAuthenticated$: Observable<boolean>;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.isAuthenticated$ = this.auth.isAuthenticated();
  }

  signOut(): void {
    this.auth.signOut();
    this.router.navigate(["login"]);
  }

  onFileSelected(event) {
    console.log(event);
  }

  

}