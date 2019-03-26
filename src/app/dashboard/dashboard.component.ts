import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { Observable } from 'rxjs';
import { VideoStreamComponent } from './video-stream/video-stream.component';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public gameId$: Observable<string>;
  public gameId: string;
  public turn$: Observable<string>;
  public gameInfo: string = "";
  public timePerGeeb: number;
  public  game;
  public decrease: number;
  public showSettings= false;
  public time: number[] = [45,60,90];
  public timeDecrease: number[] = [5,10,20];
  public games$: Observable<string>;
  public chosenTime;
  public chosenDecrease;
  submitted = false;

  constructor(public games: GameService, public router: Router, public auth: AuthService, public change: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.gameId$ = this.games.getGame();
    this.gameId$.subscribe(o => {
      this.gameId = o;
      this.change.detectChanges();
    });

    this.turn$ = this.games.getTurn();
    this.turn$.subscribe(o => {
      if (this.inGame()) {
        this.gameInfo = (o === this.auth.getUserId() ? "Your Turn" : "Their Turn");
      } else {
        this.gameInfo = "You are not in a game";
      }
      this.change.detectChanges();
    });
  }


  newGame(chosenTime, chosenDecrease): void {
    console.log(chosenTime);

    this.games.newGame(chosenTime, chosenDecrease);
  }
  endGame(): void {
    this.games.deleteGame();
  }




  joinGame(id: string) {
    if (id === "") {
      alert("Enter a valid game ID");
    } else {
      this.games.joinGame(id);
    }
  }
  changeSettings(timePerGeeb, decrease) {
    this.games.changeSettings(timePerGeeb, decrease);
  }

  inGame(): boolean {
    return this.gameId !== "none";
  }
  
  public should_open = false;

  openChildComponent(){
    this.should_open = true;
  }
  itemSelected(item){
    console.log(item);
  }

}