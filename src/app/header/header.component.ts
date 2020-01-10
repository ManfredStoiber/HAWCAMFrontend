import { Component, OnInit, Input } from '@angular/core';
import {Location} from '@angular/common';

import { HeaderData } from '../headerData.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Auslesen des Input
  @Input('objHeaderData') objHeaderData : HeaderData;

  // Membervariable für Datum
  strDatetime : string;

  constructor( private location: Location ) {

  }


  ngOnInit():void {
    this.setStrDateTime();
  }

  clickedBack():void {
    this.location.back();
  }

  setStrDateTime():void {

    let letCurrentDate = new Date();
    let nDay: number = letCurrentDate.getDay().valueOf();

    let strDayname = "";
    switch(nDay) {
      case 0: {
        strDayname = "Sonntag";       break;
      }
      case 1: {
        strDayname = "Montag";        break;
      }
      case 2: {
        strDayname = "Dienstag";      break;
      }
      case 3: {
        strDayname = "Mittwoch";      break;
      }
      case 4: {
        strDayname = "Donnerstag";    break;
      }
      case 5: {
        strDayname = "Freitag";       break;
      }
      case 6: {
        strDayname = "Samstag";       break;
      }
      default: {
        strDayname = "Fehler beim Auflösen des Wochentags";   break;
      }
    }

    this.strDatetime = strDayname + ', der ' + letCurrentDate.toLocaleDateString('de-DE');

  }


}
