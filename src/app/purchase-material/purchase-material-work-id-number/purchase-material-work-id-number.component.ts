import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploadService } from '../../services/file-upload.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-purchase-material-work-id-number',
  templateUrl: './purchase-material-work-id-number.component.html',
  styleUrls: ['./purchase-material-work-id-number.component.css']
})
export class PurchaseMaterialWorkIdNumberComponent implements OnInit {

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
      this.fileUploadService.uploadMaterialBillWorkIdFile(this.selectedFile as File);
    }
  }

}
