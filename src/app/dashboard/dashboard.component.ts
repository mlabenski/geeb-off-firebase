import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private gameId$: Observable<string>;
  private gameId: string;
  private turn$: Observable<string>;
  public gameInfo: string = "";

  constructor(private games: GameService, public router: Router, private auth: AuthService, private change: ChangeDetectorRef) { }


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

  newGame(): void {
    this.games.newGame();
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

  inGame(): boolean {
    return this.gameId !== "none";
  }
}