import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alertdialog',
  templateUrl: './alertdialog.component.html',
  styleUrls: ['./alertdialog.component.css']
})
export class AlertdialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AlertdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.data = data;
    }

  ngOnInit() {
  }
  onNoClick(): void {
    this.dialogRef.close();

  }

}
