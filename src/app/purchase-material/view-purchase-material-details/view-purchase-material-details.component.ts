import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AllservicesService } from '../../allservices.service';
import { AlertdialogComponent } from '../../alertdialog/alertdialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-purchase-material-details',
  templateUrl: './view-purchase-material-details.component.html',
  styleUrls: ['./view-purchase-material-details.component.css']
})
export class ViewPurchaseMaterialDetailsComponent {
  dataset: any;
  error: string='';
  data: any;
  constructor(private _data: AllservicesService, public dialog: MatDialog, private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      this.data = {...params.keys, ...params};
    });
    this.getPurchaseMaterialDetails(this.data.params);
  }
  getPurchaseMaterialDetails(purchaseMaterial : any) {
        this.dataset = purchaseMaterial;
  }
}
