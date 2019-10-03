import { Injectable } from "@angular/core";
import { Contact } from "../models/contact.model";
import { mapToModel } from "../shared/utils/app.mapper";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: "root"
})
export class ContactService {
  constructor(private db: AngularFireDatabase) {}

  add(contact: Contact) {
    this.db.list(`users/`).push(contact);
  }

  get(key: string) {
    return this.db.object<Contact>(`contacts/${key}`).valueChanges();
  }

  getAll() {
    return mapToModel(this.db.list<Contact>("/contacts").snapshotChanges());
  }

  update(contact: Contact, key: string) {
    this.db.object(`contacts/${key}`).update(contact);
  }

  delete(key: string) {
    this.db.object(`contacts/${key}`).remove();
  }
}
