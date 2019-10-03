import { Component, OnInit } from "@angular/core";
import { LanguageService } from "src/app/services/language.service";
import { Language } from "src/app/models/language.model";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "src/environments/environment.prod";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-edit-language",
  templateUrl: "./edit-language.component.html",
  styleUrls: ["./edit-language.component.css"]
})
export class EditLanguageComponent implements OnInit {
  languageForm: FormGroup;
  key: string;

  constructor(
    private formBuilder: FormBuilder,
    private languageService: LanguageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      if (data["key"]) {
        this.key = data["key"];
        this.languageService.get(data["key"]).subscribe(data => {
          this.createForm(data);
        });
      }
    });
  }

  createForm(language: Language) {
    this.languageForm = this.formBuilder.group({
      name: new FormControl(language.name, [Validators.required]),
      status: new FormControl(language.status, [Validators.required])
    });
  }

  onLanguageFormSubmit(values): void {
    if (this.languageForm.valid) {
      this.languageService.update(values as Language, this.key);
      this.router.navigate(["language"]);
      this.snackBar.open(
        "Successfully updated!",
        null,
        environment.snackBarConfig
      );
    }
  }
}
