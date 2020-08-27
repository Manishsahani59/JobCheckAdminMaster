import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-conf-dialog',
  templateUrl: './conf-dialog.component.html',
  styleUrls: ['./conf-dialog.component.scss']
})
export class ConfDialogComponent implements OnInit {
  Title:string;
  Message:string;
  constructor(public dialogRef: MatDialogRef<ConfDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogModel) {  this.Title = data.title;
      this.Message = data.message;}

  ngOnInit(): void {
  }
  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}
export class ConfirmDialogModel {

  constructor(public title: string, public message: string) {
  }
}

