import { Component, OnInit } from '@angular/core';
import { TripModalComponent } from '../trip-modal/trip-modal.component';
import { AllservicesService } from '../allservices.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';

@Component({
  selector: 'app-verify-vendor-bill',
  templateUrl: './verify-vendor-bill.component.html',
  styleUrls: ['./verify-vendor-bill.component.css']
})
export class VerifyVendorBillComponent implements OnInit {

  billNumber: string='';
  vendorCode: string='';
  selectedBillCategory: string='';
  billCategories = [
    {value: 'FTL'},
    {value: 'Parcel'}
  ];
  constructor(private _data: AllservicesService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  verifyBill() {
    this._data.verifyTransportBill(this.billNumber, this.vendorCode, this.selectedBillCategory)
    .subscribe((res :any) => {
      if (res) {
        console.log(res);
        this.openTripDialog(res);
      }
      // tslint:disable-next-line:no-unused-expression
    }, (error :any)=> {
      this.openDialog(error._body);
    });
  }

  openTripDialog(data :any): void {
    const dialogRef = this.dialog.open(TripModalComponent, {
      width: '80vw',
      data: data
    });
    dialogRef.afterClosed().subscribe((res :any) => {
      console.log('The dialog was closed');
    });
  }
  openDialog(dataValue: string): void {
    const dialogRef = this.dialog.open(AlertdialogComponent, {
      width: '380px',
      data: dataValue
    });
    dialogRef.afterClosed().subscribe((res :any) => {
      console.log('The dialog was closed'+res);
    });
  }

}
