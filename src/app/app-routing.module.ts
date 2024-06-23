import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddVendorComponent } from './vendor/addvendor.component';
import { AddPurchaseServiceComponent } from './purchase-service/add-purchase-service/add-purchase-service.component';
// tslint:disable-next-line:max-line-length
import { AddTransportBillRegisterComponent } from './transport-bill-register/add-transport-bill-register/add-transport-bill-register.component';
import { AddCfaBillRegisterComponent } from './cfa-bill-register/add-cfa-bill-register/add-cfa-bill-register.component';
import { AddPurchaseMaterialComponent } from './purchase-material/add-purchase-material/add-purchase-material.component';
import { ViewCfaBillRegisterComponent } from './cfa-bill-register/view-cfa-bill-register/view-cfa-bill-register.component';
// tslint:disable-next-line:max-line-length
import { ViewCfaBillRegisterDetailsComponent } from './cfa-bill-register/view-cfa-bill-register-details/view-cfa-bill-register-details.component';
import { EditCfaBillRegisterComponent } from './cfa-bill-register/edit-cfa-bill-register/edit-cfa-bill-register.component';
import { ViewvendorComponent } from './viewvendor/viewvendor.component';
import { EditVendorComponent } from './viewvendor/edit.component';
import { ViewParticularVendor } from './viewvendor/view.component';
// tslint:disable-next-line:max-line-length
import { ViewTransportBillRegisterComponent } from './transport-bill-register/view-transport-bill-register/view-transport-bill-register.component';
import { EditTransporterBillRegisterComponent } from './transport-bill-register/edit-transporter-bill-register/edit-transporter-bill-register.component';
// tslint:disable-next-line:max-line-length
import { ViewTransportBillRegisterDetailsComponent } from './transport-bill-register/view-transport-bill-register-details/view-transport-bill-register-details.component';
import { ViewPurchaseServiceComponent } from './purchase-service/view-purchase-service/view-purchase-service.component';
// tslint:disable-next-line:max-line-length
import { ViewPurchaseServiceDetailsComponent } from './purchase-service/view-purchase-service-details/view-purchase-service-details.component';
import { EditPurchaseServiceComponent } from './purchase-service/edit-purchase-service/edit-purchase-service.component';
import { ViewPurchaseMaterialComponent } from './purchase-material/view-purchase-material/view-purchase-material.component';
// tslint:disable-next-line:max-line-length
import { ViewPurchaseMaterialDetailsComponent } from './purchase-material/view-purchase-material-details/view-purchase-material-details.component';
import { EditPurchaseMaterialComponent } from './purchase-material/edit-purchase-material/edit-purchase-material.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OcrDemoComponent } from './ocr-demo/ocr-demo.component';
import { OcrDemoUploadComponent } from './ocr-demo-upload/ocr-demo-upload.component';
import { FreightMasterExcelComponent } from './freight-master-excel/freight-master-excel.component';
import { TripMasterExcelComponent } from './trip-master-excel/trip-master-excel.component';
import { CfaContractExcelComponent } from './cfa-contract-excel/cfa-contract-excel.component';
import { DieselIndexExcelComponent } from './diesel-index-excel/diesel-index-excel.component';
import { LocationMasterExcelComponent } from './location-master-excel/location-master-excel.component';
import { TransportBillWorkIdNumberComponent } from './transport-bill-work-id-number/transport-bill-work-id-number.component';
import { VerifyVendorBillComponent } from './verify-vendor-bill/verify-vendor-bill.component';
import { PurchaseMaterialWorkIdNumberComponent } from './purchase-material/purchase-material-work-id-number/purchase-material-work-id-number.component';
import { PurchaseServiceWorkIdNumberComponent } from './purchase-service/purchase-service-work-id-number/purchase-service-work-id-number.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'addvendor',
    component: AddVendorComponent
  },
  {
    path: 'view-edit-vendor',
    component: ViewvendorComponent
  },
  {
    path: 'view-vendor',
    component: ViewParticularVendor
  },
  {
    path: 'edit-vendor',
    component: EditVendorComponent
  },
  {
    path: 'view-edit-cfa-bill',
    component: ViewCfaBillRegisterComponent
  },
  {
    path: 'view-cfa-bill',
    component: ViewCfaBillRegisterDetailsComponent
  },
  {
    path: 'edit-cfa-bill',
    component: EditCfaBillRegisterComponent
  },
  {
    path: 'login',
    redirectTo: ''
  },
  {
    path: 'add-purchase-service',
    component: AddPurchaseServiceComponent
  },
  {
    path: 'view-edit-purchase-service',
    component:  ViewPurchaseServiceComponent
  },
  {
    path: 'view-purchase-service',
    component: ViewPurchaseServiceDetailsComponent
  },
  {
    path: 'edit-purchase-service',
    component: EditPurchaseServiceComponent
  },
  {
    path: 'add-transport-bill',
    component: AddTransportBillRegisterComponent
  },
  {
    path: 'view-edit-transport-bill',
    component: ViewTransportBillRegisterComponent
  },
  {
    path: 'view-transport-bill',
    component: ViewTransportBillRegisterDetailsComponent
  },
  {
    path: 'edit-transport-bill',
    component: EditTransporterBillRegisterComponent
  },
  {
    path: 'add-cfa-bill',
    component: AddCfaBillRegisterComponent
  },
  {
    path: 'add-purchase-material',
    component: AddPurchaseMaterialComponent
  },
  {
    path: 'view-edit-purchase-material',
    component: ViewPurchaseMaterialComponent
  },
  {
    path: 'view-purchase-material',
    component: ViewPurchaseMaterialDetailsComponent
  },
  {
    path: 'edit-purchase-material',
    component: EditPurchaseMaterialComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent
  },
  {
    path: 'ocrDemo',
    component: OcrDemoComponent
  },
  {
    path: 'viewOcrData',
    component: OcrDemoUploadComponent
  },
  {
    path: 'uploadFreightMaster',
    component: FreightMasterExcelComponent
  },
  {
    path: 'uploadTripMaster',
    component: TripMasterExcelComponent
  },
  {
    path: 'uploadCfaContract',
    component: CfaContractExcelComponent
  },
  {
    path: 'uploadDieselIndex',
    component: DieselIndexExcelComponent
  },
  {
    path: 'uploadLocationMaster',
    component: LocationMasterExcelComponent
  },
  {
    path: 'uploadTransportBillWorkIdNumber',
    component: TransportBillWorkIdNumberComponent
  },
  {
    path: 'verify-vendor-bill',
    component: VerifyVendorBillComponent
  },
  {
    path: 'uploadMaterialBillWorkIdNumber',
    component: PurchaseMaterialWorkIdNumberComponent
  },
  {
    path: 'uploadServiceBillWorkIdNumber',
    component: PurchaseServiceWorkIdNumberComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
