import { Component, OnInit } from "@angular/core";
import { ContactService } from "src/app/services/contact.service";
import { ActivatedRoute } from "@angular/router";
import { Contact } from "src/app/models/contact.model";

@Component({
  selector: "app-contact-detail",
  templateUrl: "./contact-detail.component.html",
  styleUrls: ["./contact-detail.component.css"]
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;

  constructor(
    private contactService: ContactService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      if (data["key"]) {
        this.getContactDetails(data["key"]);
      }
    });
  }

  getContactDetails(key: string) {
    this.contactService.get(key).subscribe(data => {
      this.contact = data;
    });
  }
}
