import { Component } from '@angular/core';
import { HeaderData } from './headerData.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'HAWCAMFrontend';

// Membervariable für HTML
  objHeaderData : HeaderData;

  constructor() {

    let strTitle   : string = "Inventarverwaltung";
    let strPath    : string = "Startseite";
    let strMessage : string = "Hallo Administrator, was möchten Sie tun?";

    this.objHeaderData = new HeaderData(strTitle, strPath, strMessage);

  }

}
