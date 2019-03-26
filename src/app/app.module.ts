import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularAgoraRtcModule, AgoraConfig } from 'angular-agora-rtc'; // Add

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GameComponent } from './game/game.component';
import { QueueComponent } from './queue/queue.component';
import { GameBoardComponent } from './game-board/game-board.component';

import { VideoStreamComponent } from './dashboard/video-stream/video-stream.component';


const agoraConfig: AgoraConfig = {
  AppID: '54085b6ecc974979a7202cfc3656ed79',
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    NavbarComponent,
    GameComponent,
    QueueComponent,
    GameBoardComponent,
    VideoStreamComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularAgoraRtcModule.forRoot(agoraConfig)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
