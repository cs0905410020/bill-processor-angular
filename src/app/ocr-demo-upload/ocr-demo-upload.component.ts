import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ocr-demo-upload',
  templateUrl: './ocr-demo-upload.component.html',
  styleUrls: ['./ocr-demo-upload.component.css']
})
export class OcrDemoUploadComponent implements OnInit {
  data: any;
  @Input() billDetails: any;
  constructor(private fileUploadService: FileUploadService, private loaderService: NgxSpinnerService,
    private route: ActivatedRoute) { 
      this.route.queryParamMap.subscribe(params => {
        this.data = {...params.keys, ...params};
      });
      this.billDetails = this.data.params;
  }

  ngOnInit() {
  }

}
