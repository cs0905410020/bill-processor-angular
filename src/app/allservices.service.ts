import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {map} from "rxjs";
@Injectable()
export class AllservicesService {
// url constants
vendorUrl = 'http://159.89.162.152:8081/api/desktopapp/vendor/';
loginurl = 'http://159.89.162.152:8081/api/user/';
purchaseServiceUrl = 'http://159.89.162.152:8081/api/desktopapp/purchasedetails/';
transportBillUrl = 'http://159.89.162.152:8081/api/desktopapp/transportbill/';
cfaBillUrl = 'http://159.89.162.152:8081/api/desktopapp/cfabill/';
purchaseMaterialUrl = 'http://159.89.162.152:8081/api/desktopapp/purchasematerial/';
emailDataUrl = 'http://159.89.162.152:8081/api/desktopapp/email/';
emailUrl = 'http://localhost:4300/sendMail';
private headers2 = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json'
});
setAuthenticationHeader() {
const headers = new HttpHeaders({
'Content-Type': 'application/json',
'Accept': 'application/json',
'Authorization': 'Bearer ' + localStorage.getItem('token')});
return headers;
}
constructor(private _http: HttpClient) {
}



 // service call login
 login(data:any): Observable<any> {
  const json = JSON.stringify({
    userId: data.username,
    password: data.password
  });

  return this._http
  .post(this.loginurl + 'login', json, { headers: this.headers2 })

}
  /**
   * Write code on Method
   *
   * @return response()
   */
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
addUser(data : any):Observable<any> {
  return this._http
  .post(this.loginurl + 'register', data, { headers: this.headers2 });
}
editUser(data : any):Observable<any> {
  return this._http
  .put(this.loginurl + data.userId, data, { headers: this.headers2 });
}
getAllUsers(userType : any):Observable<any> {
  return this._http.get(this.loginurl+ 'getAllUsers\\'+userType, { headers: this.headers2});
}

  // service call to add vendor
 addvendor(data : any):Observable<any> {
  return this._http.post(this.vendorUrl, data, { headers: this.setAuthenticationHeader() });
}

 // service to fetch all vendor list
 getvendorlist(page : any):Observable<any> {
  return this._http.get(this.vendorUrl + 'listVendors?' + 'page=' + (page - 1),  { headers: this.setAuthenticationHeader() });
}

 // service to get vendor details of a particular vendor
 getvendordetails(id : any, location: any):Observable<any>
 {
  return this._http.get(this.vendorUrl + 'getVendor/?vendorCode=' + (id) + '&location=' + (location),{ headers: this.setAuthenticationHeader() });
}

 // service to edit vendor details of a particular vendor
 editvendordetails(id: any, data: any):Observable<any> {
  return this._http.put(this.vendorUrl + (id), data, { headers: this.setAuthenticationHeader() });
}
deleteVendor(id : any):Observable<any> {
  return this._http.delete(this.vendorUrl + (id), { headers: this.setAuthenticationHeader() });
}

 // method to refresh page
 refresh(): void {
  window.location.reload();
}
getVendorData(vendorCode: any, chargeDetails: any):Observable<any> {
	vendorCode = vendorCode.trim();
  return this._http.get(`${this.vendorUrl}getVendors?vendorCode=${vendorCode}&chargeDetails=${chargeDetails}`,  { headers: this.setAuthenticationHeader() });
}
addPurchaseService(data: any, dueDtForPayment: any):Observable<any> {
  data.dueDateForPayment = dueDtForPayment;
  console.log(JSON.stringify(data));
  return this._http.post(this.purchaseServiceUrl, data, { headers: this.setAuthenticationHeader() });
}
getPurchaseServiceByBillNumber(billNumber: any):Observable<any> {
  billNumber = billNumber.replace(/\\/g, "%5C");
  return this._http.get(`${this.purchaseServiceUrl}byBillNumber?billNumber=${billNumber}`,
  { headers: this.setAuthenticationHeader() });
}
addTransportBill(data: any, dueDtForPayment: any):Observable<any> {
  data.dueDateForPayment = dueDtForPayment;
  console.log(JSON.stringify(data));
  return this._http.post(this.transportBillUrl, data, { headers: this.setAuthenticationHeader() });
}
getTransportBillList(page : any):Observable<any> {
  return this._http.get(this.transportBillUrl + 'listTransportBills?' + 'page=' + (page - 1),  { headers: this.setAuthenticationHeader() });
}
getTransportBillDetailsByBillNumber(billNumber : any):Observable<any> {
  billNumber = billNumber.replace(/\\/g, "%5C");
  return this._http.get(`${this.transportBillUrl}byBillNumber?billNumber=${billNumber}`,
  { headers: this.setAuthenticationHeader() });
}
getTransportBillDetails(billNumber : any, vendorCode : any):Observable<any> {
  return this._http.get(`${this.transportBillUrl}findTransportBills?billNumber=${billNumber}&vendorCode=${vendorCode}`,
  { headers: this.setAuthenticationHeader() });
}
getPurchaseServiceList(page : any):Observable<any> {
  return this._http.get(this.purchaseServiceUrl + 'listPurchaseServices?' + 'page=' + (page - 1),
  { headers: this.setAuthenticationHeader() });
}
getPurchaseServiceDetails(billNumber : any, vendorCode : any):Observable<any> {
  return this._http.get(`${this.purchaseServiceUrl}findPurchaseServices?billNumber=${billNumber}&vendorCode=${vendorCode}`,
    { headers: this.setAuthenticationHeader() });
}
addCfaBill(data : any, dueDtForPayment : any):Observable<any> {
  data.dueDateForPayment = dueDtForPayment;
  console.log(JSON.stringify(data));
  return this._http.post(this.cfaBillUrl, data, { headers: this.setAuthenticationHeader() });
}
getCfaBillList(page : any):Observable<any> {
  return this._http.get(this.cfaBillUrl  + 'listCfaBills?' + 'page=' + (page - 1),  { headers: this.setAuthenticationHeader() });
}
getCfaBillDetailsByBillNumber(billNumber : any):Observable<any> {
  billNumber = billNumber.replace(/\\/g, "%5C");
  return this._http.get(`${this.cfaBillUrl}byBillNumber?billNumber=${billNumber}`,
  { headers: this.setAuthenticationHeader() });
}
getCfaBillDetails(billNumber : any, vendorCode : any):Observable<any> {
  return this._http.get(`${this.cfaBillUrl}findCfaBills?billNumber=${billNumber}&vendorCode=${vendorCode}`,
  { headers: this.setAuthenticationHeader() });
}
addPurchaseMaterial(data : any, dueDtForPayment : any):Observable<any> {
  data.dueDateForPayment = dueDtForPayment;
  console.log(JSON.stringify(data));
  return this._http.post(this.purchaseMaterialUrl, data, { headers: this.setAuthenticationHeader() });
}
getPurchaseMaterialList(page : any):Observable<any> {
  return this._http.get(this.purchaseMaterialUrl + 'listPurchaseMaterials?' + 'page=' + (page - 1),
  { headers: this.setAuthenticationHeader() });
}
getPurchaseMaterialDetails(billNumber : any, vendorCode : any):Observable<any> {
  return this._http.get(`${this.purchaseMaterialUrl}findPurchaseMaterials?billNumber=${billNumber}&vendorCode=${vendorCode}`,
    { headers: this.setAuthenticationHeader() });
}
getPurchaseMaterialByBillNumber(billNumber : any):Observable<any> {
  billNumber = billNumber.replace(/\\/g, "%5C");
  return this._http.get(`${this.purchaseMaterialUrl}byBillNumber?billNumber=${billNumber}`,
  { headers: this.setAuthenticationHeader() });
}
updatePurchaseService(data: any, serialNumber : any):Observable<any> {
  return this._http.put(`${this.purchaseServiceUrl}${serialNumber}`, data,
  { headers: this.setAuthenticationHeader() });
}
updatePurchaseMaterial(data: any, serialNumber: any):Observable<any> {
  return this._http.put(`${this.purchaseMaterialUrl}${serialNumber}`, data,
  { headers: this.setAuthenticationHeader() });
}
updateCfaBill(data : any, serialNumber : any):Observable<any> {
  return this._http.put(`${this.cfaBillUrl}${serialNumber}`, data,
  { headers: this.setAuthenticationHeader() });
}
updateTransportBill(data : any, serialNumber: any):Observable<any> {
  return this._http.put(`${this.transportBillUrl}${serialNumber}`, data,
  { headers: this.setAuthenticationHeader() });
}
deleteTransportBill(id: any):Observable<any> {
  return this._http.delete(this.transportBillUrl + (id), { headers: this.setAuthenticationHeader() });
}
deletePurchaseService(id : any):Observable<any> {
  return this._http.delete(this.purchaseServiceUrl + (id), { headers: this.setAuthenticationHeader() });
}
deletePurchaseMaterial(id: any):Observable<any> {
  return this._http.delete(this.purchaseMaterialUrl + (id), { headers: this.setAuthenticationHeader() });
}
deleteCfaBill(id: any):Observable<any> {
  return this._http.delete(this.cfaBillUrl + (id), { headers: this.setAuthenticationHeader() });
}
sendEmail(req: any):Observable<any> {
  return this._http
  .post(this.emailUrl, JSON.parse(req._body));
}
getEmailData(status: any, billType: any):Observable<any> {
  return this._http.get(this.emailDataUrl+'getMailDetails/'+status+'/'+billType, { headers: this.setAuthenticationHeader() });
}
updateEmailData(data: any, status: any, billType: any):Observable<any> {
  return this._http.put(`${this.emailDataUrl}${status}/${billType}?emailIds=${data}`, data,
  { headers: this.setAuthenticationHeader() });
}
verifyTransportBill(billNumber: any, vendorCode: any, billCategory: any):Observable<any> {
  return this._http.get(this.transportBillUrl+'verifyVendorBill?billNumber='+billNumber+'&vendorCode='+vendorCode+'&billCategory='+billCategory, { headers: this.setAuthenticationHeader() });
}
reVerifyTransportBill(formData: any):Observable<any> {
  return this._http.post(this.transportBillUrl+'reVerifyVendorBill', formData,  { headers: this.setAuthenticationHeader() });
}
submitTripVerificationStatus(formData: any):Observable<any> {
  return this._http.post(this.transportBillUrl+'submitBillStatus', formData,  { headers: this.setAuthenticationHeader() });
}
}
