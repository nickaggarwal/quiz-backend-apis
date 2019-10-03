import { Component, OnInit, ViewChild } from "@angular/core";
import { PushService } from "src/app/services/push.service";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";

@Component({
  selector: "app-devices",
  templateUrl: "./devices.component.html",
  styleUrls: ["./devices.component.css"]
})
export class DevicesComponent implements OnInit {
  displayedColumns: string[] = [
    "device_model",
    "game_version",
    "ip",
    "language",
    "created_at"
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  isLoading = false;

  constructor(private pushService: PushService) {}

  ngOnInit() {
    this.getDevices();
  }

  getDevices() {
    this.pushService.getDevices().subscribe(data => {
      this.dataSource = new MatTableDataSource(data["players"]);
      setTimeout(() => {
        this.dataSource.filterPredicate = (
          data: { device_model: string },
          filterValue: string
        ) =>
          data.device_model
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
}
