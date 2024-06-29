import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
//import 'rxjs/Rx';
import {map, Observable} from "rxjs";

@Injectable()
export class FileDownloadService {
  exportUrl = 'http://localhost:8081/api/desktopapp/';
  error: string='';
  setAuthenticationHeader () {
    const headers = new HttpHeaders({
      Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      Authorization: 'Bearer ' + localStorage.getItem('token')
      });
    return headers;
  }
  constructor(private _http: HttpClient) { }

  getCfaBillExcelFile (): Observable<Blob> {
    return this._http.get(`${this.exportUrl}cfabill/getCfaBillsExcel`, {
      headers: this.setAuthenticationHeader()/*,
      responseType: ResponseContentType.Blob*/
      }).pipe(map((res:any) => new Blob([res.blob()], { type: 'application/vnd.ms-excel' })));
  }
  getTransportBillExcelFile (): Observable<Blob> {
    return this._http.get(`${this.exportUrl}transportbill/getTransportBillsExcel`, {
      headers: this.setAuthenticationHeader()/*,
      responseType: ResponseContentType.Blob*/
      }).pipe(map((res:any) => new Blob([res.blob()], { type: 'application/vnd.ms-excel' })));
  }
  getPurchaseServiceExcelFile (): Observable<Blob> {
    return this._http.get(`${this.exportUrl}purchasedetails/getPurchaseServiceExcel`, {
      headers: this.setAuthenticationHeader()/*,
      responseType: ResponseContentType.Blob*/
      }).pipe(map((res:any) => new Blob([res.blob()], { type: 'application/vnd.ms-excel' })));
  }
  getPurchaseMaterialExcelFile (): Observable<Blob> {
    return this._http.get(`${this.exportUrl}purchasematerial/getPurchaseMaterialsExcel`, {
      headers: this.setAuthenticationHeader()/*,
      responseType: ResponseContentType.Blob*/
      }).pipe(map((res:any) => new Blob([res.blob()], { type: 'application/vnd.ms-excel' })));
  }
  getVendorExcelFile (): Observable<Blob> {
    return this._http.get(`${this.exportUrl}vendor/getVendorExcel`, {
      headers: this.setAuthenticationHeader()/*,
      responseType: ResponseContentType.Blob*/
      }).pipe(map((res:any) => new Blob([res.blob()], { type: 'application/vnd.ms-excel' })));
  }
  getEmailExcelFile (): Observable<Blob> {
    return this._http.get(`${this.exportUrl}email/getEmailDetailsExcel`, {
      headers: this.setAuthenticationHeader()/*,
      responseType: ResponseContentType.Blob*/
      }).pipe(map((res:any) => new Blob([res.blob()], { type: 'application/vnd.ms-excel' })));
  }
  getCfaBillExcelFileByDays (): Observable<Blob> {
    return this._http.get(`${this.exportUrl}cfabill/getCfaBillsExcelByDays`, {
      headers: this.setAuthenticationHeader()/*,
      responseType: ResponseContentType.Blob*/
      }).pipe(map((res:any) => new Blob([res.blob()], { type: 'application/vnd.ms-excel' })));
  }
  getTransportBillExcelFileByDays (): Observable<Blob> {
    return this._http.get(`${this.exportUrl}transportbill/getTransportBillsExcelByDays`, {
      headers: this.setAuthenticationHeader()/*,
      responseType: ResponseContentType.Blob*/
      }).pipe(map((res:any) => new Blob([res.blob()], { type: 'application/vnd.ms-excel' })));
  }
  getPurchaseServiceExcelFileByDays (): Observable<Blob> {
    return this._http.get(`${this.exportUrl}purchasedetails/getPurchaseServiceBillsExcelByDays`, {
      headers: this.setAuthenticationHeader()/*,
      responseType: ResponseContentType.Blob*/
      }).pipe(map((res:any) => new Blob([res.blob()], { type: 'application/vnd.ms-excel' })));
  }
  getPurchaseMaterialExcelFileByDays (): Observable<Blob> {
    return this._http.get(`${this.exportUrl}purchasematerial/getPurchaseMaterialBillsExcelByDays`, {
      headers: this.setAuthenticationHeader()/*,
      responseType: ResponseContentType.Blob*/
      }).pipe(map((res:any) => new Blob([res.blob()], { type: 'application/vnd.ms-excel' })));
  }
  getCfaContractExcelFile (): Observable<Blob> {
    return this._http.get(`${this.exportUrl}transportbill/getCfaContract`, {
      headers: this.setAuthenticationHeader()/*,
      responseType: ResponseContentType.Blob*/
      }).pipe(map((res:any) => new Blob([res.blob()], { type: 'application/vnd.ms-excel' })));
  }
  getTripMasterExcelFile (): Observable<Blob> {
    return this._http.get(`${this.exportUrl}transportbill/getTripMaster`, {
      headers: this.setAuthenticationHeader()/*,
      responseType: ResponseContentType.Blob*/
      }).pipe(map((res:any) => new Blob([res.blob()], { type: 'application/vnd.ms-excel' })));
  }
  getFreightMasterExcelFile (): Observable<Blob> {
    return this._http.get(`${this.exportUrl}transportbill/getFreightMaster`, {
      headers: this.setAuthenticationHeader()/*,
      responseType: ResponseContentType.Blob*/
      }).pipe(map((res:any) => new Blob([res.blob()], { type: 'application/vnd.ms-excel' })));
  }
  getDieselMasterExcelFile (): Observable<Blob> {
    return this._http.get(`${this.exportUrl}transportbill/getDieselMaster`, {
      headers: this.setAuthenticationHeader()/*,
      responseType: ResponseContentType.Blob*/
      }).pipe(map((res:any) => new Blob([res.blob()], { type: 'application/vnd.ms-excel' })));
  }
  getTripVariationReport (reportStartDate: any, reportEndDate: any): Observable<Blob> {
    return this._http.get(`${this.exportUrl}transportbill/getTransportBillMismatchReport?reportStartDate=${reportStartDate}&reportEndDate=${reportEndDate}`, {
      headers: this.setAuthenticationHeader()/*,
      responseType: ResponseContentType.Blob*/
      }).pipe(map((res:any) => new Blob([res.blob()], { type: 'application/vnd.ms-excel' })));
  }
  getDispatchMasterExcelFile (dispatchStartDate: any, dispatchEndDate: any): Observable<Blob> {
    return this._http.get(`${this.exportUrl}transportbill/getDispatchMaster?dispatchStartDate=${dispatchStartDate}&dispatchEndDate=${dispatchEndDate}`, {
      headers: this.setAuthenticationHeader()/*,
      responseType: ResponseContentType.Blob*/
      }).pipe(map((res:any) => new Blob([res.blob()], { type: 'application/vnd.ms-excel' })));
  }
  getTransportBillDueReport (dueStartDate: any, dueEndDate: any): Observable<Blob> {
    return this._http.get(`${this.exportUrl}transportbill/getTransportBillDueReport?dueStartDate=${dueStartDate}&dueEndDate=${dueEndDate}`, {
      headers: this.setAuthenticationHeader()/*,
      responseType: ResponseContentType.Blob*/
      }).pipe(map((res:any) => new Blob([res.blob()], { type: 'application/vnd.ms-excel' })));
  }
  getFreightRateApprovalReport (reportStartDate: any, reportEndDate: any): Observable<Blob> {
    return this._http.get(`${this.exportUrl}transportbill/getFreightRateApprovalStatus?reportStartDate=${reportStartDate}&reportEndDate=${reportEndDate}`, {
      headers: this.setAuthenticationHeader()/*,
      responseType: ResponseContentType.Blob*/
      }).pipe(map((res:any) => new Blob([res.blob()], { type: 'application/vnd.ms-excel' })));
  }
  getTransportBillDetentionReport (reportStartDate: any, reportEndDate: any): Observable<Blob> {
    return this._http.get(`${this.exportUrl}transportbill/getTransportBillDetentionReport?reportStartDate=${reportStartDate}&reportEndDate=${reportEndDate}`, {
      headers: this.setAuthenticationHeader()/*,
      responseType: ResponseContentType.Blob*/
      }).pipe(map((res:any) => new Blob([res.blob()], { type: 'application/vnd.ms-excel' })));
  }
  getTransportBilTripDetails (reportStartDate: any, reportEndDate: any): Observable<Blob> {
    return this._http.get(`${this.exportUrl}transportbill/getTransportBilTripDetails?reportStartDate=${reportStartDate}&reportEndDate=${reportEndDate}`, {
      headers: this.setAuthenticationHeader()/*,
      responseType: ResponseContentType.Blob*/
      }).pipe(map((res:any) => new Blob([res.blob()], { type: 'application/vnd.ms-excel' })));
  }
}
