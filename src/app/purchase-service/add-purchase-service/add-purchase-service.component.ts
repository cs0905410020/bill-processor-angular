import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AllservicesService } from '../../allservices.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertdialogComponent } from '../../alertdialog/alertdialog.component';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { DecodeTokenService } from '../../services/decode-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-purchase-service',
  templateUrl: './add-purchase-service.component.html',
  styleUrls: ['./add-purchase-service.component.css']
})
export class AddPurchaseServiceComponent implements OnInit {
  dataset: any;
  addpurchase: any;
  //addpurchase: FormGroup | null = null;
  billReceivedDt: Date =new Date();
  dispatchDate: Date =new Date();
  dueDtForPayment: Date|null =new Date();
  paymentTerm: number = 1;
  processedDays: number =1;
  error: string='';
  vendorNameStr: string = '';
  statusOnDate: number=1;
  todayDate: Date =new Date();
  emailId: string = '';
  chargeDetailVal: string = '';
  users: Array<String>=[''];
  vendorCode: string = '';
  typeOfBills = [
    {value: 'Fixed'},
    {value: 'Variable'},
    {value: 'Transportation'},
  ];
  chargeDetails = [
    {value: 'Basic Operating Charges'},
    {value: 'HBL Number'},
    {value: 'Other Services'},
    {value: 'NA'}
  ];
  statuses= [
    {value: 'Open'},
    {value: 'Closed'},
    {value: 'Revised'},
    {value: 'Rejected'}
  ];
 remarks= [
  {value: 'Awaiting for contract'},
  {value: 'Detention Issue'},
  {value: 'Invoice under processing'},
  {value: 'PO OV pending from CIL'},
	{value: 'PO OV received'},
	{value: 'Sent to Scanning'},
  {value: 'Work ID received'},
  {value: 'No'}
  ];
  billDateVendors = ['17303985', '17305728', '17306505', '20026569', '20073681', '20073682', '20073683'];
  constructor(private fb: FormBuilder, private _data: AllservicesService, public dialog: MatDialog, private datePipe: DatePipe,
  private loaderService: NgxSpinnerService, private decodeService: DecodeTokenService, private router: Router) {
    this.createForm();
    this.dataset = [{
    }];
    const users = localStorage.getItem('purchaseSerUsers');
    if (users) {
      this.users = users.split(',');
      console.log(this.users);
    } else {
    this._data.getAllUsers('PurchaseServiceBill').subscribe((data:any) => {
      if (data) {
        localStorage.setItem('purchaseSerUsers', data);
        this.users = data;
      }
    },
    (error : any) => {
      this.openDialog(error._body, true);
    });
  }
  }

  ngOnInit() {
  }

