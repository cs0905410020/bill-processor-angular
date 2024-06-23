import { Injectable, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TripModalComponent } from '../trip-modal/trip-modal.component';
import { FormGroup } from '@angular/forms';

@Injectable()
export class DataShareService {
  billAmount : number=1;
  editTransportBill : any;
  constructor( public dialog: MatDialog) { }

  public setBillAmount(billAmount : number) {
    this.billAmount = billAmount;
  }

  public getBillAmount() {
    return this.billAmount;
  }
}
