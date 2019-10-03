import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
  MatSnackBar
} from "@angular/material";
import { ExamService } from "src/app/services/exam.service";
import { Router } from "@angular/router";
import { ConfirmModalComponent } from "src/app/shared/components/confirm-modal/confirm-modal.component";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: "app-exam",
  templateUrl: "./exam.component.html",
  styleUrls: ["./exam.component.css"]
})
export class ExamComponent implements OnInit {
  displayedColumns: string[] = ["number", "quiz.title", "insertDate", "key"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  isLoading = false;

  constructor(
    private examService: ExamService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getExams();
  }

  getExams() {
    this.examService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data.reverse());

      setTimeout(() => {
        this.dataSource.filterPredicate = (
          data: { quiz: string },
          filterValue: string
        ) =>
          data.quiz["title"]
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
    this.examService.delete(key);
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
