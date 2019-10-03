import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account.mode';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  account: Account = {
    email: "",
  };
  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.account = {
      email: JSON.parse(this.accountService.getUser()).email
    };
  }

  resetPassword() {
    this.accountService.resetPassword();
  }
}
