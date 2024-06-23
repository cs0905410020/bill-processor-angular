import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-purchase-material-register-excel',
  templateUrl: './purchase-material-register-excel.component.html',
  styleUrls: ['./purchase-material-register-excel.component.css']
})
export class PurchaseMaterialRegisterExcelComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;
  selectedFile: File  |null= null;
  constructor(private fileUploadService: FileUploadService, private loaderService: NgxSpinnerService) { }

  ngOnInit() {
  }
  upload() {
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      this.loaderService.show();
      this.selectedFile = fileBrowser.files[0];
      this.fileUploadService.uploadPurchaseMaterialFile(this.selectedFile as File);
    }
  }

}
