import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { QuizService } from "src/app/services/quiz.service";
import { Quiz } from "src/app/models/quiz.model";
import { CategoryService } from "src/app/services/category.service";
import { Category } from "src/app/models/category.model";
import { Router } from "@angular/router";
import { Language } from "src/app/models/language.model";
import { LanguageService } from "src/app/services/language.service";
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: "app-add-quiz",
  templateUrl: "./add-quiz.component.html",
  styleUrls: ["./add-quiz.component.css"]
})
export class AddQuizComponent implements OnInit {
  quizForm: FormGroup;
  categories: Category[];
  languages: Language[];

  constructor(
    private formBuilder: FormBuilder,
    private quizService: QuizService,
    private categoryService: CategoryService,
    private languageService: LanguageService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createForm();
    this.getCategories();
    this.getLanguages();
  }

  createForm() {
    this.quizForm = this.formBuilder.group({
      title: new FormControl("", [Validators.required]),
      category: new FormControl("", [Validators.required]),
      description: [""],
      duration: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]+$")
      ]),
      language: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required])
    });
  }

  getCategories() {
    this.categoryService.getActives().subscribe(data => {
      this.categories = data;
    });
  }

  getLanguages() {
    this.languageService.getActives().subscribe(data => {
      this.languages = data;
    });
  }

  onQuizFormSubmit(values): void {
    if (this.quizForm.valid) {
      var quiz = values as Quiz;
      quiz.insertDate = new Date().toISOString();
      quiz.examCount = 0;
      this.quizService.add(quiz);
      this.router.navigate(["quiz"]);
      this.snackBar.open(
        "Successfully added!",
        null,
        environment.snackBarConfig
      );
    }
  }

  resetForm() {
    this.quizForm.reset();
  }
}
