import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
//import 'rxjs/Rx';
import {map} from "rxjs";
@Injectable()
export class AllservicesService {
// url constants
vendorUrl = 'http://localhost:8081/api/desktopapp/vendor/';
loginurl = 'http://159.89.162.152:8081/api/user/';
purchaseServiceUrl = 'http://localhost:8081/api/desktopapp/purchasedetails/';
transportBillUrl = 'http://localhost:8081/api/desktopapp/transportbill/';
cfaBillUrl = 'http://localhost:8081/api/desktopapp/cfabill/';
purchaseMaterialUrl = 'http://localhost:8081/api/desktopapp/purchasematerial/';
emailDataUrl = 'http://localhost:8081/api/desktopapp/email/';
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
 login(data : any) {
  const json = JSON.stringify({
    userId: data.username,
    password: data.password
  });

  return this._http
  .post(this.loginurl + 'login', json, { headers: this.headers2 })
  .pipe(map((res : any) => res.json(), (err : any) =>  console.log(err)));

}
addUser(data : any) {
  return this._http
  .post(this.loginurl + 'register', data, { headers: this.headers2 })
  .pipe(map((res : any) => res.json(), (err : any) =>  console.log(err)));
}
editUser(data : any) {
  return this._http
  .put(this.loginurl + data.userId, data, { headers: this.headers2 })
  .pipe(map((res : any) => res.json(), (err : any) =>  console.log(err)));
}
getAllUsers(userType : any) {
  return this._http.get(`${this.loginurl}\getAllUsers\\${userType}`, { headers: this.headers2}).pipe(map((res: any) => res.json()));
}

  // service call to add vendor
 addvendor(data : any) {
  return this._http.post(this.vendorUrl, data, { headers: this.setAuthenticationHeader() }).pipe(map((res: any) => res.json()));
}

 // service to fetch all vendor list
 getvendorlist(page : any) {
  return this._http.get(this.vendorUrl + 'listVendors?' + 'page=' + (page - 1),  { headers: this.setAuthenticationHeader() })
    .pipe(map((res: any) => res.json()));
}

 // service to get vendor details of a particular vendor
 getvendordetails(id : any, location: any) {
  return this._http.get(this.vendorUrl + 'getVendor/?vendorCode=' + (id) + '&location=' + (location),{ headers: this.setAuthenticationHeader() })
      .pipe(map((res: any) => res.json()));
}

 // service to edit vendor details of a particular vendor
 editvendordetails(id: any, data: any) {
  return this._http.put(this.vendorUrl + (id), data, { headers: this.setAuthenticationHeader() }).pipe(map((res: any) => res.json()));
}
deleteVendor(id : any) {
  return this._http.delete(this.vendorUrl + (id), { headers: this.setAuthenticationHeader() }).pipe(map((res: any) => res));
}

