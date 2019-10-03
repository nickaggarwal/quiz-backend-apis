import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-sidemenu",
  templateUrl: "./sidemenu.component.html",
  styleUrls: ["./sidemenu.component.css"]
})
export class SidemenuComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {}

  appitems = [
    {
      label: "Dashboard",
      link: "/dashboard",
      icon: "dashboard"
    },
    {
      label: "Quizzes",
      link: "/quiz",
      icon: "file_copy"
    },
    {
      label: "Categories",
      link: "/category",
      icon: "list_alt"
    },
    {
      label: "Users",
      link: "/user",
      icon: "people"
    },
    {
      label: "Exams History",
      link: "/exam",
      icon: "history"
    },
    {
      label: "Push Notification",
      link: "/push",
      icon: "notifications"
    },
    {
      label: "Contacts",
      link: "/contact",
      icon: "email"
    },
    {
      label: "Customize",
      icon: "apps",
      items: [
        {
          label: "About Us",
          link: "/about",
          icon: "information"
        },
        {
          label: "Languages",
          link: "/language",
          icon: "language"
        }
      ]
    },
    {
      label: "Account",
      link: "/account",
      icon: "account_circle"
    },
    {
      label: "404 Page",
      link: "/not-found",
      icon: "error"
    },
    {
      label: "Logout",
      link: "/logout",
      icon: "logout"
    }
  ];

  config = {
    paddingAtStart: true,
    classname: "my-custom-class",
    fontColor: "#fff",
    selectedListFontColor: "#ffffff"
  };

  selectedItem(event) {
    if (event.link == "/logout") {
      this.authService.logOut();
      return;
    }

    this.router.navigate([event.link]);
  }
}
