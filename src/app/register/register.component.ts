import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AllservicesService } from '../allservices.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  roles= [
    {value: 'Admin'},
    {value: 'Processor'}
  ];
  userTypes= [
    {value: 'CFABill'},
    {value: 'TransportBill'},
    {value: 'PurchaseServiceBill'},
    {value: 'PurchaseMaterialBill'}
  ];
  addUser: any;
  //addUser: FormGroup | null = null;
  constructor(private fb: FormBuilder, private _data: AllservicesService, public dialog: MatDialog,
    private loaderService: NgxSpinnerService) {
    this.createForm();
  }

  ngOnInit() {
  }
  createForm() {

    this.addUser = this.fb.group({
      firstName: [''],
      lastName: [''],
      userId: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
      emailId: ['', Validators.required],
      userType: ['']
    });
  }
  onSubmit() {
    if (this.addUser?.valid) {
      this.loaderService.show();
      this._data.addUser(this.addUser.value).subscribe((data:any) => {
        if (data) {
          this.loaderService.hide();
          this.openDialog('Successfully Added');
          this.createForm();
        }
      }, (error : any) => {
        this.loaderService.hide();
        if (error.status === 409) {
          this.openDialog('User with username Already Exists!!');
          this.createForm();
        }
      });
    }else {
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
