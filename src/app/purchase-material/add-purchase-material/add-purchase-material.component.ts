import { Component, OnInit } from '@angular/core';
import { AlertdialogComponent } from '../../alertdialog/alertdialog.component';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AllservicesService } from '../../allservices.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { DecodeTokenService } from '../../services/decode-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-purchase-material',
  templateUrl: './add-purchase-material.component.html',
  styleUrls: ['./add-purchase-material.component.css']
})
export class AddPurchaseMaterialComponent implements OnInit {
  dataset: any;
  addPurchaseMaterial: any;
  //addPurchaseMaterial: FormGroup | null = null;
  billReceivedDt: Date =new Date();
  dispatchDate: Date =new Date();
  dueDtForPayment: Date | null =new Date();
  paymentTerm: any;
  processedDays: number=1;
  error: string='';
  vendorNameStr: string = '';
  statusOnDate: number=0;
  todayDate: Date =new Date();
  emailId: string = '';
  users: Array<String>=[''];
  billDt: Date =new Date();
  noOfDays: number=0;
  paymentTermsArr = [
    {value: 'NA'},
    {value: '0'},
    {value: '7'},
    {value: '10'},
    {value: '15'},
    {value: '30'},
    {value: '40'},
    {value: '45'},
    {value: '60'},
    {value: '70'},
    {value: '75'},
    {value: '90'}
  ];
  statuses= [
    {value: 'Open'},
    {value: 'Closed'},
    {value: 'Revised'},
    {value: 'Rejected'}
  ];
  remarks= [
    {value: 'Credit Note'},
    {value: 'Debit Note'},
    {value: 'Description Mismatch'},
    {value: 'Duplicate Invoice'},
    {value: 'Freight Mismatch'},
    {value: 'GSTN Mismatch'},
    {value: 'Invoice Date Mismatch'},
    {value: 'Invoice not found in dump'},
    {value: 'Invoice Number Mismatch'},
    {value: 'MRA Receipt Attached'},
    {value: 'Other Remark'},
    {value: 'Price Mismatch'},
    {value: 'Quantity Mismatch'},
    {value: 'Supplemenary Bill'},
    {value: 'No'}
  ];
  categories= [
    {value: 'Additives'},
    {value: 'Packaging'},
    {value: 'Base Oil'},
    {value: 'Finished Goods'}
  ];
  poDateStatuses= [
    {value: 'Applicable'},
    {value: 'Not Applicable'}
  ];
  isPoDateApplicable: boolean;

  constructor(private fb: FormBuilder, private _data: AllservicesService, public dialog: MatDialog, private datePipe: DatePipe,
  private loaderService: NgxSpinnerService, private decodeService: DecodeTokenService, private router: Router) {
    this.createForm();
    this.dataset = [{
    }];
    const users = localStorage.getItem('purchaseMatUsers');
    if (users) {
      this.users = users.split(',');
      console.log(this.users);
    } else {
    this._data.getAllUsers('PurchaseMaterialBill').subscribe((data:any) => {
      if (data) {
        localStorage.setItem('purchaseMatUsers', data);
        this.users = data;
      }
    },
    (error : any) => {
      this.openDialog(error._body, true);
    });
    }
    this.isPoDateApplicable = false;
   }

  ngOnInit() {
    this.isPoDateApplicable = false;
  }

