import { Component, OnInit, Inject } from '@angular/core';
import { AllservicesService } from '../../allservices.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AlertdialogComponent } from '../../alertdialog/alertdialog.component';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DecodeTokenService } from '../../services/decode-token.service';

@Component({
  selector: 'app-edit-purchase-service',
  templateUrl: './edit-purchase-service.component.html',
  styleUrls: ['./edit-purchase-service.component.css']
})
export class EditPurchaseServiceComponent {
  dataset: any;
  paymentTerm: number=1;
  vendorData= Array<{location: any, gstNumber: any, castrolGSTN: any}>();
  error: string='';
  editPurchaseService: any;
  //editPurchaseService: FormGroup | null = null;
  billReceivedDt: Date =new Date();
  dispatchDate: Date =new Date();
  dueDtForPayment: Date |null =new Date();
  billDt: Date =new Date();
  blDt: Date =new Date();
  recordDt: Date =new Date();
  mailSentDt: Date =new Date();
  approvalRecordDt: Date =new Date();
  data: any;
  emailId: string = '';
  chargeDetailVal: string = '';
  statuses = [
    {value: 'Open'},
    {value: 'Closed'},
    {value: 'Revised'},
    {value: 'Rejected'}
  ];
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
  users: Array<any>=[''];
  vendorCode: string = '';
  // tslint:disable-next-line:max-line-length
  constructor(private _data: AllservicesService, private fb: FormBuilder, private datePipe: DatePipe, public dialog: MatDialog,  private route: ActivatedRoute,
  private loaderService: NgxSpinnerService, private decodeService: DecodeTokenService) {
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
        this.openDialog(error._body);
      });
    }
    this.route.queryParamMap.subscribe(params => {
      this.data = {...params.keys, ...params};
    });
    this.createForm();
    this.getPurchaseServiceDetails(this.data.params);
   }

  getPurchaseServiceDetails(purchaseService : any) {
        this.dataset = purchaseService;
        this.editPurchaseService = this.fb.group({
          billReceivedDate: [this.dataset.billReceivedDate],
          dateOfDispatch: [this.dataset.dateOfDispatch],
          processedBy: [this.dataset.processedBy],
          statusAsOnDate: [this.dataset.statusAsOnDate],
          vendorCode: [this.dataset.vendorCode],
          vendorName: [this.dataset.vendorName],
          vendorBillingLocation: [this.dataset.vendorBillingLocation],
          vendorGSTN: [this.dataset.vendorGSTN],
          castrolGSTN: [this.dataset.castrolGSTN],
          letterNumber: [this.dataset.letterNumber],
          billNumber: [this.dataset.billNumber, Validators.pattern(/^\S*$/)],
          processDays: [this.dataset.processDays],
          billDate: [this.dataset.billDate],
          billAmount: [this.dataset.billAmount],
          internalReferenceNumber: [this.dataset.internalReferenceNumber],
          status: [this.dataset.status],
          paymentTerms: [this.dataset.paymentTerms],
          dueDateForPayment: [this.dataset.dueDateForPayment],
          typeOfBills: [this.dataset.typeOfBills],
          serviceLocation: [this.dataset.serviceLocation],
          poNumber: [this.dataset.poNumber],
          ovNumber: [this.dataset.ovNumber],
          batchNumber: [this.dataset.batchNumber],
          remarks: [this.dataset.remarks],
          jobNumber: [this.dataset.jobNumber],
          nature : [this.dataset.nature],
          recordDate: [this.dataset.recordDate],
          mailSentDate: [this.dataset.mailSentDate],
          approvalRecordDate: [this.dataset.approvalRecordDate],
          workidNumber: [this.dataset.workidNumber],
          reason: [this.dataset.reason],
          vendorEmail: [this.dataset.vendorEmail],
          igst: [this.dataset.igst],
          cgst: [this.dataset.cgst],
          sgst: [this.dataset.sgst],
          mbl: [this.dataset.sgst],
          hbl: [this.dataset.sgst],
          blNumber: [this.dataset.blNumber],
          blDate: [this.dataset.blDate],
          chargeDetail: [this.dataset.chargeDetail]
        });
        const statusStr = this.editPurchaseService?.get('status')?.value;
		const remarkStr = this.editPurchaseService?.get('remarks')?.value;
        const typeOfBillStr = this.editPurchaseService?.get('typeOfBills')?.value;
        const chargeDetailStr = this.editPurchaseService?.get('chargeDetail')?.value;
        const processByStr = this.editPurchaseService?.get('processedBy')?.value;
        if (processByStr && this.users) {
          this.users.splice(this.users.findIndex(user => user === processByStr), 1);
          this.users.unshift(processByStr);
        }
        if (statusStr) {
          this.statuses.splice(this.statuses.findIndex(status => status.value === statusStr), 1);
          this.statuses.unshift({value: statusStr});
        }
		if (remarkStr) {
          this.remarks.splice(this.remarks.findIndex(remark => remark.value === remarkStr), 1);
          this.remarks.unshift({value: remarkStr});
        }
        if (typeOfBillStr) {
          this.typeOfBills.splice(this.typeOfBills.findIndex(typeOfBill => typeOfBill.value === typeOfBillStr), 1);
          this.typeOfBills.unshift({value: typeOfBillStr});
        }
        if (chargeDetailStr) {
          this.chargeDetails.splice(this.chargeDetails.findIndex(chargeDetail => chargeDetail.value === chargeDetailStr), 1);
          this.chargeDetails.unshift({value: chargeDetailStr});
        }

        if (null != this.editPurchaseService?.get('dueDateForPayment')?.value) {
          this.dueDtForPayment = new Date(this.editPurchaseService?.get('dueDateForPayment')?.value);
        }
        if (null != this.editPurchaseService?.get('recordDate')?.value) {
          this.recordDt = new Date(this.editPurchaseService?.get('recordDate')?.value);
        }
        if (null != this.editPurchaseService?.get('mailSentDate')?.value) {
          this.mailSentDt = new Date(this.editPurchaseService?.get('mailSentDate')?.value);
        }
        if (null != this.editPurchaseService?.get('approvalRecordDate')?.value) {
          this.approvalRecordDt = new Date(this.editPurchaseService?.get('approvalRecordDate')?.value);
        }
        if (null != this.editPurchaseService?.get('dateOfDispatch')?.value) {
          this.dispatchDate = new Date(this.editPurchaseService?.get('dateOfDispatch')?.value);
        }
        this.billReceivedDt = new Date(this.editPurchaseService?.get('billReceivedDate')?.value);
        this.billDt = new Date(this.editPurchaseService?.get('billDate')?.value);
        this.blDt = new Date(this.editPurchaseService?.get('blDate')?.value);
        this.vendorData.push({'location': this.editPurchaseService?.get('vendorBillingLocation')?.value,
        'gstNumber': this.editPurchaseService?.get('vendorGSTN')?.value, 'castrolGSTN': this.editPurchaseService?.get('castrolGSTN')?.value});
        this.getVendorData(this.editPurchaseService?.get('vendorCode')?.value);
  }
  submit() {
    console.log(this.editPurchaseService?.value);
    this.clearValidators(this.editPurchaseService?.get('status')?.value);
    this.editPurchaseService?.get('vendorEmail')?.setValue(this.emailId);
    if (this.editPurchaseService?.valid) {
      this.loaderService.show();
      this._data.updatePurchaseService(this.editPurchaseService.value, this.dataset.serialNumber).subscribe((data:any) => {
        if (data) {
          this.loaderService.hide();
          this.openDialog('Successfully Updated');
          this.createForm();
          this.dueDtForPayment = null;
        }
      }, (error : any) => {
        this.loaderService.hide();
        this.dueDtForPayment = null;
        if (error.status === 409) {
          this.openDialog('Purchase Service Details Already Exists!!');
        }
      });
    }else {
      this.openDialog('Please fill the fields which are marked red!!');
    }
  }
  createForm() {

    this.editPurchaseService = this.fb.group({
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
      status: [''],
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
      chargeDetail: ['']
    });
  }
  getVendorData(vendorCode: string) {
    this.vendorCode = vendorCode;
    this._data.getVendorData(vendorCode, this.chargeDetailVal).subscribe((res :any)=> {
      if (res) {
        console.log(`Res${res}`);
        if ('' === this.vendorData[0].gstNumber || '' === this.vendorData[0].location || '' === this.vendorData[0].castrolGSTN) {
          this.vendorData = res;
        }
        this.editPurchaseService?.get('vendorName')?.setValue(res[0].vendorName);
        this.editPurchaseService?.get('vendorName')?.updateValueAndValidity();
        this.paymentTerm = res[0].paymentTerms;
        this.editPurchaseService?.get('paymentTerms')?.setValue(res[0].paymentTerms);
        this.editPurchaseService?.get('paymentTerms')?.updateValueAndValidity();
        this.emailId = res[0].emailId;
      }

      // tslint:disable-next-line:no-unused-expression
    }, (error : any) => {
      this.openDialog('Unable to fetch vendor data. Please type vendor code again');
    });
  }
  getStatusDate(billReceiveDate: Date) {
    const statusOnDate = Math.ceil((Date.now() - billReceiveDate.getTime()) / (1000 * 60 * 60 * 24));
    this.editPurchaseService?.get('statusAsOnDate')?.setValue(statusOnDate);
    this.editPurchaseService?.get('paymentTerms')?.setValue('');
  }
  getDueDate(billDate: Date) {
    if(this.billDateVendors.indexOf(this.vendorCode) > -1 && ('NA' == this.chargeDetailVal || 'Basic Operating Charges' == this.chargeDetailVal)) {
      this.editPurchaseService?.get('dueDateForPayment')?.setValue(new Date(billDate.getTime() +
      (this.paymentTerm * 1000 * 60 * 60 * 24)));
      console.log(this.dueDtForPayment);
    } else {
      this.editPurchaseService?.get('dueDateForPayment')?.setValue(new Date(this.billReceivedDt.getTime() +
      (this.paymentTerm * 1000 * 60 * 60 * 24)));
    }

    console.log(this.dueDtForPayment);
  }

  getNumberOfDays(dispatchedDate: Date) {
    // tslint:disable-next-line:max-line-length
    this.editPurchaseService?.get('processDays')?.setValue((dispatchedDate.getTime() - this.billReceivedDt.getTime()) / (1000 * 60 * 60 * 24));
  }
  clearValidators(status: string) {
    if ('Closed' !== status) {
      if ('Rejected' === status) {
        this.editPurchaseService?.get('remarks')?.setValidators(Validators.required);
        this.editPurchaseService?.get('remarks')?.updateValueAndValidity();
        this.editPurchaseService?.get('dateOfDispatch')?.setValidators(Validators.required);
        this.editPurchaseService?.get('dateOfDispatch')?.updateValueAndValidity();
      }
      this.editPurchaseService?.get('processedBy')?.setValidators(Validators.required);
      this.editPurchaseService?.get('processedBy')?.updateValueAndValidity();
      this.editPurchaseService?.get('billReceivedDate')?.setValidators(Validators.required);
      this.editPurchaseService?.get('billReceivedDate')?.updateValueAndValidity();
      this.editPurchaseService?.get('vendorCode')?.setValidators(Validators.required);
      this.editPurchaseService?.get('vendorCode')?.updateValueAndValidity();
      this.editPurchaseService?.get('vendorName')?.setValidators(Validators.required);
      this.editPurchaseService?.get('billNumber')?.setValidators(Validators.required);
      this.editPurchaseService?.get('billNumber')?.updateValueAndValidity();
      this.editPurchaseService?.get('billDate')?.setValidators(Validators.required);
      this.editPurchaseService?.get('billDate')?.updateValueAndValidity();
      this.editPurchaseService?.get('billAmount')?.setValidators(Validators.required);
      this.editPurchaseService?.get('billAmount')?.updateValueAndValidity();
      this.editPurchaseService?.get('letterNumber')?.setValidators(Validators.required);
      this.editPurchaseService?.get('letterNumber')?.updateValueAndValidity();
      this.editPurchaseService?.get('igst')?.setValidators(Validators.required);
      this.editPurchaseService?.get('igst')?.updateValueAndValidity();
      this.editPurchaseService?.get('cgst')?.setValidators(Validators.required);
      this.editPurchaseService?.get('cgst')?.updateValueAndValidity();
      this.editPurchaseService?.get('sgst')?.setValidators(Validators.required);
      this.editPurchaseService?.get('sgst')?.updateValueAndValidity();
    } else {
      this.editPurchaseService && Object.keys(this.editPurchaseService.controls).forEach(key => {
      if ('dueDateForPayment' !== key && 'workidNumber' !== key) {
        this.editPurchaseService?.get(key)?.setValidators(Validators.required);
        this.editPurchaseService?.get(key)?.updateValueAndValidity();
      }
    });
    }
  }
  openDialog(dataValue: string): void {
    const dialogRef = this.dialog.open(AlertdialogComponent, {
      width: '380px',
      data: dataValue
    });
    dialogRef.afterClosed().subscribe((result:any) => {
    });
  }
  validateInput(field: any, numberOfDigits: number) {
    let inputValue = field.target.value;
    if(inputValue.indexOf("/") >-1) {
      let splittedValue = inputValue.split("/");
       splittedValue.forEach((value:any) => {
         if(numberOfDigits !=value.length) {
           this.editPurchaseService?.get(field.target.id)?.setErrors({"notValid": true});
         } else {
           this.editPurchaseService?.get(field.target.id)?.setErrors(null);
         }
         });
    } else {
      if(inputValue.length != numberOfDigits) {
        this.editPurchaseService?.get(field.target.id)?.setErrors({"notValid": true});
      } else {
       this.editPurchaseService?.get(field.target.id)?.setErrors(null);
      }
    }
   }
}
