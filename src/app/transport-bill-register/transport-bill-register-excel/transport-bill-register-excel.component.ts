import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-transport-bill-register-excel',
  templateUrl: './transport-bill-register-excel.component.html',
  styleUrls: ['./transport-bill-register-excel.component.css']
})
export class TransportBillRegisterExcelComponent implements OnInit {
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
      this.fileUploadService.uploadTransportBillFile(this.selectedFile as File);
    }
  }

}
