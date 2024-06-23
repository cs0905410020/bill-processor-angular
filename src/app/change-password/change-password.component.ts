import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AllservicesService } from '../allservices.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  hide = true;
  editUser: any;
  //editUser: FormGroup | null = null;
  constructor(private fb: FormBuilder, private _data: AllservicesService, public dialog: MatDialog) {
    this.createForm();
  }

  ngOnInit() {
  }
  createForm() {

    this.editUser = this.fb.group({
      firstName: [''],
      lastName: [''],
      userId: ['', Validators.required],
      password: ['', Validators.required],
      role: ['']
    });
  }
  onSubmit() {
    if (this.editUser?.valid) {
      this._data.editUser(this.editUser.value).subscribe((data:any) => {
        if (data) {
          this.openDialog('Successfully Updated');
          this.createForm();
        }
      }, (error : any) => {
        if (error.status === 404) {
          this.openDialog('User with username does not exist!!');
          this.createForm();
        }
      });
    }else {
      // this.addCfaBill.get('dueDateForPayment').setValue('');
      // this.addCfaBill.get('paymentTerms').setValue('');
      this.openDialog('Please fill the fields which are marked red!!');
    }
  }
     // open dialog
  openDialog(dataValue: string): void {
  const dialogRef = this.dialog.open(AlertdialogComponent, {
    width: '380px',
    data: dataValue
  });
  }

}