 // method to refresh page
 refresh(): void {
  window.location.reload();
}
getVendorData(vendorCode: any, chargeDetails: any) {
	vendorCode = vendorCode.trim();
  return this._http.get(`${this.vendorUrl}getVendors?vendorCode=${vendorCode}&chargeDetails=${chargeDetails}`,  { headers: this.setAuthenticationHeader() })
    .pipe(map((res: any) => res.json()));
}
addPurchaseService(data: any, dueDtForPayment: any) {
  data.dueDateForPayment = dueDtForPayment;
  console.log(JSON.stringify(data));
  return this._http.post(this.purchaseServiceUrl, data, { headers: this.setAuthenticationHeader() }).pipe(map((res: any) => res.json()));
}
getPurchaseServiceByBillNumber(billNumber: any) {
  billNumber = billNumber.replace(/\\/g, "%5C");
  return this._http.get(`${this.purchaseServiceUrl}byBillNumber?billNumber=${billNumber}`,
  { headers: this.setAuthenticationHeader() })
    .pipe(map((res: any) => res.json()));
}
addTransportBill(data: any, dueDtForPayment: any) {
  data.dueDateForPayment = dueDtForPayment;
  console.log(JSON.stringify(data));
  return this._http.post(this.transportBillUrl, data, { headers: this.setAuthenticationHeader() }).pipe(map((res: any) => res.json()));
}
getTransportBillList(page : any) {
  return this._http.get(this.transportBillUrl + 'listTransportBills?' + 'page=' + (page - 1),  { headers: this.setAuthenticationHeader() })
    .pipe(map((res: any) => res.json()));
}
getTransportBillDetailsByBillNumber(billNumber : any) {
  billNumber = billNumber.replace(/\\/g, "%5C");
  return this._http.get(`${this.transportBillUrl}byBillNumber?billNumber=${billNumber}`,
  { headers: this.setAuthenticationHeader() })
    .pipe(map((res: any) => res.json()));
}
getTransportBillDetails(billNumber : any, vendorCode : any) {
  return this._http.get(`${this.transportBillUrl}findTransportBills?billNumber=${billNumber}&vendorCode=${vendorCode}`,
  { headers: this.setAuthenticationHeader() })
    .pipe(map((res: any) => res.json()));
}
getPurchaseServiceList(page : any) {
  return this._http.get(this.purchaseServiceUrl + 'listPurchaseServices?' + 'page=' + (page - 1),
  { headers: this.setAuthenticationHeader() })
    .pipe(map((res: any) => res.json()));
}
getPurchaseServiceDetails(billNumber : any, vendorCode : any) {
  return this._http.get(`${this.purchaseServiceUrl}findPurchaseServices?billNumber=${billNumber}&vendorCode=${vendorCode}`,
    { headers: this.setAuthenticationHeader() })
    .pipe(map((res: any) => res.json()));
}
addCfaBill(data : any, dueDtForPayment : any) {
  data.dueDateForPayment = dueDtForPayment;
  console.log(JSON.stringify(data));
  return this._http.post(this.cfaBillUrl, data, { headers: this.setAuthenticationHeader() }).pipe(map((res: any) => res.json()));
}
getCfaBillList(page : any) {
  return this._http.get(this.cfaBillUrl  + 'listCfaBills?' + 'page=' + (page - 1),  { headers: this.setAuthenticationHeader() })
    .pipe(map((res: any) => res.json()));
}
getCfaBillDetailsByBillNumber(billNumber : any) {
  billNumber = billNumber.replace(/\\/g, "%5C");
  return this._http.get(`${this.cfaBillUrl}byBillNumber?billNumber=${billNumber}`,
  { headers: this.setAuthenticationHeader() })
    .pipe(map((res: any) => res.json()));
}
getCfaBillDetails(billNumber : any, vendorCode : any) {
  return this._http.get(`${this.cfaBillUrl}findCfaBills?billNumber=${billNumber}&vendorCode=${vendorCode}`,
  { headers: this.setAuthenticationHeader() })
    .pipe(map((res: any) => res.json()));
}
addPurchaseMaterial(data : any, dueDtForPayment : any) {
  data.dueDateForPayment = dueDtForPayment;
  console.log(JSON.stringify(data));
  return this._http.post(this.purchaseMaterialUrl, data, { headers: this.setAuthenticationHeader() }).pipe(map((res: any) => res.json()));
}
getPurchaseMaterialList(page : any) {
  return this._http.get(this.purchaseMaterialUrl + 'listPurchaseMaterials?' + 'page=' + (page - 1),
  { headers: this.setAuthenticationHeader() })
    .pipe(map((res: any) => res.json()));
}
getPurchaseMaterialDetails(billNumber : any, vendorCode : any) {
  return this._http.get(`${this.purchaseMaterialUrl}findPurchaseMaterials?billNumber=${billNumber}&vendorCode=${vendorCode}`,
    { headers: this.setAuthenticationHeader() })
    .pipe(map((res: any) => res.json()));
}
getPurchaseMaterialByBillNumber(billNumber : any) {
  billNumber = billNumber.replace(/\\/g, "%5C");
  return this._http.get(`${this.purchaseMaterialUrl}byBillNumber?billNumber=${billNumber}`,
  { headers: this.setAuthenticationHeader() })
    .pipe(map((res: any) => res.json()));
}
updatePurchaseService(data: any, serialNumber : any) {
  return this._http.put(`${this.purchaseServiceUrl}${serialNumber}`, data,
  { headers: this.setAuthenticationHeader() }).pipe(map((res: any) => res.json()));
}
updatePurchaseMaterial(data: any, serialNumber: any) {
  return this._http.put(`${this.purchaseMaterialUrl}${serialNumber}`, data,
  { headers: this.setAuthenticationHeader() }).pipe(map((res: any) => res.json()));
}
updateCfaBill(data : any, serialNumber : any) {
  return this._http.put(`${this.cfaBillUrl}${serialNumber}`, data,
  { headers: this.setAuthenticationHeader() }).pipe(map((res: any) => res.json()));
}
updateTransportBill(data : any, serialNumber: any) {
  return this._http.put(`${this.transportBillUrl}${serialNumber}`, data,
  { headers: this.setAuthenticationHeader() }).pipe(map((res: any) => res.json()));
}
deleteTransportBill(id: any) {
  return this._http.delete(this.transportBillUrl + (id), { headers: this.setAuthenticationHeader() }).pipe(map((res: any) => res));
}
deletePurchaseService(id : any) {
  return this._http.delete(this.purchaseServiceUrl + (id), { headers: this.setAuthenticationHeader() }).pipe(map((res: any) => res));
}
deletePurchaseMaterial(id: any) {
  return this._http.delete(this.purchaseMaterialUrl + (id), { headers: this.setAuthenticationHeader() }).pipe(map((res: any) => res));
}
deleteCfaBill(id: any) {
  return this._http.delete(this.cfaBillUrl + (id), { headers: this.setAuthenticationHeader() }).pipe(map((res: any) => res));
}
sendEmail(req: any) {
  return this._http
  .post(this.emailUrl, JSON.parse(req._body))
  .pipe(map((res : any) => res));
}
getEmailData(status: any, billType: any) {
  return this._http.get(this.emailDataUrl+'getMailDetails/'+status+'/'+billType, { headers: this.setAuthenticationHeader() }).pipe(map((res: any) => res));
}
updateEmailData(data: any, status: any, billType: any) {
  return this._http.put(`${this.emailDataUrl}${status}/${billType}?emailIds=${data}`, data,
  { headers: this.setAuthenticationHeader() }).pipe(map((res: any) => res.json()));
}
verifyTransportBill(billNumber: any, vendorCode: any, billCategory: any) {
  return this._http.get(this.transportBillUrl+'verifyVendorBill?billNumber='+billNumber+'&vendorCode='+vendorCode+'&billCategory='+billCategory, { headers: this.setAuthenticationHeader() }).pipe(map((res: any) => res.json()));
}
reVerifyTransportBill(formData: any) {
  return this._http.post(this.transportBillUrl+'reVerifyVendorBill', formData,  { headers: this.setAuthenticationHeader() }).pipe(map((res: any) => res.json()));
}
submitTripVerificationStatus(formData: any) {
  return this._http.post(this.transportBillUrl+'submitBillStatus', formData,  { headers: this.setAuthenticationHeader() }).pipe(map((res: any) => res.json()));
}
}
