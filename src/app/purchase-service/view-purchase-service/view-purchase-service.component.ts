import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { ViewPurchaseServiceDetailsComponent } from '../view-purchase-service-details/view-purchase-service-details.component';
import { EditPurchaseServiceComponent } from '../edit-purchase-service/edit-purchase-service.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AllservicesService } from '../../allservices.service';
import { Overlay } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { AlertdialogComponent } from '../../alertdialog/alertdialog.component';
import { DecodeTokenService } from '../../services/decode-token.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as FileSaver from 'file-saver';
import { FileDownloadService } from '../../services/file-download.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-view-purchase-service',
  templateUrl: './view-purchase-service.component.html',
  styleUrls: ['./view-purchase-service.component.css']
})
export class ViewPurchaseServiceComponent implements OnInit {

  purchaseServiceList :any = [];
  filteredPurchaseServiceList :any = [];
  totalItem: any;
  numberOfElement: any;
  isAdmin: boolean = false;
  error: string='';
  totalPages: number=1;
  currentPage: number=1;
  isPagination: boolean;
  billNumber: any;
  page: any;
  statuses= ['Open', 'Closed', 'Rejected'];
  periods= ['All', '7', '10', '12', '15'];
  selectedStatus: string = '';
  selectedPeriod: any;
  selectedFile: File |null = null;
  constructor(public dialog: MatDialog, private _data: AllservicesService, private overlay: Overlay, private router: Router,
  private decodeTokenService: DecodeTokenService, private loaderService: NgxSpinnerService,
  private fileDownloadService: FileDownloadService, private fileUploadService: FileUploadService) {
    this. getPurchaseServiceData(1);
    this.isPagination = true;
    }


    getPurchaseServiceData(event : any) {
      this.loaderService.show();
      this._data.getPurchaseServiceList(event).subscribe((data:any) => {
        if (data) {
          this.loaderService.hide();
          this.purchaseServiceList = data.content;
          this.filteredPurchaseServiceList = this.purchaseServiceList;
          this.loaderService.hide();
          this.totalItem = data.totalElements;
          this.numberOfElement = data.numberOfElements;
          this.totalPages = data.totalPages;
          this.currentPage = event;
        }
        // tslint:disable-next-line:no-unused-expression
      }, (error : any) => {
        this.loaderService.hide();
        this.openDialog('Unable to get data. Please try Again!!');
      });
      return event;
    }

  viewPurchaseService(purchaseService :any) {
    this.router.navigate(['view-purchase-service'], { queryParams: purchaseService});
  }

  editPurchaseService(purchaseService :any) {
    this.router.navigate(['/edit-purchase-service'], { queryParams: purchaseService});
  }
  deletePurchaseService(serialNumber :any) {
    if (serialNumber) {
      this.loaderService.show();
      this._data.deletePurchaseService(serialNumber).subscribe((res:any) => {
        if (res) {
          this.loaderService.hide();
          this.openDialog('Purchase Service deleted successfully');
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
    this.filteredPurchaseServiceList = this.purchaseServiceList.filter((tranportBill :any) => tranportBill.billNumber.toLocaleLowerCase().indexOf(filterBy) !== -1
    || tranportBill.vendorCode.toLocaleLowerCase().indexOf(filterBy) !== -1 || tranportBill.status.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  onSearch(billNumber :any) {
    this.billNumber = '';
    if (billNumber) {
      this.loaderService.show();
      this._data.getPurchaseServiceByBillNumber(billNumber).subscribe((res:any) => {
        if (res) {
          this.loaderService.hide();
          this.purchaseServiceList = res;
          this.filteredPurchaseServiceList = res;
          this.isPagination = false;
        }else {
          this.loaderService.hide();
          this.openDialog(`No purchase service exist with Bill Number ${billNumber}`);
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
    downloadPurchasServiceExcelFile() {
      this.loaderService.show();
      this.fileDownloadService.getPurchaseServiceExcelFile().subscribe((res:any) => {
        console.log(res);
        FileSaver.saveAs(res, 'PurchaseService');
        this.loaderService.hide();
      }, (err : any) => {
        this.loaderService.hide();
        this.openDialog('Unable to download excel file. Please try again!!');
      });
    }
    getStatusAsOnDate(billRecivedDate: Date) {
      return Math.floor((new Date().getTime() - new Date(billRecivedDate).getTime()) / (1000 * 60 * 60 * 24));
    }
    sendScannedBill(fileInput :any, serialNumber :any) {
        if (fileInput.files && fileInput.files[0]) {
          this.loaderService.show();
          this.selectedFile = fileInput.files[0];
          this.fileUploadService.sendScannedBill(this.selectedFile as File, serialNumber);
        }
    }
    downloadPurchasServiceExcelFileByDays() {
      this.loaderService.show();
      this.fileDownloadService.getPurchaseServiceExcelFileByDays().subscribe((res:any) => {
        console.log(res);
        FileSaver.saveAs(res, 'PurchaseServiceReportByDays');
        this.loaderService.hide();
      }, (err : any) => {
        this.loaderService.hide();
        this.openDialog('Unable to download excel file. Please try again!!');
      });
    }
}
