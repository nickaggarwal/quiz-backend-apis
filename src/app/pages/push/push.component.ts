import { Component, OnInit, ViewChild } from "@angular/core";
import { PushService } from "src/app/services/push.service";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog,
  MatSnackBar
} from "@angular/material";
import { AddPushComponent } from "./add-push/add-push.component";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: "app-push",
  templateUrl: "./push.component.html",
  styleUrls: ["./push.component.css"]
})
export class PushComponent implements OnInit {
  displayedColumns: string[] = ["headings.en", "contents.en", "successful"];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  isLoading = false;

  constructor(
    private pushService: PushService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications() {
    this.pushService.getNotifications().subscribe(data => {
      this.dataSource = new MatTableDataSource(data["notifications"]);
      setTimeout(() => {
        this.dataSource.filterPredicate = (
          data: { en: string },
          filterValue: string
        ) =>
          data["headings"].en
            .trim()
            .toLowerCase()
            .indexOf(filterValue) !== -1;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 100);
      this.isLoading = true;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  newNotification() {
    const dialogRef = this.dialog.open(AddPushComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pushService.newNotifications(result["header"], result["content"]);
        this.getNotifications();
        this.snackBar.open(
          "Successfully published!",
          null,
          environment.snackBarConfig
        );
      }
    });
  }
}
