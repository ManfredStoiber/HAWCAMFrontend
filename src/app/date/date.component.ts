import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'appDate',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})

export class DateComponent implements OnInit {

  strDatetime : string;

  constructor() {
  }

  ngOnInit() {
    this.setStrDateTime();
  }

  setStrDateTime() {

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
