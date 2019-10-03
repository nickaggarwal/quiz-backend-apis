import { Component, OnInit, ViewChild } from "@angular/core";
import { LanguageService } from "src/app/services/language.service";
import { Router } from "@angular/router";
import { Language } from "src/app/models/language.model";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
  MatSnackBar
} from "@angular/material";
import { ConfirmModalComponent } from "src/app/shared/components/confirm-modal/confirm-modal.component";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: "app-language",
  templateUrl: "./language.component.html",
  styleUrls: ["./language.component.css"]
})
export class LanguageComponent implements OnInit {
  language: Language[];
  displayedColumns: string[] = ["number", "name", "status", "key"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  isLoading = false;

  constructor(
    private languageService: LanguageService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.languageService.getAll().subscribe(data => {
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

  openDialog(key: string) {
    const dialogRef = this.dialog.open(ConfirmModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onRemove(key);
      }
    });
  }

  onRemove(key: string) {
    this.languageService.delete(key);
    this.snackBar.open(
      "Successfully deleted!",
      null,
      environment.snackBarConfig
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
