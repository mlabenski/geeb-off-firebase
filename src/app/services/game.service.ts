import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(public auth: AuthService, public db: AngularFireDatabase) { }


  generateNewID(){
      let gameId = "21";
      return gameId +1;
  }
  //Checks to see if user is currently in a game: Will create a new game if they are not. 
  // Later may be changed to include deleting a current game. we can also delete a user. 
  newGame(): void {
    let random = Math.floor(Math.random() * (9999-10000)) + 10000;
    const uid = this.auth.getUserId()
    let gameId = "";
    let require: any;


    //Need to figure out how to get random ID's

    this.db.database.ref(`users/${uid}/game`).once('value').then(s => {
      if (!s.exists()) {
        gameId = uuid();

        // writing to database
        this.db.object(`games/${gameId}`).update({
          0: "", 1: "", 2: "",
          3: "", 4: "", 5: "",
          6: "", 7: "", 8: ""
        });

        this.db.object(`users/${uid}`).update({
          game: gameId
        });
      }
    });
  }

  //Get the current game ID that a user is.
  getGame(): Promise<string> {
    const uid = this.auth.getUserId();
    return new Promise<string>((res, rej) => {
      this.db.database.ref(`users/${uid}/game`).once('value').then(s => {
        if (s.exists()) {
          res(s.val());
        } else {
          rej("Game Not Found");
        }
      });
    });
  }

  joinGame(id: string) {
    const uid = this.auth.getUserId();
    this.db.object(`users/${uid}`).update({
      game: id
    });
   
    this.db.object(`games/${id}/turn`).set(uid);
  }
}