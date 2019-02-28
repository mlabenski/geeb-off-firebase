import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GameService } from '../services/game.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {

  private board$: Observable<string[]>;
  public board: string[] = ["", "", "", "", "", "", "", "", ""];

  constructor(private games: GameService, private change: ChangeDetectorRef) { }

  ngOnInit() {
    this.board$ = this.games.getBoard();
    this.board$.subscribe(d => {
      this.board = d;
      this.change.detectChanges();
    });
  }

  play(pos: number) {
    this.games.play(pos);
  }
}