import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';
import { Router } from '@angular/router';
import { Language } from 'src/app/models/language.model';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-add-language',
  templateUrl: './add-language.component.html',
  styleUrls: ['./add-language.component.css']
})
export class AddLanguageComponent implements OnInit {
  languageForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private languageService: LanguageService,
    private router: Router,
    private snackBar:MatSnackBar
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.languageForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required])
    });
  }

  onLanguageFormSubmit(values): void {
    if (this.languageForm.valid) {
      this.languageService.add(values as Language);
      this.router.navigate(["language"]);
      this.snackBar.open(
        "Successfully added!",
        null,
        environment.snackBarConfig
      );
    }
  }
}
