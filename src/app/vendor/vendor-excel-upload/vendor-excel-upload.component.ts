import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vendor-excel-upload',
  templateUrl: './vendor-excel-upload.component.html',
  styleUrls: ['./vendor-excel-upload.component.css']
})
export class VendorExcelUploadComponent implements OnInit {

  @ViewChild('fileInput') fileInput : any;
  selectedFile: File | null = null;
  constructor(private fileUploadService: FileUploadService, private loaderService: NgxSpinnerService) { }

  ngOnInit() {
  }
  upload() {
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0] && this.selectedFile !== null) {
      this.loaderService.show();
      this.selectedFile = fileBrowser.files[0];
      this.fileUploadService.uploadVendorFile(this.selectedFile as File);
    }
  }

}
