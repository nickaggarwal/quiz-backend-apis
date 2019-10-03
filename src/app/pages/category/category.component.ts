import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatDialog,
  MatSort
} from "@angular/material";
import { Router } from "@angular/router";
import { CategoryService } from "src/app/services/category.service";
import { Category } from "src/app/models/category.model";
import { ConfirmModalComponent } from "src/app/shared/components/confirm-modal/confirm-modal.component";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit {
  category: Category[];
  displayedColumns: string[] = ["number", "name", "status", "key"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  isLoading = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      setTimeout(() => {
        this.dataSource.filterPredicate = (
          data: { name: string },
          filterValue: string
        ) =>
          data.name
            .trim()
            .toLowerCase()
            .indexOf(filterValue) !== -1;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 100);

      this.isLoading = true;
    });
  }

  openDialog(key) {
    const dialogRef = this.dialog.open(ConfirmModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onRemove(key);
      }
    });
  }

  onRemove(key: string) {
    this.categoryService.delete(key);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
