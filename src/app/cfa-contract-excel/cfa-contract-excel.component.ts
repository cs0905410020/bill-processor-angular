import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-cfa-contract-excel',
  templateUrl: './cfa-contract-excel.component.html',
  styleUrls: ['./cfa-contract-excel.component.css']
})
export class CfaContractExcelComponent implements OnInit {

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
      this.fileUploadService.uploadCfaContractFile(this.selectedFile as File);
    }
  }
}
