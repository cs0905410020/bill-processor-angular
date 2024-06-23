import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-diesel-index-excel',
  templateUrl: './diesel-index-excel.component.html',
  styleUrls: ['./diesel-index-excel.component.css']
})
export class DieselIndexExcelComponent implements OnInit {

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
      this.fileUploadService.uploadDieselIndexFile(this.selectedFile as File);
    }
  }

}