  createForm() {

    this.addpurchase = this.fb.group({
      billReceivedDate: [''],
      dateOfDispatch: [''],
      processedBy: [''],
      statusAsOnDate: [''],
      vendorCode: [''],
      vendorName: [''],
      vendorBillingLocation: [''],
      vendorGSTN: [''],
      castrolGSTN: [''],
      letterNumber: [''],
      billNumber: ['', Validators.pattern(/^\S*$/)],
      processDays: [''],
      billDate: [''],
      billAmount: [''],
      internalReferenceNumber: [''],
      status: ['Open'],
      paymentTerms: [''],
      dueDateForPayment: [''],
      typeOfBills: [''],
      serviceLocation: [''],
      poNumber: [''],
      ovNumber: [''],
      batchNumber: [''],
      remarks: [''],
      jobNumber: [''],
      nature : [''],
      recordDate: [''],
      mailSentDate: [''],
      approvalRecordDate: [''],
      workidNumber: [''],
      reason: [''],
      vendorEmail: [''],
      cgst: [''],
      igst: [''],
      sgst: [''],
      chargeDetail : [''],
      mbl : [''],
      hbl : [''],
      blNumber : [''],
      blDate : ['']
    });
  }
  onSubmit() {
    this.clearValidators(this.addpurchase?.get('status')?.value);
    this.addpurchase?.get('processDays')?.setValue(this.processedDays);
    this.addpurchase?.get('vendorName')?.setValue(this.vendorNameStr);
    this.addpurchase?.get('statusAsOnDate')?.setValue(this.statusOnDate);
    this.addpurchase?.get('vendorEmail')?.setValue(this.emailId);
    console.log(this.addpurchase?.value);
    if (this.addpurchase?.valid) {
      this.loaderService.show();
      this._data.addPurchaseService(this.addpurchase.value, this.dueDtForPayment).subscribe((data:any) => {
        if (data) {
          this.loaderService.hide();
          this.openDialog('Successfully Added', true);
          this.createForm();
          this.dueDtForPayment = null;
        }
      }, (error : any) => {
        this.loaderService.hide();
        console.log(error,'error')
        if (error.status === 409) {
          this.openDialog(error._body, true);
          this.dueDtForPayment = null;
        }
      });
    }else {
      this.openDialog('Please fill the fields which are marked red!!', true);
    }
  }
  getVendorData(vendorCode: string) {
    this.vendorCode = vendorCode;
    this._data.getVendorData(vendorCode, this.chargeDetailVal).subscribe((res:any) => {
      if (res) {
        console.log(`Res${res}`);
        this.dataset = res;
        this.vendorNameStr = this.dataset[0].vendorName;
        this.emailId = this.dataset[0].emailId;
        this.paymentTerm = this.dataset[0].paymentTerms;
        this.addpurchase?.get('vendorName')?.setValue(res[0].vendorName);
        this.addpurchase?.get('vendorName')?.updateValueAndValidity();
        this.addpurchase?.get('paymentTerms')?.setValue(this.paymentTerm);
        this.addpurchase?.get('paymentTerms')?.updateValueAndValidity();
      }

      // tslint:disable-next-line:no-unused-expression
    }, (error : any) => {
      console.log(`Error ${error}`);
    });
  }
  getNumberOfDays(dispatchedDate: Date) {
    this.processedDays = (dispatchedDate.getTime() - this.billReceivedDt.getTime()) / (1000 * 60 * 60 * 24);
    console.log(this.processedDays);
  }
  getDueDate(billDate: Date) {
    if(this.billDateVendors.indexOf(this.vendorCode) > -1 && ('NA' == this.chargeDetailVal || 'Basic Operating Charges' == this.chargeDetailVal)) {
      this.dueDtForPayment = new Date(billDate.getTime() +
      (this.paymentTerm * 1000 * 60 * 60 * 24));
      console.log(this.dueDtForPayment);
    } else {
      this.dueDtForPayment = new Date(this.billReceivedDt.getTime() +
      (this.paymentTerm * 1000 * 60 * 60 * 24));
    }

    console.log(this.dueDtForPayment);
  }
  getStatusDate(billReceiveDate: Date) {
    this.billReceivedDt = billReceiveDate;
    this.statusOnDate = Math.ceil((Date.now() - billReceiveDate.getTime()) / (1000 * 60 * 60 * 24));
    this.addpurchase?.get('paymentTerms')?.setValue('');
    console.log(this.statusOnDate);
  }
  clearValidators(status: string) {
    if ('Closed' !== status) {
      if ('Rejected' === status) {
        this.addpurchase?.get('remarks')?.setValidators(Validators.required);
        this.addpurchase?.get('remarks')?.updateValueAndValidity();
        this.addpurchase?.get('dateOfDispatch')?.setValidators(Validators.required);
        this.addpurchase?.get('dateOfDispatch')?.updateValueAndValidity();
      }
      this.addpurchase?.get('processedBy')?.setValidators(Validators.required);
      this.addpurchase?.get('processedBy')?.updateValueAndValidity();
      this.addpurchase?.get('billReceivedDate')?.setValidators(Validators.required);
      this.addpurchase?.get('billReceivedDate')?.updateValueAndValidity();
      this.addpurchase?.get('vendorCode')?.setValidators(Validators.required);
      this.addpurchase?.get('vendorCode')?.updateValueAndValidity();
      this.addpurchase?.get('vendorName')?.setValidators(Validators.required);
      this.addpurchase?.get('billNumber')?.setValidators(Validators.required);
      this.addpurchase?.get('billNumber')?.updateValueAndValidity();
      this.addpurchase?.get('billDate')?.setValidators(Validators.required);
      this.addpurchase?.get('billDate')?.updateValueAndValidity();
      this.addpurchase?.get('billAmount')?.setValidators(Validators.required);
      this.addpurchase?.get('billAmount')?.updateValueAndValidity();
      this.addpurchase?.get('letterNumber')?.setValidators(Validators.required);
      this.addpurchase?.get('letterNumber')?.updateValueAndValidity();
      this.addpurchase?.get('igst')?.setValidators(Validators.required);
      this.addpurchase?.get('igst')?.updateValueAndValidity();
      this.addpurchase?.get('cgst')?.setValidators(Validators.required);
      this.addpurchase?.get('cgst')?.updateValueAndValidity();
      this.addpurchase?.get('sgst')?.setValidators(Validators.required);
      this.addpurchase?.get('sgst')?.updateValueAndValidity();
    } else {
      this.addpurchase?.controls && Object.keys(this.addpurchase.controls).forEach(key => {
      if ('dueDateForPayment' !== key && 'workidNumber' !== key) {
        this.addpurchase?.get(key)?.setValidators(Validators.required);
        this.addpurchase?.get(key)?.updateValueAndValidity();
      }
    });
    }
  }
   // open dialog
openDialog(dataValue: string, flag: boolean): void {
  const dialogRef = this.dialog.open(AlertdialogComponent, {
    width: '380px',
    data: dataValue
  });

  dialogRef.afterClosed().subscribe((result:any) => {
    if (flag) {
      this.router.navigate(['/add-purchase-service']);
    }
  });
}
validateInput(field: any, numberOfDigits: number) {
 let inputValue = field.target.value;
 if(inputValue.indexOf("/") >-1) {
   let splittedValue = inputValue.split("/");
    splittedValue.forEach((value :any) => {
      if(numberOfDigits !=value.length) {
        this.addpurchase?.get(field.target.id)?.setErrors({"notValid": true});
      } else {
        this.addpurchase?.get(field.target.id)?.setErrors(null);
      }
      });
 } else {
   if(inputValue.length != numberOfDigits) {
     this.addpurchase?.get(field.target.id)?.setErrors({"notValid": true});
   } else {
    this.addpurchase?.get(field.target.id)?.setErrors(null);
   }
 }
}

}
