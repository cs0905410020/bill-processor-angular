import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
//import 'rxjs/Rx';
import { MatDialog } from '@angular/material/dialog';
import { AlertdialogComponent } from '../alertdialog/alertdialog.component';
import { DecodeTokenService } from './decode-token.service';
import { NgxSpinnerService } from 'ngx-spinner';
import {map, Observable} from "rxjs";

@Injectable()
export class FileUploadService {
  importUrl = 'http://localhost:8081/api/desktopapp/';
  ocrUrl = 'http://localhost:8085/getOcrData'
  error: string='';
  private headers2 = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });
  setAuthenticationHeader () {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });
    return headers;
  }
  constructor(private _http: HttpClient, public dialog: MatDialog, private decodeTokenService: DecodeTokenService,
     private loaderService: NgxSpinnerService) { }

uploadVendorFile(file: File) {
  console.log(file);
  const formData = new FormData();
  formData.append('vendorExcel', file, file.name);
  this._http.post(`${this.importUrl}vendor/importBulkVendors`, formData, { headers: this.setAuthenticationHeader() })
  .subscribe((res:any) => {
    console.log(res,'res')
    if (res.status === 201) {
      this.loaderService.hide();
      this.openDialog('Successfully Added');
    }
  },
  (error:any)=> {
    this.loaderService.hide();
    console.log(error);
    if (error.status === 409) {
      this.openDialog(`Vendor Codes ${error._body} already exist`);
    }else {
    this.openDialog('Please try again');
  }
  });
}
uploadCfaBillFile(file: File) {
  console.log(file);
  const formData = new FormData();
  formData.append('cfaBillExcel', file, file.name);
  this._http.post(`${this.importUrl}cfabill/importBulkCfaBills`, formData, { headers: this.setAuthenticationHeader() })
  .subscribe((res:any) => {
    if (res.status === 201) {
      this.loaderService.hide();
      this.openDialog('Successfully Added');
    }
  },
  (error:any)=> {
    this.loaderService.hide();
    console.log(error);
    if (error.status === 409) {
      this.openDialog(`Cfa Bill number ${error._body} already exist`);
    }else {
    this.openDialog('Please try again');
    }
  });
}
uploadTransportBillFile(file: File) {
  console.log(file);
  const formData = new FormData();
  formData.append('transportBillExcel', file, file.name);
  this._http.post(`${this.importUrl}transportbill/importBulkTransportBills`, formData, { headers: this.setAuthenticationHeader() })
  .subscribe((res:any) => {
    if (res.status === 201) {
      this.loaderService.hide();
      this.openDialog('Successfully Added');
    }
  },
  (error:any)=> {
    this.loaderService.hide();
    console.log(error);
    if (error.status === 409) {
      this.openDialog(`Transport Bill number ${error._body} already exist`);
    }else {
    this.openDialog('Please try again');
    }
  });
}
uploadPurchaseServiceFile(file: File) {
  console.log(file);
  const formData = new FormData();
  formData.append('purchaseServiceExcel', file, file.name);
  this._http.post(`${this.importUrl}purchasedetails/importBulkPurchaseServices`, formData, { headers: this.setAuthenticationHeader() })
  .subscribe((res:any) => {
    if (res.status === 201) {
      this.loaderService.hide();
      this.openDialog('Successfully Added');
    }
  },
  (error:any)=> {
    this.loaderService.hide();
    console.log(error);
    if (error.status === 409) {
      this.openDialog(`Purchase Service Bill number ${error._body} already exist`);
    }else {
    this.openDialog('Please try again');
    }
  });
}
uploadPurchaseMaterialFile(file: File) {
  console.log(file);
  const formData = new FormData();
  formData.append('purchaseMaterialExcel', file, file.name);
  this._http.post(`${this.importUrl}purchasematerial/importBulkPurchaseMaterials`, formData, { headers: this.setAuthenticationHeader() })
  .subscribe((res:any) => {
    if (res.status === 201) {
      this.loaderService.hide();
      this.openDialog('Successfully Added');
    }
  },
  (error:any)=> {
    this.loaderService.hide();
    console.log(error);
    if (error.status === 409) {
      this.openDialog(`Purchase Material Bill number ${error._body} already exist`);
    }else {
    this.openDialog('Please try again');
    }
  });
}

