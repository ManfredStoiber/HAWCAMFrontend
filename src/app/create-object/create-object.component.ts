import { Component, OnInit, ContentChild } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { RESTService } from '../rest.service';
import { DataService } from '../data.service';
import {Location} from '@angular/common';



@Component({
  selector: 'app-create-object',
  templateUrl: './create-object.component.html',
  styleUrls: ['./create-object.component.css']
})
export class CreateObjectComponent implements OnInit {

  // membervariables
  detailsObj:any;
  form: FormGroup;
  private jsonAttributes: JSON = null;
  objAttributes: any = null;

  // initialisation of the membervariable "form"
  constructor(private fb: FormBuilder, private restService: RESTService, private dataService: DataService , private location: Location ) {

    // create a form group, at first only with the input for the objects name
    // "''" is the initial value of the input
    this.form = this.fb.group({
        objObjName: ['', Validators.required]
      });

  }

  // ngOnInit - gets the category attribute in json format
  // alerts user if necessary, else calls this.initialiseScreenWithJSON()
  ngOnInit():void {

   this.jsonAttributes = this.dataService.getJsonCatAttributes();
   this.objAttributes = this.jsonAttributes;
   console.log("CreateObject --onInit this.objAttributes")
   console.log(this.objAttributes);

   if( this.objAttributes ) {
     if ('Fehler' in this.objAttributes) {
       this.objAttributes = null;
       alert("Fehler bei der Dateiübertragung, bitte Seite erneut mit Auswahl laden");
     }
     else {
       this.initialiseScreenWithJSON();
     }
   }

  }

  // initialiseScreenWithJSON - adds form controls for every form input
  // iterates through the array and adds form controls
  // splits the dateAndTime field in two pieces
  // adds mandatory validation depending on the attributes FormArray
  initialiseScreenWithJSON():void {

    // console.log("UNDEFINED?: "+ this.objAttributes.attributes);
    for ( let i=0; i < this.objAttributes.attributes.length; i++ ) {
      if ( this.objAttributes.attributes[i].mandatory == "1" ) {
        if ( this.objAttributes.attributes[i].typ == "dateAndTime" ) {
          console.log("in_if_name:" + this.objAttributes.attributes[i].name);
          this.form.addControl(this.objAttributes.attributes[i].name+"-Date", new FormControl('', Validators.required));
          this.form.addControl(this.objAttributes.attributes[i].name+"-Clock", new FormControl('', Validators.required));
        } else {
          this.form.addControl(this.objAttributes.attributes[i].name, new FormControl('', Validators.required));
        }
      } else if ( this.objAttributes.attributes[i].mandatory == "0" ) {

        if ( this.objAttributes.attributes[i].typ == "dateAndTime" ) {
          this.form.addControl(this.objAttributes.attributes[i].name+"-Date", new FormControl(''));
          this.form.addControl(this.objAttributes.attributes[i].name+"-Clock", new FormControl(''));
        } else {
          this.form.addControl(this.objAttributes.attributes[i].name, new FormControl(''));
        }
      }
    }

  }


  // onSubmit - sends the form value to the backend and handles errors
  // gets the form data
  // parses the input into a JSON format
  // irgendwas mit put
  onSubmit():void {

    // get the form data as an object
    let formObj = this.form.getRawValue();

    let jsonObject: any = formObj;

    let strTemp:string = ' { "catName": "' +  this.objAttributes.name +
     '", "objObjName":"' +  jsonObject.objObjName + '" ,  "details": {';

     let keys = Object.keys(jsonObject);
     let j: number = 0;
     for (let key in jsonObject){
       if(j !== 0){
         strTemp += '"Detail'+ j + '":"'  + jsonObject[key] + '"' ;
         if(Object.keys(jsonObject).length-1 > j){
           strTemp += ',';
         }
       }
       j++;
     }

     strTemp += '}}'

     console.log("alle attributes");
     console.log(strTemp);

     // send it to the backend
     let jsonSerializedForm: JSON = null;

     try {
       jsonSerializedForm = JSON.parse(strTemp);
       console.log("jsonSerializedForm is valid");
       console.log(jsonSerializedForm);

       this.restService.putToRESTService("createObject", jsonSerializedForm)
           .subscribe( (jsonResponse :JSON) => {
             this.checkResponse(jsonResponse);
           }
        );

      } catch ( exception ) {
        console.log("jsonSerializedForm is not valid");
        alert("Objekt konnte nicht gespeichert werden");
      }
  }

  // checkResponse - error handling for PUT-request
  // alerts user if necessary, else sends response to dataService and changes components
  // @input   jsonResponse    response from backend service in JSON format
  checkResponse( jsonResponse: JSON ):void {

    let objResponse = jsonResponse;
    console.log("createObject checkResponse:");
    console.log(objResponse);

    if( objResponse ) {
      if ('Fehler' in objResponse) {
        alert("Objekt konnte nicht gespeichert werden");
      }
      else {
          alert("Objekt erfolgreich erstellt");
      }
    } else {
        alert("Objekt konnte nicht gespeichert werden");
    }
  }

  // abort - onClick from Button "Abbrechen!"
  // opens the ShowCategoryComponent
  abort():void {
    let test: boolean = confirm("Sie verlassen diese Seite und verwerfen alle nicht gespeicherten Eingaben");
    if(test){
      this.location.back();
    }
  }

}
