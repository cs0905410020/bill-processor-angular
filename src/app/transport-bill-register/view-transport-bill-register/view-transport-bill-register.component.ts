import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// tslint:disable-next-line:max-line-length
import { ViewTransportBillRegisterDetailsComponent } from '../view-transport-bill-register-details/view-transport-bill-register-details.component';
import { EditTransporterBillRegisterComponent } from '../edit-transporter-bill-register/edit-transporter-bill-register.component';
import { AllservicesService } from '../../allservices.service';
import { Overlay } from '@angular/cdk/overlay';
import { Router } from '@angular/router';
import { DecodeTokenService } from '../../services/decode-token.service';
import { AlertdialogComponent } from '../../alertdialog/alertdialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import * as FileSaver from 'file-saver';
import { FileDownloadService } from '../../services/file-download.service';

@Component({
  selector: 'app-view-transport-bill-register',
  templateUrl: './view-transport-bill-register.component.html',
  styleUrls: ['./view-transport-bill-register.component.css']
})
export class ViewTransportBillRegisterComponent implements OnInit {

  tranportBillList:any = [];
  filteredTranportBillList:any = [];
  totalItem: any;
  numberOfElement: any;
  isAdmin: boolean =false;
  error: string ='';
  totalPages: number=1;
  currentPage: number=1;
  isPagination: boolean;
  billNumber: any;
  page: any;
  dueStartDate: Date = new Date();
  dueEndDate: Date= new Date();
  reportTypes = [
    {value: 'Dispatch Register'},
    {value: 'Due Report'},
    {value: 'Variance Report'},
    {value: 'Freight Rate Approval'},
    {value: 'Detention Report'},
    {value: 'Vendor Wise Trip Details'}
  ];
  reportTypeSelected: string='';
  constructor(public dialog: MatDialog, private _data: AllservicesService, private overlay: Overlay, private router: Router,
  private decodeTokenService: DecodeTokenService, private loaderService: NgxSpinnerService,
  private fileDownloadService: FileDownloadService) {
    this.isPagination = true;
    this.getTransportBillData(1);
    }