uploadOcrDocument(file: File): Observable<any> {
  console.log(file);
  const formData = new FormData();
  formData.append('ocrDocument', file, file.name);
  return this._http.post(`${this.ocrUrl}`, formData, { headers: this.setAuthenticationHeader() }).pipe(
  map((res: any) => res.json()));
}
sendScannedBill(file: File, serialNumber : any) {
  const formData = new FormData();
  formData.append('uploadedFile', file, file.name);
  this._http.post(`${this.importUrl}purchasedetails/sendEmailPurchaseServices?serialNumber=${serialNumber}`, formData, { headers: this.setAuthenticationHeader() })
  .subscribe((res:any) => {
      this.loaderService.hide();
      this.openDialog(res['_body']);
  },
  (error:any)=> {
    this.loaderService.hide();
    console.log(error);
    this.openDialog(error);
  });
}
uploadFreightMasterFile(file: File) {
  console.log(file);
  const formData = new FormData();
  formData.append('freightMaster', file, file.name);
  this._http.post(`${this.importUrl}transportbill/importFreightDetails`, formData, { headers: this.setAuthenticationHeader() })
  .subscribe((res:any) => {
    if (res.status === 201) {
      this.loaderService.hide();
      this.openDialog('Bulk Freight Details upload successful');
    }
  },
  (error:any)=> {
    this.loaderService.hide();
    console.log(error);
    this.openDialog(error._body);
  });
}
uploadCfaContractFile(file: File) {
  console.log(file);
  const formData = new FormData();
  formData.append('cfaContract', file, file.name);
  this._http.post(`${this.importUrl}transportbill/importCfaContract`, formData, { headers: this.setAuthenticationHeader() })
  .subscribe((res:any)=> {
    if (res.status === 201) {
      this.loaderService.hide();
      this.openDialog('Bulk Cfa Contract upload successful');
    }
  },
  (error:any)=> {
    this.loaderService.hide();
    console.log(error);
    this.openDialog(error._body);
  });
}
uploadDieselIndexFile(file: File) {
  console.log(file);
  const formData = new FormData();
  formData.append('dieselIndex', file, file.name);
  this._http.post(`${this.importUrl}transportbill/importDieselIndex`, formData, { headers: this.setAuthenticationHeader() })
  .subscribe((res:any)=> {
    if (res.status === 201) {
      this.loaderService.hide();
      this.openDialog('Bulk Diesel Index upload successful');
    }
  },
  (error:any)=> {
    this.loaderService.hide();
    console.log(error);
    this.openDialog(error._body);
  });
}
uploadTripMasterFile(file: File) {
  console.log(file);
  const formData = new FormData();
  formData.append('weeklyTripsExcel', file, file.name);
  this._http.post(`${this.importUrl}transportbill/importWeeklyTrips`, formData, { headers: this.setAuthenticationHeader() })
  .subscribe((res:any)=> {
    if (res.status === 201) {
      this.loaderService.hide();
      this.openDialog('Bulk Weekly Trips upload successful');
    }
  },
  (error:any)=> {
    this.loaderService.hide();
    console.log(error);
    this.openDialog(error._body);
  });
}
uploadVendorBillCopyTransport(file: File) {
  console.log(file);
  const formData = new FormData();
  formData.append('vendorBillExcel', file, file.name);
  this._http.post(`${this.importUrl}transportbill/importVendorBill`, formData, { headers: this.setAuthenticationHeader() })
  .subscribe((res:any)=> {
    if (res.status === 201) {
      this.loaderService.hide();
      this.openDialog('Vendor Bill Successfully saved');
    }
  },
  (error:any)=> {
    this.loaderService.hide();
    console.log(error);
    this.openDialog(error._body);
  });
}
uploadLocationMasterFile(file: File) {
  console.log(file);
  const formData = new FormData();
  formData.append('locationMaster', file, file.name);
  this._http.post(`${this.importUrl}transportbill/importLocationMaster`, formData, { headers: this.setAuthenticationHeader() })
  .subscribe((res:any)=> {
    if (res.status === 201) {
      this.loaderService.hide();
      this.openDialog('Location Master successfully saved');
    }
  },
  (error:any)=> {
    this.loaderService.hide();
    console.log(error);
    this.openDialog(error._body);
  });
}
uploadTransportBillWorkIdFile(file: File) {
  console.log(file);
  const formData = new FormData();
  formData.append('transportBillWorkId', file, file.name);
  this._http.post(`${this.importUrl}transportbill/importWorkIdNumber`, formData, { headers: this.setAuthenticationHeader() })
  .subscribe((res:any)=> {
    if (res.status === 200) {
      this.loaderService.hide();
      this.openDialog('Work Id Number updated successfully. Please check the bill details.');
    }
  },
  (error:any)=> {
    this.loaderService.hide();
    console.log(error);
    this.openDialog(error._body);
  });
}
uploadMaterialBillWorkIdFile(file: File) {
  console.log(file);
  const formData = new FormData();
  formData.append('materialBillWorkId', file, file.name);
  this._http.post(`${this.importUrl}purchasematerial/importWorkIdNumber`, formData, { headers: this.setAuthenticationHeader() })
  .subscribe((res:any)=> {
    console.log(res,'res')
    if (res.status === 200) {
      this.loaderService.hide();
      this.openDialog('Work Id Number updated successfully. Please check the bill details.');
    }
  },
  (error:any)=> {
    this.loaderService.hide();
    console.log(error);
    this.openDialog(error._body);
  });
}
uploadServiceBillWorkIdFile(file: File) {
  console.log(file);
  const formData = new FormData();
  formData.append('serviceBillWorkId', file, file.name);
  this._http.post(`${this.importUrl}purchasedetails/importWorkIdNumber`, formData, { headers: this.setAuthenticationHeader() })
  .subscribe((res:any)=> {
    if (res.status === 200) {
      this.loaderService.hide();
      this.openDialog('Work Id Number updated successfully. Please check the bill details.');
    }
  },
  (error:any)=> {
    this.loaderService.hide();
    console.log(error);
    this.openDialog(error._body);
  });
}
openDialog(dataValue: string): void {
  const dialogRef = this.dialog.open(AlertdialogComponent, {
    width: '700px',
    data: dataValue
  });
  dialogRef.afterClosed().subscribe((result :any) => {
  });
}
}
