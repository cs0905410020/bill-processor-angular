import { Component, OnInit, Inject, Input } from '@angular/core';
import { AllservicesService } from '../../allservices.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AlertdialogComponent } from '../../alertdialog/alertdialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-purchase-service-details',
  templateUrl: './view-purchase-service-details.component.html',
  styleUrls: ['./view-purchase-service-details.component.css']
})
export class ViewPurchaseServiceDetailsComponent {

  dataset: any;
  error: string='';
  data: any;
  @Input() purchaseService: any;
  constructor(private _data: AllservicesService, private route: ActivatedRoute, public dialog: MatDialog) {
    this.route.queryParamMap.subscribe(params => {
      this.data = {...params.keys, ...params};
    });
    this.getPurchaseServiceDetails(this.data.params);
  }
  getPurchaseServiceDetails(purchaseService:any) {
        this.dataset = purchaseService;
  }
}
