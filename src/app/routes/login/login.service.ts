import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import * as RX from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  public userIsLoggedIn = false;

  public userLoginStatus = new Subject<boolean>();

  public logIn = (username: string, password: string): Observable<boolean> => {
    let success = false;
    if (username === 'Admin' && password === 'HMP!') {
      success = true;
    }
    this.userIsLoggedIn = success;
    // Return result with a delay to simulate a network delay
    return RX.of(this.userIsLoggedIn).pipe(
      delay(500), tap(() => {
        this.userLoginStatus.next(this.userIsLoggedIn);
      })
    );
  }

  public logOut = (): Observable<boolean> => {
    this.userIsLoggedIn = false;
    // Return result with a delay to simulate a network delay
    return RX.of(this.userIsLoggedIn).pipe(
      delay(500), tap(() => {
        this.userLoginStatus.next(this.userIsLoggedIn);
      })
    );
  }

}
