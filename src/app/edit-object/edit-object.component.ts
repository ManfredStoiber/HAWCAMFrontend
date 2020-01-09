import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-show-object',
  templateUrl: './edit-object.component.html',
  styleUrls: ['./edit-object.component.css']
})
export class EditObjectComponent implements OnInit {


  // membervariables
  private jsonObjectDetails: JSON = null;
  objObjectDetails: any = null;
  form: FormGroup;

  constructor( private fb: FormBuilder, private dataService: DataService, private location: Location) {

   }

  // ngOnInit - gets the object details in json format
  // gets the object deatils
  // alerts user if necessary, else calls this.initialiseScreenWithJSON()
  ngOnInit() {

    this.jsonObjectDetails = this.dataService.getObjectDetails();
    this.objObjectDetails = this.jsonObjectDetails;
    console.log(this.objObjectDetails);

    if( this.objObjectDetails ) {

      if ('Fehler' in this.objObjectDetails) {
        this.objObjectDetails = null;
        alert("Fehler bei der Dateiübertragung, bitte Seite erneut mit Auswahl laden");
        console.log("this.objObjectDetails contains errorJSON - site needs to be loaded again");
      }
      else {
        this.initialiseScreenWithJSON();
      }
    } else {
      alert("Fehler bei der Dateiübertragung, bitte Seite erneut mit Auswahl laden");
      console.log("this.jsonObjectDetails is null");
    }

  }

  // initialiseScreenWithJSON - adds form controls to form inputs
  // adds the name contorl
  // adds controls according to the given json
  initialiseScreenWithJSON() {

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
          // console.log("in_if_name:" + this.objObjectDetails.details[i].name);
          this.form.addControl(this.objObjectDetails.details[i].name+"-Date", new FormControl(this.objObjectDetails.details[i].value, Validators.required));
          this.form.addControl(this.objObjectDetails.details[i].name+"-Clock", new FormControl(this.objObjectDetails.details[i].value, Validators.required));
        } else {
          // console.log("in if #2");
          this.form.addControl(this.objObjectDetails.details[i].name, new FormControl(this.objObjectDetails.details[i].value, Validators.required));
        }
      } else if ( this.objObjectDetails.details[i].mandatory == "0" ) {
        // console.log("in if #3");
        if ( this.objObjectDetails.details[i].typ == "dateAndTime" ) {
          this.form.addControl(this.objObjectDetails.details[i].name+"-Date", new FormControl(this.objObjectDetails.details[i].value));
          this.form.addControl(this.objObjectDetails.details[i].name+"-Clock", new FormControl(this.objObjectDetails.details[i].value));
        } else {
          // console.log("in if #4");
          this.form.addControl(this.objObjectDetails.details[i].name, new FormControl(this.objObjectDetails.details[i].value));
        }
      }
    }

  }


  // abort - onClick from Button "Abbrechen!"
  // opens the ShowCategoryComponent
  abort() {
    this.location.back();
  }

}
