import { Component, OnInit, ViewChild, Output, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Notification } from "src/app/models/notification.model";

@Component({
  selector: "app-add-push",
  templateUrl: "./add-push.component.html",
  styleUrls: ["./add-push.component.css"]
})
export class AddPushComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddPushComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Notification
  ) {}

  ngOnInit() {
    this.data = {
      header: "",
      content: ""
    };
  }

  publish(): void {
    if (this.data.header && this.data.content) {
      this.dialogRef.close(this.data);
    }
  }
}
