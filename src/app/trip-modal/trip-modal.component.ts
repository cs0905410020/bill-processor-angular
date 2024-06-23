import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Trip } from './trip';
import { AllservicesService } from '../allservices.service';
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';
import { DecodeTokenService } from '../services/decode-token.service';
import { DataShareService } from '../services/data-share.service';

@Component({
  selector: 'app-trip-modal',
  templateUrl: './trip-modal.component.html',
  styleUrls: ['./trip-modal.component.css']
})
export class TripModalComponent implements OnInit {
  //transportBillVerificationForm: FormGroup | null = null;
  transportBillVerificationForm: any;
  transportBillVerificationStatus: any;
  options: any;
  tripOptions: any;
  tripTypes: any;
  isAdmin: boolean = false;
  selectedTripOption: string = '';
  selectedTripType: string = '';
  @Output() onSubmitEvent = new EventEmitter();
  dateAndTimePattern =  /^(((0[1-9]|[12]\d|3[01])[\/\.-](0[13578]|1[02])[\/\.-]((19|[2-9]\d)\d{2})\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((0[1-9]|[12]\d|30)[\/\.-](0[13456789]|1[012])[\/\.-]((19|[2-9]\d)\d{2})\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((0[1-9]|1\d|2[0-8])[\/\.-](02)[\/\.-]((19|[2-9]\d)\d{2})\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d):(0[0-9]|[1-59]\d)\s(AM|am|PM|pm))|((29)[\/\.-](02)[\/\.-]((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))\s(0[0-9]|1[0-2]):(0[0-9]|[1-59]\d)(AM|am|PM|pm)))$/g;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<TripModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _data: AllservicesService,  public dialog: MatDialog,
    private decodeTokenService: DecodeTokenService, private dataShareService: DataShareService) {
    this.options = [
      'Bill as per Approval',
      'Reject'
    ]
    this.tripOptions = [
      'Correct',
      'Wrong'
    ];
    this.tripTypes = [
      'Own Transport',
      'Other Transporter',
      'Trip only in Keris',
      'Trip not generated',
      'Trip not open in keris'
    ];
    this.createForm();
    this.transportBillVerificationStatus = data;
    this.transportBillVerificationForm = this.fb.group({
      billNumber: [this.transportBillVerificationStatus.billNumber],
      vendorNameStatus: [this.transportBillVerificationStatus.vendorNameStatus],
      dieselChargesStatus: [this.transportBillVerificationStatus.dieselChargesStatus],
      gstAmountStatus: [this.transportBillVerificationStatus.gstAmountStatus],
      grandTotalStatus: [this.transportBillVerificationStatus.grandTotalStatus],
      vehicleCapacityDifference: [this.transportBillVerificationStatus.vehicleCapacityDifference],
      remarks: [this.transportBillVerificationStatus.remarks],
      vendorCode: [this.transportBillVerificationStatus.vendorCode],
      reverified: [this.transportBillVerificationStatus.reverified],
      billCategory: [this.transportBillVerificationStatus.billCategory],
      tripVerificationStatuses: this.fb.array([])
    });
    let tripVerificationStatusesControl = <FormArray>this.transportBillVerificationForm.get('tripVerificationStatuses');

    this.transportBillVerificationStatus.tripVerificationStatuses.forEach((tripVerificationStatus:any) => {
      tripVerificationStatusesControl.push(this.fb.group({
        tripNumber: [tripVerificationStatus.tripNumber],
        tripNumberStatus: [tripVerificationStatus.tripNumberStatus],
        toLocationStatus: [tripVerificationStatus.toLocationStatus],
        quantityStatus: [tripVerificationStatus.quantityStatus],
        vehicleCapacityStatus: [tripVerificationStatus.vehicleCapacityStatus],
        freightRateStatus: [tripVerificationStatus.freightRateStatus],
        freightRateDifference: [tripVerificationStatus.freightRateDifference],
        lrDateStatus: [tripVerificationStatus.lrDateStatus],
        tollChargesStatus: [tripVerificationStatus.tollChargesStatus],
        loadingUnloadingChargesStatus: [tripVerificationStatus.loadingUnloadingChargesStatus],
        twoPointChargesStatus: [tripVerificationStatus.twoPointChargesStatus],
        detentionAmountStatus: [tripVerificationStatus.detentionAmountStatus],
        odaChargesStatus: [tripVerificationStatus.odaChargesStatus],
        ddChargesStatus: [tripVerificationStatus.ddChargesStatus],
        otherChargesStatus: [tripVerificationStatus.otherChargesStatus],
        fromLocationStatus: [tripVerificationStatus.fromLocationStatus],
        higherLocation: [tripVerificationStatus.higherLocation],
        higherLocationStatus: [tripVerificationStatus.higherLocationStatus],
        remarks: [tripVerificationStatus.remarks],
        tripOption: [tripVerificationStatus.tripOption],
        tripType: [tripVerificationStatus.tripType],
        reportingDateAndTime: [tripVerificationStatus.reportingDateAndTime, Validators.pattern(this.dateAndTimePattern)],
        unloadingDateAndTime: [tripVerificationStatus.unloadingDateAndTime, Validators.pattern(this.dateAndTimePattern)]
      }))
    });
  }

