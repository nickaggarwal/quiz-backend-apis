import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = [
    "number",
    "email",
    "userName",
    "firstName",
    "lastName"
  ];
  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  isLoading = false;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      setTimeout(() => {
        this.dataSource.filterPredicate = (
          data: { userName: string },
          filterValue: string
        ) =>
          data.userName
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
