import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase";
import { AuthService } from "./auth.service";
import { MatSnackBar } from "@angular/material";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class AccountService {
  constructor(
    public afAuth: AngularFireAuth,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  getUser() {
    return localStorage.getItem("currentUser");
  }

  resetPassword() {
    const user = firebase.auth();
    user
      .sendPasswordResetEmail(JSON.parse(this.getUser())["email"])
      .then(result => {
        this.snackBar.open(
          "Successfully updated!",
          null,
          environment.snackBarConfig
        );
      });
  }

  update(displayName: string) {
    const user = firebase.auth().currentUser;
    user
      .updateProfile({ displayName: displayName })
      .then(result => {
        this.snackBar.open("Successfully updated!");
        this.authService.logOut();
      })
      .catch(error => {
        this.snackBar.open(error.message);
      });
  }
}
