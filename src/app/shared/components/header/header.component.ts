import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { AppComponent } from "src/app/app.component";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  @Output("sideNav") sideNav: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authService: AuthService,
    public RightSidenavComponent: AppComponent
  ) {}

  ngOnInit() {}

  onLogout() {
    this.authService.logOut();
  }

  toggleSidenav() {
    this.sideNav.emit();
  }
}
