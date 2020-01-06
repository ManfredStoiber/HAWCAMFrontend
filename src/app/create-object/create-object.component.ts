import { Component, OnInit, ContentChild } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { RESTService } from '../rest.service';
import { DataService } from '../data.service';



@Component({
  selector: 'app-create-object',
  templateUrl: './create-object.component.html',
  styleUrls: ['./create-object.component.css']
})
export class CreateObjectComponent implements OnInit {

  detailsObj:any;
  form: FormGroup;

  private jsonAttributes: JSON = null;
  objAttributes: any = null;

  constructor(private fb: FormBuilder, private restService: RESTService, private dataService: DataService ) {

    // create a form group, at first only with the input for the objects name
    // "''" is the initial value of the input
    this.form = this.fb.group({
        objObjName: ['', Validators.required]
      });

  }


  ngOnInit() {

   this.jsonAttributes = this.dataService.getJsonAttributes();
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

  initialiseScreenWithJSON() {

    // create further form controls depending on the given json
    // if required make the inputs mandatory
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


  // send the form data to the backend
  onSubmit() {

    // get the form data as an object
    let formObj = this.form.getRawValue();

    let jsonObject: any = formObj;

    let strTemp:string = ' { "catName": "' + "'" + this.objAttributes.name + "'" +
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


  checkResponse( jsonResponse: JSON ) {

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
}
