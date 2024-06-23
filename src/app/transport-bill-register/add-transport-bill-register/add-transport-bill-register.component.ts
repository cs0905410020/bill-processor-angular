import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AllservicesService } from '../../allservices.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertdialogComponent } from '../../alertdialog/alertdialog.component';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { DecodeTokenService } from '../../services/decode-token.service';
import { Router } from '@angular/router';
import { TripModalComponent } from '../../trip-modal/trip-modal.component';

@Component({
  selector: 'app-add-transport-bill-register',
  templateUrl: './add-transport-bill-register.component.html',
  styleUrls: ['./add-transport-bill-register.component.css']
})
export class AddTransportBillRegisterComponent implements OnInit {
  dataset: any;
  //addTransportBill: FormGroup | null = null;
  addTransportBill: any;
  billReceivedDt: Date |null =new Date();
  dispatchDate: Date |null =new Date();
  processedDays: number | null =null;
  dueDtForPayment: Date |null=new Date();
  onlineReceivingDt: Date | null=new Date();
  error: string='';
  paymentTerm: number =1;
  vendorNameStr: string = '';
  statusOnDate: number =1;
  todayDate: Date =new Date();
  billMonthDate: Date =new Date();
  emailId: string = '';
  users: Array<String>=[''];
  noOfDays: number =1;
  typeOfBills = [
    {value: 'FRIEGHT'},
    {value: 'DIESEL BILL'},
    {value: 'FIXED COST'},
    {value: 'MINIMUM BILL'},
    {value: 'UNLOADING BILL'},
    {value: 'DIFFERNCE BILL'},
    {value: 'RETURN LOAD'},
    {value: 'INCENTIVE BILL'},
    {value: 'SUPPLYMENTRY BILL'}
  ];
  billCategories = [
    {value: 'FTL'},
    {value: 'Parcel'}
  ];
  billTypes = [
    {value: 'Offline'},
    {value: 'Online'}
  ];
  statuses= [
    {value: 'Open'},
    {value: 'Closed'},
    {value: 'Revised'},
    {value: 'Rejected'}
  ];
  billsClosed= [
    {value: 'Contract'},
    {value: 'Approval'}
  ];
  cilServiceCategories= [
    {value: 'Primary'},
    {value: 'Secondary'},
    {value: 'Inward'}
  ];
  regions= [
    {value: 'South'},
    {value: 'West'},
    {value: 'East'},
    {value: 'North'}
  ];
  categories= [
    {value: '06_Outward_Freight'},
    {value: '05_Inward_Freight'}
  ];
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  years: any[];
  billMonthString: string |null= null;
  billYear: string |null= null;
  selectedBillType: string = '';
  constructor(private fb: FormBuilder, private _data: AllservicesService, public dialog: MatDialog, private datePipe: DatePipe,
  private loaderService: NgxSpinnerService, private decodeService: DecodeTokenService, private router: Router) {
    this.selectedBillType = 'Online';
    this.createForm();
    this.dataset = [{
    }];
    const users = localStorage.getItem('transportBillUsers');
    if (users) {
      this.users = users.split(',');
      console.log(this.users);
    } else {
    this._data.getAllUsers('TransportBill').subscribe((data:any) => {
      if (data) {
        localStorage.setItem('transportBillUsers', data);
        this.users = data;
      }
    },
    (error : any) => {
      this.openDialog(error._body, false);
    });
    }
    const currentYear = new Date().getFullYear();
    let currentYearMinusTen = currentYear - 10;
    this.years = new Array<any>();
    this.years.push(currentYear);
    for (let i = 0; i < 20; i++) {
        if (currentYear === currentYearMinusTen) {
          continue;
        }
        this.years.push(currentYearMinusTen++);
    }
  }

  ngOnInit() {
  }

