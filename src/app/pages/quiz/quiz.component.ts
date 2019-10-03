import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog
} from "@angular/material";
import { Router } from "@angular/router";
import { QuizService } from "src/app/services/quiz.service";
import { ConfirmModalComponent } from "src/app/shared/components/confirm-modal/confirm-modal.component";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.css"]
})
export class QuizComponent implements OnInit {
  displayedColumns: string[] = [
    "number",
    "title",
    "category",
    "insertDate",
    "key"
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  isLoading = false;

  constructor(
    private quizService: QuizService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getQuizes();
  }

  getQuizes() {
    this.quizService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      setTimeout(() => {
        this.dataSource.filterPredicate = (
          data: { title: string },
          filterValue: string
        ) =>
          data.title
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
    this.quizService.delete(key);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
