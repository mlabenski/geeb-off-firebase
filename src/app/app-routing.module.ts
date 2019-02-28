import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { RegisterComponent } from './register/register.component';
import { QueueComponent } from './queue/queue.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'queue', component: QueueComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [IsAuthenticatedGuard] }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
