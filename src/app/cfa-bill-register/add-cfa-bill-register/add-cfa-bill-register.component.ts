import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AllservicesService } from '../../allservices.service';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AlertdialogComponent } from '../../alertdialog/alertdialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DecodeTokenService } from '../../services/decode-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-cfa-bill-register',
  templateUrl: './add-cfa-bill-register.component.html',
  styleUrls: ['./add-cfa-bill-register.component.css']
})
export class AddCfaBillRegisterComponent implements OnInit {
  dataset: any;
  addCfaBill: any;
  //addCfaBill: FormGroup | null = null;
  billReceivedDt: Date =new Date();
  dispatchDate: Date =new Date();
  processedDays: number=1;
  dueDtForPayment: Date |null=new Date();
  error: string='';
  paymentTerm: number =1;
  vendorNameStr: string = '';
  statusOnDate: number=1;
  todayDate: Date =new Date();
  billMonthDate: Date =new Date();
  emailId: string = '';
  noOfDays: number=1;
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
  typeOfBills = [
    {value: 'FRIEGHT'},
    {value: 'FIXED BILL'},
    {value: 'VARIABLE BILL'},
    {value: 'REIMBURSMENT Bill'},
    {value: 'MARINE BILL'},
    {value: 'FIXED / VARIABLE BILL'},
    {value: 'LOAD SECURE'}
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
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  years: any[];
  billMonthString: string |null = null;
  billYear: string | null= null;
  users: Array<String>=[];
  constructor(private fb: FormBuilder, private _data: AllservicesService, public dialog: MatDialog, private datePipe: DatePipe,
    private loaderService: NgxSpinnerService, private decodeService: DecodeTokenService, private router: Router) {
    this.createForm();
    this.dataset = [{
    }];
    const users = localStorage.getItem('cfaUsers');
    if (users) {
      this.users = users.split(',');
      console.log(this.users);
    } else {
    this._data.getAllUsers('CFABill').subscribe((data:any) => {
      if (data) {
        localStorage.setItem('cfaUsers', data);
        this.users = data;
      }
    },
    (error : any) => {
      this.openDialog(error._body, true);
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

    this.addCfaBill = this.fb.group({
      statusAsOnDate: [''],
      processBy: [''],
      region: [''],
      billReceivedDate: [''],
      dateOfDispatch: [''],
      transporterCode: [''],
      nameOfTheContractor: [''],
      billNumber: ['', Validators.pattern(/^\S*$/)],
      processDays: [''],
      receivedFrom: ['' ],
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
      vendorGstNumber: ['' ],
      castrolGstNumber: [''],
      gmApprovalDate: [''],
      taxAreaCode: [''],
      ovNumber: [''],
      vendorEmail: ['']
    });
  }
  getNumberOfDays(dispatchedDate: Date) {
    this.processedDays = (dispatchedDate.getTime() - this.billReceivedDt.getTime()) / (1000 * 60 * 60 * 24);
    console.log(this.processedDays);
  }
  getDueDate() {
    this.dueDtForPayment = new Date(this.billReceivedDt.getTime() +
    (this.paymentTerm * 1000 * 60 * 60 * 24));
    console.log(this.dueDtForPayment);
  }
  getStatusDate(billReceiveDate: Date) {
    this.billReceivedDt = billReceiveDate;
    this.statusOnDate = Math.ceil((Date.now() - billReceiveDate.getTime()) / (1000 * 60 * 60 * 24));
    this.addCfaBill?.get('paymentTerms')?.setValue('');
    console.log(this.statusOnDate);
  }
  setValidator() {
    if (this.billYear) {
      let billMonthStr = `${this.billMonthString}-${this.billYear}`;
      this.addCfaBill?.get('billMonth')?.setValue(billMonthStr);
      this.addCfaBill?.get('billMonth')?.updateValueAndValidity();
      if (billMonthStr && this.billReceivedDt) {
      let billMonthStrVal = this.datePipe.transform(new Date(billMonthStr), 'MM/dd/yyyy');
      this.billMonthDate =billMonthStrVal ? new Date(billMonthStr) : new Date();
      this.noOfDays = (this.billReceivedDt.getTime() - this.billMonthDate.getTime()) / (1000 * 60 * 60 * 24);
      console.log(this.noOfDays);
      if (this.noOfDays > 180 && 'Closed' === this.addCfaBill?.get('status')?.value) {
        this.addCfaBill?.get('gmApprovalDate')?.setValidators(Validators.required);
      }else {
        this.addCfaBill?.get('gmApprovalDate')?.clearValidators();
      }
        this.addCfaBill?.get('gmApprovalDate')?.updateValueAndValidity();
      }
    }
  }
  clearValidators(status: string) {
    if ('Closed' !== status) {
      if ('Rejected' === status) {
        this.addCfaBill?.get('remark')?.setValidators(Validators.required);
        this.addCfaBill?.get('remark')?.updateValueAndValidity();
        this.addCfaBill?.get('docTrackNumber')?.setValidators(Validators.required);
        this.addCfaBill?.get('docTrackNumber')?.updateValueAndValidity();
        this.addCfaBill?.get('dateOfDispatch')?.setValidators(Validators.required);
        this.addCfaBill?.get('dateOfDispatch')?.updateValueAndValidity();
      }
      this.addCfaBill?.get('processBy')?.setValidators(Validators.required);
      this.addCfaBill?.get('processBy')?.updateValueAndValidity();
      this.addCfaBill?.get('billReceivedDate')?.setValidators(Validators.required);
      this.addCfaBill?.get('billReceivedDate')?.updateValueAndValidity();
      this.addCfaBill?.get('transporterCode')?.setValidators(Validators.required);
      this.addCfaBill?.get('transporterCode')?.updateValueAndValidity();
      this.addCfaBill?.get('nameOfTheContractor')?.setValidators(Validators.required);
      this.addCfaBill?.get('nameOfTheContractor')?.updateValueAndValidity();
      this.addCfaBill?.get('billNumber')?.setValidators(Validators.required);
      this.addCfaBill?.get('billNumber')?.updateValueAndValidity();
      this.addCfaBill?.get('receivedFrom')?.setValidators(Validators.required);
      this.addCfaBill?.get('receivedFrom')?.updateValueAndValidity();
      this.addCfaBill?.get('billMonth')?.setValidators(Validators.required);
      this.addCfaBill?.get('billMonth')?.updateValueAndValidity();
      this.addCfaBill?.get('billDate')?.setValidators(Validators.required);
      this.addCfaBill?.get('billDate')?.updateValueAndValidity();
      this.addCfaBill?.get('billAmount')?.setValidators(Validators.required);
      this.addCfaBill?.get('billAmount')?.updateValueAndValidity();
    } else {
      this.addCfaBill&& Object.keys(this.addCfaBill?.controls).forEach(key => {
      if ('gmApprovalDate' !== key && 'dueDateForPayment' !== key) {
        this.addCfaBill?.get(key)?.setValidators(Validators.required);
        this.addCfaBill?.get(key)?.updateValueAndValidity();
      }
    });
  }
  }
  onSubmit() {
    this.clearValidators(this.addCfaBill?.get('status')?.value);
    this.updateValidator();
    this.addCfaBill?.get('processDays')?.setValue(this.processedDays);
    this.addCfaBill?.get('nameOfTheContractor')?.setValue(this.vendorNameStr);
    // this.addCfaBill?.get('dueDateForPayment')?.setValue(this.dueDtForPayment);
    this.addCfaBill?.get('statusAsOnDate')?.setValue(this.statusOnDate);
    this.addCfaBill?.get('vendorEmail')?.setValue(this.emailId);
    console.log(JSON.stringify(this.addCfaBill?.value));
    if (this.addCfaBill?.valid) {
      this.loaderService.show();
      this._data.addCfaBill(this.addCfaBill?.value, this.dueDtForPayment).subscribe((data:any) => {
        if (data) {
          this.loaderService.hide();
          this.openDialog('Successfully Added', true);
          this.createForm();
          this.dueDtForPayment = null;
          this.billMonthString = null;
          this.billYear = null;
        }
      }, (error : any) => {
        if (error.status === 409) {
          this.loaderService.hide();
          this.openDialog('CFA Bill Register Details Already Exists!!', true);
          this.dueDtForPayment = null;
          this.billMonthString = null;
          this.billYear = null;
        }
      });
    }else {
      // this.addCfaBill?.get('dueDateForPayment')?.setValue('');
      // this.addCfaBill?.get('paymentTerms')?.setValue('');
      this.openDialog('Please fill the fields which are marked red!!', false);
    }
  }
  updateValidator () {
    let billMonthStr = this.addCfaBill?.get('billMonth')?.value;
    if (billMonthStr && this.billReceivedDt) {
    billMonthStr = this.datePipe.transform(new Date(billMonthStr), 'MM/dd/yyyy');
    this.billMonthDate = new Date(billMonthStr);
    this.noOfDays = (this.billReceivedDt.getTime() - this.billMonthDate.getTime()) / (1000 * 60 * 60 * 24);
    }
    if (this.noOfDays > 180 && 'Closed' === this.addCfaBill?.get('status')?.value) {
      this.addCfaBill?.get('gmApprovalDate')?.setValidators(Validators.required);
    }else {
      this.addCfaBill?.get('gmApprovalDate')?.clearValidators();
    }
      this.addCfaBill?.get('gmApprovalDate')?.updateValueAndValidity();
  }
     // open dialog
openDialog(dataValue: string, flag: boolean): void {
  const dialogRef = this.dialog.open(AlertdialogComponent, {
    width: '380px',
    data: dataValue
  });

  dialogRef.afterClosed().subscribe((result:any) => {
    if (flag) {
      this.router.navigate(['/add-cfa-bill']);
    }
  });
}
getVendorData(vendorCode: string) {
  this.vendorNameStr = '';
  this._data.getVendorData(vendorCode, 'NA').subscribe((res:any) => {
    if (res) {
      console.log(`Res${res}`);
      this.dataset = res;
      this.vendorNameStr = this.dataset[0].vendorName;
      this.emailId = this.dataset[0].emailId;
      this.addCfaBill?.get('nameOfTheContractor')?.setValue(this.vendorNameStr);
      this.addCfaBill?.get('nameOfTheContractor')?.updateValueAndValidity();
    }

    // tslint:disable-next-line:no-unused-expression
  }, (error : any) => {
    console.log(`Error ${error}`);
  });
}
}
