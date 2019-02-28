import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class GameService {
    private turn$: Observable<string>;
    private timeRemaining: number;
    private gameId$: Observable<string>;
    private gameId: string = "";
    private numOfRounds: 5;
    private winner$: Observable<string>;
    private EMPTY_BOARD = ["", "", "", "", "", "", "", "", ""]; 
    private board$: Observable<string[]>;
    private board: string[] = this.EMPTY_BOARD;
    private piece: string = "";

  constructor(public auth: AuthService, public db: AngularFireDatabase) { 
    this.gameId$ = new Observable(o => {
        this.db.database.ref(`users/${this.auth.getUserId()}/game`).on('value', s => {
          if (s.exists()) {
            o.next(s.val());
            this.gameId = s.val();
          } else {
            o.next("none");
            this.gameId = "none";
          }
        }, e => {
          o.next("none");
          this.gameId = "none";
        });
      });

      this.board$ = new Observable(o => {
        this.gameId$.subscribe(id => {
          this.db.database.ref(`games/${id}/board`).on('value', s => {
            if (s.exists()) {
              o.next(s.val());
              this.board = s.val();
            } else {
              o.next(this.EMPTY_BOARD);
              this.board = this.EMPTY_BOARD;
            }
          }, e => {
            o.next(this.EMPTY_BOARD);
            this.board = this.EMPTY_BOARD;
          });
        });
      });
          // get piece
        this.gameId$.subscribe(id => {
        this.db.database.ref(`games/${id}/${this.auth.getUserId()}`).on('value', s => {
          this.piece = s.val();
        }, e => {
          this.piece = "";
        });
      });


      this.turn$ = new Observable(o => {
        this.gameId$.subscribe(id => {
          this.db.database.ref(`games/${id}/turn`).on('value', s => {
            if (s.exists()) {
              o.next(s.val());
            } else {
              o.next("none");
            }
          }, e => {
            o.next("none");
          });
        });
      });
  }

  //Checks to see if user is currently in a game: Will create a new game if they are not. 
  // Later may be changed to include deleting a current game. we can also delete a user. 
  newGame(): void {
    console.log("new game");
    const uid = this.auth.getUserId()
    let id = "";
    let require: any;

    //Need to figure out how to get random ID's

    this.db.database.ref(`users/${uid}/game`).once('value').then(s => {
      if (!s.exists()) {
        id = uuid();

        // writing to database
        this.db.object(`games/${id}/board`).update({
            0: "", 1: "", 2: "",
            3: "", 4: "", 5: "",
            6: "", 7: "", 8: ""
          });

          this.db.object(`users/${uid}`).update({
            game: id
          });
          // the creator of the game should be "player 1's"
        this.db.object(`games/${id}/${uid}`).set("Player 1");
        this.db.object(`games/${id}/user1`).set(uid);
      }
    });
  }
  deleteGame(): void {
    const uid = this.auth.getUserId()
      console.log(this.gameId);
    this.db.object(`games/${this.gameId}`).remove();
    this.db.object(`users/${uid}/game`).remove();
  }


  //Get the current game ID that a user is.
  getGame(): Observable<string> {
    return this.gameId$;
  }
  getTurn(): Observable<string> {
    return this.turn$;
  }
  getWinner(): Observable<string> {
    return this.winner$;
  }
  getBoard(): Observable<string[]> {
    return this.board$;
  }
  play(pos: number): void {
    this.db.object(`games/${this.gameId}/board/${pos}`)
      .set(this.piece)
      .catch(e => alert("Invalid Move!"));
  }

  joinGame(id: string) {
      console.log("joining game");
    const uid = this.auth.getUserId();
    this.db.database.ref(`games/${id}`).once('value').then(v => {
        if (!v.exists()) {
          alert("Sorry, a game with ID " + id + " does not exist.");
        } else {
          this.db.object(`users/${uid}`).update({
            game: id
          });
   
          this.db.object(`games/${id}/${uid}`).set("Player 2");
          this.db.object(`games/${id}/user2`).set(uid);
  }
    });
}
}
