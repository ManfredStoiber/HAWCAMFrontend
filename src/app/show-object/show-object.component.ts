import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-object',
  templateUrl: './show-object.component.html',
  styleUrls: ['./show-object.component.css']
})
export class ShowObjectComponent implements OnInit {

  // membervariables
  private jsonObjectDetails: JSON = null;
  objObjectDetails: any = null;
  form: FormGroup;

  // declaration of the FormBuilder, DataService, Router - dependency injection
  constructor( private fb: FormBuilder, private dataService: DataService, private router: Router ) {

  }


  // ngOnInit - used for initialisation of membervariables
  // usage of dataService to load jsonObjectDetails
  // error handling of jsonObjectDetails
  // alerts user if necessary, else calls this.initialiseScreenWithJSON()
  ngOnInit() {

    // initialisation of membervariables
    this.jsonObjectDetails = this.dataService.getObjectDetails();
    this.objObjectDetails = this.jsonObjectDetails;
    console.log(this.objObjectDetails);


    // errorhandling
    // when error occurs, alert for user and deny loading of html
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
      console.log("this.objObjectDetails is null");
    }

  }


  initialiseScreenWithJSON(): void{

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


  // openEditObjectComponent - onClick of Button "Bearbeiten!"
  // opens the EditCategoryComponent
  openEditObjectComponent(): void{
    this.router.navigate(["/editObject"]);
  }

}
