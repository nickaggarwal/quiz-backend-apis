import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AngularFireDatabase } from "@angular/fire/database";
import * as firebase from "firebase";
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackBar:MatSnackBar
  ) {
    var user = localStorage.getItem("currentUser");
    if (user) {
      this.loggedIn.next(true);
    }
  }

  logIn(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        localStorage.setItem("currentUser", JSON.stringify(result.user));
        this.loggedIn.next(true);
        this.router.navigate(["/dashboard"]);
        this.snackBar.open(
          "Successfully entered!",
          null,
          environment.snackBarConfig
        );
      })
      .catch(error => {
        alert(error.message);
      });
  }

  public get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  register(email: string, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        this.router.navigate(["auth/login"]);
        this.snackBar.open(
          "Successfully registered!",
          null,
          environment.snackBarConfig
        );
      })
      .catch(err => {});
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  async logOut() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem("currentUser");
    this.loggedIn.next(false);
    this.router.navigate(["/auth/login"]);
  }
}
