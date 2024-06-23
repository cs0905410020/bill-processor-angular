import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileDownloadService } from '../services/file-download.service';
import { FileUploadService } from '../services/file-upload.service';
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ocr-demo',
  templateUrl: './ocr-demo.component.html',
  styleUrls: ['./ocr-demo.component.css']
})
export class OcrDemoComponent implements OnInit {

  selectedFile: File |null = null;
  billDetails: any;
  constructor(private loaderService: NgxSpinnerService, private fileUploadService: FileUploadService,
    public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
  }
  upload(fileInput : any) {
    if (fileInput.files && fileInput.files[0] && this.selectedFile !== null) {
      this.loaderService.show();
      this.selectedFile = fileInput.files[0];
      this.fileUploadService.uploadOcrDocument(this.selectedFile as File).subscribe((res :any) => {
        this.loaderService.hide();
        console.log(res);
        this.billDetails = res;
      },
      (error : any) => {
        this.loaderService.hide();
        console.log(error);
        this.openDialog('Please try again');
      });
    }
  }
    openDialog(dataValue: string): void {
      const dialogRef = this.dialog.open(AlertdialogComponent, {
        width: '380px',
        data: dataValue
      });
      dialogRef.afterClosed().subscribe((result :any)=> {
      });
    }
    viewOcrData(tempBillDetails:any) {
      this.router.navigate(['/viewOcrData'], { queryParams: tempBillDetails });
    }
}
