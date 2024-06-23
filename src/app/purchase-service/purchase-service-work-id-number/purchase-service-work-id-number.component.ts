import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-purchase-service-work-id-number',
  templateUrl: './purchase-service-work-id-number.component.html',
  styleUrls: ['./purchase-service-work-id-number.component.css']
})
export class PurchaseServiceWorkIdNumberComponent implements OnInit {

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
      this.fileUploadService.uploadServiceBillWorkIdFile(this.selectedFile as File);
    }
  }

}
