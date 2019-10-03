import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { CategoryService } from "src/app/services/category.service";
import { Router } from "@angular/router";
import { Category } from "src/app/models/category.model";
import { environment } from "src/environments/environment.prod";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-add-category",
  templateUrl: "./add-category.component.html",
  styleUrls: ["./add-category.component.css"]
})
export class AddCategoryComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.categoryForm = this.formBuilder.group({
      name: new FormControl("", [Validators.required]),
      status: new FormControl("", [Validators.required])
    });
  }

  onQuizFormSubmit(values): void {
    if (this.categoryForm.valid) {
      this.categoryService.add(values as Category);
      this.router.navigate(["category"]);
      this.snackBar.open(
        "Successfully added!",
        null,
        environment.snackBarConfig
      );
    }
  }

  resetForm() {
    this.categoryForm.reset();
  }
}
