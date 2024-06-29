import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AllservicesService } from '../allservices.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DecodeTokenService } from '../services/decode-token.service';
import { FileDownloadService } from '../services/file-download.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

   hide = true;
  loginForm: any; // <--- heroForm is of type FormGroup
  //loginForm: FormGroup | null = null; // <--- heroForm is of type FormGroup
  error: any;

  constructor(private fb: FormBuilder, private _data: AllservicesService, private router: Router, public dialog: MatDialog,
    private loaderService: NgxSpinnerService, private decodeService: DecodeTokenService, private fileDownloadService: FileDownloadService) {
      this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ]
    });
  }

onSubmit() {
  if (this.loginForm?.valid) {
    this.loaderService.show();
    localStorage.clear();
    this._data.login(this.loginForm?.value).subscribe((data:any) => {
    if (data.token) {
      this.loaderService.hide();
      this.router.navigate(['/home']);
      localStorage.setItem('token', data.token);
      this.decodeService.decodeToken();
      let emailIdValue = this.decodeService?.getEmailId();
      localStorage.setItem('emailId',emailIdValue ? emailIdValue : '' );
    }
  // tslint:disable-next-line:no-unused-expression
  }, (error : any) => {
      console.log(error,'err');
    if (error.status === 401) {
    this.loaderService.hide();
      this.error = 'Username or password is incorrect.';
      this.openDialog();
    }
  });
  }
}

// open dialog
openDialog(): void {
  const dialogRef = this.dialog.open(AlertdialogComponent, {
    width: '380px',
    data: this.error
  });

  dialogRef.afterClosed().subscribe((result :any) => {
    this.router.navigate(['/']);
  });
}
}
