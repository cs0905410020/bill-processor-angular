import { Component } from '@angular/core';
import { AllservicesService } from './allservices.service';
import { AlertdialogComponent } from './alertdialog/alertdialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
