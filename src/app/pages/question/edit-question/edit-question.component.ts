import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray
} from "@angular/forms";
import { QuestionService } from "src/app/services/question.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Question } from "src/app/models/question.model";
import { Answer } from "src/app/models/answer.model";

@Component({
  selector: "app-edit-question",
  templateUrl: "./edit-question.component.html",
  styleUrls: ["./edit-question.component.css"]
})
export class EditQuestionComponent implements OnInit {
  questionForm: FormGroup;
  quizKey: string;
  key: string;
  correctAnswer: string;

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      if (data["quizKey"] && data["key"]) {
        this.quizKey = data["quizKey"];
        this.key = data["key"];
        this.getQuestionDetail(data["quizKey"], data["key"]);
      }
    });
  }

  getQuestionDetail(quizKey, key) {
    this.questionService.get(quizKey, key).subscribe(data => {
      data.forEach(element => {
        if (element.key == key) {
          this.createForm(element as Question);
          this.correctAnswer = element.answerRight;
        }
      });
    });
  }

  createForm(question: Question) {
    this.questionForm = this.formBuilder.group({
      question: new FormControl(question.question, [Validators.required]),
      answerRight: new FormControl(question.answerRight, [Validators.required]),
      status: new FormControl(question.status),
      answers: this.formBuilder.array(question.answers)
    });
  }

  onQuestionFormSubmit(values): void {
    if (this.questionForm.valid) {
      var question = values as Question;
      this.questionService.update(question, this.quizKey, this.key);
      this.router.navigateByUrl(`question/${this.quizKey}`);
      //this.resetForm();
    }
  }

  resetForm() {
    this.questionForm.reset();
  }

  getAnswerInit(answers: Answer[]) {
    let arr = [];
    for (let i = 0; i < answers.length; i++) {
      arr.push(answers[i]);
    }
    return arr;
  }
}
