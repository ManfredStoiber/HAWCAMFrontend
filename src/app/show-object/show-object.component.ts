import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { RESTService } from '../rest.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-show-object',
  templateUrl: './show-object.component.html',
  styleUrls: ['./show-object.component.css']
})
export class ShowObjectComponent implements OnInit {

  private jsonObjectDetails: JSON = null;
  objObjectDetails: any = null;
  form: FormGroup;

  constructor( private fb: FormBuilder, private restService: RESTService,private dataService: DataService ) {




   }


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


    console.log("this.objObjectDetails");
    console.log(this.objObjectDetails);


    console.log("det");
    console.log(this.objObjectDetails.details[0].value);


    // create a form group, at first only with the input for the objects name
    // "''" is the initial value of the input
    this.form = this.fb.group({
        objObjName: [this.objObjectDetails.name, Validators.required]
      });




    // create further form controls depending on the given json
    // if required make the inputs mandatory
    for ( let i=0; i < this.objObjectDetails.details.length; i++ ) {
      if ( this.objObjectDetails.details[i].mandatory == "1" ) {
        if ( this.objObjectDetails.details[i].typ == "dateAndTime" ) {
          console.log("in_if_name:" + this.objObjectDetails.details[i].name);
          this.form.addControl(this.objObjectDetails.details[i].name+"-Date", new FormControl(this.objObjectDetails.details[i].value, Validators.required));
          this.form.addControl(this.objObjectDetails.details[i].name+"-Clock", new FormControl(this.objObjectDetails.details[i].value, Validators.required));
        } else {
          console.log("in if #2");
          this.form.addControl(this.objObjectDetails.details[i].name, new FormControl(this.objObjectDetails.details[i].value, Validators.required));
        }
      } else if ( this.objObjectDetails.details[i].mandatory == "0" ) {
        console.log("in if #3");
        if ( this.objObjectDetails.details[i].typ == "dateAndTime" ) {
          this.form.addControl(this.objObjectDetails.details[i].name+"-Date", new FormControl(this.objObjectDetails.details[i].value));
          this.form.addControl(this.objObjectDetails.details[i].name+"-Clock", new FormControl(this.objObjectDetails.details[i].value));
        } else {
          console.log("in if #4");
          this.form.addControl(this.objObjectDetails.details[i].name, new FormControl(this.objObjectDetails.details[i].value));
        }
      }
    }

  }

  onSubmit(){

    alert("Objekt bearbeiten");
  }


}
