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

  private jsonObjectDetails: JSON = null;
  objObjectDetails: any = null;
  form: FormGroup;

  constructor( private fb: FormBuilder, private dataService: DataService, private location: Location) {

   }


  ngOnInit() {

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


    // onClick from Button edit
   // opens the EditCategoryComponents
   abort() {
    this.location.back();
   }

}