  createForm() {

    this.addTransportBill = this.fb.group({
      statusAsOnDate: [''],
      processBy: [''],
      cilServiceCategory: [''],
      region: [''],
      onlineBillReceivedDate: [''],
      billReceivedDate: [''],
      dateOfDispatch: [''],
      transporterCode: [''],
      nameOfTheContractor: [''],
      billNumber: ['', Validators.pattern(/^\S*$/)],
      processDays: [''],
      receivedFrom: [''],
      billMonth: [''],
      remark: [''],
      billDate: [''],
      billAmount: [''],
      docTrackNumber: [''],
      status: ['Open' ],
      typeOfBill: [''],
      billClosed: [''],
      paymentTerms: [''],
      dueDateForPayment: ['' ],
      vendorGstNumber: [''],
      castrolGstNumber: [''],
      gmApprovalDate: [''],
      taxAreaCode: [''],
      vendorEmail: [''],
      billCategory: [''],
      category: [''],
      billType: ['']
    });
  }
  getNumberOfDays(dispatchedDate: Date) {
    this.processedDays = this.billReceivedDt && (dispatchedDate.getTime() - this.billReceivedDt.getTime()) / (1000 * 60 * 60 * 24);
    console.log(this.processedDays);
  }
  getDueDate(onlineReceivingDt: Date) {
    this.onlineReceivingDt = onlineReceivingDt;
    if(this.paymentTerm && this.onlineReceivingDt) {
     this.addTransportBill?.get('paymentTerms')?.setValue(this.paymentTerm);
     this.addTransportBill?.get('dueDateForPayment')?.setValue(new Date(this.onlineReceivingDt.getTime() +
        (this.paymentTerm * 1000 * 60 * 60 * 24)));
        this.dueDtForPayment =this.addTransportBill?.get('dueDateForPayment')?.value;
    }
  }
  getStatusDate(billReceiveDate: Date) {
    this.billReceivedDt = billReceiveDate;
    this.statusOnDate = Math.ceil((Date.now() - billReceiveDate.getTime()) / (1000 * 60 * 60 * 24));
    console.log(this.statusOnDate);
  }
  setValidator() {
    if (this.billYear) {
      let billMonthStr = `${this.billMonthString}-${this.billYear}`;
     this.addTransportBill?.get('billMonth')?.setValue(billMonthStr);
     this.addTransportBill?.get('billMonth')?.updateValueAndValidity();
      if (billMonthStr && this.billReceivedDt) {
      let billMonthStrVal = this.datePipe.transform(new Date(billMonthStr), 'MM/dd/yyyy');
      this.billMonthDate = billMonthStrVal ? new Date(billMonthStrVal) : new Date();
        this.noOfDays = (this.billReceivedDt.getTime() - this.billMonthDate.getTime()) / (1000 * 60 * 60 * 24);
      console.log(this.noOfDays);
      if (this.noOfDays > 180 && 'Closed' ===this.addTransportBill?.get('status')?.value) {
       this.addTransportBill?.get('gmApprovalDate')?.setValidators(Validators.required);
      }else {
       this.addTransportBill?.get('gmApprovalDate')?.clearValidators();
      }
       this.addTransportBill?.get('gmApprovalDate')?.updateValueAndValidity();
      }
    }
  }
  clearValidators(status: string) {
    if ('Closed' !== status) {
      if ('Rejected' === status) {
       this.addTransportBill?.get('remark')?.setValidators(Validators.required);
       this.addTransportBill?.get('remark')?.updateValueAndValidity();
       this.addTransportBill?.get('docTrackNumber')?.setValidators(Validators.required);
       this.addTransportBill?.get('docTrackNumber')?.updateValueAndValidity();
       this.addTransportBill?.get('dateOfDispatch')?.setValidators(Validators.required);
       this.addTransportBill?.get('dateOfDispatch')?.updateValueAndValidity();
      }
     this.addTransportBill?.get('processBy')?.setValidators(Validators.required);
     this.addTransportBill?.get('processBy')?.updateValueAndValidity();
     this.addTransportBill?.get('billReceivedDate')?.setValidators(Validators.required);
     this.addTransportBill?.get('billReceivedDate')?.updateValueAndValidity();
     this.addTransportBill?.get('transporterCode')?.setValidators(Validators.required);
     this.addTransportBill?.get('transporterCode')?.updateValueAndValidity();
     this.addTransportBill?.get('nameOfTheContractor')?.setValidators(Validators.required);
     this.addTransportBill?.get('nameOfTheContractor')?.updateValueAndValidity();
     this.addTransportBill?.get('billNumber')?.setValidators(Validators.required);
     this.addTransportBill?.get('billNumber')?.updateValueAndValidity();
     this.addTransportBill?.get('receivedFrom')?.setValidators(Validators.required);
     this.addTransportBill?.get('receivedFrom')?.updateValueAndValidity();
     this.addTransportBill?.get('billMonth')?.setValidators(Validators.required);
     this.addTransportBill?.get('billMonth')?.updateValueAndValidity();
     this.addTransportBill?.get('billDate')?.setValidators(Validators.required);
     this.addTransportBill?.get('billDate')?.updateValueAndValidity();
     this.addTransportBill?.get('billCategory')?.setValidators(Validators.required);
     this.addTransportBill?.get('billCategory')?.updateValueAndValidity();
    } else {
        this.addTransportBill && Object.keys(this.addTransportBill.controls).forEach(key => {
      if ('gmApprovalDate' !== key) {
       this.addTransportBill?.get(key)?.setValidators(Validators.required);
       this.addTransportBill?.get(key)?.updateValueAndValidity();
      }
    });
    }
  }
  onSubmit() {
    this.clearValidators(this.addTransportBill?.get('status')?.value);
    this.updateValidator();
   this.addTransportBill?.get('processDays')?.setValue(this.processedDays);
   this.addTransportBill?.get('nameOfTheContractor')?.setValue(this.vendorNameStr);
   this.addTransportBill?.get('statusAsOnDate')?.setValue(this.statusOnDate);
   this.addTransportBill?.get('vendorEmail')?.setValue(this.emailId);
   this.addTransportBill?.get('paymentTerms')?.setValue(this.paymentTerm);
    if (this.addTransportBill?.valid) {
      this.loaderService.show();
      this._data.addTransportBill(this.addTransportBill.value, this.dueDtForPayment).subscribe((data:any) => {
        if (data) {
          this.loaderService.hide();
          this.openDialog('Successfully Added', true);
          this.createForm();
          this.dueDtForPayment = null;
          this.billMonthString = null;
          this.billYear = null;
        }
      }, (error : any) => {
        this.loaderService.hide();
        if (error.status === 409) {
          this.openDialog('Transport Bill Register Details Already Exists!!', true);
          this.dueDtForPayment = null;
          this.billMonthString = null;
          this.billYear = null;
        }
      });
    }else {
      this.openDialog('Please fill the fields which are marked red!!', false);
    }
  }
     // open dialog
openDialog(dataValue: string, flag: boolean): void {
  const dialogRef = this.dialog.open(AlertdialogComponent, {
    width: '380px',
    data: dataValue
  });

  dialogRef.afterClosed().subscribe((result :any) => {
    if (flag) {
      this.router.navigate(['/add-transport-bill']);
    }
  });
}
updateValidator () {
  let billMonthStr =this.addTransportBill?.get('billMonth')?.value;
  if (billMonthStr && this.billReceivedDt) {
    billMonthStr = this.datePipe.transform(new Date(billMonthStr), 'MM/dd/yyyy');
    this.billMonthDate = new Date(billMonthStr);
    this.noOfDays = (this.billReceivedDt.getTime() - this.billMonthDate.getTime()) / (1000 * 60 * 60 * 24);
  }
  if (this.noOfDays > 180 && 'Closed' ===this.addTransportBill?.get('status')?.value) {
   this.addTransportBill?.get('gmApprovalDate')?.setValidators(Validators.required);
  }else {
   this.addTransportBill?.get('gmApprovalDate')?.clearValidators();
  }
   this.addTransportBill?.get('gmApprovalDate')?.updateValueAndValidity();
}
getVendorData(vendorCode: string) {
  this._data.getVendorData(vendorCode, 'NA').subscribe((res :any)=> {
    if (res) {
      console.log(`Res${res}`);
      this.dataset = res;
      this.vendorNameStr = this.dataset[0].vendorName;
      this.emailId = this.dataset[0].emailId;
      this.paymentTerm = this.dataset[0].paymentTerms;
     this.addTransportBill?.get('nameOfTheContractor')?.setValue(this.vendorNameStr);
     this.addTransportBill?.get('nameOfTheContractor')?.updateValueAndValidity();
     this.addTransportBill?.get('paymentTerms')?.setValue(this.paymentTerm);
     this.addTransportBill?.get('paymentTerms')?.updateValueAndValidity();
    }
    // tslint:disable-next-line:no-unused-expression
  }, (error : any) => {
    console.log(`Error ${error}`);
  });
}
openTripDialog() {
  const dialogRef = this.dialog.open(TripModalComponent, {
    width: '90vw',
    maxWidth: '100vw'
  });

  dialogRef.afterClosed().subscribe((result :any) => {
    if(result) {
      console.log('The dialog was closed'+JSON.stringify(result.value));
    }
  });
}
}
