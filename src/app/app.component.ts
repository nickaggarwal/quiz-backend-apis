import { Component } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { MediaObserver, MediaChange } from "@angular/flex-layout";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  isLoggedIn$: Observable<boolean>;
  opened = true;
  over = "side";
  expandHeight = "42px";
  collapseHeight = "42px";
  displayMode = "flat";
  watcher: Subscription;

  constructor(media: MediaObserver, private authService: AuthService) {
    this.watcher = media.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === "sm" || change.mqAlias === "xs") {
        this.opened = false;
        this.over = "over";
      } else {
        this.opened = true;
        this.over = "side";
      }
    });
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  getSideNav() {
    if (this.opened) this.opened = false;
    else this.opened = true;
  }
}
