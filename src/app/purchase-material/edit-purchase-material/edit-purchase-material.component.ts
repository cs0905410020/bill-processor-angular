import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllservicesService } from '../../allservices.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AlertdialogComponent } from '../../alertdialog/alertdialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DecodeTokenService } from '../../services/decode-token.service';

@Component({
  selector: 'app-edit-purchase-material',
  templateUrl: './edit-purchase-material.component.html',
  styleUrls: ['./edit-purchase-material.component.css']
})
export class EditPurchaseMaterialComponent {

  dataset: any;
  editPurchaseMaterial: any;
  //editPurchaseMaterial: FormGroup | null = null;
  billReceivedDt: Date =new Date();
  dispatchDate: Date =new Date();
  dueDtForPayment: Date =new Date();
  billDt: Date =new Date();
  remarkMailDt: Date =new Date();
  poDt: Date =new Date();
  data: any;
  receiptDtOfScanning: Date =new Date();
  vendorData= Array<{gstNumber: any, castrolGSTN: any}>();
  emailId: string = '';
  paymentTermVal: any;
  noOfDays: number=1;
  statuses = [
    {value: 'Open'},
    {value: 'Closed'},
    {value: 'Revised'},
    {value: 'Rejected'}
  ];
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
  typeOfBills = [
    {value: 'Fixed'},
    {value: 'Variable'}
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
  isPoDateApplicable: boolean=false;
  users: Array<any>=[''];
  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private _data: AllservicesService, public dialog: MatDialog, private datePipe: DatePipe, private route: ActivatedRoute,
  private loaderService: NgxSpinnerService, private decodeService: DecodeTokenService,  private router: Router) {
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
        this.openDialog(error._body, false);
      });
      this.isPoDateApplicable = false;
    }
    this.createForm();
    this.route.queryParamMap.subscribe(params => {
        this.data = {...params.keys, ...params};
      });
      this.getPurchaseMaterialDetails(this.data.params);
   }

  createForm() {

    this.editPurchaseMaterial = this.fb.group({
      category: [''],
      billReceivedDate: [''],
      dateOfDispatch: [''],
      processedBy: [''],
      statusAsOnDate: [''],
      vendorCode: [''],
      vendorName: [''],
      vendorGSTN: [''],
      castrolGSTN: [''],
      billNumber: [''],
      processDays: [''],
      receivedFrom: [''],
      billDate: [''],
      billAmount: [''],
      internalReferenceNumber: [''],
      status: [''],
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
  getPurchaseMaterialDetails(purchaseMaterial : any) {
        this.dataset = purchaseMaterial;
        this.editPurchaseMaterial = this.fb.group({
          category: [this.dataset.category],
          billReceivedDate: [this.dataset.billReceivedDate],
          dateOfDispatch: [this.dataset.dateOfDispatch],
          processedBy: [this.dataset.processedBy],
          statusAsOnDate: [this.dataset.statusAsOnDate],
          vendorCode: [this.dataset.vendorCode],
          vendorName: [this.dataset.vendorName],
          vendorGSTN: [this.dataset.vendorGSTN],
          castrolGSTN: [this.dataset.castrolGSTN],
          billNumber: [this.dataset.billNumber],
          processDays: [this.dataset.processDays],
          receivedFrom: [this.dataset.receivedFrom],
          billDate: [this.dataset.billDate],
          billAmount: [this.dataset.billAmount],
          internalReferenceNumber: [this.dataset.internalReferenceNumber],
          status: [this.dataset.status],
          paymentTerms: [this.dataset.paymentTerms],
          dueDateForPayment: [this.dataset.dueDateForPayment],
          deliveryLocation: [this.dataset.deliveryLocation],
          poNumber: [this.dataset.poNumber],
          poDate: [this.dataset.poDate],
          ovNumber: [this.dataset.ovNumber],
          remarks: [this.dataset.remarks],
          remarkMailDate: [this.dataset.remarkMailDate],
          receiptDateOfScanning: [this.dataset.receiptDateOfScanning],
          workidNumber: [this.dataset.workidNumber],
          reason: [this.dataset.reason],
          vendorEmail: [this.dataset.vendorEmail],
          gmApprovalDate: [this.dataset.gmApprovalDate]
        });
        const statusStr = this.editPurchaseMaterial?.get('status')?.value;
        const remarkStr = this.editPurchaseMaterial?.get('remarks')?.value;
        const categoryStr = this.editPurchaseMaterial?.get('category')?.value;
        const paymentTermStr = this.editPurchaseMaterial?.get('paymentTerms')?.value;
        const processByStr = this.editPurchaseMaterial?.get('processedBy')?.value;
        if (categoryStr) {
          this.categories.splice(this.categories.findIndex(category => category.value === categoryStr), 1);
          this.categories.unshift({value: categoryStr});
        }
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
        if (paymentTermStr) {
          this.paymentTermsArr.splice(this.paymentTermsArr.findIndex(paymentTerm => paymentTerm.value === paymentTermStr), 1);
          this.paymentTermsArr.unshift({value: paymentTermStr});
        }
        this.billReceivedDt = new Date(this.editPurchaseMaterial.get('billReceivedDate')?.value);
        if (null != this.editPurchaseMaterial?.get('dateOfDispatch')?.value) {
          this.dispatchDate = new Date(this.editPurchaseMaterial.get('dateOfDispatch')?.value);
        }
        if (null != this.editPurchaseMaterial?.get('dueDateForPayment')?.value) {
          this.dueDtForPayment = new Date(this.editPurchaseMaterial.get('dueDateForPayment')?.value);
        }
        if (null != this.editPurchaseMaterial?.get('poDate')?.value) {
          this.poDt = new Date(this.editPurchaseMaterial.get('poDate')?.value);
        }
        if (null != this.editPurchaseMaterial?.get('remarkMailDate')?.value) {
          this.remarkMailDt = new Date(this.editPurchaseMaterial.get('remarkMailDate')?.value);
        }
        if (null != this.editPurchaseMaterial?.get('receiptDateOfScanning')?.value) {
          this.receiptDtOfScanning = new Date(this.editPurchaseMaterial.get('receiptDateOfScanning')?.value);
        }
        this.billDt = new Date(this.editPurchaseMaterial.get('billDate')?.value);
        this.vendorData.push({'gstNumber': this.editPurchaseMaterial?.get('vendorGSTN')?.value,
        'castrolGSTN': this.editPurchaseMaterial?.get('castrolGSTN')?.value});
        this.getVendorData(this.editPurchaseMaterial.get('vendorCode')?.value);
  }
  openDialog(dataValue: string, flag: boolean): void {
    const dialogRef = this.dialog.open(AlertdialogComponent, {
      width: '380px',
      data: dataValue
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      if (flag) {
        this.router.navigate(['/add-purchase-material']);
      }
    });
  }
  getVendorData(vendorCode: string) {
    this._data.getVendorData(vendorCode, 'NA').subscribe((res:any) => {
      if (res) {
        console.log(`Res${res}`);
        if ('' === this.vendorData[0].gstNumber || '' === this.vendorData[0].castrolGSTN) {
          this.vendorData = res;
        }
        this.editPurchaseMaterial?.get('vendorName')?.setValue(res[0].vendorName);
        this.editPurchaseMaterial?.get('vendorName')?.updateValueAndValidity();
        this.emailId = res[0].emailId;
      }

      // tslint:disable-next-line:no-unused-expression
    }, (error : any) => {
      this.openDialog('Unable to fetch vendor data. Please type vendor code again', false);
    });
  }
  submit() {
    console.log(this.editPurchaseMaterial?.value);
    this.clearValidators(this.editPurchaseMaterial?.get('status')?.value);
    this.updateValidator();
    if(this.isPoDateApplicable) {
      this.editPurchaseMaterial?.get('poDate')?.clearValidators();
      this.editPurchaseMaterial?.get('poDate')?.updateValueAndValidity();
    }
    this.editPurchaseMaterial?.get('vendorEmail')?.setValue(this.emailId);
    if (this.editPurchaseMaterial?.valid) {
      this.loaderService.show();
      this._data.updatePurchaseMaterial(this.editPurchaseMaterial.value, this.dataset.serialNumber).subscribe((data:any) => {
        if (data) {
          this.loaderService.hide();
          this.openDialog('Successfully Updated', false);
          this.createForm();
        }
      }, (error : any) => {
        this.loaderService.hide();
        if (error.status === 409) {
          this.openDialog('Purchase Service Details Already Exists!!', false);
        }
      });
    }else {
      this.openDialog('Please fill the fields which are marked red!!', false);
    }
  }
  clearValidators(status: string) {
    if ('Closed' !== status) {
      if ('Rejected' === status) {
        this.editPurchaseMaterial?.get('remarks')?.setValidators(Validators.required);
        this.editPurchaseMaterial?.get('remarks')?.updateValueAndValidity();
        this.editPurchaseMaterial?.get('dateOfDispatch')?.setValidators(Validators.required);
        this.editPurchaseMaterial?.get('dateOfDispatch')?.updateValueAndValidity();
      }
      this.editPurchaseMaterial?.get('processedBy')?.setValidators(Validators.required);
      this.editPurchaseMaterial?.get('processedBy')?.updateValueAndValidity();
      this.editPurchaseMaterial?.get('billReceivedDate')?.setValidators(Validators.required);
      this.editPurchaseMaterial?.get('billReceivedDate')?.updateValueAndValidity();
      this.editPurchaseMaterial?.get('vendorCode')?.setValidators(Validators.required);
      this.editPurchaseMaterial?.get('vendorCode')?.updateValueAndValidity();
      this.editPurchaseMaterial?.get('vendorName')?.setValidators(Validators.required);
      this.editPurchaseMaterial?.get('vendorName')?.updateValueAndValidity();
      this.editPurchaseMaterial?.get('billNumber')?.setValidators(Validators.required);
      this.editPurchaseMaterial?.get('billNumber')?.updateValueAndValidity();
      this.editPurchaseMaterial?.get('receivedFrom')?.setValidators(Validators.required);
      this.editPurchaseMaterial?.get('receivedFrom')?.updateValueAndValidity();
      this.editPurchaseMaterial?.get('billDate')?.setValidators(Validators.required);
      this.editPurchaseMaterial?.get('billDate')?.updateValueAndValidity();
      this.editPurchaseMaterial?.get('billAmount')?.setValidators(Validators.required);
      this.editPurchaseMaterial?.get('billAmount')?.updateValueAndValidity();
    } else {
      this.editPurchaseMaterial && Object.keys(this.editPurchaseMaterial.controls).forEach(key => {
      if ('dueDateForPayment' !== key && 'workidNumber' !== key && 'remarkMailDate' !== key) {
        this.editPurchaseMaterial?.get(key)?.setValidators(Validators.required);
        this.editPurchaseMaterial?.get(key)?.updateValueAndValidity();
        if('poDate' === key && !this.isPoDateApplicable) {
          this.editPurchaseMaterial?.get(key)?.setValidators(Validators.required);
          this.editPurchaseMaterial?.get(key)?.updateValueAndValidity();
        }
      }
    });
    }
  }
  setValidator(tempBillDt: Date) {
    if (tempBillDt && this.billReceivedDt) {

      this.noOfDays = (this.billReceivedDt.getTime() - tempBillDt.getTime()) / (1000 * 60 * 60 * 24);
      console.log(this.noOfDays);
      if (this.noOfDays > 180 && 'Closed' === this.editPurchaseMaterial?.get('status')?.value) {
        this.editPurchaseMaterial?.get('gmApprovalDate')?.setValidators(Validators.required);
      }else {
        this.editPurchaseMaterial?.get('gmApprovalDate')?.clearValidators();
      }
        this.editPurchaseMaterial?.get('gmApprovalDate')?.updateValueAndValidity();
  }
}
updateValidator () {
  if(this.billReceivedDt && this.billDt) {
    this.noOfDays = (this.billReceivedDt.getTime() - this.billDt.getTime()) / (1000 * 60 * 60 * 24);
  }
  if (this.noOfDays > 180 && 'Closed' === this.editPurchaseMaterial?.get('status')?.value) {
    this.editPurchaseMaterial?.get('gmApprovalDate')?.setValidators(Validators.required);
  }else {
    this.editPurchaseMaterial?.get('gmApprovalDate')?.clearValidators();
  }
    this.editPurchaseMaterial?.get('gmApprovalDate')?.updateValueAndValidity();
}
  getStatusDate(billReceiveDate: Date) {
    const statusOnDate = Math.ceil((Date.now() - billReceiveDate.getTime()) / (1000 * 60 * 60 * 24));
    this.editPurchaseMaterial?.get('statusAsOnDate')?.setValue(statusOnDate);
    this.editPurchaseMaterial?.get('paymentTerms')?.setValue('');
  }
  getDueDate(paymentTerm: any) {
    this.paymentTermVal = paymentTerm;
    if ('NA' !== paymentTerm) {
      this.editPurchaseMaterial?.get('dueDateForPayment')?.setValue(new Date(this.billDt.getTime() +
      (paymentTerm * 1000 * 60 * 60 * 24)));
    }
  }
  getNumberOfDays(dispatchedDate: Date) {
    // tslint:disable-next-line:max-line-length
    this.editPurchaseMaterial?.get('processDays')?.setValue((dispatchedDate.getTime() - this.billReceivedDt.getTime()) / (1000 * 60 * 60 * 24));
  }
  updatePoDateStatus(poDateApplicable: any) {
    this.isPoDateApplicable = false;
    if(poDateApplicable.value == 'Not Applicable') {
      this.isPoDateApplicable = true;
      this.editPurchaseMaterial?.get('poDate')?.clearValidators();
      this.editPurchaseMaterial?.get('poDate')?.updateValueAndValidity();
    }
  }
}
