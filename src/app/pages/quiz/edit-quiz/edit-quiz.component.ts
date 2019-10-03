import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { QuizService } from "src/app/services/quiz.service";
import { Quiz } from "src/app/models/quiz.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Category } from "src/app/models/category.model";
import { CategoryService } from "src/app/services/category.service";
import { LanguageService } from "src/app/services/language.service";
import { Language } from "src/app/models/language.model";
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: "app-edit-quiz",
  templateUrl: "./edit-quiz.component.html",
  styleUrls: ["./edit-quiz.component.css"]
})
export class EditQuizComponent implements OnInit {
  quizForm: FormGroup;
  categories: Category[];
  languages: Language[];
  key: string;

  constructor(
    private formBuilder: FormBuilder,
    private quizService: QuizService,
    private categoryService: CategoryService,
    private languageService: LanguageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      if (data["key"]) {
        this.getQuiz(data["key"]);
        this.key = data["key"];
      }
    });
  }

  getQuiz(key) {
    this.quizService.get(key).subscribe(data => {
      this.getCategories();
      this.getLanguages();
      this.createForm(data);
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

  createForm(quiz: Quiz) {
    this.quizForm = this.formBuilder.group({
      title: new FormControl(quiz.title, [Validators.required]),
      category: new FormControl(quiz.category, [Validators.required]),
      description: new FormControl(quiz.description),
      duration: new FormControl(quiz.duration, [
        Validators.required,
        Validators.pattern("^[0-9]+$")
      ]),
      language: new FormControl(quiz.language, [Validators.required]),
      status: new FormControl(quiz.status, [Validators.required]),
      insertDate: new FormControl({
        value: new Date(quiz.insertDate).toDateString(),
        disabled: true
      }),
      examCount: new FormControl({ value: quiz.examCount, disabled: true })
    });
  }

  onQuizFormSubmit(values): void {
    if (this.quizForm.valid) {
      this.quizService.update(values as Quiz, this.key);
      this.router.navigate(["quiz"]);
      this.snackBar.open(
        "Successfully updated!",
        null,
        environment.snackBarConfig
      );
    }
  }
}
