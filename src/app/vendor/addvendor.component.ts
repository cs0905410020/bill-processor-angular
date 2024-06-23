import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AllservicesService } from '../allservices.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class AddVendorComponent implements OnInit {
  vendorTypes = [
    {value: 'FCM'},
    {value: 'RCM'},
    {value: 'NA'}
  ];
  paymentTermsArr = [
    {value: '0'},
    {value: '7'},
    {value: '10'},
    {value: '15'},
    {value: '30'},
    {value: '40'},
    {value: '45'},
    {value: '60'},
    {value: '75'},
    {value: '90'}
  ];
  addVendor: any;
  //addVendor: FormGroup | null = null;
  error: string='';
  constructor(private fb: FormBuilder, private _data: AllservicesService, public dialog: MatDialog,
    private loaderService: NgxSpinnerService) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {

    this.addVendor = this.fb.group({
      vendorCode: ['', Validators.required ],
      vendorName: ['', Validators.required ],
      address: ['', Validators.required ],
      vendorType: ['', Validators.required ],
      emailId: ['', Validators.required ],
      gstNumber: ['', Validators.required ],
      location: ['', Validators.required ],
      castrolGSTN: ['', Validators.required ],
      paymentTerms: ['',Validators.required]
    });
  }
  onSubmit() {
    console.log(JSON.stringify(this.addVendor?.value));
    if (this.addVendor?.valid) {
      this.loaderService.show();
      this._data.addvendor(this.addVendor.value).subscribe((data:any) => {
      if (data) {
        this.loaderService.hide();
        this.openDialog('Successfully Added');
        this.createForm();
      }

      // tslint:disable-next-line:no-unused-expression
    }, (error : any) => {
      if (error.status === 409) {
        this.loaderService.hide();
        this.openDialog('Vendor Already Exists!!');
        this.createForm();
      }
    });
  }
}

  // open dialog
openDialog(dataValue: string): void {
  const dialogRef = this.dialog.open(AlertdialogComponent, {
    width: '380px',
    data: dataValue
  });

  dialogRef.afterClosed().subscribe((res :any)=> {
  });
}

}
