import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-trip-master-excel',
  templateUrl: './trip-master-excel.component.html',
  styleUrls: ['./trip-master-excel.component.css']
})
export class TripMasterExcelComponent implements OnInit {

  @ViewChild('fileInput') fileInput : any;
  selectedFile: File  |null= null;
  constructor(private fileUploadService: FileUploadService, private loaderService: NgxSpinnerService) { }

  ngOnInit() {
  }
  upload() {
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      this.loaderService.show();
      this.selectedFile = fileBrowser.files[0];
      this.fileUploadService.uploadTripMasterFile(this.selectedFile as File);
    }
  }

}
