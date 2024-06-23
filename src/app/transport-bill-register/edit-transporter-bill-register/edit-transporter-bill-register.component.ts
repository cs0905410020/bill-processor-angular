import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AllservicesService } from '../../allservices.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AlertdialogComponent } from '../../alertdialog/alertdialog.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DecodeTokenService } from '../../services/decode-token.service';
import { TripModalComponent } from '../../trip-modal/trip-modal.component';
import { DataShareService } from '../../services/data-share.service';

@Component({
  selector: 'app-edit-transporter-bill-register',
  templateUrl: './edit-transporter-bill-register.component.html',
  styleUrls: ['./edit-transporter-bill-register.component.css']
})
export class EditTransporterBillRegisterComponent{

  dataset: any;
  editTransportBill: any;
  //editTransportBill: FormGroup | null=null;
  fetchedBillAmount: number =1;
  billReceivedDt: Date =new Date();
  dispatchDate: Date =new Date();
  dueDtForPayment: Date | null=new Date();
  onlineReceivingDt: Date =new Date();
  error: string='';
  todayDate: Date =new Date();
  billMonthDate: Date =new Date();
  billDt: Date =new Date();
  gmApprovalDt: Date =new Date();
  data: any;
  emailId: string = '';
  noOfDays: number=1;
  paymentTerm: number=1;
  selectedStatus: any;
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
  billTypes = [
    {value: 'Offline'},
    {value: 'Online'}
  ];
  billCategories = [
    {value: 'FTL'},
    {value: 'Parcel'}
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
  selectedBillType: string = '';
  mySubscription: any;
  vendorData = Array<{gstNumber: any, castrolGSTN: any}>();
  users: Array<any>=[];
  years: any[];
  months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  billMonthString: string | null= null;
  billYear: any;
  constructor(private fb: FormBuilder, private _data: AllservicesService, public dialog: MatDialog, private datePipe: DatePipe,
    private route: ActivatedRoute, private loaderService: NgxSpinnerService, private decodeService: DecodeTokenService,
    private dataShareService: DataShareService, private router: Router) {
      const users = localStorage.getItem('transportBillUsers');
      this.selectedBillType = 'Online';
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
    this.getTransportBillDetails(this.data.params);
    this.fetchedBillAmount = this.data.params.billAmount;
  }

  createForm() {

    this.editTransportBill = this.fb.group({
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
      status: ['' ],
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
    this.editTransportBill !== null && this.editTransportBill?.get('processDays')?.setValue(
      (dispatchedDate.getTime() - this.editTransportBill?.get('billReceivedDate')?.value.getTime()) / (1000 * 60 * 60 * 24));
  }
  getDueDate(onlineReceivingDt: Date) {
    this.onlineReceivingDt = onlineReceivingDt;
    this.paymentTerm= this.editTransportBill !== null && this.editTransportBill?.get('paymentTerms')?.value;
    if(this.paymentTerm && this.onlineReceivingDt && this.editTransportBill !== null) {
      this.editTransportBill !== null && this.editTransportBill?.get('dueDateForPayment')?.setValue(new Date(this.onlineReceivingDt.getTime() +
        (this.paymentTerm * 1000 * 60 * 60 * 24)));
        this.dueDtForPayment = this.editTransportBill?.get('dueDateForPayment')?.value;
    }
  }
  getStatusDate(billReceiveDate: Date) {
    this.editTransportBill?.get('billReceivedDate')?.setValue(billReceiveDate);
    const statusOnDate = Math.ceil((Date.now() - billReceiveDate.getTime()) / (1000 * 60 * 60 * 24));
    this.editTransportBill?.get('statusAsOnDate')?.setValue(statusOnDate);
  }
  setValidator() {
    if (this.billYear) {
      let billMonthStr = `${this.billMonthString}-${this.billYear}`;
      this.editTransportBill?.get('billMonth')?.setValue(billMonthStr);
      this.editTransportBill?.get('billMonth')?.updateValueAndValidity();
    if (this.editTransportBill?.get('billReceivedDate')?.value) {
    let billMonthStrVal = this.datePipe.transform(new Date(billMonthStr), 'MM/dd/yyyy');
    this.billMonthDate = billMonthStrVal ? new Date(billMonthStrVal) : new Date();
    this.noOfDays = 0;
    this.noOfDays = (this.editTransportBill?.get('billReceivedDate')?.value.getTime() - this.billMonthDate.getTime()) / (1000 * 60 * 60 * 24);
    console.log(this.noOfDays);
    if (this.noOfDays > 180 && 'Closed' === this.editTransportBill?.get('status')?.value) {
      this.editTransportBill?.get('gmApprovalDate')?.setValidators(Validators.required);
    }else {
      this.editTransportBill?.get('gmApprovalDate')?.clearValidators();
    }
      this.editTransportBill?.get('gmApprovalDate')?.updateValueAndValidity();
    }
  }
  }
  clearValidators(status: string) {
    if ('Closed' !== status) {
      if ('Rejected' === status) {
        this.editTransportBill?.get('remark')?.setValidators(Validators.required);
        this.editTransportBill?.get('remark')?.updateValueAndValidity();
        this.editTransportBill?.get('docTrackNumber')?.setValidators(Validators.required);
        this.editTransportBill?.get('docTrackNumber')?.updateValueAndValidity();
        this.editTransportBill?.get('dateOfDispatch')?.setValidators(Validators.required);
        this.editTransportBill?.get('dateOfDispatch')?.updateValueAndValidity();
      }
      this.editTransportBill?.get('processBy')?.setValidators(Validators.required);
      this.editTransportBill?.get('processBy')?.updateValueAndValidity();
      this.editTransportBill?.get('billReceivedDate')?.setValidators(Validators.required);
      this.editTransportBill?.get('billReceivedDate')?.updateValueAndValidity();
      this.editTransportBill?.get('transporterCode')?.setValidators(Validators.required);
      this.editTransportBill?.get('transporterCode')?.updateValueAndValidity();
      this.editTransportBill?.get('nameOfTheContractor')?.setValidators(Validators.required);
      this.editTransportBill?.get('nameOfTheContractor')?.updateValueAndValidity();
      this.editTransportBill?.get('billNumber')?.setValidators(Validators.required);
      this.editTransportBill?.get('billNumber')?.updateValueAndValidity();
      this.editTransportBill?.get('receivedFrom')?.setValidators(Validators.required);
      this.editTransportBill?.get('receivedFrom')?.updateValueAndValidity();
      this.editTransportBill?.get('billMonth')?.setValidators(Validators.required);
      this.editTransportBill?.get('billMonth')?.updateValueAndValidity();
      this.editTransportBill?.get('billDate')?.setValidators(Validators.required);
      this.editTransportBill?.get('billDate')?.updateValueAndValidity();
      this.editTransportBill?.get('billAmount')?.setValidators(Validators.required);
      this.editTransportBill?.get('billAmount')?.updateValueAndValidity();
    } else {
      this.editTransportBill && Object.keys(this.editTransportBill.controls).forEach(key => {
      if ('gmApprovalDate' !== key && 'docTrackNumber' !==key) {
        this.editTransportBill?.get(key)?.setValidators(Validators.required);
        this.editTransportBill?.get(key)?.updateValueAndValidity();
      }
    });
    }
  }
  getTransportBillDetails(transportBill : any) {
        this.dataset = transportBill;
        this.editTransportBill = this.fb.group({
          statusAsOnDate: [this.dataset.statusAsOnDate],
          processBy: [this.dataset.processBy],
          cilServiceCategory: [this.dataset.cilServiceCategory],
          region: [this.dataset.region],
          onlineBillReceivedDate: [this.dataset.onlineBillReceivedDate],
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
          status: [this.dataset.status],
          typeOfBill: [this.dataset.typeOfBill],
          billClosed: [this.dataset.billClosed],
          paymentTerms: [this.dataset.paymentTerms],
          dueDateForPayment: [this.dataset.dueDateForPayment],
          vendorGstNumber: [this.dataset.vendorGstNumber],
          castrolGstNumber: [this.dataset.castrolGstNumber],
          gmApprovalDate: [this.dataset.gmApprovalDate],
          taxAreaCode: [this.dataset.taxAreaCode],
          vendorEmail: [this.dataset.vendorEmail],
          billCategory: [this.dataset.billCategory],
          category: [this.dataset.category],
          billType: [this.dataset.billType]
        });
        const statusStr = this.editTransportBill?.get('status')?.value;
        this.selectedStatus = statusStr;
        const billCategoryStr = this.editTransportBill?.get('billCategory')?.value;
        const categoryStr = this.editTransportBill?.get('category')?.value;
        const regionStr = this.editTransportBill?.get('region')?.value;
        const cilServiceCategoryStr = this.editTransportBill?.get('cilServiceCategory')?.value;
        const typeOfBillStr = this.editTransportBill?.get('typeOfBill')?.value;
        const paymentTermStr = this.editTransportBill?.get('paymentTerms')?.value;
        const billClosedStr = this.editTransportBill?.get('billClosed')?.value;
        const billMonths = this.editTransportBill?.get('billMonth')?.value.split('-');
        this.billMonthString = billMonths[0];
        this.billYear = +billMonths[1];
        const processByStr = this.editTransportBill?.get('processBy')?.value;
        if (regionStr) {
          this.regions.splice(this.regions.findIndex(region => region.value === regionStr), 1);
          this.regions.unshift({value: regionStr});
        }
        if (cilServiceCategoryStr) {
          this.cilServiceCategories.splice(this.cilServiceCategories.findIndex(cilServiceCategory => cilServiceCategory.value === cilServiceCategoryStr), 1);
          this.cilServiceCategories.unshift({value: cilServiceCategoryStr});
        }
        if (processByStr && this.users) {
          this.users.splice(this.users.findIndex(user => user === processByStr), 1);
          this.users.unshift(processByStr);
        }
        if(statusStr && statusStr !== 'Rejected') {
          this.editTransportBill?.get('docTrackNumber')?.disable();
          this.editTransportBill.updateValueAndValidity();
        }
        if (statusStr) {
          this.statuses.splice(this.statuses.findIndex(status => status.value === statusStr), 1);
          this.statuses.unshift({value: statusStr});
        }
        if (billCategoryStr) {
          this.billCategories.splice(this.billCategories.findIndex(billCategory => billCategory.value === billCategoryStr), 1);
          this.billCategories.unshift({value: billCategoryStr});
        }
        if (categoryStr) {
          this.categories.splice(this.categories.findIndex(category => category.value === categoryStr), 1);
          this.categories.unshift({value: categoryStr});
        }
        if ('' !== typeOfBillStr) {
          this.typeOfBills.splice(this.typeOfBills.findIndex(typeOfBill => typeOfBill.value === typeOfBillStr), 1);
          this.typeOfBills.unshift({value: typeOfBillStr});
        }
        if ('' !== billClosedStr) {
          this.billsClosed.splice(this.billsClosed.findIndex(billClosed => billClosed.value === billClosedStr), 1);
          this.billsClosed.unshift({value: billClosedStr});
        }
        if (null != this.editTransportBill?.get('onlineBillReceivedDate')?.value) {
          this.onlineReceivingDt = new Date(this.editTransportBill?.get('onlineBillReceivedDate')?.value);
        }
        if (null != this.editTransportBill?.get('dateOfDispatch')?.value) {
          this.dispatchDate = new Date(this.editTransportBill?.get('dateOfDispatch')?.value);
        }
        if (null != this.editTransportBill?.get('dueDateForPayment')?.value) {
          this.dueDtForPayment = new Date(this.editTransportBill?.get('dueDateForPayment')?.value);
        }
        if (null != this.editTransportBill?.get('gmApprovalDate')?.value) {
          this.gmApprovalDt = new Date(this.editTransportBill?.get('gmApprovalDate')?.value);
        }
        this.billReceivedDt = new Date(this.editTransportBill?.get('billReceivedDate')?.value);
        this.billDt = new Date(this.editTransportBill?.get('billDate')?.value);
        // tslint:disable-next-line:max-line-length
        this.vendorData.push({'gstNumber': this.editTransportBill?.get('vendorGstNumber')?.value, 'castrolGSTN': this.editTransportBill?.get('castrolGstNumber')?.value});
        this.getVendorData(this.editTransportBill?.get('transporterCode')?.value);
  }
  updateValidator () {
    let billMonthStr = this.editTransportBill?.get('billMonth')?.value;
    if (billMonthStr && this.billReceivedDt) {
      billMonthStr = this.datePipe.transform(new Date(billMonthStr), 'MM/dd/yyyy');
      this.billMonthDate = new Date(billMonthStr);
      this.noOfDays = (this.billReceivedDt.getTime() - this.billMonthDate.getTime()) / (1000 * 60 * 60 * 24);
    }
    if (this.noOfDays > 180 && 'Closed' === this.editTransportBill?.get('status')?.value) {
      this.editTransportBill?.get('gmApprovalDate')?.setValidators(Validators.required);
    }else {
      this.editTransportBill?.get('gmApprovalDate')?.clearValidators();
    }
      this.editTransportBill?.get('gmApprovalDate')?.updateValueAndValidity();
  }
  getVendorData(vendorCode: string) {
    this._data.getVendorData(vendorCode, 'NA').subscribe((res :any) => {
      if (res) {
        console.log(res);
        if ('' === this.vendorData[0].gstNumber || '' === this.vendorData[0].castrolGSTN) {
          this.vendorData = res;
        }
        console.log(`Res${res}`);
        this.editTransportBill?.get('nameOfTheContractor')?.setValue(res[0].vendorName);
        this.editTransportBill?.get('nameOfTheContractor')?.updateValueAndValidity();
        this.editTransportBill?.get('paymentTerms')?.setValue(res[0].paymentTerms);
        this.editTransportBill?.get('paymentTerms')?.updateValueAndValidity();
        this.emailId = res[0].emailId;
      }

      // tslint:disable-next-line:no-unused-expression
    }, (error : any) => {
      this.openDialog('Unable to fetch vendor data. Please type vendor code again');
    });
  }
  submit() {
    console.log(this.editTransportBill?.value);
    this.clearValidators(this.editTransportBill?.get('status')?.value);
    this.updateValidator();
    this.editTransportBill?.get('vendorEmail')?.setValue(this.emailId);
    if (this.editTransportBill?.valid) {
      if('Closed' == this.editTransportBill?.get('status')?.value && !(this.editTransportBill?.get('billAmount')?.value >0) ) {
        this.openDialog('Please check bill amount is greater than zero or not.')
      } else {
        this.loaderService.show();
        this._data.updateTransportBill(this.editTransportBill.value, this.dataset.serialNumber).subscribe((data:any) => {
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
          this.openDialog(`Transport Bill Error!! ${error._body}`);
          this.dueDtForPayment = null;
          this.billMonthString = null;
          this.billYear = null;
      });
      }

    }else {
      this.openDialog('Please fill the fields which are marked red.');
    }
  }
  verifyBill() {
    this._data.verifyTransportBill(this.editTransportBill?.get('billNumber')?.value, this.editTransportBill?.get('transporterCode')?.value,
    this.editTransportBill?.get('billCategory')?.value)
    .subscribe((res :any) => {
      if (res) {
        console.log(res);
        this.openTripDialog(res);
      }
      // tslint:disable-next-line:no-unused-expression
    }, (error : any) => {
      this.openDialog(error._body);
    });
  }
  openDialog(dataValue: string): void {
    const dialogRef = this.dialog.open(AlertdialogComponent, {
      width: '380px',
      data: dataValue
    });
    dialogRef.afterClosed().subscribe((result :any)=> {
      console.log('The dialog was closed'+result);
    });
  }
  openTripDialog(data:any): void {
    const dialogRef = this.dialog.open(TripModalComponent, {
      width: '80vw',
      data: data
    });
    dialogRef.componentInstance.onSubmitEvent.subscribe((res:any) => {
      if(res.billNumber == this.editTransportBill?.get('billNumber')?.value) {
        this.editTransportBill?.get('billAmount')?.setValue(res.billAmount);
        this.editTransportBill?.get('billAmount')?.updateValueAndValidity();
        this.fetchedBillAmount = res.billAmount;
      }
    });
    dialogRef.afterClosed().subscribe((result :any)=> {
      console.log('The dialog was closed');
    });
  }
}
