import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { mapToModel } from "../shared/utils/app.mapper";
import { Answer } from "../models/answer.model";

@Injectable({
  providedIn: "root"
})
export class AnswerService {
  constructor(private db: AngularFireDatabase) {}

  add(key: string, answer: Answer) {
    this.db.list(`quizes/${key}/answer`).push(answer);
  }

  get(key: string) {
    return this.db.object<Answer>(`quizes/${key}/answers`).valueChanges(); //?
  }

  getAll() {
    return mapToModel(
      this.db.list<Answer>("quizes/${key}/answers").snapshotChanges()
    );
  }

  update(answer: Answer, key: string) {
    this.db.object(`quizes/${key}/answers`).update(answer);
  }

  delete(key: string) {
    this.db.object(`quizes/${key}/answers`).remove();
  }
}