  ngOnInit() {
    this.isAdmin = false;
    this.decodeTokenService.decodeToken();
    const role = this.decodeTokenService.getRole();
    if (role === 'Admin') {
    this.isAdmin = true;
    }
  }
  createForm() {
    this.transportBillVerificationForm = this.fb.group({
      billNumber: [''],
      vendorNameStatus: [''],
      dieselChargesStatus: [''],
      gstAmountStatus: [''],
      grandTotalStatus: [''],
      vehicleCapacityDifference: [''],
      remarks: [''],
      vendorCode: [''],
      reverified: [''],
      billCategory: [''],
      tripVerificationStatuses: this.fb.array([])
    });
    (<FormArray>this.transportBillVerificationForm.get('tripVerificationStatuses')).push(this.fb.group({
      tripNumber: [''],
      tripNumberStatus: [''],
      toLocationStatus: [''],
      quantityStatus: [''],
      vehicleCapacityStatus: [''],
      freightRateStatus: [''],
      freightRateDifference: [''],
      lrDateStatus: [''],
      tollChargesStatus: [''],
      loadingUnloadingChargesStatus: [''],
      twoPointChargesStatus: [''],
      detentionAmountStatus: [''],
      odaChargesStatus: [''],
      ddChargesStatus: [''],
      otherChargesStatus: [''],
      fromLocationStatus: [''],
      higherLocation: ['', Validators.required],
      higherLocationStatus: [''],
      remarks: [''],
      tripOption: [''],
      tripType: [''],
      unloadingDateAndTime: ['', Validators.pattern(this.dateAndTimePattern)],
      reportingDateAndTime: ['', Validators.pattern(this.dateAndTimePattern)]
    }));
  }

  reverify(transportBillVerificationForm: any) {
    this._data.reVerifyTransportBill(transportBillVerificationForm.value)
      .subscribe((res :any)=> {
        if (res) {
          console.log(res);
          this.getTransportBillVerificationStatus(res);
          this.transportBillVerificationStatus.dieselChargesStatus = res.dieselChargesStatus;
          this.transportBillVerificationStatus.gstAmountStatus = res.gstAmountStatus;
          this.transportBillVerificationStatus.grandTotalStatus = res.grandTotalStatus;
          this.transportBillVerificationStatus.vehicleCapacityDifference = res.vehicleCapacityDifference;
          this.transportBillVerificationStatus.remarks = res.remarks;
          this.transportBillVerificationStatus.reverified = res.reverified;
        }
        // tslint:disable-next-line:no-unused-expression
      }, (error : any) => {
        this.openDialog(error._body);
      });
  }
  onSubmit() {
    if(this.transportBillVerificationForm?.valid) {
      this._data.submitTripVerificationStatus(this.transportBillVerificationForm.value)
      .subscribe((res:any) => {
        if (res) {
          console.log(res);
          this.onSubmitEvent.emit(res);
          this.openDialog(res.message);
        }
        // tslint:disable-next-line:no-unused-expression
      }, (error : any) => {
        this.openDialog(error._body);
      });
    } else {
      this.openDialog('Please fill all the fields which are marked in red.')
    }

  }
  cancel(): void {
    this.dialogRef.close();
  }
  openDialog(dataValue: string): void {
    const dialogRef = this.dialog.open(AlertdialogComponent, {
      width: '380px',
      data: dataValue
    });
    dialogRef.afterClosed().subscribe((result :any)=> {
    });
  }
  getTransportBillVerificationStatus(res :any) {
    this.transportBillVerificationForm = this.fb.group({
      billNumber: [res.billNumber],
      vendorNameStatus: [res.vendorNameStatus],
      dieselChargesStatus: [res.dieselChargesStatus],
      gstAmountStatus: [res.gstAmountStatus],
      grandTotalStatus: [res.grandTotalStatus],
      vehicleCapacityDifference: [res.vehicleCapacityDifference],
      remarks: [res.remarks],
      vendorCode: [res.vendorCode],
      reverified: [res.reverified],
      billCategory: [res.billCategory],
      tripVerificationStatuses: this.fb.array([])
    });
    res.tripVerificationStatuses.forEach((tripVerificationStatus : any) => {
      (<FormArray>this.transportBillVerificationForm?.get('tripVerificationStatuses')).push(this.fb.group({
        tripNumber: [tripVerificationStatus.tripNumber],
        tripNumberStatus: [tripVerificationStatus.tripNumberStatus],
        toLocationStatus: [tripVerificationStatus.toLocationStatus],
        quantityStatus: [tripVerificationStatus.quantityStatus],
        vehicleCapacityStatus: [tripVerificationStatus.vehicleCapacityStatus],
        freightRateStatus: [tripVerificationStatus.freightRateStatus],
        freightRateDifference: [tripVerificationStatus.freightRateDifference],
        lrDateStatus: [tripVerificationStatus.lrDateStatus],
        tollChargesStatus: [tripVerificationStatus.tollChargesStatus],
        loadingUnloadingChargesStatus: [tripVerificationStatus.loadingUnloadingChargesStatus],
        twoPointChargesStatus: [tripVerificationStatus.twoPointChargesStatus],
        detentionAmountStatus: [tripVerificationStatus.detentionAmountStatus],
        odaChargesStatus: [tripVerificationStatus.odaChargesStatus],
        ddChargesStatus: [tripVerificationStatus.ddChargesStatus],
        otherChargesStatus: [tripVerificationStatus.otherChargesStatus],
        fromLocationStatus: [tripVerificationStatus.fromLocationStatus],
        higherLocation: [tripVerificationStatus.higherLocation, Validators.required],
        higherLocationStatus: [tripVerificationStatus.higherLocationStatus],
        remarks: [tripVerificationStatus.remarks],
        tripOption: [tripVerificationStatus.tripOption],
        tripType: [tripVerificationStatus.tripType],
        unloadingDateAndTime: [tripVerificationStatus.unloadingDateAndTime, Validators.pattern(this.dateAndTimePattern)],
        reportingDateAndTime: [tripVerificationStatus.reportingDateAndTime, Validators.pattern(this.dateAndTimePattern)]
      }));
    });
  }

}
