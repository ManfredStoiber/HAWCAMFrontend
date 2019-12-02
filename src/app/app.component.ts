import { Component } from '@angular/core';
import { HeaderData } from './headerData.model';

@Component({
  selector: 'appRoot',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'HAWCAMFrontend';

// Membervariable für HTML
  headerData : HeaderData;

  constructor() {

    let strTitle   : string = "Inventarverwaltung";
    let strPath    : string = "Startseite";
    let strMessage : string = "Hallo Administrator, was möchten Sie tun?";

    this.headerData = new HeaderData(strTitle, strPath, strMessage);

  }

}
