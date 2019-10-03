import { Component, OnInit } from "@angular/core";
import { HelperService } from "src/app/services/helper.service";
import { About } from "src/app/models/about.model";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"]
})
export class AboutComponent implements OnInit {
  aboutForm: FormGroup;
  key: string;

  constructor(
    private formBuilder: FormBuilder,
    private helperService: HelperService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.key = undefined;
    this.getAbout();
  }

  getAbout() {
    this.helperService.getAbout().subscribe(data => {
      if (data[0]) {
        this.createForm(data[0]);
        this.key = data[0].key;
      } else this.createForm({ title: "", content: "" });
    });
  }

  createForm(about: About) {
    this.aboutForm = this.formBuilder.group({
      title: new FormControl(about.title, [Validators.required]),
      content: new FormControl(about.content, [Validators.required])
    });
  }

  onAboutFormSubmit(values): void {
    if (this.aboutForm.valid) {
      if (this.key == undefined) {
        this.helperService.addAbout(values);
        this.getAbout();
      } else {
        this.helperService.updateAbout(values, this.key);
      }
      this.snackBar.open(
        "Successfully updated!",
        null,
        environment.snackBarConfig
      );
    }
  }
}