    getTransportBillData(event : any) {
      this.loaderService.show();
      this._data.getTransportBillList(event).subscribe((data :any)=> {
        if (data) {
          this.loaderService.hide();
          this.tranportBillList = data.content;
          this.filteredTranportBillList = this.tranportBillList;
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
    openDialog(dataValue: string): void {
      const dialogRef = this.dialog.open(AlertdialogComponent, {
        width: '380px',
        data: dataValue
      });
      dialogRef.afterClosed().subscribe((result :any) => {
      });
    }
    onSearchChange(filterBy: string) {
      filterBy = filterBy.toLocaleLowerCase();
      // tslint:disable-next-line:max-line-length
      this.filteredTranportBillList = this.tranportBillList.filter((tranportBill:any) => tranportBill.billNumber.toLocaleLowerCase().indexOf(filterBy) !== -1
      || tranportBill.transporterCode.toLocaleLowerCase().indexOf(filterBy) !== -1 || tranportBill.status.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }
    viewTransportBill(transportBill: any) {
      this.router.navigate(['/view-transport-bill'], { queryParams: transportBill });
    }
    editTransportBill(transportBill : any) {
      this.router.navigate(['/edit-transport-bill'], { queryParams: transportBill});
    }
    deleteTransportBill(serialNumber : any) {
        if (serialNumber) {
          this.loaderService.show();
          this._data.deleteTransportBill(serialNumber).subscribe((res :any) => {
            if (res) {
              this.loaderService.hide();
              this.openDialog('Transport Bill deleted successfully');
            }
          },
        (error : any) => {
          this.loaderService.hide();
          this.openDialog('Please try again.');
        });
        }
    }
    onSearch(billNumber: any) {
      this.billNumber = '';
      if (billNumber) {
        this.loaderService.show();
        this._data.getTransportBillDetailsByBillNumber(billNumber).subscribe((res :any) => {
          if (res) {
            this.loaderService.hide();
            this.tranportBillList = res;
            this.filteredTranportBillList = res;
            this.isPagination = false;
          }else {
            this.loaderService.hide();
            this.openDialog(`No transport bill exist with Bill Number ${billNumber}`);
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
  ngOnInit(): void {
    this.loaderService.show();
    this.isAdmin = false;
    this.decodeTokenService.decodeToken();
    const role = this.decodeTokenService.getRole();
    if (role === 'Admin') {
    this.isAdmin = true;
    }
  }
  downloadTransportBillExcelFile() {
    this.loaderService.show();
    this.fileDownloadService.getTransportBillExcelFile().subscribe((res :any) => {
      console.log(res);
      FileSaver.saveAs(res, 'TransportBill');
      this.loaderService.hide();
    }, (err : any) => {
      this.loaderService.hide();
      this.openDialog('Unable to download excel file. Please try again!!');
    });
  }
  getStatusAsOnDate(billRecivedDate: Date) {
    return Math.floor((new Date().getTime() - new Date(billRecivedDate).getTime()) / (1000 * 60 * 60 * 24));
  }
  downloadTransportBillExcelFileByDays() {
    this.loaderService.show();
    this.fileDownloadService.getTransportBillExcelFileByDays().subscribe((res :any) => {
      console.log(res);
      FileSaver.saveAs(res, 'TransportBillReportByDays');
      this.loaderService.hide();
    }, (err : any) => {
      this.loaderService.hide();
      this.openDialog('Unable to download excel file. Please try again!!');
    });
  }

  downloadTransportBillReports() {
    if('Due Report' ==this.reportTypeSelected) {
      this.loaderService.show();
    this.fileDownloadService.getTransportBillDueReport(this.dueStartDate.toUTCString(), this.dueEndDate.toUTCString()).subscribe((res :any) => {
      console.log(res);
      FileSaver.saveAs(res, 'TransportBillDueReport');
      this.loaderService.hide();
    }, (err : any) => {
      this.loaderService.hide();
      this.openDialog('Unable to download excel file. Please try again!!');
    });
    } else if('Dispatch Register' ==this.reportTypeSelected) {
      this.loaderService.show();
    this.fileDownloadService.getDispatchMasterExcelFile(this.dueStartDate.toUTCString(), this.dueEndDate.toUTCString()).subscribe((res :any) => {
      console.log(res);
      FileSaver.saveAs(res, 'TransportBillDispatchRegister');
      this.loaderService.hide();
    }, (err : any) => {
      this.loaderService.hide();
      this.openDialog('Unable to download excel file. Please try again!!');
    });
    } else if('Variance Report' ==this.reportTypeSelected) {
      this.loaderService.show();
      this.fileDownloadService.getTripVariationReport(this.dueStartDate.toUTCString(), this.dueEndDate.toUTCString()).subscribe((res :any) => {
        console.log(res);
        FileSaver.saveAs(res, 'TransportVarianceReport');
        this.loaderService.hide();
      }, (err : any) => {
        this.loaderService.hide();
        this.openDialog('Unable to download excel file. Please try again!!');
      });
    } else if('Freight Rate Approval' ==this.reportTypeSelected) {
      this.loaderService.show();
      this.fileDownloadService.getFreightRateApprovalReport(this.dueStartDate.toUTCString(), this.dueEndDate.toUTCString()).subscribe((res :any) => {
        console.log(res);
        FileSaver.saveAs(res, 'FreightRateStatusApprovalReport');
        this.loaderService.hide();
      }, (err : any) => {
        this.loaderService.hide();
        this.openDialog('Unable to download excel file. Please try again!!');
      });
    }
    else if('Detention Report' ==this.reportTypeSelected) {
      this.loaderService.show();
      this.fileDownloadService.getTransportBillDetentionReport(this.dueStartDate.toUTCString(), this.dueEndDate.toUTCString()).subscribe((res :any) => {
        console.log(res);
        FileSaver.saveAs(res, 'DetentionReport');
        this.loaderService.hide();
      }, (err : any) => {
        this.loaderService.hide();
        this.openDialog('Unable to download excel file. Please try again!!');
      });
    }
    else if('Vendor Wise Trip Details' ==this.reportTypeSelected) {
      this.loaderService.show();
      this.fileDownloadService.getTransportBilTripDetails(this.dueStartDate.toUTCString(), this.dueEndDate.toUTCString()).subscribe((res :any) => {
        console.log(res);
        FileSaver.saveAs(res, 'VendorWiseTripDetails');
        this.loaderService.hide();
      }, (err : any) => {
        this.loaderService.hide();
        this.openDialog('Unable to download excel file. Please try again!!');
      });
    }



  }

  downloadCfaContract() {
    this.loaderService.show();
    this.fileDownloadService.getCfaContractExcelFile().subscribe((res :any) => {
      console.log(res);
      FileSaver.saveAs(res, 'CfaContract');
      this.loaderService.hide();
    }, (err : any) => {
      this.loaderService.hide();
      this.openDialog('Unable to download excel file. Please try again!!');
    });
  }
  downloadTripMaster() {
    this.loaderService.show();
    this.fileDownloadService.getTripMasterExcelFile().subscribe((res :any) => {
      console.log(res);
      FileSaver.saveAs(res, 'TripMaster');
      this.loaderService.hide();
    }, (err : any) => {
      this.loaderService.hide();
      this.openDialog('Unable to download excel file. Please try again!!');
    });
  }
  downloadFreightMaster() {
    this.loaderService.show();
    this.fileDownloadService.getFreightMasterExcelFile().subscribe((res :any) => {
      console.log(res);
      FileSaver.saveAs(res, 'FreightMaster');
      this.loaderService.hide();
    }, (err : any) => {
      this.loaderService.hide();
      this.openDialog('Unable to download excel file. Please try again!!');
    });
  }
  downloadDieselMaster() {
    this.loaderService.show();
    this.fileDownloadService.getDieselMasterExcelFile().subscribe((res :any) => {
      console.log(res);
      FileSaver.saveAs(res, 'DieselIndex');
      this.loaderService.hide();
    }, (err : any) => {
      this.loaderService.hide();
      this.openDialog('Unable to download excel file. Please try again!!');
    });
  }
}
