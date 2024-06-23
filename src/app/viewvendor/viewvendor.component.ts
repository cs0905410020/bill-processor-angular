import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ViewParticularVendor } from './view.component';
import { EditVendorComponent } from './edit.component';
import { AllservicesService } from '../allservices.service';
import { Overlay } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import * as FileSaver from 'file-saver';
import { FileDownloadService } from '../services/file-download.service';
import { Vendor } from '../vendor/vendor';

@Component({
  selector: 'app-viewvendor',
  templateUrl: './viewvendor.component.html',
  styleUrls: ['./viewvendor.component.css']
})
export class ViewvendorComponent implements OnInit {


  // tslint:disable-next-line:max-line-length
  vendorlists = [];
  filteredVendorLists :Vendor[] = [];
  totalItem: any;
  numberOfElement: any;
  error: string='';
  totalPages: number=1;
  currentPage: number=1;
  vendorCode: any;
  isPagination: boolean;
  page: any;
  constructor(public dialog: MatDialog, private _data: AllservicesService, private overlay: Overlay, private router: Router,
  private loaderService: NgxSpinnerService, private fileDownloadService: FileDownloadService) {
    this.getVendorData(1);
    this.isPagination = true;
  }

    getVendorData(event : any) {
      this.loaderService.show();
      this._data.getvendorlist(event).subscribe((data :any) => {
        if (data) {
          this.loaderService.hide();
          this.vendorlists = data.content;
          this.filteredVendorLists = this.vendorlists;
          this.totalItem = data.totalElements;
          this.numberOfElement = data.numberOfElements;
          this.totalPages = data.totalPages;
          this.currentPage = event;
          }
        // tslint:disable-next-line:no-unused-expression
      }, (error:any) => {
        this.loaderService.hide();
        this.openDialog('Unable to get Data. Please try again!!');
      });
      return event;
    }
    viewvendor(vendor : any) {
      this.router.navigate(['/view-vendor'], { queryParams: vendor});
    }
    editvendor(vendor : any) {
      this.router.navigate(['/edit-vendor'], { queryParams: vendor});
    }
  onSearchChange(filterBy: string) {
    filterBy = filterBy.toLocaleLowerCase();
    // tslint:disable-next-line:max-line-length
    this.filteredVendorLists = this.vendorlists.filter((vendor : any) => vendor.vendorCode.toLocaleLowerCase().indexOf(filterBy) !== -1
    || vendor.vendorName.toLocaleLowerCase().indexOf(filterBy) !== -1 || vendor.location.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }
  openDialog(dataValue: string): void {
    const dialogRef = this.dialog.open(AlertdialogComponent, {
      width: '380px',
      data: dataValue
    });
    dialogRef.afterClosed().subscribe((result : any) => {
    });
  }
  onSearch(vendorCode : any) {
    this.vendorCode = '';
    if (vendorCode) {
      this.loaderService.show();
      this._data.getVendorData(vendorCode, 'NA').subscribe((res : any) => {
        if (res) {
          this.loaderService.hide();
          this.vendorlists = res;
          this.filteredVendorLists = res;
          this.isPagination = false;
        }else {
          this.loaderService.hide();
          this.openDialog(`No vendor exist with vendor code ${vendorCode}`);
        }
      },
        (error : any) => {
          this.loaderService.hide();
          this.openDialog('Unable to get Data. Please try again!!');
        });
    }else {
      this.openDialog('Please enter Vendor Code to search');
    }
    }
    ngOnInit(): void {
      this.loaderService.show();
    }
    deleteVendor(vendorId : any) {
      if (vendorId) {
        this.loaderService.show();
        this._data.deleteVendor(vendorId).subscribe((res:any) => {
          if (res) {
            this.loaderService.hide();
            this.openDialog('Vendor Deleted successfully');
          }
        },
          (error : any) => {
        this.loaderService.hide();
        this.openDialog('Please try again.');
      });
      }
    }
    downloadVendorsExcelFile() {
      this.loaderService.show();
      this.fileDownloadService.getVendorExcelFile().subscribe((res:any) => {
        console.log(res);
        FileSaver.saveAs(res, 'Vendor');
        this.loaderService.hide();
      }, (err : any) => {
        this.loaderService.hide();
        this.openDialog('Unable to download excel file. Please try again!!');
      });
    }

}
