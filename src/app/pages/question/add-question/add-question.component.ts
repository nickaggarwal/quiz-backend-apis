import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray
} from "@angular/forms";
import { QuestionService } from "src/app/services/question.service";
import { Question } from "src/app/models/question.model";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment.prod";
import { mapToOneDimensional } from "src/app/shared/utils/app.mapper";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-add-question",
  templateUrl: "./add-question.component.html",
  styleUrls: ["./add-question.component.css"]
})
export class AddQuestionComponent implements OnInit {
  questionForm: FormGroup;
  quizKey: string;
  defaultAnswerCount: number = environment.defaultAnswerCount;
  answerRight: boolean = false;
  submittedForm: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      if (data["quizKey"]) {
        this.quizKey = data["quizKey"];
        this.createForm();
        this.setDefaultAnswerCount();
      }
    });
  }

  createForm() {
    this.questionForm = this.formBuilder.group({
      question: new FormControl("", [Validators.required]),
      status: new FormControl("true"),
      answerRight: new FormControl("", [Validators.required]),
      answers: this.formBuilder.array([this.getAnswer()])
    });
  }

  setDefaultAnswerCount() {
    for (let i = 1; i < this.defaultAnswerCount; i++) {
      this.addAnswer();
    }
  }

  onQuestionFormSubmit(values): void {
    this.submittedForm = true;
    if (this.questionForm.valid) {
      var question = values as Question;
      question.insertDate = new Date().toISOString();
      question.answers = mapToOneDimensional(question.answers);
      this.questionService.add(this.quizKey, question);
      this.router.navigateByUrl(`question/${this.quizKey}`);
      this.snackBar.open(
        "Successfully added!",
        null,
        environment.snackBarConfig
      );
      //this.resetForm();
    }
  }

  resetForm() {
    this.questionForm.reset();
  }

  getAnswer() {
    return this.formBuilder.group({
      answer: new FormControl("", [Validators.required])
    });
  }

  addAnswer() {
    const control = <FormArray>this.questionForm.controls["answers"];
    control.push(this.getAnswer());
  }

  removeAnswer(i: number) {
    const control = <FormArray>this.questionForm.controls["answers"];
    control.removeAt(i);
  }

  selectAnswerRight(i: number, _event: any) {
    this.resetColors();

    document.getElementById("btn_" + i).style.backgroundColor = "green";
    this.questionForm.controls["answerRight"].setValue(<FormArray>(
      this.questionForm.controls["answers"].value[i]["answer"]
    ));
  }

  resetColors() {
    for (let i = 0; i < this.defaultAnswerCount; i++) {
      const element = document.getElementById("btn_" + i);
      element.style.backgroundColor = "#3f51b5";
    }
  }
}
