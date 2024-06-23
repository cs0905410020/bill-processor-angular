import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewPurchaseMaterialDetailsComponent } from '../view-purchase-material-details/view-purchase-material-details.component';
import { EditPurchaseMaterialComponent } from '../edit-purchase-material/edit-purchase-material.component';
import { AllservicesService } from '../../allservices.service';
import { Overlay } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { AlertdialogComponent } from '../../alertdialog/alertdialog.component';
import { DecodeTokenService } from '../../services/decode-token.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileDownloadService } from '../../services/file-download.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-view-purchase-material',
  templateUrl: './view-purchase-material.component.html',
  styleUrls: ['./view-purchase-material.component.css']
})
export class ViewPurchaseMaterialComponent implements OnInit {
  purchaseMaterialList:any = [];
  filteredPurchaseMaterialList :any = [];
  totalItem: any;
  numberOfElement: any;
  isAdmin: boolean = false;
  error: string='';
  totalPages: number =1;
  currentPage: number = 1;
  isPagination: boolean;
  billNumber: any;
  page: any;
  constructor(public dialog: MatDialog, private _data: AllservicesService, private overlay: Overlay, private router: Router,
  private decodeTokenService: DecodeTokenService, private loaderService: NgxSpinnerService,
  private fileDownloadService: FileDownloadService) {
    this.isPagination = true;
    this. getPurchaseMaterialData(1);
    }


    getPurchaseMaterialData(event : any) {
     this.loaderService.show();
      this._data.getPurchaseMaterialList(event).subscribe((data:any) => {
        if (data) {
          this.loaderService.hide();
          this.purchaseMaterialList = data.content;
          this.filteredPurchaseMaterialList = this.purchaseMaterialList;
          this.loaderService.hide();
          this.totalItem = data.totalElements;
          this.numberOfElement = data.numberOfElements;
          this.totalPages = data.totalPages;
          this.currentPage = event;
        }
        // tslint:disable-next-line:no-unused-expression
      }, (error : any) => {
        this.openDialog('Unable to fetch  data. Please try again');
      });
      return event;
    }

  viewPurchaseMaterial(purchaseMaterial : any) {
    this.router.navigate(['/view-purchase-material'], { queryParams: purchaseMaterial});
  }

  editPurchaseMaterial(purchaseMaterial : any) {
    this.router.navigate(['/edit-purchase-material'], { queryParams: purchaseMaterial});
  }
  deletePurchaseMaterial(serialNumber :any) {
    if (serialNumber) {
      this.loaderService.show();
      this._data.deletePurchaseMaterial(serialNumber).subscribe((res:any) => {
        if (res) {
          this.loaderService.hide();
          this.openDialog('Purchase Material deleted successfully');
        }
      },
    (error : any) => {
      this.loaderService.hide();
      this.openDialog('Please try again.');
    });
    }
  }
  openDialog(dataValue: string): void {
    const dialogRef = this.dialog.open(AlertdialogComponent, {
      width: '380px',
      data: dataValue
    });
  }
  ngOnInit(): void {
    this.loaderService.show();
    this.isAdmin = false;
    this.decodeTokenService.decodeToken();
    const role = this.decodeTokenService.getRole();
    if (role === 'Admin') {
    this.isAdmin = true;
    }
  }
  onSearchChange(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    // tslint:disable-next-line:max-line-length
    this.filteredPurchaseMaterialList = this.purchaseMaterialList.filter((tranportBill:any) => tranportBill.billNumber.toLocaleLowerCase().indexOf(filterBy) !== -1
    || tranportBill.vendorCode.toLocaleLowerCase().indexOf(filterBy) !== -1 || tranportBill.status.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  onSearch(billNumber : any) {
    this.billNumber = '';
    if (billNumber) {
      this.loaderService.show();
      this._data.getPurchaseMaterialByBillNumber(billNumber).subscribe((res:any) => {
        if (res) {
          this.loaderService.hide();
          this.purchaseMaterialList = res;
          this.filteredPurchaseMaterialList = res;
          this.isPagination = false;
        }else {
          this.loaderService.hide();
          this.openDialog(`No purchase material exist with Bill Number ${billNumber}`);
        }
      },
        (error : any) => {
          this.loaderService.hide();
          this.openDialog('Unable to get Data. Please try again!!');
        });
    }else {
      this.openDialog('Please enter Bill Number to search');
    }
    }
    downloadPurchaseMaterialExcelFile() {
      this.loaderService.show();
      this.fileDownloadService.getPurchaseMaterialExcelFile().subscribe((res:any) => {
        console.log(res);
        FileSaver.saveAs(res, 'PurchaseMaterial');
        this.loaderService.hide();
      }, (err : any) => {
        this.loaderService.hide();
        this.openDialog('Unable to download excel file. Please try again!!');
      });
    }
    getStatusAsOnDate(billRecivedDate: Date) {
      return Math.floor((new Date().getTime() - new Date(billRecivedDate).getTime()) / (1000 * 60 * 60 * 24));
    }
    downloadPurchaseMaterialExcelFileByDays() {
      this.loaderService.show();
      this.fileDownloadService.getPurchaseMaterialExcelFileByDays().subscribe((res:any) => {
        console.log(res);
        FileSaver.saveAs(res, 'PurchaseMaterialReportByDays');
        this.loaderService.hide();
      }, (err : any) => {
        this.loaderService.hide();
        this.openDialog('Unable to download excel file. Please try again!!');
      });
    }
}
