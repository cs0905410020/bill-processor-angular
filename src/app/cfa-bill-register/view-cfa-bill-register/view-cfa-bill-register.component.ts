import { Component, OnInit, Inject } from '@angular/core';
import { ViewCfaBillRegisterDetailsComponent } from '../view-cfa-bill-register-details/view-cfa-bill-register-details.component';
import { EditCfaBillRegisterComponent } from '../edit-cfa-bill-register/edit-cfa-bill-register.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AllservicesService } from '../../allservices.service';
import { Overlay } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { AlertdialogComponent } from '../../alertdialog/alertdialog.component';
import { DecodeTokenService } from '../../services/decode-token.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileDownloadService } from '../../services/file-download.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-view-cfa-bill-register',
  templateUrl: './view-cfa-bill-register.component.html',
  styleUrls: ['./view-cfa-bill-register.component.css']
})
export class ViewCfaBillRegisterComponent implements OnInit {

  cfaBillList = [];
  error: string='';
  dialogRef: any;
  isAdmin: boolean = false;
  filteredCfaBillList :any = [];
  totalItem: any;
  numberOfElement: any;
  totalPages: number=1;
  currentPage: number=1;
  vendorCode: any;
  isPagination: boolean;
  billNumber: any;
  page: any;
  constructor(public dialog: MatDialog, private _data: AllservicesService, private overlay: Overlay, private router: Router,
  private decodeTokenService: DecodeTokenService, private loaderService: NgxSpinnerService,
  private fileDownloadService: FileDownloadService) {
      this.getCfaServiceData(1);
      this.isPagination = true;
  }


    getCfaServiceData(event:any) {
      this.loaderService.show();
      this._data.getCfaBillList(event).subscribe((data:any) => {
        if (data) {
          this.loaderService.hide();
          this.cfaBillList = data.content;
          this.filteredCfaBillList = this.cfaBillList;
          this.loaderService.hide();
          this.totalItem = data.totalElements;
          this.numberOfElement = data.numberOfElements;
          this.totalPages = data.totalPages;
          this.currentPage = event;
        }
        // tslint:disable-next-line:no-unused-expression
      }, (error : any) => {
        this.loaderService.hide();
        this.openDialog('Unable to get Data. Please try again!!');
      });
      return event;
    }

    viewCfaBill(cfaBill :any) {
      this.router.navigate(['/view-cfa-bill'], { queryParams: cfaBill });
    }
    editCfaBill(cfaBill:any) {
      this.router.navigate(['/edit-cfa-bill'], { queryParams: cfaBill });
    }
    deleteCfaBill(serialNumber:any) {
      if (serialNumber) {
        this.loaderService.show();
        this._data.deleteCfaBill(serialNumber).subscribe((res :any)=> {
          if (res) {
            this.loaderService.hide();
            this.openDialog('Cfa Bill deleted successfully');
          }
        },
      (error : any) => {
        this.loaderService.hide();
        this.openDialog('Please try again.');
      });
      }
    }
    onSearchChange(filterBy: string) {
      filterBy = filterBy.toLocaleLowerCase();
      // tslint:disable-next-line:max-line-length
      this.filteredCfaBillList = this.cfaBillList.filter((tranportBill:any) => tranportBill.billNumber.toLocaleLowerCase().indexOf(filterBy) !== -1
      || tranportBill.transporterCode.toLocaleLowerCase().indexOf(filterBy) !== -1 || tranportBill.status.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
    onSearch(billNumber:any) {
      this.billNumber = '';
      if (billNumber) {
        this.loaderService.show();
        this._data.getCfaBillDetailsByBillNumber(billNumber).subscribe((res:any) => {
          if (res) {
            this.loaderService.hide();
            this.cfaBillList = res;
            this.filteredCfaBillList = res;
            this.isPagination = false;
          }else {
            this.loaderService.hide();
            this.openDialog(`No CFA bill exist with Bill Number ${billNumber}`);
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
  downloadCfaBillExcelFile() {
    this.loaderService.show();
    this.fileDownloadService.getCfaBillExcelFile().subscribe((res :any)=> {
      console.log(res);
      FileSaver.saveAs(res, 'CFABillRegister');
      this.loaderService.hide();
    }, (err : any) => {
      this.loaderService.hide();
      this.openDialog('Unable to download excel file. Please try again!!');
    });
  }

  getStatusAsOnDate(billRecivedDate: Date) {
    console.log('Hi');
    return Math.floor((new Date().getTime() - new Date(billRecivedDate).getTime()) / (1000 * 60 * 60 * 24));
  }
  downloadCfaBillExcelFileByDays() {
    this.loaderService.show();
    this.fileDownloadService.getCfaBillExcelFileByDays().subscribe((res:any) => {
      console.log(res);
      FileSaver.saveAs(res, 'CFABillReportByDays');
      this.loaderService.hide();
    }, (err : any) => {
      this.loaderService.hide();
      this.openDialog('Unable to download excel file. Please try again!!');
    });
  }
}
