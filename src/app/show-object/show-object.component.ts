import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-show-object',
  templateUrl: './show-object.component.html',
  styleUrls: ['./show-object.component.css']
})
export class ShowObjectComponent implements OnInit {

  private jsonObjectDetails: JSON = null;
  objObjectDetails: any = null;


  constructor( private dataService: DataService ) { }


  ngOnInit() {

// only dummy
    let strTemp: string = '{ "name":"R123", "details": [ {"name": "Bezeichung", "typ":"textfield", "mandatory":"1", "value":"R123"}, {"name": "Sitzform", "typ":"textfield", "mandatory":"0", "value":"U-Form" }, {"name": "Anzahl", "typ":"number", "mandatory":"1", "value":34 } ] }';
    let jsonTemp: JSON = null;

    try {
      jsonTemp = JSON.parse(strTemp);

      console.log("jsonTemp is valid");
      console.log(jsonTemp);
      this.dataService.setObjectDetails(jsonTemp);

    } catch( exception ) {
      console.log("jsonTemp is not valid");
    }
// only dummy

    this.jsonObjectDetails = this.dataService.getObjectDetails();
    this.objObjectDetails = this.jsonObjectDetails;
    console.log(this.objObjectDetails);

    if( this.objObjectDetails ) {

      if ('Fehler' in this.objObjectDetails) {
        this.objObjectDetails = null;
        alert("Fehler bei der Dateiübertragung, bitte Seite erneut mit Auswahl laden");
      }
      else {
        this.initialiseScreenWithJSON();
      }
    }

  }


  initialiseScreenWithJSON() {

    // Kevins shit
    console.log("Wer macht das Form ?");
    console.log("JA, Kevin macht das Form");
  }

}
