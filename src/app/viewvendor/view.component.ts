import { Component, Input } from '@angular/core';
import { Vendor } from '../vendor/vendor';
import { ActivatedRoute } from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-view-particular-vendor',
  templateUrl: 'view.component.html',
  styleUrls: ['./viewvendor.component.css']
})


// tslint:disable-next-line:component-class-suffix
export class ViewParticularVendor {
  dataset: Vendor | null = null;
  error: string='';
  data: any;
  @Input() vendor: any;
  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(params => {
      this.data = {...params.keys, ...params};
    });
    this.getview(this.data.params);
  }

  getview(vendor: any) {
        this.dataset = vendor;
  }
}
