import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AllservicesService } from '../../allservices.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AlertdialogComponent } from '../../alertdialog/alertdialog.component';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DecodeTokenService } from '../../services/decode-token.service';

@Component({
  selector: 'app-edit-cfa-bill-register',
  templateUrl: './edit-cfa-bill-register.component.html',
  styleUrls: ['./edit-cfa-bill-register.component.css']
})
export class EditCfaBillRegisterComponent {

  dataset: any;
  editCfaBill: any;
  //editCfaBill: FormGroup | null = null;
  billReceivedDt: Date =new Date();
  dispatchDate: Date =new Date();
  dueDtForPayment: Date |null=new Date();
  error: string='';
  todayDate: Date =new Date();
  billMonthDate: Date |null=new Date();
  billDt: Date =new Date();
  recordDt: Date =new Date();
  mailSentDt: Date =new Date();
  approvalRecordDt: Date =new Date();
  gmApprovalDt: Date =new Date();
  emailId: string = '';
  billMonthString: string |null = null;
  billYear: any;
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
  vendorData = Array<{gstNumber: any, castrolGSTN: any}>();
  data: any;
  users: Array<any>=[''];
  years: any[];
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private _data: AllservicesService, public dialog: MatDialog, private datePipe: DatePipe, private route: ActivatedRoute,
     private loaderService: NgxSpinnerService, private decodeService: DecodeTokenService) {
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
        this.openDialog(error._body);
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
      this.createForm();
      this.route.queryParamMap.subscribe(params => {
        this.data = {...params.keys, ...params};
      });
      this.getCfaBillDetails(this.data.params);
  }


  createForm() {

    this.editCfaBill = this.fb.group({
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
      status: ['' ],
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
   this.editCfaBill?.get('processDays')?.setValue((dispatchedDate.getTime() - this.billReceivedDt.getTime())
   / (1000 * 60 * 60 * 24));
  }
  getDueDate() {
    this.editCfaBill?.get('dueDateForPayment')?.setValue(new Date(this.billReceivedDt.getTime() +
    (this.editCfaBill?.get('paymentTerms')?.value * 1000 * 60 * 60 * 24)));
  }
  getStatusDate(billReceiveDate: Date) {
    this.billReceivedDt = billReceiveDate;
    const statusOnDate = Math.ceil((Date.now() - billReceiveDate.getTime()) / (1000 * 60 * 60 * 24));
    this.editCfaBill?.get('statusAsOnDate')?.setValue(statusOnDate);
    this.editCfaBill?.get('paymentTerms')?.setValue('');
  }
  setValidator() {
    if (this.billYear) {
    let billMonthStr = `${this.billMonthString}-${this.billYear}`;
    this.editCfaBill?.get('billMonth')?.setValue(billMonthStr);
    this.editCfaBill?.get('billMonth')?.updateValueAndValidity();
    if (billMonthStr && this.billReceivedDt) {
    let billMonthStrVal = this.datePipe.transform(new Date(billMonthStr), 'MM/dd/yyyy');
    this.billMonthDate = billMonthStrVal ? new Date(billMonthStr):new Date();
    this.noOfDays = 0;
    this.noOfDays = (this.billReceivedDt.getTime() - this.billMonthDate?.getTime()) / (1000 * 60 * 60 * 24);
    console.log(this.noOfDays);
    if (this.noOfDays > 180 && 'Closed' === this.editCfaBill?.get('status')?.value) {
      this.editCfaBill?.get('gmApprovalDate')?.setValidators(Validators.required);
    }else {
      this.editCfaBill?.get('gmApprovalDate')?.clearValidators();
    }
      this.editCfaBill?.get('gmApprovalDate')?.updateValueAndValidity();
    }
  }
  }
  clearValidators(status: string) {
    if ('Closed' !== status) {
      if ('Rejected' === status) {
        this.editCfaBill?.get('remark')?.setValidators(Validators.required);
        this.editCfaBill?.get('remark')?.updateValueAndValidity();
        this.editCfaBill?.get('docTrackNumber')?.setValidators(Validators.required);
        this.editCfaBill?.get('docTrackNumber')?.updateValueAndValidity();
        this.editCfaBill?.get('dateOfDispatch')?.setValidators(Validators.required);
        this.editCfaBill?.get('dateOfDispatch')?.updateValueAndValidity();
      }
      this.editCfaBill?.get('processBy')?.setValidators(Validators.required);
      this.editCfaBill?.get('processBy')?.updateValueAndValidity();
      this.editCfaBill?.get('billReceivedDate')?.setValidators(Validators.required);
      this.editCfaBill?.get('billReceivedDate')?.updateValueAndValidity();
      this.editCfaBill?.get('transporterCode')?.setValidators(Validators.required);
      this.editCfaBill?.get('transporterCode')?.updateValueAndValidity();
      this.editCfaBill?.get('nameOfTheContractor')?.setValidators(Validators.required);
      this.editCfaBill?.get('nameOfTheContractor')?.updateValueAndValidity();
      this.editCfaBill?.get('billNumber')?.setValidators(Validators.required);
      this.editCfaBill?.get('billNumber')?.updateValueAndValidity();
      this.editCfaBill?.get('receivedFrom')?.setValidators(Validators.required);
      this.editCfaBill?.get('receivedFrom')?.updateValueAndValidity();
      this.editCfaBill?.get('billMonth')?.setValidators(Validators.required);
      this.editCfaBill?.get('billMonth')?.updateValueAndValidity();
      this.editCfaBill?.get('billDate')?.setValidators(Validators.required);
      this.editCfaBill?.get('billDate')?.updateValueAndValidity();
      this.editCfaBill?.get('billAmount')?.setValidators(Validators.required);
      this.editCfaBill?.get('billAmount')?.updateValueAndValidity();
    } else {
      this.editCfaBill&& Object.keys(this.editCfaBill.controls).forEach(key => {
      if ('gmApprovalDate' !== key && 'dueDateForPayment' !== key) {
        this.editCfaBill?.get(key)?.setValidators(Validators.required);
        this.editCfaBill?.get(key)?.updateValueAndValidity();
      }
    });
  }
  }
  getCfaBillDetails(cfaBill : any) {
        this.dataset = cfaBill;
        this.editCfaBill = this.fb.group({
          statusAsOnDate: [this.dataset.statusAsOnDate],
          processBy: [this.dataset.processBy],
          region: [this.dataset.region],
          billReceivedDate: [this.dataset.billReceivedDate],
          dateOfDispatch: [this.dataset.dateOfDispatch],
          transporterCode: [this.dataset.transporterCode],
          nameOfTheContractor: [this.dataset.nameOfTheContractor],
          billNumber: [this.dataset.billNumber, Validators.pattern(/^\S*$/)],
          processDays: [this.dataset.processDays],
          receivedFrom: [this.dataset.receivedFrom],
          billMonth: [this.dataset.billMonth],
          remark: [this.dataset.remark],
          billDate: [this.dataset.billDate],
          billAmount: [this.dataset.billAmount],
          docTrackNumber: [this.dataset.docTrackNumber],
          status: [this.dataset.status ],
          typeOfBill: [this.dataset.typeOfBill],
          billClosed: [this.dataset.billClosed],
          paymentTerms: [this.dataset.paymentTerms],
          dueDateForPayment: [this.dataset.dueDateForPayment ],
          vendorGstNumber: [this.dataset.vendorGstNumber],
          castrolGstNumber: [this.dataset.castrolGstNumber],
          gmApprovalDate: [this.dataset.gmApprovalDate],
          taxAreaCode: [this.dataset.taxAreaCode],
          ovNumber: [this.dataset.ovNumber],
          vendorEmail: [this.dataset.vendorEmail]
        });
        const statusStr = this.editCfaBill?.get('status')?.value;
        const typeOfBillStr = this.editCfaBill?.get('typeOfBill')?.value;
        const paymentTermStr = this.editCfaBill?.get('paymentTerms')?.value;
        const billClosedStr = this.editCfaBill?.get('billClosed')?.value;
        const billMonths = this.editCfaBill?.get('billMonth')?.value.split('-');
        this.billMonthString = billMonths[0];
        this.billYear = +billMonths[1];
        const processByStr = this.editCfaBill?.get('processBy')?.value;
        if (processByStr && this.users) {
          this.users.splice(this.users.findIndex(user => user === processByStr), 1);
          this.users.unshift(processByStr);
        }
        if (statusStr) {
          this.statuses.splice(this.statuses.findIndex(status => status.value === statusStr), 1);
          this.statuses.unshift({value: statusStr});
        }
        if (typeOfBillStr) {
          this.typeOfBills.splice(this.typeOfBills.findIndex(typeOfBill => typeOfBill.value === typeOfBillStr), 1);
          this.typeOfBills.unshift({value: typeOfBillStr});
        }
        if (paymentTermStr) {
          this.paymentTermsArr.splice(this.paymentTermsArr.findIndex(paymentTerm => paymentTerm.value === paymentTermStr), 1);
          this.paymentTermsArr.unshift({value: paymentTermStr});
        }
        if (billClosedStr) {
          this.billsClosed.splice(this.billsClosed.findIndex(billClosed => billClosed.value === billClosedStr), 1);
          this.billsClosed.unshift({value: billClosedStr});
        }
        if (null != this.editCfaBill?.get('dateOfDispatch')?.value) {
          this.dispatchDate = new Date(this.editCfaBill?.get('dateOfDispatch')?.value);
        }
        if (null != this.editCfaBill?.get('dueDateForPayment')?.value) {
          this.dueDtForPayment = new Date(this.editCfaBill?.get('dueDateForPayment')?.value);
        }
        if (null != this.editCfaBill?.get('gmApprovalDate')?.value) {
          this.gmApprovalDt = new Date(this.editCfaBill?.get('gmApprovalDate')?.value);
        }
        this.billReceivedDt = new Date(this.editCfaBill?.get('billReceivedDate')?.value);
        this.billDt = new Date(this.editCfaBill?.get('billDate')?.value);
        // tslint:disable-next-line:max-line-length
        this.vendorData.push({'gstNumber': this.editCfaBill?.get('vendorGstNumber')?.value, 'castrolGSTN': this.editCfaBill?.get('castrolGstNumber')?.value});
        this.getVendorData(this.editCfaBill?.get('transporterCode')?.value);
  }
  getVendorData(vendorCode: string) {
    this._data.getVendorData(vendorCode, 'NA').subscribe((res :any)=> {
      if (res) {
        console.log(`Res${res}`);
        if ('' === this.vendorData[0].gstNumber || '' === this.vendorData[0].castrolGSTN) {
          this.vendorData = res;
        }
        this.editCfaBill?.get('nameOfTheContractor')?.setValue(res[0].vendorName);
        this.editCfaBill?.get('nameOfTheContractor')?.updateValueAndValidity();
        this.emailId = res[0].emailId;
      }

      // tslint:disable-next-line:no-unused-expression
    }, (error : any) => {
      this.openDialog('Unable to fetch vendor data. Please type vendor code again');
    });
  }
  openDialog(dataValue: string): void {
    const dialogRef = this.dialog.open(AlertdialogComponent, {
      width: '380px',
      data: dataValue
    });
  }
  updateValidator () {
    let billMonthStr = this.editCfaBill?.get('billMonth')?.value;
    if (billMonthStr && this.billReceivedDt) {
    billMonthStr = this.datePipe.transform(new Date(billMonthStr), 'MM/dd/yyyy');
    this.billMonthDate = new Date(billMonthStr);
    this.noOfDays = (this.billReceivedDt.getTime() - this.billMonthDate.getTime()) / (1000 * 60 * 60 * 24);
    }
    if (this.noOfDays > 180 && 'Closed' === this.editCfaBill?.get('status')?.value) {
      this.editCfaBill?.get('gmApprovalDate')?.setValidators(Validators.required);
    }else {
      this.editCfaBill?.get('gmApprovalDate')?.clearValidators();
    }
      this.editCfaBill?.get('gmApprovalDate')?.updateValueAndValidity();
  }
  submit() {
    console.log(this.editCfaBill?.value);
    this.clearValidators(this.editCfaBill?.get('status')?.value);
    this.updateValidator();
    this.editCfaBill?.get('vendorEmail')?.setValue(this.emailId);
    if (this.editCfaBill?.valid) {
      this.loaderService.show();
      this._data.updateCfaBill(this.editCfaBill.value, this.dataset.serialNumber).subscribe((data:any) => {
        if (data) {
          this.loaderService.hide();
          this.openDialog('Successfully Updated');
          this.createForm();
          this.dueDtForPayment = null;
          this.billMonthString = null;
          this.billYear = null;
        }
      }, (error : any) => {
          this.loaderService.hide();
          this.dueDtForPayment = null;
          this.billMonthString = null;
          this.billYear = null;
          this.openDialog(`CFA Bill Error!! ${error._body}`);
      });
    }else {
      this.openDialog('Please fill the fields which are marked red!!');
    }
  }
}
