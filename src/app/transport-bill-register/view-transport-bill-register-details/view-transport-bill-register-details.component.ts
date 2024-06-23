import { Component, OnInit, Inject, Input } from '@angular/core';
import { AllservicesService } from '../../allservices.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AlertdialogComponent } from '../../alertdialog/alertdialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-transport-bill-register-details',
  templateUrl: './view-transport-bill-register-details.component.html',
  styleUrls: ['./view-transport-bill-register-details.component.css']
})
export class ViewTransportBillRegisterDetailsComponent {
  dataset: any;
  error: string='';
  data: any;
  @Input() transportBill: any;
  constructor(private _data: AllservicesService, private dialog: MatDialog,  private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      this.data = {...params.keys, ...params};
    });
    this.getTransportBillDetails(this.data.params);
  }
  getTransportBillDetails(transportBill : any) {
        this.dataset = transportBill;
  }
}
