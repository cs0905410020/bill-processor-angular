import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewvendorComponent } from '../viewvendor/viewvendor.component';
import { AllservicesService } from '../allservices.service';
import { DecodeTokenService } from '../services/decode-token.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';
// tslint:disable-next-line:max-line-length
import { ViewTransportBillRegisterComponent } from '../transport-bill-register/view-transport-bill-register/view-transport-bill-register.component';
import { ViewPurchaseServiceComponent } from '../purchase-service/view-purchase-service/view-purchase-service.component';
import { ViewCfaBillRegisterComponent } from '../cfa-bill-register/view-cfa-bill-register/view-cfa-bill-register.component';
import { ViewPurchaseMaterialComponent } from '../purchase-material/view-purchase-material/view-purchase-material.component';
import { Router } from '@angular/router';
import { FileDownloadService } from '../services/file-download.service';
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  error: string='';
  isAdmin: boolean = false;
  userId: string = '';

  // tslint:disable-next-line:max-line-length
  constructor(public dialog: MatDialog, private _data: AllservicesService, private decodeTokenService: DecodeTokenService,
    private loaderService: NgxSpinnerService, private router: Router, private fileDownloadService: FileDownloadService,
    private datePipe: DatePipe) { }

  openDialog(dataValue : any): void {
  const dialogRef = this.dialog.open(AlertdialogComponent, {
    width: '380px',
    data: dataValue
  });

  dialogRef.afterClosed().subscribe((result:any) => {
    this.router.navigate(['/home']);
  });
}

  ngOnInit() {
    this.isAdmin = false;
    this.decodeTokenService.decodeToken();
    const role = this.decodeTokenService.getRole();
    if (role === 'Admin') {
    this.isAdmin = true;
    }

    this.userId = this.decodeTokenService.getUserId();
    console.log(this.isAdmin);

  }
  sendEmail(statusStr:any, billType:any) {
	  this.loaderService.show();
	  this._data.getEmailData(statusStr, billType).subscribe((data:any) => {
      this.loaderService.hide();
		  this.openDialog('Email Sent');
		}, (error : any) => {
		this.loaderService.hide();
		this.openDialog('Email not sent ' + error);
    });
  }
  downloadEmailData() {
    this.loaderService.show();
    this.fileDownloadService.getEmailExcelFile().subscribe((res:any) => {
      console.log(res);
      FileSaver.saveAs(res, 'EmailDetails');
      this.loaderService.hide();
    }, (err : any) => {
      this.loaderService.hide();
      this.openDialog('Unable to download excel file. Please try again!!');
    });
  }

}


