import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { CategoryService } from "src/app/services/category.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Category } from "src/app/models/category.model";
import { MatSnackBar } from "@angular/material";
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: "app-edit-category",
  templateUrl: "./edit-category.component.html",
  styleUrls: ["./edit-category.component.css"]
})
export class EditCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  key: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      if (data["key"]) {
        this.key = data["key"];
        this.categoryService.get(data["key"]).subscribe(data => {
          this.createForm(data);
        });
      }
    });
  }

  createForm(category: Category) {
    this.categoryForm = this.formBuilder.group({
      name: new FormControl(category.name, [Validators.required]),
      status: new FormControl(category.status, [Validators.required])
    });
  }

  onQuizFormSubmit(values): void {
    if (this.categoryForm.valid) {
      this.categoryService.update(values as Category, this.key);
      this.router.navigate(["category"]);
      this.snackBar.open(
        "Successfully updated!",
        null,
        environment.snackBarConfig
      );
    }
  }

  resetForm() {
    this.categoryForm.reset();
  }
}
