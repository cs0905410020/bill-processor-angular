import { Component, OnInit, Inject, Input } from '@angular/core';
import { AllservicesService } from '../../allservices.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AlertdialogComponent } from '../../alertdialog/alertdialog.component';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-view-cfa-bill-register-details',
  templateUrl: './view-cfa-bill-register-details.component.html',
  styleUrls: ['./view-cfa-bill-register-details.component.css']
})
export class ViewCfaBillRegisterDetailsComponent {

  dataset: any;
  error: string='';
  data: any;
  @Input() cfaBill: any;
  constructor(private _data: AllservicesService, public dialog: MatDialog,  private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      this.data = {...params.keys, ...params};
    });
    this.getCfaBillDetails(this.data.params);
  }



  getCfaBillDetails(cfaBill:any) {
        this.dataset = cfaBill;
      }
}
