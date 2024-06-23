import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AllservicesService } from '../allservices.service';
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-edit-vendor',
  templateUrl: './edit.component.html',
  styleUrls: ['./viewvendor.component.css']
})


// tslint:disable-next-line:component-class-suffix
export class EditVendorComponent {
  dataset: any;
  error: string ='';
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
  //editVendor: FormGroup;
  editVendor: any;
  data: any;
  constructor(private _data: AllservicesService, public dialog: MatDialog, private fb: FormBuilder, private route: ActivatedRoute,
  private loaderService: NgxSpinnerService) {
    this.route.queryParamMap.subscribe(params => {
      this.data = {...params.keys, ...params};
    });
      this.createForm();
      this.getview(this.data.params);
  }
  createForm() {
    this.editVendor = this.fb.group({
      vendorCode: ['', Validators.required ],
      vendorName: ['', Validators.required ],
      address: ['', Validators.required ],
      vendorType: ['', Validators.required ],
      emailId: ['', Validators.required ],
      gstNumber: ['', Validators.required ],
      location: ['', Validators.required ],
      castrolGSTN: ['', Validators.required ],
      paymentTerms: ['', Validators.required]
    });
  }
  getview( vendor:any) {
    this.dataset = vendor;
    this.editVendor = this.fb.group({
      vendorId: [this.dataset.vendorId, Validators.required],
      vendorCode: [ this.dataset.vendorCode, Validators.required ],
      vendorName: [ this.dataset.vendorName, Validators.required ],
      address: [ this.dataset.address, Validators.required ],
      vendorType: [ this.dataset.vendorType, Validators.required ],
      emailId: [ this.dataset.emailId, Validators.required ],
      gstNumber: [ this.dataset.gstNumber, Validators.required ],
      location: [ this.dataset.location, Validators.required ],
      castrolGSTN: [ this.dataset.castrolGSTN, Validators.required ],
      paymentTerms: [this.dataset.paymentTerms, Validators.required]
    });
    let paymentTermStr = this.dataset.paymentTerms;
    if ('' !== paymentTermStr) {
      this.paymentTermsArr.splice(this.paymentTermsArr.findIndex(paymentTerm => paymentTerm.value === paymentTermStr), 1);
      this.paymentTermsArr.unshift({value: paymentTermStr});
    }
}
  submit() {
    this.loaderService.show();
    console.log(this.editVendor?.value);
    this._data.editvendordetails(this.dataset.vendorId, this.editVendor?.value).subscribe((res:any) => {
      if (res) {
        this.loaderService.hide();
        this.openDialog('Successfully Updated.');
        this.createForm();
      }

      // tslint:disable-next-line:no-unused-expression
    }),(error :any) => {
      this.createForm();
      this.openDialog('Unable to Save Data. Please try again!!');
    };
  }

  openDialog(dataValue: string): void {
    const dialogRef = this.dialog.open(AlertdialogComponent, {
      width: '380px',
      data: dataValue
    });
    dialogRef.afterClosed().subscribe((res :any) => {
    });
  }

}
