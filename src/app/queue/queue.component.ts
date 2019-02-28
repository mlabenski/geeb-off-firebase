import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  constructor(public games: GameService, public auth: AuthService, public db: AngularFireDatabase, public router: Router) { }
  public gameId: string = "";
  secondsPerRound = 0;
  ngOnInit() {
  }
  
}
