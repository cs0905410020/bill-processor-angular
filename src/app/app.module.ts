
import 'hammerjs';
/*import "@fontsource/roboto"; // Defaults to weight 400
import "@fontsource/roboto/400.css"; // Specify weight
import "@fontsource/roboto/400-italic.css"; // Specify weight and styl*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DateAdapter,MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import { AddVendorComponent } from './vendor/addvendor.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AddPurchaseServiceComponent } from './purchase-service/add-purchase-service/add-purchase-service.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ViewvendorComponent } from './viewvendor/viewvendor.component';
import { ViewParticularVendor } from './viewvendor/view.component';
import { EditVendorComponent } from './viewvendor/edit.component';
import { AllservicesService } from './allservices.service';
import { provideHttpClient  } from '@angular/common/http';
import { AlertdialogComponent } from './alertdialog/alertdialog.component';
// tslint:disable-next-line:max-line-length
import { AddTransportBillRegisterComponent } from './transport-bill-register/add-transport-bill-register/add-transport-bill-register.component';
import { ViewTransportBillRegisterComponent } from './transport-bill-register/view-transport-bill-register/view-transport-bill-register.component';
// tslint:disable-next-line:max-line-length
import { ViewTransportBillRegisterDetailsComponent } from './transport-bill-register/view-transport-bill-register-details/view-transport-bill-register-details.component';
import { EditTransporterBillRegisterComponent } from './transport-bill-register/edit-transporter-bill-register/edit-transporter-bill-register.component';
import { ViewPurchaseServiceComponent } from './purchase-service/view-purchase-service/view-purchase-service.component';
import { EditPurchaseServiceComponent } from './purchase-service/edit-purchase-service/edit-purchase-service.component';
// tslint:disable-next-line:max-line-length
import { ViewPurchaseServiceDetailsComponent } from './purchase-service/view-purchase-service-details/view-purchase-service-details.component';
import { DatePipe } from '@angular/common';
import { VendorExcelUploadComponent } from './vendor/vendor-excel-upload/vendor-excel-upload.component';
import { FileUploadService } from './services/file-upload.service';
import { DecodeTokenService } from './services/decode-token.service';
import { AddCfaBillRegisterComponent } from './cfa-bill-register/add-cfa-bill-register/add-cfa-bill-register.component';
import { ViewCfaBillRegisterComponent } from './cfa-bill-register/view-cfa-bill-register/view-cfa-bill-register.component';
// tslint:disable-next-line:max-line-length
import { ViewCfaBillRegisterDetailsComponent } from './cfa-bill-register/view-cfa-bill-register-details/view-cfa-bill-register-details.component';
import { EditCfaBillRegisterComponent } from './cfa-bill-register/edit-cfa-bill-register/edit-cfa-bill-register.component';
import { AddPurchaseMaterialComponent } from './purchase-material/add-purchase-material/add-purchase-material.component';
import { EditPurchaseMaterialComponent } from './purchase-material/edit-purchase-material/edit-purchase-material.component';
import { ViewPurchaseMaterialComponent } from './purchase-material/view-purchase-material/view-purchase-material.component';
// tslint:disable-next-line:max-line-length
import { TransportBillRegisterExcelComponent } from './transport-bill-register/transport-bill-register-excel/transport-bill-register-excel.component';
import { PurchaseMaterialRegisterExcelComponent } from './purchase-material/purchase-material-register-excel/purchase-material-register-excel.component';
// tslint:disable-next-line:max-line-length
import { PurchaseServiceRegisterExcelComponent } from './purchase-service/purchase-service-register-excel/purchase-service-register-excel.component';
import { ViewPurchaseMaterialDetailsComponent } from './purchase-material/view-purchase-material-details/view-purchase-material-details.component';
import { CfaBillRegisterExcelComponent } from './cfa-bill-register/cfa-bill-register-excel/cfa-bill-register-excel.component';

import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileDownloadService } from './services/file-download.service';
import {MatRadioModule} from '@angular/material/radio';
import { OcrDemoComponent } from './ocr-demo/ocr-demo.component';
import { OcrDemoUploadComponent } from './ocr-demo-upload/ocr-demo-upload.component';
import { TripModalComponent } from './trip-modal/trip-modal.component';
import { CfaContractExcelComponent } from './cfa-contract-excel/cfa-contract-excel.component';
import { FreightMasterExcelComponent } from './freight-master-excel/freight-master-excel.component';
import { DieselIndexExcelComponent } from './diesel-index-excel/diesel-index-excel.component';
import { TripMasterExcelComponent } from './trip-master-excel/trip-master-excel.component';
import { VendorBillCopyExcelComponent } from './transport-bill-register/vendor-bill-copy-excel/vendor-bill-copy-excel.component';
import { LocationMasterExcelComponent } from './location-master-excel/location-master-excel.component';
import { LogPipe } from './log.pipe';
import { TransportBillWorkIdNumberComponent } from './transport-bill-work-id-number/transport-bill-work-id-number.component';
import { DataShareService } from './services/data-share.service';
import { VerifyVendorBillComponent } from './verify-vendor-bill/verify-vendor-bill.component';
import { PurchaseMaterialWorkIdNumberComponent } from './purchase-material/purchase-material-work-id-number/purchase-material-work-id-number.component';
import { PurchaseServiceWorkIdNumberComponent } from './purchase-service/purchase-service-work-id-number/purchase-service-work-id-number.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddVendorComponent,
    AddPurchaseServiceComponent,
    ViewvendorComponent,
    ViewParticularVendor,
    EditVendorComponent,
    AlertdialogComponent,
    AddTransportBillRegisterComponent,
    ViewTransportBillRegisterComponent,
    ViewTransportBillRegisterDetailsComponent,
    ViewPurchaseServiceComponent,
    EditTransporterBillRegisterComponent,
    EditPurchaseServiceComponent,
    ViewPurchaseServiceDetailsComponent,
    VendorExcelUploadComponent,
    AddCfaBillRegisterComponent,
    ViewCfaBillRegisterComponent,
    ViewCfaBillRegisterDetailsComponent,
    EditCfaBillRegisterComponent,
    AddPurchaseMaterialComponent,
    EditPurchaseMaterialComponent,
    ViewPurchaseMaterialComponent,
    ViewPurchaseMaterialDetailsComponent,
    CfaBillRegisterExcelComponent,
    TransportBillRegisterExcelComponent,
    PurchaseMaterialRegisterExcelComponent,
    PurchaseServiceRegisterExcelComponent,
    RegisterComponent,
    ChangePasswordComponent,
    OcrDemoComponent,
    OcrDemoUploadComponent,
    TripModalComponent,
    CfaContractExcelComponent,
    FreightMasterExcelComponent,
    DieselIndexExcelComponent,
    TripMasterExcelComponent,
    VendorBillCopyExcelComponent,
    LocationMasterExcelComponent,
    LogPipe,
    TransportBillWorkIdNumberComponent,
    VerifyVendorBillComponent,
    PurchaseMaterialWorkIdNumberComponent,
    PurchaseServiceWorkIdNumberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatGridListModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
   // HttpClientModule ,
    NgxSpinnerModule,
    NgxPaginationModule,
    MatRadioModule,
    MatMenuModule,
    MatCheckboxModule
  ],
  exports: [ViewvendorComponent, ViewTransportBillRegisterComponent, ViewPurchaseServiceComponent],
/*  entryComponents: [
    ViewvendorComponent, ViewParticularVendor, EditVendorComponent, AlertdialogComponent,
    ViewTransportBillRegisterComponent, ViewTransportBillRegisterDetailsComponent, EditTransporterBillRegisterComponent,
    ViewPurchaseServiceComponent, ViewPurchaseServiceDetailsComponent, EditPurchaseServiceComponent,
    ViewCfaBillRegisterComponent, ViewCfaBillRegisterDetailsComponent, EditCfaBillRegisterComponent,
    ViewPurchaseMaterialComponent, ViewPurchaseMaterialDetailsComponent, EditPurchaseMaterialComponent,
    TripModalComponent
],*/
  providers: [AllservicesService, DatePipe, FileUploadService, DecodeTokenService, FileDownloadService, DataShareService,provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('en-in'); // DD/MM/YYYY
    }
}