  createForm() {

    this.addPurchaseMaterial = this.fb.group({
      category: [''],
      billReceivedDate: [''],
      dateOfDispatch: [''],
      processedBy: [''],
      statusAsOnDate: [''],
      vendorCode: [''],
      vendorName: [''],
      vendorGSTN: [''],
      castrolGSTN: [''],
      billNumber: ['', Validators.pattern(/^\S*$/)],
      processDays: [''],
      receivedFrom: [''],
      billDate: [''],
      billAmount: [''],
      internalReferenceNumber: [''],
      status: ['Open'],
      paymentTerms: [''],
      dueDateForPayment: [''],
      deliveryLocation: [''],
      poNumber: [''],
      poDate: [''],
      ovNumber: [''],
      remarks: [''],
      remarkMailDate: [''],
      receiptDateOfScanning: [''],
      workidNumber: [''],
      reason: [''],
      vendorEmail: [''],
      gmApprovalDate: ['']
    });
  }
  onSubmit() {
    this.clearValidators(this.addPurchaseMaterial?.get('status')?.value);
    this.updateValidator();
    if(this.isPoDateApplicable) {
      this.addPurchaseMaterial?.get('poDate')?.clearValidators();
      this.addPurchaseMaterial?.get('poDate')?.updateValueAndValidity();
    }
    this.addPurchaseMaterial?.get('processDays')?.setValue(this.processedDays);
    this.addPurchaseMaterial?.get('vendorName')?.setValue(this.vendorNameStr);
    this.addPurchaseMaterial?.get('statusAsOnDate')?.setValue(this.statusOnDate);
    this.addPurchaseMaterial?.get('vendorEmail')?.setValue(this.emailId);
    if (this.addPurchaseMaterial?.valid) {
      this.loaderService.show();
      this._data.addPurchaseMaterial(this.addPurchaseMaterial?.value, this.dueDtForPayment).subscribe((data:any) => {
        if (data) {
          this.loaderService.hide();
          this.openDialog('Successfully Added', true);
          this.createForm();
          this.dueDtForPayment = null;
        }
      }, (error : any) => {
        this.loaderService.hide();
        if (error.status === 409) {
          this.openDialog('Purchase Material Details Already Exists!!', true);
          this.dueDtForPayment = null;
        }
      });
    }else {
      this.addPurchaseMaterial?.get('dueDateForPayment')?.setValue('');
      this.addPurchaseMaterial?.get('paymentTerms')?.setValue('');
      this.openDialog('Please fill the fields which are marked red!!', false);
    }
  }
  getVendorData(vendorCode: string) {
    this._data.getVendorData(vendorCode, 'NA').subscribe((res:any) => {
      if (res) {
        console.log(`Res${res}`);
        this.dataset = res;
        this.vendorNameStr = this.dataset[0].vendorName;
        this.addPurchaseMaterial?.get('vendorName')?.setValue(this.vendorNameStr);
        this.addPurchaseMaterial?.get('vendorName')?.updateValueAndValidity();
        this.emailId = this.dataset[0].emailId;
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
  getDueDate() {
    if ('NA' !== this.paymentTerm) {
      this.dueDtForPayment = new Date(this.billDt.getTime() +
      (this.paymentTerm * 1000 * 60 * 60 * 24));
      console.log(this.dueDtForPayment);
    }
  }
  getStatusDate(billReceiveDate: Date) {
    this.billReceivedDt = billReceiveDate;
    this.statusOnDate = Math.ceil((Date.now() - billReceiveDate.getTime()) / (1000 * 60 * 60 * 24));
    this.addPurchaseMaterial?.get('paymentTerms')?.setValue('');
    console.log(this.statusOnDate);
  }
  clearValidators(status: string) {
    if ('Closed' !== status) {
      if ('Rejected' === status) {
        this.addPurchaseMaterial?.get('remarks')?.setValidators(Validators.required);
        this.addPurchaseMaterial?.get('remarks')?.updateValueAndValidity();
        this.addPurchaseMaterial?.get('dateOfDispatch')?.setValidators(Validators.required);
        this.addPurchaseMaterial?.get('dateOfDispatch')?.updateValueAndValidity();
      }
      this.addPurchaseMaterial?.get('processedBy')?.setValidators(Validators.required);
      this.addPurchaseMaterial?.get('processedBy')?.updateValueAndValidity();
      this.addPurchaseMaterial?.get('billReceivedDate')?.setValidators(Validators.required);
      this.addPurchaseMaterial?.get('billReceivedDate')?.updateValueAndValidity();
      this.addPurchaseMaterial?.get('vendorCode')?.setValidators(Validators.required);
      this.addPurchaseMaterial?.get('vendorCode')?.updateValueAndValidity();
      this.addPurchaseMaterial?.get('vendorName')?.setValidators(Validators.required);
      this.addPurchaseMaterial?.get('vendorName')?.updateValueAndValidity();
      this.addPurchaseMaterial?.get('billNumber')?.setValidators(Validators.required);
      this.addPurchaseMaterial?.get('billNumber')?.updateValueAndValidity();
      this.addPurchaseMaterial?.get('receivedFrom')?.setValidators(Validators.required);
      this.addPurchaseMaterial?.get('receivedFrom')?.updateValueAndValidity();
      this.addPurchaseMaterial?.get('billDate')?.setValidators(Validators.required);
      this.addPurchaseMaterial?.get('billDate')?.updateValueAndValidity();
      this.addPurchaseMaterial?.get('billAmount')?.setValidators(Validators.required);
      this.addPurchaseMaterial?.get('billAmount')?.updateValueAndValidity();
    } else {
      this.addPurchaseMaterial && Object.keys(this.addPurchaseMaterial?.controls).forEach(key => {
      if ('dueDateForPayment' !== key && 'workidNumber' !== key && 'remarkMailDate' !== key) {
        this.addPurchaseMaterial?.get(key)?.setValidators(Validators.required);
        this.addPurchaseMaterial?.get(key)?.updateValueAndValidity();
        if('poDate' === key && !this.isPoDateApplicable) {
          this.addPurchaseMaterial?.get(key)?.setValidators(Validators.required);
          this.addPurchaseMaterial?.get(key)?.updateValueAndValidity();
        }
      }
    });
    }
  }
   setValidator(tempBillDt: Date) {
    if (tempBillDt && this.billReceivedDt) {
      this.noOfDays = (this.billReceivedDt.getTime() - tempBillDt.getTime()) / (1000 * 60 * 60 * 24);
      console.log(this.noOfDays);
      if (this.noOfDays > 180 && 'Closed' === this.addPurchaseMaterial?.get('status')?.value) {
        this.addPurchaseMaterial?.get('gmApprovalDate')?.setValidators(Validators.required);
      }else {
        this.addPurchaseMaterial?.get('gmApprovalDate')?.clearValidators();
      }
        this.addPurchaseMaterial?.get('gmApprovalDate')?.updateValueAndValidity();
  }
}
updateValidator () {
  if(this.billReceivedDt && this.billDt) {
    this.noOfDays = (this.billReceivedDt.getTime() - this.billDt.getTime()) / (1000 * 60 * 60 * 24);
  }
  if (this.noOfDays > 180 && 'Closed' === this.addPurchaseMaterial?.get('status')?.value) {
    this.addPurchaseMaterial?.get('gmApprovalDate')?.setValidators(Validators.required);
  }else {
    this.addPurchaseMaterial?.get('gmApprovalDate')?.clearValidators();
  }
    this.addPurchaseMaterial?.get('gmApprovalDate')?.updateValueAndValidity();
}
   // open dialog
openDialog(dataValue: string, flag: boolean): void {
  if(dataValue) {
    const dialogRef = this.dialog.open(AlertdialogComponent, {
      width: '380px',
      data: dataValue
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (flag) {
        this.router.navigate(['/add-purchase-material']);
      }
    });
  }
}
updatePoDateStatus(poDateApplicable: any) {
  this.isPoDateApplicable = false;
  if(poDateApplicable.value == 'Not Applicable') {
    this.isPoDateApplicable = true;
    this.addPurchaseMaterial?.get('poDate')?.clearValidators();
    this.addPurchaseMaterial?.get('poDate')?.updateValueAndValidity();
  }
}
}
