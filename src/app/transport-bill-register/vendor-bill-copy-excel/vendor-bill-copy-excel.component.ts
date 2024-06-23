import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vendor-bill-copy-excel',
  templateUrl: './vendor-bill-copy-excel.component.html',
  styleUrls: ['./vendor-bill-copy-excel.component.css']
})
export class VendorBillCopyExcelComponent implements OnInit {

  @ViewChild('fileInput') fileInput: any;
  selectedFile: File |null = null;
  constructor(private fileUploadService: FileUploadService, private loaderService: NgxSpinnerService) { }

  ngOnInit() {
  }
  upload() {
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      this.loaderService.show();
      this.selectedFile = fileBrowser.files[0];
      this.fileUploadService.uploadVendorBillCopyTransport(this.selectedFile as File);
    }
  }

}
